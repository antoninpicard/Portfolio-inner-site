import React, { useRef, useEffect } from 'react';
import Window from '../os/Window';
import cowboy from '../../assets/video/CowBoy.mp4';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';

export interface BebopProps extends WindowAppProps {}

const Bebop: React.FC<BebopProps> = (props) => {
    // Définir une taille fixe plus petite au lieu d'utiliser useInitialWindowSize
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
            width={800} // Un peu plus grand mais toujours raisonnable
            height={550} // Format conservant approximativement le ratio 16:9
            windowTitle="Bebop - Cowboy Bebop Intro"
            windowBarIcon="VLC"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div style={styles.videoContainer}>
                <video
                    ref={videoRef}
                    style={styles.video}
                    src={cowboy}
                    autoPlay
                    loop
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
        overflow: 'hidden', // Empêche tout débordement
        backgroundColor: '#000',
    },
    video: {
        width: '100%',
        height: '100%',
        objectFit: 'cover', // La vidéo couvre l'intégralité du conteneur
    }
};

export default Bebop;
