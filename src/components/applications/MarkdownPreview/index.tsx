import React from 'react';
import Window from '../../os/Window';
import { marked } from 'marked';
import './markdown-preview.css';
import { IconName } from '../../../assets/icons';

// Définir l'interface WindowAppProps
export interface WindowAppProps {
  onClose: () => void;
  onMinimize: () => void;
  onInteract: () => void;
}

export interface MarkdownPreviewProps extends WindowAppProps {
  fileName: string;
  content: string;
}

const MarkdownPreview: React.FC<MarkdownPreviewProps> = (props) => {
  // Convertir le contenu Markdown en HTML
  const htmlContent = marked.parse(props.content) as string;

  return (
    <Window
      top={150}
      left={250}
      width={600}
      height={400}
      windowTitle={`Prévisualisation de ${props.fileName}`}
      windowBarIcon={"term" as IconName}
      closeWindow={props.onClose}
      onInteract={props.onInteract}
      minimizeWindow={props.onMinimize}
    >
      <div className="markdown-preview-container">
        <div 
          className="markdown-body"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </Window>
  );
};

export default MarkdownPreview;
