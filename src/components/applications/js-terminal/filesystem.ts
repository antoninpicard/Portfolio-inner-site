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
                content: 'Welcome to my terminal!\nType "help" to see available commands.'
              },
              'projects': {
                name: 'projects',
                type: 'directory',
                children: {
                  'README.md': {
                    name: 'README.md',
                    type: 'file',
                    content: '# My Projects\n\n- Web Development\n- React Applications\n- Terminal Emulator'
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
      return `cd: no such directory: ${path}`;
    }
    if (targetNode.type !== 'directory') {
      return `cd: not a directory: ${path}`;
    }

    this.currentPath = targetPath;
    return '';
  }

  ls(path?: string): string {
    const targetPath = path ? this.resolvePath(path) : this.currentPath;
    const node = this.getNodeFromPath(targetPath);

    if (!node) {
      return `ls: no such directory: ${path}`;
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
      return `cat: no such file: ${path}`;
    }
    if (node.type !== 'file') {
      return `cat: ${path}: Is a directory`;
    }

    return node.content || '';
  }

  pwd(): string {
    return this.getCurrentPath();
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
