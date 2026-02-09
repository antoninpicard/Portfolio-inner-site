import React, { useState, useEffect, useCallback } from 'react';
import Window from '../../os/Window';
import { fs } from '../js-terminal/filesystem';
import { IconName } from '../../../assets/icons';
import { createMarkdownPreviewWindow } from '../js-terminal';
import './style.css';

export interface FileExplorerProps extends WindowAppProps {}

interface FileItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
}

const FileExplorer: React.FC<FileExplorerProps> = (props) => {
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'guest']);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [history, setHistory] = useState<string[][]>([['home', 'guest']]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);

  const getCurrentPathString = (): string => {
    return '/' + currentPath.join('/');
  };

  const loadFiles = useCallback(() => {
    // Implémentation personnalisée pour lister les fichiers car fs.listFiles n'existe pas
    const path = getCurrentPathString();
    const lsOutput = fs.ls(path);
    
    // Parser la sortie de ls qui est un string avec des noms séparés par des sauts de ligne
    const items: FileItem[] = [];
    
    if (lsOutput && !lsOutput.startsWith('ls: no such directory')) {
      const entries = lsOutput.split('\n');
      
      entries.forEach(entry => {
        // Si le nom se termine par /, c'est un dossier
        const isDirectory = entry.endsWith('/');
        const name = isDirectory ? entry.slice(0, -1) : entry;
        
        items.push({
          name: name,
          type: isDirectory ? 'directory' : 'file',
          path: getCurrentPathString() + '/' + name
        });
      });
    }
    
    setFiles(items);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const updateBreadcrumbs = useCallback(() => {
    const breadcrumbsArray = ['root', ...currentPath];
    setBreadcrumbs(breadcrumbsArray);
  }, [currentPath]);

  useEffect(() => {
    loadFiles();
    updateBreadcrumbs();
  }, [currentPath, loadFiles, updateBreadcrumbs]);

  const getFilenameFromPath = (path: string): string => {
    const parts = path.split('/');
    return parts[parts.length - 1];
  };

  const navigateToDirectory = (dirPath: string) => {
    const newPath = dirPath.split('/').filter(part => part.length > 0);
    
    if (JSON.stringify(newPath) !== JSON.stringify(currentPath)) {
      // Ajouter à l'historique uniquement si c'est une nouvelle navigation
      if (historyIndex < history.length - 1) {
        // Si nous avons navigué en arrière, nous tronquons l'historique
        setHistory(prev => [...prev.slice(0, historyIndex + 1), newPath]);
      } else {
        setHistory(prev => [...prev, newPath]);
      }
      setHistoryIndex(prev => prev + 1);
      
      setCurrentPath(newPath);
      setSelectedFile(null);
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'directory') {
      navigateToDirectory(item.path);
    } else {
      // Pour les fichiers, afficher le contenu
      viewFileContent(item);
    }
  };
  const viewFileContent = (file: FileItem) => {
    // Utiliser cat au lieu de getFileContent qui n'existe pas
    const content = fs.cat(file.path);
    if (content && !content.startsWith('cat: no such file')) {
      const fileName = getFilenameFromPath(file.path);
      
      // Si c'est un fichier Markdown (.md) ou texte (.txt), utiliser la prévisualisation
      if (fileName.endsWith('.md') || fileName.endsWith('.txt')) {
        // Si c'est un fichier Markdown (.md), extraire l'URL GitHub si disponible
        let githubUrl = null;
        
        if (fileName.endsWith('.md')) {
          // Essayer d'extraire l'URL Github de deux façons différentes
          if (typeof fs.extractGitHubUrl === 'function') {
            // Utiliser la fonction d'extraction du terminal si disponible
            githubUrl = fs.extractGitHubUrl(content);
          } else {
            // Méthode de secours: extraction manuelle
            const githubLinkRegex = /\[Voir sur GitHub\]\((https:\/\/github\.com\/[^)]+)\)/;
            const match = content.match(githubLinkRegex);
            githubUrl = match ? match[1] : null;
          }
        }
        
        if (fileName.endsWith('.txt')) {
          // Envelopper le contenu dans un bloc de code pour une meilleure lisibilité
          const formattedContent = '```\n' + content + '\n```';
          createMarkdownPreviewWindow(fileName, formattedContent, null);
        } else {
          // Utiliser directement la même fonction que le terminal pour les .md
          createMarkdownPreviewWindow(fileName, content, githubUrl);
        }
      } else {
        // Pour les autres types de fichiers, afficher dans une simple fenêtre texte
        alert(`Contenu de ${fileName}:\n\n${content}`);
      }
    }
  };

  const handleItemClick = (item: FileItem) => {
    setSelectedFile(item.name);
  };

  const handleGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setCurrentPath(history[historyIndex - 1]);
      setSelectedFile(null);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setCurrentPath(history[historyIndex + 1]);
      setSelectedFile(null);
    }
  };

  const handleGoUp = () => {
    if (currentPath.length > 1) {
      const newPath = [...currentPath];
      newPath.pop();
      navigateToDirectory('/' + newPath.join('/'));
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === 0) {
      // Root
      navigateToDirectory('/home/guest');
    } else {
      const newPath = currentPath.slice(0, index);
      navigateToDirectory('/' + newPath.join('/'));
    }
  };

  const getFileIcon = (file: FileItem): IconName => {
    if (file.type === 'directory') {
      return 'directory';
    }
    
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.md')) return 'text';
    if (fileName.endsWith('.txt')) return 'text';
    if (fileName === 'readme.md') return 'text';
    
    return 'text';
  };

  return (
    <Window
      windowTitle="Explorateur de fichiers"
      windowBarIcon="directory"
      onInteract={props.onInteract}
      closeWindow={props.onClose}
      minimizeWindow={props.onMinimize}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.8}
      top={window.innerHeight * 0.1}
      left={window.innerWidth * 0.1}
    >
      <div className="file-explorer">
        <div className="file-explorer-toolbar">
          <div className="windows-logo">
            <img src={require('../../../assets/icons/directory.png')} alt="Explorer" className="toolbar-icon" />
          </div>
          <button 
            onClick={handleGoBack} 
            disabled={historyIndex <= 0}
            className="explorer-button"
            title="Précédent"
          >
            ◀
          </button>
          <button 
            onClick={handleGoForward} 
            disabled={historyIndex >= history.length - 1}
            className="explorer-button"
            title="Suivant"
          >
            ▶
          </button>
          <button 
            onClick={handleGoUp} 
            disabled={currentPath.length <= 1}
            className="explorer-button"
            title="Dossier parent"
          >
            ▲
          </button>
          <div className="address-bar">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="separator">/</span>}
                <span 
                  className="breadcrumb" 
                  onClick={() => handleBreadcrumbClick(index)}
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="view-toggle">
            <button 
              className={`explorer-button ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              □
            </button>
            <button 
              className={`explorer-button ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              ≡
            </button>
          </div>
        </div>
        
        <div className={`file-explorer-content ${viewMode}`}>
          {files.map((file) => (
            <div
              key={file.name}
              className={`file-item ${viewMode} ${selectedFile === file.name ? 'selected' : ''}`}
              onClick={() => handleItemClick(file)}
              onDoubleClick={() => handleItemDoubleClick(file)}
            >
              <div className="file-icon">
                <img 
                  src={require(`../../../assets/icons/${getFileIcon(file)}.png`)} 
                  alt={file.type === 'directory' ? 'Dossier' : 'Fichier'} 
                  className="file-item-icon" 
                />
              </div>
              <div className="file-name">
                {file.name}
              </div>
              {viewMode === 'list' && (
                <div className="file-type">
                  {file.type === 'directory' ? 'Dossier' : 'Fichier'}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="file-explorer-statusbar">
          {selectedFile ? `Sélectionné: ${selectedFile}` : `${files.length} élément(s)`}
        </div>
      </div>
    </Window>
  );
};

// Déclarer l'interface globale pour TypeScript
declare global {
  interface Window {
    openMarkdownPreviewFn?: (fileName: string, content: string) => void;
  }
}

export default FileExplorer;
