import React, { useState, useRef, useEffect } from 'react';
import Window from '../../os/Window';
import { executeCommand, commands } from './commands';
import { fs } from './filesystem';
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(-1);

  const getCommandSuggestions = (partial: string): string[] => {
    return commands
      .map(cmd => cmd.name)
      .filter(name => name.startsWith(partial.toLowerCase()));
  };

  const getFileAndDirSuggestions = (currentPart: string): string[] => {
    return fs.getSuggestions(currentPart);
  };

  const isCommand = (cmd: string): boolean => {
    return commands.some(c => c.name === cmd.toLowerCase());
  };

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
        .map(cmd => cmd.name)
        .filter(name => name.toLowerCase().startsWith(cmdName))
        .sort((a, b) => {
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
        const command = commands.find(cmd => cmd.name === cmdName);
        return command?.getSuggestions?.(currentPart, parts.slice(1)) || [];
      }
      // Sinon chercher des fichiers/dossiers
      return fs.getSuggestions(currentPart);
    }
    
    // Pour les autres commandes, chercher des suggestions spécifiques
    const command = commands.find(cmd => cmd.name === cmdName);
    if (command?.getSuggestions) {
      return command.getSuggestions(currentPart, parts.slice(1));
    }
    
    return [];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedCommand = command.trim();
      if (trimmedCommand) {
        const output = executeCommand(trimmedCommand);
        if (output === '<<CLEAR>>') {
          setHistory([]);
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!command) return;

      // Obtenir les suggestions basées sur ce qui a été saisi
      const newSuggestions = getSuggestions(command);
      if (newSuggestions.length === 0) return;
      
      // Toujours utiliser la première suggestion
      const currentSuggestion = newSuggestions[0];
      setSuggestions(newSuggestions);
      setSuggestionIndex(0);

      // Appliquer la suggestion
      const { completionType, prefix, hasTrailingSpace } = parseCommand(command);
      
      switch (completionType) {
        case 'command':
          // Pour une commande, ajouter un espace
          setCommand(currentSuggestion + ' ');
          break;
        
        case 'new-arg':
          // Pour un nouvel argument, ajouter la suggestion
          setCommand(command + currentSuggestion);
          break;
        
        case 'arg':
          // Pour un argument en cours, remplacer la partie courante
          const newCommand = prefix + currentSuggestion;
          // Ajouter un espace si c'était le dernier argument
          setCommand(hasTrailingSpace ? newCommand + ' ' : newCommand);
          break;
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

  const handleClick = () => {
    inputRef.current?.focus();
  };

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
                <span>Welcome to Anto's Terminal v1.0.0</span>
              </div>
              <div className="terminal-output"></div>
            </div>
          )}
          {history.length === 0 && (
            <div className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">C:{fs.getLastPathSegment()}{': '}</span>
                <span>Type 'help' for available commands.</span>
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
