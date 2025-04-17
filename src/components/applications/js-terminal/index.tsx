import React, { useState, useRef, useEffect } from 'react';
import Window from '../../os/Window';
import { executeCommand } from './commands';
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
            <div className="terminal-welcome">
              C:{'>'}Welcome to React Terminal v1.0.0
              C:{'>'}Type 'help' for available commands.
            </div>
          )}
          {history.map((entry, idx) => (
            <div key={idx} className="terminal-entry">
              <div className="terminal-line">
                <span className="terminal-prompt">C:{'>'}</span>
                {entry.command}
              </div>
              {entry.output && (
                <div className="terminal-output">{entry.output}</div>
              )}
            </div>
          ))}
        </div>
        <div className="terminal-input-line">
          <span className="terminal-prompt">C:{'>'}</span>
          <input
            ref={inputRef}
            className="terminal-input"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <span className="terminal-cursor">_</span>
        </div>
      </div>
    </Window>
  );
};

export default TerminalApp;
