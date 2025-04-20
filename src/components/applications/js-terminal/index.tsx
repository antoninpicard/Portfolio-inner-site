import React, { useState, useRef, useEffect } from 'react';
import Window from '../../os/Window';
import { executeCommand, commands } from './commands';
import { fs } from './filesystem';
import * as marked from 'marked';
import './terminal.css';

export interface TerminalAppProps extends WindowAppProps {}

interface HistoryEntry {
  command: string;
  output: string;
}

const TerminalApp: React.FC<TerminalAppProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [command, setCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tabSuggestions, setTabSuggestions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(-1);


  const normalizeSpaces = (input: string) => {
    // Garder les espaces au début et à la fin
    const leadingSpaces = input.match(/^\s*/)?.[0] || '';
    const trailingSpaces = input.match(/\s*$/)?.[0] || '';
    const trimmed = input.trim();
    
    // Remplacer les espaces multiples par un seul espace
    return leadingSpaces + trimmed.replace(/\s+/g, ' ') + trailingSpaces;
  };

  const parseCommand = (input: string) => {
    const normalized = normalizeSpaces(input);
    const parts = normalized.trim().split(' ');
    const nonEmptyParts = parts.filter(p => p.length > 0);

    // Déterminer le type de complétion et la position
    const lastChar = normalized[normalized.length - 1];
    const isTyping = lastChar !== ' ' && lastChar !== undefined;
    const lastPart = isTyping ? parts[parts.length - 1] : '';

    // Trouver le préfixe exact avec les espaces
    const lastPartIndex = isTyping ? normalized.lastIndexOf(lastPart) : normalized.length;
    const prefix = normalized.slice(0, lastPartIndex);

    // Déterminer le type de complétion
    const completionType = (() => {
      if (nonEmptyParts.length === 0) return 'empty';
      if (nonEmptyParts.length === 1 && isTyping) return 'command';
      if (!isTyping) return 'new-arg';
      return 'arg';
    })();

    return {
      parts: nonEmptyParts,
      cmdName: nonEmptyParts[0]?.toLowerCase() || '',
      currentPart: lastPart || '',
      prefix,
      isTyping,
      completionType,
      hasTrailingSpace: lastChar === ' '
    };
  };

  const getSuggestions = (input: string): string[] => {
    const { parts, cmdName, currentPart, completionType } = parseCommand(input);
    
    // Pas de suggestions si vide
    if (completionType === 'empty') return [];
    
    // Suggestions de commandes
    if (completionType === 'command') {
      return commands
        .map((cmd: { name: string }) => cmd.name)
        .filter((name: string) => name.toLowerCase().startsWith(cmdName))
        .sort((a: string, b: string) => {
          // D'abord trier par longueur
          const lenDiff = a.length - b.length;
          if (lenDiff !== 0) return lenDiff;
          // Puis par ordre alphabétique
          return a.localeCompare(b);
        });
    }
    
    // Pour les commandes qui acceptent des fichiers/dossiers
    if (['ls', 'cd', 'cat'].includes(cmdName)) {
      // Si on tape une option
      if (currentPart.startsWith('-')) {
        const command = commands.find((cmd: { name: string }) => cmd.name === cmdName);
        return command?.getSuggestions?.(currentPart, parts.slice(1)) || [];
      }
      // Sinon chercher des fichiers/dossiers
      return fs.getSuggestions(currentPart);
    }
    
    // Pour les autres commandes, chercher des suggestions spécifiques
    const command = commands.find((cmd: { name: string }) => cmd.name === cmdName);
    if (command?.getSuggestions) {
      return command.getSuggestions(currentPart, parts.slice(1));
    }
    
    return [];
  };

  // Fonction pour créer une fenêtre de prévisualisation Markdown
  const createMarkdownPreviewWindow = (fileName: string, content: string, githubUrl: string | null = null) => {
    // Créer un conteneur pour la fenêtre
    const previewContainer = document.createElement('div');
    previewContainer.className = 'markdown-preview-window';
    document.body.appendChild(previewContainer);
    
    // Créer un en-tête pour la fenêtre dans le style Windows
    const header = document.createElement('div');
    header.className = 'markdown-preview-header';
    header.innerHTML = `<span>Prévisualisation de ${fileName}</span><button class="close-btn">×</button>`;
    previewContainer.appendChild(header);
    
    // Créer un conteneur avec bordure intérieure pour le contenu
    const innerBorder = document.createElement('div');
    innerBorder.className = 'markdown-preview-inner-border';
    previewContainer.appendChild(innerBorder);
    
    // Créer un conteneur de défilement pour le contenu
    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'markdown-scroll-container';
    innerBorder.appendChild(scrollContainer);
    
    // Créer le contenu de la prévisualisation
    const contentDiv = document.createElement('div');
    contentDiv.className = 'markdown-preview-content';
    scrollContainer.appendChild(contentDiv);
    
    try {
      // Si l'URL GitHub n'est pas fournie, essayer de l'extraire du contenu
      if (!githubUrl) {
        const githubLinkRegex = /\[Voir sur GitHub\]\((https:\/\/github\.com\/[^\)]+)\)/;
        const match = content.match(githubLinkRegex);
        githubUrl = match ? match[1] : null;
      }
      
      // Supprimer le lien GitHub du contenu Markdown
      let cleanContent = content.replace(/\[Voir sur GitHub\]\(https:\/\/github\.com\/[^\)]+\)/g, '');
      
      // Convertir le Markdown en HTML
      const htmlContent = marked.parse(cleanContent) as string;
      
      // Insérer le contenu HTML dans la div
      contentDiv.innerHTML = `<div class="markdown-vertical-layout">${htmlContent}</div>`;
      
      // Ajouter le bouton GitHub séparément s'il a été trouvé
      if (githubUrl) {
        console.log('GitHub URL found:', githubUrl); // Debug
        
        // Créer un conteneur pour le bouton GitHub en bas
        const footerContainer = document.createElement('div');
        footerContainer.className = 'markdown-preview-footer';
        innerBorder.appendChild(footerContainer);
        
        // Créer un bouton GitHub séparé
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'github-button-container';
        
        const githubButton = document.createElement('a');
        githubButton.href = githubUrl;
        githubButton.className = 'github-button';
        githubButton.target = '_blank';
        githubButton.rel = 'noopener noreferrer';
        githubButton.textContent = 'Voir sur GitHub';
        
        buttonContainer.appendChild(githubButton);
        footerContainer.appendChild(buttonContainer);
      } else {
        console.log('No GitHub URL found'); // Debug
      }
    } catch (error) {
      console.error('Erreur lors du parsing Markdown:', error);
      // Afficher le contenu brut en cas d'erreur
      contentDiv.innerHTML = `<pre style="white-space: pre-wrap;">${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`;
    }
    
    // Ajouter le style CSS pour la fenêtre dans le style de l'application
    const style = document.createElement('style');
    style.textContent = `
      .markdown-preview-window {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        max-width: 800px;
        height: 80%;
        max-height: 600px;
        background-color: #c0c0c0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 2px solid #000000;
        border-top-color: #ffffff;
        border-left-color: #ffffff;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
      }
      .markdown-preview-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 4px;
        background-color: #000080;
        color: white;
        font-weight: bold;
        font-family: 'Pixelated MS Sans Serif', Arial, sans-serif;
        font-size: 12px;
        height: 20px;
      }
      .close-btn {
        background-color: #c0c0c0;
        color: black;
        border: 2px solid #808080;
        border-top-color: #ffffff;
        border-left-color: #ffffff;
        width: 16px;
        height: 16px;
        font-size: 10px;
        line-height: 10px;
        text-align: center;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .markdown-preview-inner-border {
        flex: 1;
        border: 1px solid #808080;
        border-top-color: #000000;
        border-left-color: #000000;
        margin: 2px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .markdown-scroll-container {
        flex: 1;
        overflow: auto;
      }
      .markdown-preview-content {
        padding: 10px;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
      }
      .markdown-vertical-layout {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .markdown-vertical-layout > * {
        width: 100%;
        margin-bottom: 10px;
      }
      .markdown-vertical-layout ul, 
      .markdown-vertical-layout ol {
        display: block;
        margin-left: 20px;
      }
      .markdown-vertical-layout p {
        display: block;
        margin-bottom: 10px;
      }
      .markdown-vertical-layout a {
        display: inline;
      }
      .markdown-vertical-layout code {
        display: inline;
      }
      .markdown-vertical-layout pre {
        display: block;
        margin-bottom: 10px;
      }
      .markdown-preview-footer {
        padding: 10px;
        border-top: 1px solid #808080;
        background-color: #c0c0c0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .github-button-container {
        display: flex;
        justify-content: center;
        margin: 0;
        width: 100%;
      }
      .github-button {
        display: inline-block;
        background-color: #c0c0c0;
        color: #000000;
        padding: 6px 12px;
        text-decoration: none;
        font-family: 'Pixelated MS Sans Serif', Arial, sans-serif;
        font-size: 12px;
        font-weight: normal;
        border: 2px solid #ffffff;
        border-right-color: #808080;
        border-bottom-color: #808080;
        box-shadow: 1px 1px 0 #000000;
        text-align: center;
        min-width: 150px;
        cursor: pointer;
      }
      .github-button:hover {
        background-color: #d0d0d0;
      }
      .github-button:active {
        border: 2px solid #c0c0c0;
        border-top-color: #808080;
        border-left-color: #808080;
        box-shadow: none;
      }
      .markdown-preview-content h1 {
        font-size: 1.8em;
        margin-bottom: 0.5em;
        border-bottom: 1px solid #c0c0c0;
        padding-bottom: 0.3em;
        color: #000080;
      }
      .markdown-preview-content h2 {
        font-size: 1.5em;
        margin-bottom: 0.5em;
        border-bottom: 1px solid #c0c0c0;
        padding-bottom: 0.3em;
        color: #000080;
      }
      .markdown-preview-content h3 {
        font-size: 1.25em;
        margin-bottom: 0.5em;
        color: #000080;
      }
      .markdown-preview-content p {
        margin-bottom: 1em;
        line-height: 1.6;
      }
      .markdown-preview-content ul, .markdown-preview-content ol {
        margin-bottom: 1em;
        padding-left: 2em;
      }
      .markdown-preview-content li {
        margin-bottom: 0.5em;
      }
      .markdown-preview-content a {
        color: #0000ff;
        text-decoration: none;
      }
      .markdown-preview-content a:hover {
        text-decoration: underline;
      }
      .markdown-preview-content code {
        background-color: #f0f0f0;
        font-family: "Courier New", monospace;
        font-size: 90%;
        margin: 0;
        padding: 0.2em 0.4em;
        border: 1px solid #c0c0c0;
      }
      .markdown-preview-content pre {
        background-color: #f0f0f0;
        font-family: "Courier New", monospace;
        font-size: 90%;
        line-height: 1.45;
        overflow: auto;
        padding: 10px;
        margin-bottom: 1em;
        border: 1px solid #c0c0c0;
      }
      .markdown-preview-content pre code {
        background-color: transparent;
        border: none;
        padding: 0;
      }
      .markdown-preview-window.maximized {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: none;
      }
      .markdown-preview-window.active {
        z-index: 10000;
      }
    `;
    document.head.appendChild(style);
    
    // Ajouter un gestionnaire d'événements pour le bouton de fermeture
    const closeButton = previewContainer.querySelector('.close-btn');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        document.body.removeChild(previewContainer);
      });
    }
    
    // Ajouter un gestionnaire d'événements pour le déplacement de la fenêtre
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      offsetX = e.clientX - previewContainer.getBoundingClientRect().left;
      offsetY = e.clientY - previewContainer.getBoundingClientRect().top;
      // Ajouter une classe active pour indiquer que la fenêtre est sélectionnée
      previewContainer.classList.add('active');
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isDragging) {
        previewContainer.style.left = `${e.clientX - offsetX}px`;
        previewContainer.style.top = `${e.clientY - offsetY}px`;
        previewContainer.style.transform = 'none';
      }
    });
    
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    // Ajouter un gestionnaire pour le double-clic sur la barre de titre (maximiser/restaurer)
    header.addEventListener('dblclick', () => {
      if (previewContainer.classList.contains('maximized')) {
        // Restaurer la taille normale
        previewContainer.classList.remove('maximized');
        previewContainer.style.top = '';
        previewContainer.style.left = '';
        previewContainer.style.width = '';
        previewContainer.style.height = '';
        previewContainer.style.transform = 'translate(-50%, -50%)';
      } else {
        // Maximiser la fenêtre
        previewContainer.classList.add('maximized');
        previewContainer.style.top = '0';
        previewContainer.style.left = '0';
        previewContainer.style.width = '100%';
        previewContainer.style.height = '100%';
        previewContainer.style.transform = 'none';
      }
    });
    
    // Mettre la fenêtre au premier plan lors d'un clic
    previewContainer.addEventListener('mousedown', () => {
      // Mettre cette fenêtre au-dessus des autres
      const allWindows = document.querySelectorAll('.markdown-preview-window');
      allWindows.forEach(win => {
        (win as HTMLElement).style.zIndex = '9999';
        win.classList.remove('active');
      });
      previewContainer.style.zIndex = '10000';
      previewContainer.classList.add('active');
    });
  };

  // Fonction pour appliquer une suggestion
  const applySuggestion = (suggestion: string, completionType: string, prefix: string, hasTrailingSpace: boolean) => {
    switch (completionType) {
      case 'command':
        // Pour une commande, ajouter un espace
        setCommand(suggestion + ' ');
        break;
      
      case 'new-arg':
        // Pour un nouvel argument, ajouter la suggestion
        setCommand(command + suggestion);
        break;
      
      case 'arg':
        // Pour un argument en cours, remplacer la partie courante
        const newCommand = prefix + suggestion;
        // Ajouter un espace si c'était le dernier argument
        setCommand(hasTrailingSpace ? newCommand + ' ' : newCommand);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Réinitialiser l'index de tabulation si la commande change (sauf par Tab)
    if (e.key !== 'Tab') {
      setTabIndex(-1);
      setTabSuggestions([]);
    }

    if (e.key === 'Enter') {
      const trimmedCommand = command.trim();
      if (trimmedCommand) {
        const output = executeCommand(trimmedCommand);
        if (output === '<<CLEAR>>') {
          setHistory([]);
        } else if (output.startsWith('OPEN_URL:')) {
          // Extraire l'URL et l'ouvrir dans un nouvel onglet
          const url = output.substring(9);
          window.open(url, '_blank');
          // Ajouter une entrée dans l'historique pour indiquer que le lien a été ouvert
          setHistory(h => [...h, { 
            command: trimmedCommand, 
            output: `Ouverture de ${url} dans un nouvel onglet...` 
          }]);
        } else if (output.startsWith('PREVIEW_MARKDOWN:')) {
          // Format: PREVIEW_MARKDOWN:fileName:content[:githubUrl]
          const parts = output.split(':');
          const fileName = parts[1];
          
          // Vérifier si le dernier élément est une URL GitHub
          let githubUrl = null;
          let content = '';
          
          if (parts.length > 3 && parts[parts.length - 1].startsWith('https://github.com/')) {
            // Si le dernier élément est une URL GitHub
            githubUrl = parts[parts.length - 1];
            // Le contenu est tout ce qui est entre le nom du fichier et l'URL GitHub
            content = parts.slice(2, parts.length - 1).join(':');
          } else {
            // Sinon, le contenu est tout ce qui suit le nom du fichier
            content = parts.slice(2).join(':');
          }
          
          // Créer la fenêtre de prévisualisation avec l'URL GitHub si elle existe
          createMarkdownPreviewWindow(fileName, content, githubUrl);
          
          // Ajouter une entrée dans l'historique
          setHistory(h => [...h, { 
            command: trimmedCommand, 
            output: `Ouverture de la prévisualisation de ${fileName}...` 
          }]);
        } else {
          setHistory(h => [...h, { command: trimmedCommand, output }]);
        }
        setCommandHistory(ch => [...ch, trimmedCommand]);
        setHistoryIndex(-1);
      }
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!command) return;

      // Obtenir les suggestions basées sur ce qui a été saisi
      const { completionType, prefix, hasTrailingSpace } = parseCommand(command);
      
      // Si c'est le premier appui sur Tab ou si la commande a changé, réinitialiser les suggestions
      if (tabIndex === -1 || tabSuggestions.length === 0) {
        const newSuggestions = getSuggestions(command);
        if (newSuggestions.length === 0) return;
        
        setTabSuggestions(newSuggestions);
        setTabIndex(0);
        
        // Appliquer la première suggestion
        applySuggestion(newSuggestions[0], completionType, prefix, hasTrailingSpace);
      } else {
        // Passer à la suggestion suivante
        const nextIndex = (tabIndex + 1) % tabSuggestions.length;
        setTabIndex(nextIndex);
        
        // Appliquer la suggestion suivante
        applySuggestion(tabSuggestions[nextIndex], completionType, prefix, hasTrailingSpace);
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.scrollTop = screenRef.current.scrollHeight;
    }
  }, [history]);



  return (
    <Window
      top={200}
      left={200}
      width={600}
      height={400}
      windowTitle="Terminal"
      windowBarIcon="term"
      closeWindow={props.onClose}
      onInteract={props.onInteract}
      minimizeWindow={props.onMinimize}
    >
      <div className="terminal-container" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-screen" ref={screenRef}>
          {history.length === 0 && (
            <div className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">C:{fs.getLastPathSegment()}{': '}</span>
                <span>Bienvenue sur le Terminal d'Anto v1.0.0</span>
              </div>
              <div className="terminal-output"></div>
            </div>
          )}
          {history.length === 0 && (
            <div className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">C:{fs.getLastPathSegment()}{': '}</span>
                <span>Tapez 'help' pour voir les commandes disponibles.</span>
              </div>
              <div className="terminal-output"></div>
            </div>
          )}
          {history.map((entry, idx) => (
            <div key={idx} className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">C:{fs.getLastPathSegment()}{': '}</span>
                {entry.command}
              </div>
              {entry.output && (
                <div className="terminal-output">{entry.output}</div>
              )}
            </div>
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="terminal-prompt">C:{fs.getLastPathSegment()}{': '}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="terminal-cursor">▌</span>
        </div>
      </div>
    </Window>
  );
};

export default TerminalApp;
