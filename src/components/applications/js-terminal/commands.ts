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
    description: 'List all available commands',
    execute: () => {
      return 'Available commands:\n\n' + commands
        .map(cmd => `${cmd.name.padEnd(12)} - ${cmd.description}`)
        .join('\n');
    }
  },
  {
    name: 'preview',
    description: 'Preview a Markdown file in a new window',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: preview [file]\nExample: preview Portfolio-website-master.md';
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
    description: 'Open GitHub repository from file',
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
    description: 'Clear the terminal screen',
    execute: () => '<<CLEAR>>'
  },
  {
    name: 'ls',
    description: 'List directory contents',
    execute: (args) => fs.ls(args[0])
  },
  {
    name: 'cd',
    description: 'Change directory',
    execute: (args) => {
      if (args.length === 0) {
        return fs.cd('~');
      }
      return fs.cd(args[0]);
    }
  },
  {
    name: 'pwd',
    description: 'Print working directory',
    execute: () => fs.pwd()
  },
  {
    name: 'cat',
    description: 'Display file contents',
    execute: (args) => {
      if (args.length === 0) {
        return 'Usage: cat <filename>';
      }
      return fs.cat(args[0]);
    }
  },
  {
    name: 'echo',
    description: 'Display a message',
    execute: (args) => args.join(' ')
  },
  {
    name: 'date',
    description: 'Display current date and time',
    execute: (args) => {
      if (args[0] === '--help') {
        return 'Usage: date\nDisplay the current date and time.';
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
    description: 'Display current user',
    execute: (args) => {
      if (args[0] === '--help') {
        return 'Usage: whoami\nDisplay the current user name.';
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
    return `Command not found: ${cmdName}\nType 'help' for available commands.`;
  }

  try {
    return command.execute(args);
  } catch (error) {
    return `Error executing ${cmdName}: ${error}`;
  }
};
