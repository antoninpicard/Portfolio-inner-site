interface FSNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: { [key: string]: FSNode };
}

class FileSystem {
  private root: FSNode = {
    name: '/',
    type: 'directory',
    children: {
      home: {
        name: 'home',
        type: 'directory',
        children: {
          guest: {
            name: 'guest',
            type: 'directory',
            children: {
              'about.txt': {
                name: 'about.txt',
                type: 'file',
                content: 'Bienvenue dans mon terminal !\nTapez "help" pour voir les commandes disponibles.'
              },
              'github': {
                name: 'github',
                type: 'directory',
                children: {
                  'portfolio': {
                    name: 'portfolio',
                    type: 'directory',
                    children: {
                      'Portfolio-website-master.md': {
                        name: 'Portfolio-website-master.md',
                        type: 'file',
                        content: '# Portfolio-website-master\n\nCeci est mon Portfolio 2023, créé en Three.js avec React.\n\n## Technologies\n- TypeScript\n- Three.js\n- React\n\n## Stars: 8\n\n[Voir sur GitHub](https://github.com/antoninpicard/Portfolio-website-master)'
                      },
                      'Portfolio-inner-site.md': {
                        name: 'Portfolio-inner-site.md',
                        type: 'file',
                        content: '# Portfolio-inner-site\n\nVersion interne de mon portfolio avec terminal interactif.\n\n## Technologies\n- TypeScript\n- React\n\n## Stars: 2\n\n[Voir sur GitHub](https://github.com/antoninpicard/Portfolio-inner-site)'
                      }
                    }
                  },
                  '42': {
                    name: '42',
                    type: 'directory',
                    children: {
                      '42.md': {
                        name: '42.md',
                        type: 'file',
                        content: '# 42\n\nCe dépôt contient l\'ensemble de mes projets réalisés dans le cadre de ma formation à l\'École 42.\n\n[Voir sur GitHub](https://github.com/antoninpicard/42)'
                      },
                      '42_so_long.md': {
                        name: '42_so_long.md',
                        type: 'file',
                        content: '# 42_so_long\n\nProjet de jeu 2D simple utilisant la bibliothèque graphique minilibx.\n\n## Technologies\n- C\n- minilibx\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_so_long)'
                      },
                      '42_pipex.md': {
                        name: '42_pipex.md',
                        type: 'file',
                        content: '# 42_pipex\n\nImplémentation du mécanisme de pipe UNIX en C.\n\n## Technologies\n- C\n- Processus UNIX\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_pipex)'
                      },
                      '42_libft.md': {
                        name: '42_libft.md',
                        type: 'file',
                        content: '# 42_libft\n\nMa propre bibliothèque de fonctions C.\n\n## Technologies\n- C\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_libft)'
                      },
                      '42_push_swap.md': {
                        name: '42_push_swap.md',
                        type: 'file',
                        content: '# 42_push_swap\n\nA highly efficient number sorting project that implements various sorting algorithms using two stacks.\n\n## Technologies\n- C\n- Algorithmes de tri\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_push_swap)'
                      },
                      '42_get_next_line.md': {
                        name: '42_get_next_line.md',
                        type: 'file',
                        content: '# 42_get_next_line\n\nFonction qui lit une ligne à partir d\'un descripteur de fichier.\n\n## Technologies\n- C\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_get_next_line)'
                      },
                      '42_printf.md': {
                        name: '42_printf.md',
                        type: 'file',
                        content: '# 42_printf\n\nRecréation de la fonction printf de la bibliothèque standard C.\n\n## Technologies\n- C\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_printf)'
                      },
                      '42_Minishell.md': {
                        name: '42_Minishell.md',
                        type: 'file',
                        content: '# 42_Minishell\n\nUne la création d\'un shell Unix avec gestion des commandes, variables d\'environnement, pipes et redirections.\n\n## Technologies\n- C\n- minilibx\n\n[Voir sur GitHub](https://github.com/Retiks/Minishell)'
                      },
                      '42_philosopher.md': {
                        name: '42_philosopher.md',
                        type: 'file',
                        content: '# 42_Philosopher\n\nSimulation du problème classique des philosophes qui dînent, explorant les concepts de threading et de synchronisation.\n\n## Technologies\n- C\n- Threading\n- Synchronisation\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_philosopher)'
                      },
                      '42_miniRT.md': {
                        name: '42_miniRT.md',
                        type: 'file',
                        content: '# 42_miniRT\n\nUn moteur de ray tracing en C créant des images photoréalistes. Implémente les ombres, réflexions, et différents objets géométriques.\n\n## Technologies\n- C\n- Ray Tracing\n- minilibx\n\n## Note\nUne application de démo interactive est disponible sur le bureau du portfolio !\n\n[Voir sur GitHub](https://github.com/antoninpicard/42_miniRT)'
                      }
                    }
                  },
                  'api': {
                    name: 'api',
                    type: 'directory',
                    children: {
                      'SmileAPI.md': {
                        name: 'SmileAPI.md',
                        type: 'file',
                        content: '# SmileAPI\n\nUne API basique créée avec Express.js en TypeScript ✨ Remplacer {insert_here} par randomphrase ou randomimage.\n\n## Technologies\n- TypeScript\n- Express.js\n- Node.js\n\n## Stars: 4\n\n[Voir sur GitHub](https://github.com/antoninpicard/SmileAPI)'
                      },
                      'blackjackAPI.md': {
                        name: 'blackjackAPI.md',
                        type: 'file',
                        content: '# blackjackAPI\n\nAPI pour jeu de blackjack.\n\n## Technologies\n- JavaScript\n\n## Stars: 4\n\n[Voir sur GitHub](https://github.com/antoninpicard/blackjackAPI)'
                      }
                    }
                  },
                  'apps': {
                    name: 'apps',
                    type: 'directory',
                    children: {
                      'Smile.md': {
                        name: 'Smile.md',
                        type: 'file',
                        content: '# Smile\n\nApp pour Apple Watch qui permet de faire défiler du texte ou une image motivante grâce à une API de ma conception (SmileAPI).\n\n## Technologies\n- Swift\n- WatchKit\n\n## Stars: 5\n\n[Voir sur GitHub](https://github.com/antoninpicard/Smile)'
                      },
                      'Get-it-or-Not.md': {
                        name: 'Get-it-or-Not.md',
                        type: 'file',
                        content: '# Get-it-or-Not\n\nUne application de feedback en temps réel pour la salle de classe permettant aux étudiants d\'indiquer s\'ils comprennent le contenu présenté.\n\n[Voir sur GitHub](https://github.com/antoninpicard/Get-it-or-Not)'
                      },
                      'GreenTripVTC.md': {
                        name: 'GreenTripVTC.md',
                        type: 'file',
                        content: '# GreenTripVTC\n\nApplication pour service de VTC écologique.\n\n[Voir sur GitHub](https://github.com/antoninpicard/GreenTripVTC)'
                      },
                      'Random-password-generator.md': {
                        name: 'Random-password-generator.md',
                        type: 'file',
                        content: '# Random-password-generator\n\nRandPass is a random password generator and manager for all your websites.\n\n## Technologies\n- Python\n\n## Tags\n- python\n- open-source\n- simple\n- password-generator\n- password-manager\n\n## Stars: 1\n\n[Voir sur GitHub](https://github.com/antoninpicard/Random-password-generator)'
                      }
                    }
                  },
                  'games': {
                    name: 'games',
                    type: 'directory',
                    children: {
                      'Circle-Game.md': {
                        name: 'Circle-Game.md',
                        type: 'file',
                        content: '# Circle-Game\n\nJeu basé sur des cercles.\n\n## Stars: 3\n\n[Voir sur GitHub](https://github.com/antoninpicard/Circle-Game)'
                      },
                      'Merry-Christmas.md': {
                        name: 'Merry-Christmas.md',
                        type: 'file',
                        content: '# Merry-Christmas\n\nJe me suis mis au défi de faire plusieurs jeux sur le thème de Noël. 🎄🎁 "DÉFI"\n\n## Stars: 3\n\n[Voir sur GitHub](https://github.com/antoninpicard/Merry-Christmas)'
                      },
                      'Fiesta.md': {
                        name: 'Fiesta.md',
                        type: 'file',
                        content: '# Fiesta\n\nPetit défi en JavaScript en tant qu\'entraînement. "FUN"\n\n## Stars: 4\n\n[Voir sur GitHub](https://github.com/antoninpicard/Fiesta)'
                      }
                    }
                  },
                  'challenges': {
                    name: 'challenges',
                    type: 'directory',
                    children: {
                      'Codewars.md': {
                        name: 'Codewars.md',
                        type: 'file',
                        content: '# Codewars\n\nMes solutions aux défis Codewars.\n\n## Technologies\n- C#\n- JavaScript\n- Python\n- Ruby\n\n## Stars: 16\n\n[Voir sur GitHub](https://github.com/antoninpicard/Codewars)'
                      }
                    }
                  },
                  'README.md': {
                    name: 'README.md',
                    type: 'file',
                    content: '# GitHub Projects\n\nBienvenue dans le répertoire de mes projets GitHub !\n\nCe répertoire contient tous mes projets GitHub organisés par catégories.\n\n## Catégories\n- portfolio : Mes projets de portfolio\n- 42 : Mes projets réalisés à l\'École 42\n- api : Mes projets d\'API\n- apps : Mes applications\n- games : Mes jeux\n- challenges : Mes défis de programmation\n\nUtilisez les commandes `ls` et `cd` pour naviguer dans les répertoires.\nUtilisez la commande `cat` pour afficher le contenu des fichiers.\n\nPour accéder directement à un projet sur GitHub, consultez le lien dans le fichier correspondant.'
                  }
                }
              },
              'projects': {
                name: 'projects',
                type: 'directory',
                children: {
                  'README.md': {
                    name: 'README.md',
                    type: 'file',
                    content: '# Mes Projets\n\n- Développement Web\n- Applications React\n- Émulateur de Terminal'
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  private currentPath: string[] = ['home', 'guest'];

  getCurrentPath(): string {
    return '/' + this.currentPath.join('/');
  }

  getPromptPath(): string {
    if (this.currentPath.length === 2 && this.currentPath[0] === 'home') {
      return '~';
    }
    return this.getCurrentPath();
  }
  
  getLastPathSegment(): string {
    if (this.currentPath.length === 0) {
      return '/';
    }
    if (this.currentPath.length === 2 && this.currentPath[0] === 'home') {
      return 'guest';
    }
    return this.currentPath[this.currentPath.length - 1] || '/';
  }

  private getNodeFromPath(path: string[]): FSNode | null {
    let current = this.root;
    // Make a copy of the path array to avoid modifying the original
    const pathCopy = [...path];
    
    // Process each segment of the path
    for (let i = 0; i < pathCopy.length; i++) {
      const segment = pathCopy[i];
      
      // Skip empty segments or current directory
      if (segment === '' || segment === '.') continue;
      
      // Handle parent directory navigation
      if (segment === '..') {
        // We're already at root, can't go up further
        if (current === this.root) continue;
        
        // Find the parent node by reconstructing the path up to this point
        const parentPath = pathCopy.slice(0, i - 1);
        current = this.getNodeFromPath(parentPath) || this.root;
        continue;
      }
      
      // Navigate to the child node
      if (!current.children?.[segment]) return null;
      current = current.children[segment];
    }
    
    return current;
  }

  private resolvePath(path: string): string[] {
    let segments: string[];
    
    // Handle absolute paths
    if (path.startsWith('/')) {
      segments = path.split('/').filter(Boolean);
    }
    // Handle home directory
    else if (path.startsWith('~')) {
      segments = ['home', 'guest', ...path.slice(2).split('/').filter(Boolean)];
    }
    // Handle relative paths
    else {
      segments = [...this.currentPath];
      
      // Add path segments
      const pathSegments = path.split('/').filter(Boolean);
      for (const segment of pathSegments) {
        if (segment === '.') {
          // Current directory - do nothing
          continue;
        } else if (segment === '..') {
          // Parent directory - remove last segment if not at root
          if (segments.length > 0) {
            segments.pop();
          }
        } else {
          // Regular directory/file - add to path
          segments.push(segment);
        }
      }
    }
    
    return segments;
  }

  cd(path: string): string {
    const targetPath = this.resolvePath(path);
    const targetNode = this.getNodeFromPath(targetPath);

    if (!targetNode) {
      return `cd: répertoire inexistant: ${path}`;
    }
    if (targetNode.type !== 'directory') {
      return `cd: ce n'est pas un répertoire: ${path}`;
    }

    this.currentPath = targetPath;
    return '';
  }

  ls(path?: string): string {
    const targetPath = path ? this.resolvePath(path) : this.currentPath;
    const node = this.getNodeFromPath(targetPath);

    if (!node) {
      return `ls: répertoire inexistant: ${path}`;
    }
    if (node.type !== 'directory') {
      return node.name;
    }

    const entries = Object.values(node.children || {}).map(entry => {
      if (entry.type === 'directory') {
        return entry.name + '/';
      }
      return entry.name;
    });

    return entries.sort().join('\n');
  }

  cat(path: string): string {
    const targetPath = this.resolvePath(path);
    const node = this.getNodeFromPath(targetPath);

    if (!node) {
      return `cat: fichier inexistant: ${path}`;
    }
    if (node.type !== 'file') {
      return `cat: ${path}: C'est un répertoire`;
    }

    return node.content || '';
  }

  pwd(): string {
    return this.getCurrentPath();
  }
  
  // Extrait l'URL GitHub d'un fichier markdown
  extractGitHubUrl(content: string): string | null {
    const urlMatch = content.match(/\[Voir sur GitHub\]\((https:\/\/github\.com\/[^\)]+)\)/);
    return urlMatch ? urlMatch[1] : null;
  }
  
  findNode(fileName: string): FSNode | null {
    // Cherche un fichier dans le répertoire courant
    const currentNode = this.getNodeFromPath(this.currentPath);
    if (!currentNode || currentNode.type !== 'directory' || !currentNode.children) {
      return null;
    }
    
    return currentNode.children[fileName] || null;
  }
  
  executeCommand(command: string, args: string[]): string {
    switch (command) {
      case 'ls':
        return this.ls(args[0]);
      case 'cd':
        return this.cd(args[0] || '');
      case 'cat':
        return this.catFile(args[0]);
      case 'pwd':
        return this.pwd();
      case 'help':
        return 'Commandes disponibles: ls, cd, cat, pwd, github, preview, help\n\n' +
               'ls: Afficher le contenu du répertoire\n' +
               'cd: Changer de répertoire\n' +
               'cat: Afficher le contenu d\'un fichier\n' +
               'pwd: Afficher le chemin du répertoire actuel\n' +
               'github [fichier]: Ouvrir le lien du dépôt GitHub depuis un fichier\n' +
               'preview [fichier]: Prévisualiser un fichier Markdown dans une nouvelle fenêtre\n' +
               'help: Afficher ce message d\'aide';
      case 'preview':
        if (args.length === 0) {
          return 'Utilisation: preview [fichier]\nExemple: preview Portfolio-website-master.md';
        }
        
        const previewFileName = args[0];
        const previewNode = this.findNode(previewFileName);
        
        if (!previewNode || previewNode.type !== 'file') {
          return `Fichier non trouvé: ${previewFileName}`;
        }
        
        if (!previewFileName.toLowerCase().endsWith('.md')) {
          return `Le fichier n'est pas un fichier Markdown: ${previewFileName}`;
        }
        
        // Extraire l'URL GitHub si elle existe
        const previewContent = previewNode.content || '';
        const githubUrl = this.extractGitHubUrl(previewContent);
        
        // Retourne le contenu avec un préfixe spécial pour la prévisualisation
        // et inclut l'URL GitHub si elle existe
        if (githubUrl) {
          return `PREVIEW_MARKDOWN:${previewFileName}:${previewContent}:${githubUrl}`;
        } else {
          return `PREVIEW_MARKDOWN:${previewFileName}:${previewContent}`;
        }
      case 'github':
        if (args.length === 0) {
          return 'Utilisation: github [fichier]\nExemple: github Portfolio-website-master.md';
        }
        
        const fileName = args[0];
        const node = this.findNode(fileName);
        
        if (!node || node.type !== 'file') {
          return `Fichier non trouvé: ${fileName}`;
        }
        
        const content = node.content || '';
        const repoUrl = this.extractGitHubUrl(content);
        
        if (!repoUrl) {
          return `Aucune URL GitHub trouvée dans ${fileName}`;
        }
        
        // Retourne l'URL avec un préfixe spécial que le terminal reconnaîtra
        return `OPEN_URL:${repoUrl}`;
      default:
        return `Commande introuvable: ${command}`;
    }
  }

  catFile(path: string): string {
    if (!path) {
      return 'Utilisation: cat [fichier]';
    }
    return this.cat(path);
  }
  
  getSuggestions(currentPart: string): string[] {
    // Get suggestions for file/directory paths based on current input
    const parts = currentPart.split('/');
    const lastPart = parts.pop() || '';
    
    // Determine the directory to look in
    let searchPath: string[];
    if (currentPart.startsWith('/')) {
      searchPath = parts.filter(Boolean);
    } else if (currentPart.startsWith('~')) {
      searchPath = ['home', 'guest', ...parts.slice(1).filter(Boolean)];
    } else {
      searchPath = [...this.currentPath, ...parts.filter(Boolean)];
    }
    
    // Get the directory node
    const dirNode = this.getNodeFromPath(searchPath);
    if (!dirNode || dirNode.type !== 'directory' || !dirNode.children) {
      return [];
    }
    
    // Filter entries that match the last part
    return Object.keys(dirNode.children)
      .filter(name => name.startsWith(lastPart))
      .map(name => {
        // Reconstruct the path with the suggestion
        const isDir = dirNode.children![name].type === 'directory';
        const suggestion = parts.length > 0 
          ? parts.join('/') + '/' + name + (isDir ? '/' : '')
          : name + (isDir ? '/' : '');
        return suggestion;
      });
  }
}

export const fs = new FileSystem();
