import React, { useEffect, useState, useCallback } from 'react';
import Window from '../os/Window';
import { useInterval } from 'usehooks-ts';
import { motion } from 'framer-motion';
import './Credits.css';
import nothingGif from '../../assets/gifs/nothing.gif';
import egVideo from '../../assets/gifs/EG.mp4';
import hollImg from '../../assets/gifs/holl.png';

export interface CreditsProps extends WindowAppProps {}

const CREDITS = [
    {
        title: 'Création & Design',
        rows: [['Antonin Picard', 'All'],
               ['Alexandre Lefranc', 'Nothing'],
        ],
    },
    {
        title: 'Sound Design',
        rows: [
            ['Sound Cassette', 'Office Ambience'],
            ['Windows 95 Startup Sound', 'Microsoft'],
        ],
    },
    {
        title: 'Special Thanks',
        rows: [
            ['Bruno Simon', 'Henry Hefferman'],
        ],
    },
    {
        title: 'Inspiration',
        rows: [
            ['Bruno Simon', 'Jesse Zhou'],
            ['Pink Yellow', 'Henry Hefferman'],
        ],
    },
];

// Variable globale pour l'état de l'easter egg, réinitialisée au rafraîchissement
let globalEasterEggState = {
    active: false,
    step: 0,
    firstStrike: true,
    showStrike: false,
    hollImage: false
};

// hollImage persiste uniquement pendant la session (réinitialisé au refresh)

