import React, { useRef, useEffect } from 'react';
import Window from '../os/Window';
import miniRT from '../../assets/video/miniRT.mp4';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface MiniRT42Props extends WindowAppProps {}

const MiniRT42: React.FC<MiniRT42Props> = (props) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Auto-play la vidéo quand le composant est monté
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error("Erreur lors de la lecture automatique :", error);
            });
        }
    }, []);

    return (
        <Window
            top={50}
            left={100}
            width={800}
            height={550}
            windowTitle="miniRT_42.exe - Ray Tracing Demo"
            windowBarIcon="miniRT"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div style={styles.videoContainer}>
                <video
                    ref={videoRef}
                    style={styles.video}
                    src={miniRT}
                    autoPlay
                    muted={false}
                >
                    Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    videoContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    }
};

export default MiniRT42;
