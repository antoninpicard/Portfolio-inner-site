import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Compétences Techniques</h1>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <div style={styles.skillsGrid}>
                    <div style={styles.skillCategory} className="big-button-container">
                        <h3 style={styles.skillTitle}>Langages</h3>
                        <div style={styles.skillItems}>
                            <span style={styles.skillTagFull}>C</span>
                            <span style={styles.skillTagFull}>C++</span>
                            <span style={styles.skillTagFull}>Python</span>
                            <span style={styles.skillTagFull}>Bash</span>
                            <span style={styles.skillTagFull}>JavaScript</span>
                        </div>
                    </div>
                    <div style={styles.skillCategory} className="big-button-container">
                        <h3 style={styles.skillTitle}>Embarqué</h3>
                        <div style={styles.skillItems}>
                            <span style={styles.skillTagLearning}>STM32 (Cortex-M)</span>
                            <span style={styles.skillTagLearning}>ESP32</span>
                            <span style={styles.skillTagLearning}>Arduino (AVR)</span>
                            <span style={styles.skillTagLearning}>FreeRTOS</span>
                        </div>
                    </div>
                    <div style={styles.skillCategory} className="big-button-container">
                        <h3 style={styles.skillTitle}>Systèmes & réseau</h3>
                        <div style={styles.skillItems}>
                            <span style={styles.skillTagFull}>TCP/IP</span>
                            <span style={styles.skillTagFull}>POSIX Threads</span>
                            <span style={styles.skillTagFull}>GPIO</span>
                            <span style={styles.skillTagLearning}>I2C</span>
                            <span style={styles.skillTagLearning}>SPI</span>
                            <span style={styles.skillTagLearning}>UART</span>
                            <span style={styles.skillTagLearning}>PWM</span>
                        </div>
                    </div>
                    <div style={styles.skillCategory} className="big-button-container">
                        <h3 style={styles.skillTitle}>Outils</h3>
                        <div style={styles.skillItems}>
                            <span style={styles.skillTagFull}>Git</span>
                            <span style={styles.skillTagFull}>Linux</span>
                            <span style={styles.skillTagFull}>GDB</span>
                            <span style={styles.skillTagFull}>Make</span>
                            <span style={styles.skillTagFull}>STM32CubeIDE</span>
                            <span style={styles.skillTagFull}>Docker</span>
                        </div>
                    </div>
                </div>
                <br />
                <p style={styles.legendText}>
                    <span style={styles.legendFull}>&#9608;</span> Solide &nbsp;&nbsp;&nbsp;
                    <span style={styles.legendLearn}>&#9608;</span> En cours d'apprentissage
                </p>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Formation</h1>
                    </div>
                </div>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>École 42 Lyon — tronc commun</h3>
                        <b>
                            <p>2024 ~ En cours</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Écully. Formation par projets, sans cours magistraux : peer-learning, autonomie, validation par peer-review (Norme 42). La Piscine (immersion intensive en C) a posé les bases de rigueur en programmation bas niveau ; le tronc commun couvre la programmation système en C, la gestion mémoire, les algorithmes et l'architecture logicielle.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>BTS SIO — Réseaux, protocoles & systèmes</h3>
                        <b>
                            <p>2021 ~ 2023</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Lycée Saint-Bénigne, Dijon. Formation axée réseaux et protocoles : TCP/IP, routage, administration système, architecture client-serveur.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>Bac Pro Systèmes Numériques — Marine nationale</h3>
                        <b>
                            <p>2018 ~ 2021</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Lycée naval, Saint-Mandrier. Baccalauréat professionnel Systèmes Numériques en partenariat avec la Marine nationale. Formation électronique, systèmes numériques et réseaux, dans un cadre disciplinaire strict (plongeur démineur).
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Expériences</h1>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            <b>Freelance — Développeur & Automatisation (Nov. 2023 - Nov. 2024)</b> : Conception et développement d'applications complètes en autonomie totale. Outils d'automatisation et intégration de modèles de langage via API. Gestion de projet, relation client et livraison en production.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>ReMarket — Chef de projet & développeur (Mai 2023 - Déc. 2023)</b> : Associé, pilotage d'une équipe de trois développeurs pour concevoir un MVP intégrant l'IA. Coordination design, développement et tests utilisateurs.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>CABAIA — Vendeur, CDI temps partiel (Nov. 2023 - Juin 2026)</b> : Travail d'équipe et communication en contexte commercial, en parallèle des études.
                        </p>
                    </li>
                </ul>
                <br />
                <h2>Recherche</h2>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>Stage 2027 — Systèmes embarqués, Rhône-Alpes (Lyon, Grenoble)</b> : C/C++, STM32, FreeRTOS, Linux embarqué. Objectif : poursuivre en alternance.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    skillsGrid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
    },
    skillCategory: {
        flex: '1 1 45%',
        minWidth: 200,
        padding: 12,
        boxSizing: 'border-box',
        flexDirection: 'column',
        cursor: 'default',
    },
    skillTitle: {
        marginBottom: 8,
        fontSize: 16,
    },
    skillItems: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
    },
    skillTagFull: {
        display: 'inline-block',
        padding: '3px 8px',
        fontSize: 14,
        fontFamily: 'Millennium, sans-serif',
        backgroundColor: '#000080',
        color: '#fff',
    },
    skillTagLearning: {
        display: 'inline-block',
        padding: '3px 8px',
        fontSize: 14,
        fontFamily: 'Millennium, sans-serif',
        backgroundColor: '#c0c0c0',
        color: '#000',
        border: '1px solid #808080',
    },
    legendText: {
        fontSize: 14,
        fontFamily: 'Terminal, monospace',
        color: '#000',
    },
    legendFull: {
        color: '#000080',
        fontFamily: 'Terminal, monospace',
    },
    legendLearn: {
        color: '#808080',
        fontFamily: 'Terminal, monospace',
    },
};

export default Experience;
