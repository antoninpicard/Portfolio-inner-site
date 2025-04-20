import { fs } from './filesystem';

export interface Command {
  name: string;
  description: string;
  execute: (args: string[]) => string;
  getSuggestions?: (currentArg: string, args?: string[]) => string[];
}

export const commands: Command[] = [
  {
    name: 'help',
    description: 'Affiche toutes les commandes disponibles',
    execute: () => {
      return 'Commandes disponibles:\n\n' + commands
        .map(cmd => `${cmd.name.padEnd(12)} - ${cmd.description}`)
        .join('\n');
    }
  },
  {
    name: 'preview',
    description: 'Prévisualiser un fichier Markdown dans une nouvelle fenêtre',
    execute: (args) => {
      if (args.length === 0) {
        return 'Utilisation: preview [fichier]\nExemple: preview Portfolio-website-master.md';
      }
      
      return fs.executeCommand('preview', args);
    },
    getSuggestions: (currentArg, args) => {
      // Si nous avons déjà un argument, suggérer des fichiers Markdown
      if (args && args.length > 0) {
        return [];
      }
      
      // Obtenir tous les fichiers du répertoire courant
      const files = fs.getSuggestions(currentArg || '');
      
      // Filtrer pour ne garder que les fichiers Markdown
      return files.filter(file => file.toLowerCase().endsWith('.md'));
    }
  },
  {
    name: 'github',
    description: 'Ouvrir le dépôt GitHub depuis un fichier',
    execute: (args) => {
      return fs.executeCommand('github', args);
    },
    getSuggestions: (currentArg, args) => {
      // Si nous avons déjà un argument, ne pas suggérer
      if (args && args.length > 0) {
        return [];
      }
      
      // Obtenir tous les fichiers du répertoire courant
      const files = fs.getSuggestions(currentArg || '');
      
      // Filtrer pour ne garder que les fichiers Markdown (qui contiennent généralement les liens GitHub)
      return files.filter(file => file.toLowerCase().endsWith('.md'));
    }
  },
  {
    name: 'clear',
    description: 'Effacer l\'écran du terminal',
    execute: () => '<<CLEAR>>'
  },
  {
    name: 'ls',
    description: 'Afficher le contenu du répertoire',
    execute: (args) => fs.ls(args[0])
  },
  {
    name: 'cd',
    description: 'Changer de répertoire',
    execute: (args) => {
      if (args.length === 0) {
        return fs.cd('~');
      }
      return fs.cd(args[0]);
    }
  },
  {
    name: 'pwd',
    description: 'Afficher le chemin du répertoire actuel',
    execute: () => fs.pwd()
  },
  {
    name: 'cat',
    description: 'Afficher le contenu d\'un fichier',
    execute: (args) => {
      if (args.length === 0) {
        return 'Utilisation: cat <nom_fichier>';
      }
      return fs.cat(args[0]);
    }
  },
  {
    name: 'echo',
    description: 'Afficher un message',
    execute: (args) => args.join(' ')
  },
  {
    name: 'date',
    description: 'Afficher la date et l\'heure actuelles',
    execute: (args) => {
      if (args[0] === '--help') {
        return 'Utilisation: date\nAffiche la date et l\'heure actuelles.';
      }
      return new Date().toLocaleString();
    },
    getSuggestions: (currentArg) => {
      if (currentArg.startsWith('-')) {
        return ['--utc', '--iso', '--help'].filter(flag => flag.startsWith(currentArg));
      }
      return [];
    }
  },
  {
    name: 'whoami',
    description: 'Afficher l\'utilisateur actuel',
    execute: (args) => {
      if (args[0] === '--help') {
        return 'Utilisation: whoami\nAffiche le nom de l\'utilisateur actuel.';
      }
      return 'guest';
    },
    getSuggestions: (currentArg) => {
      if (currentArg.startsWith('-')) {
        return ['--help'].filter(flag => flag.startsWith(currentArg));
      }
      return [];
    }
  }
];

export const executeCommand = (input: string): string => {
  const [cmdName, ...args] = input.trim().split(' ');
  const command = commands.find(cmd => cmd.name === cmdName.toLowerCase());
  
  if (!command) {
    return `Commande introuvable: ${cmdName}\nTapez 'help' pour voir les commandes disponibles.`;
  }

  try {
    return command.execute(args);
  } catch (error) {
    return `Erreur lors de l'exécution de ${cmdName}: ${error}`;
  }
};
