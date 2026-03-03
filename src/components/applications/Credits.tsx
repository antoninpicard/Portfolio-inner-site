import React, { useEffect, useState, useCallback, useRef } from 'react';
import Window from '../os/Window';
import { useInterval } from 'usehooks-ts';
import { motion } from 'framer-motion';
import './Credits.css';

interface FloatingWord {
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    fontSize: number;
    color: string;
    opacity: number;
}

const WORD_SEQUENCE: Omit<FloatingWord, 'id' | 'x' | 'y' | 'rotation' | 'opacity'>[] = [
    { text: 'The code.',         fontSize: 18, color: '#ffffff' },
    { text: 'The design.',       fontSize: 15, color: '#aaccff' },
    { text: 'The 3D scenes.',    fontSize: 20, color: '#ffffff' },
    { text: 'The sound.',        fontSize: 14, color: '#ffe999' },
    { text: 'The animations.',   fontSize: 16, color: '#c4f0ff' },
    { text: 'The UI.',           fontSize: 22, color: '#ffffff' },
    { text: 'The terminal.',     fontSize: 13, color: '#7dfca4' },
    { text: 'The file explorer.',fontSize: 12, color: '#ffffff' },
    { text: 'The ray tracing.',  fontSize: 17, color: '#ffd4f0' },
    { text: 'The easter eggs.',  fontSize: 11, color: '#ff9ebd' },
    { text: 'Really everything.',fontSize: 28, color: '#ffffff' },
    { text: 'Alone.',            fontSize: 32, color: '#cccccc' },
    { text: 'Yes, even this.',   fontSize: 11, color: '#777777' },
    { text: 'ALL OF IT.',        fontSize: 42, color: '#ff3333' },
];

let globalFloatingWords: FloatingWord[] = [];
let globalAllStep = 0;
let globalWordId = 0;

export interface CreditsProps extends WindowAppProps {}

const CREDITS = [
    {
        title: 'Création & Design',
        rows: [['Antonin Picard', 'All']],
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

const Credits: React.FC<CreditsProps> = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [time, setTime] = useState(0);
    const [isPageLocked] = useState(false);
    const [isHoveredAll, setIsHoveredAll] = useState(false);
    const [floatingWords, setFloatingWords] = useState<FloatingWord[]>(globalFloatingWords);
    const allStep = useRef(globalAllStep);
    const wordIdRef = useRef(globalWordId);

    const spawnWord = useCallback((wordDef: Omit<FloatingWord, 'id' | 'x' | 'y' | 'rotation' | 'opacity'>) => {
        const id = wordIdRef.current++;
        const x = 3 + Math.random() * 85;
        const y = 3 + Math.random() * 88;
        const rotation = (Math.random() - 0.5) * 24;
        wordDef = { ...wordDef, fontSize: 10 + Math.floor(Math.random() * 15) };
        const newWord = { ...wordDef, id, x, y, rotation, opacity: 1 };
        setFloatingWords(prev => {
            const updated = [...prev, newWord];
            globalFloatingWords = updated;
            return updated;
        });
        globalAllStep = allStep.current;
        globalWordId = wordIdRef.current;
    }, []);

    const handleAllClick = useCallback(() => {
        const step = allStep.current;
        allStep.current++;

        if (step < WORD_SEQUENCE.length) {
            spawnWord(WORD_SEQUENCE[step]);
        } else {
            spawnWord(WORD_SEQUENCE[Math.floor(Math.random() * WORD_SEQUENCE.length)]);
        }
        globalAllStep = allStep.current;
    }, [spawnWord]);

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
            bottomLeftText={'Copyright 2026 Antonin Picard'}
        >
            <div
                onMouseDown={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.dataset.clickable || isPageLocked) return;
                    nextSlide();
                }}
                className="site-page"
                style={styles.credits}
            >
                <h2>Credits</h2>
                <p>antoninpicard.com, 2026</p>
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
                                    <div key={`row-${i}`} style={styles.row}>
                                        {row.map((credit, j) => {
                                        if (credit === 'All') {
                                            return (
                                                <p
                                                    key={j}
                                                    data-clickable="true"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleAllClick();
                                                    }}
                                                    onMouseEnter={() => setIsHoveredAll(true)}
                                                    onMouseLeave={() => setIsHoveredAll(false)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: isHoveredAll ? '#ff0000' : 'inherit',
                                                        transition: 'color 0.3s',
                                                    }}
                                                >
                                                    {credit}
                                                </p>
                                            );
                                        }
                                        if (credit === 'Bruno Simon') {
                                            return (
                                                <p
                                                    key={j}
                                                    data-clickable="true"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        e.preventDefault();
                                                        window.open('https://bruno-simon.com/', '_blank');
                                                    }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffe66d')}
                                                    onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
                                                    style={{
                                                        cursor: 'pointer',
                                                        transition: 'color 0.3s',
                                                    }}
                                                >
                                                    {credit}
                                                </p>
                                            );
                                        }
                                        return (
                                            <p key={j}>
                                                {credit}
                                            </p>
                                        );
                                    })}
                                    </div>
                                );
                            })}
                        </motion.div>
                    }
                </div>
                {floatingWords.map(word => (
                    <motion.span
                        key={word.id}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                        style={{
                            position: 'absolute',
                            left: `${word.x}%`,
                            top: `${word.y}%`,
                            transform: `rotate(${word.rotation}deg)`,
                            fontSize: word.fontSize,
                            color: word.color,
                            fontWeight: 'bold',
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                            textShadow: `0 0 12px ${word.color}88`,
                            zIndex: 1,
                        }}
                    >
                        {word.text}
                    </motion.span>
                ))}
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
        position: 'relative',
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