const Credits: React.FC<CreditsProps> = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [time, setTime] = useState(0);
    const [easterEggActive, setEasterEggActive] = useState(globalEasterEggState.active);
    const [easterEggStep, setEasterEggStep] = useState(globalEasterEggState.step);
    const [firstStrike, setFirstStrike] = useState(globalEasterEggState.firstStrike);
    const [showStrike, setShowStrike] = useState(globalEasterEggState.showStrike);
    const [showGif, setShowGif] = useState(false);
    const [showEgVideo, setShowEgVideo] = useState(false);
    const [showEgVisual, setShowEgVisual] = useState(false);
    const [showHollImage, setShowHollImage] = useState(globalEasterEggState.hollImage);
    const [isHovered, setIsHovered] = useState(false);
    const [isPageLocked, setIsPageLocked] = useState(false);

    // every 5 seconds, move to the next slide
    useInterval(() => {
        if (!isPageLocked) {
            setTime(time + 1);
        }
    }, 1000);

    const nextSlide = useCallback(() => {
        setTime(0);
        setCurrentSlide((currentSlide + 1) % CREDITS.length);
    }, [currentSlide]);

    useEffect(() => {
        if (time >= 5) {
            nextSlide();
        }
    }, [time, nextSlide]);

    // Réinitialiser la slide au démarrage
    useEffect(() => {
        setCurrentSlide(0);
        setTime(0);
    }, []);

    // Mettre à jour l'état global
    useEffect(() => {
        globalEasterEggState = {
            active: easterEggActive,
            step: easterEggStep,
            firstStrike,
            showStrike,
            hollImage: showHollImage
        };
    }, [easterEggActive, easterEggStep, firstStrike, showStrike, showHollImage]);

    return (
        // add on resize listener
        <Window
            top={48}
            left={48}
            width={1100}
            height={800}
            windowTitle="Credits"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Copyright 2023 Antonin Picard'}
        >
            <div
                onMouseDown={(e) => {
                    // Ne pas changer de slide si on clique sur Nothing/Nothing? Really? ou si la page est verrouillée
                    const target = e.target as HTMLElement;
                    if (target.textContent === 'Nothing' || target.textContent === 'Nothing ? Really ?' || isPageLocked) {
                        e.preventDefault();
                        return;
                    }
                    nextSlide();
                }}
                className="site-page"
                style={styles.credits}
            >
                <h2>Credits</h2>
                <p>antoninpicard.com, 2023</p>
                <br />
                <br />
                <br />
                <div style={styles.slideContainer}>
                    {
                        <motion.div
                            animate={{ opacity: 1, y: -20 }}
                            transition={{ duration: 0.5 }}
                            key={`section-${CREDITS[currentSlide].title}`}
                            style={styles.section}
                        >
                            <h3 style={styles.sectionTitle}>
                                {CREDITS[currentSlide].title}
                            </h3>
                            {CREDITS[currentSlide].rows.map((row, i) => {
                                return (
                                    <div key={`row-${i}`} style={styles.row} className={(easterEggStep === 2 && showStrike && CREDITS[currentSlide].rows[i][0] === 'Alexandre Lefranc') ? `strike-through ${firstStrike ? '' : 'permanent'}` : ''}>
                                        {row.map((credit, j) => {
                                        return (
                                            <p 
                                                key={j}
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Empêche la propagation du clic
                                                    if (credit === 'Nothing') {
                                                        if (easterEggStep === 0) {
                                                            setEasterEggActive(true);
                                                            setShowGif(true);
                                                            setIsPageLocked(true);
                                                            setTime(0); // Reset le timer
                                                            setEasterEggStep(1);
                                                            setTimeout(() => {
                                                                setShowGif(false);
                                                            }, 3000);
                                                            setTimeout(() => {
                                                                setIsPageLocked(false);
                                                                setTime(0); // Reset le timer quand on débloque
                                                            }, 2000);
                                                        } else if (easterEggStep === 1) {
                                                            setEasterEggStep(2);
                                                            setIsPageLocked(true);
                                                            setShowEgVideo(true);
                                                            setShowEgVisual(true);
                                                            // Cacher visuellement la vidéo après 10s (audio continue)
                                                            setTimeout(() => { setShowEgVisual(false); }, 10000);
                                                            // Attendre 10.5 secondes avant d'afficher holl et lancer la rature
                                                            setTimeout(() => {
                                                                setShowHollImage(true);
                                                                // Attendre 1 seconde avant l'animation de rature
                                                                setTimeout(() => {
                                                                    setShowStrike(true);
                                                                    setTimeout(() => {
                                                                        setFirstStrike(false);
                                                                    }, 1000);
                                                                    setTimeout(() => {
                                                                        setIsPageLocked(false);
                                                                        setTime(0); // Reset le timer
                                                                    }, 2000);
                                                                }, 1000);
                                                            }, 10500);
                                                        }
                                                    }
                                                }}

                                                style={{
                                                    cursor: credit === 'Nothing' ? 'pointer' : 'default',
                                                    color: (credit === 'Nothing' && (easterEggActive || isHovered)) ? '#ff0000' : 'inherit',
                                                    transition: 'color 0.3s'
                                                }}
                                                onMouseEnter={() => {
                                                    if (credit === 'Nothing') {
                                                        setIsHovered(true);
                                                    }
                                                }}
                                                onMouseLeave={() => setIsHovered(false)}

                                            >
                                                {credit === 'Nothing' ? 
                                                    (easterEggStep === 2 ? 'Yes... Nothing' : 
                                                     easterEggStep === 1 ? 'Nothing ? Really ?' : 
                                                     'Nothing')
                                                    : credit}
                                            </p>
                                        );
                                    })}
                                    </div>
                                );
                            })}
                        </motion.div>
                    }
                </div>
                {showGif && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            padding: '20px',
                            borderRadius: '10px'
                        }}
                    >
                        <img src={nothingGif} alt="nothing" style={{ width: '600px', maxWidth: '90vw' }} />
                    </motion.div>
                )}
                {showEgVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: showEgVisual ? 'black' : 'transparent',
                            pointerEvents: showEgVisual ? 'auto' : 'none',
                            zIndex: 9999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <video
                            autoPlay
                            playsInline
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                opacity: showEgVisual ? 1 : 0
                            }}
                        >
                            <source src={egVideo} type="video/mp4" />
                        </video>
                    </motion.div>
                )}
                {showHollImage && (
                    <img
                        src={hollImg}
                        alt="holl"
                        style={{
                            position: 'absolute',
                            top: 40,
                            right: 60,
                            width: '300px',
                            height: 'auto',
                            zIndex: 10001,
                            pointerEvents: 'none'
                        }}
                    />
                )}
                <p>Click to continue...</p>
                <br />
                <div style={styles.nextSlideTimer}>
                    {/* make a time number of dots */}
                    {Array.from(Array(time)).map((i) => {
                        return (
                            <div key={i}>
                                <p>.</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    credits: {
        width: '100%',
        backgroundColor: 'black',
        paddingTop: 64,
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 64,
        color: 'white',
        overflow: 'hidden',
    },
    row: {
        overflow: 'none',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: 600,
        alignSelf: 'center',
    },
    section: {
        overflow: 'none',
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 32,
        opacity: 0,
    },
    sectionTitle: {
        marginBottom: 32,
    },
    slideContainer: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    nextSlideTimer: {
        width: 64,
        height: 32,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
};

export default Credits;
