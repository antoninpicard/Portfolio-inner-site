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
                    <div style={styles.skillCategory}>
                        <h3>Langages</h3>
                        <p><b>Solide :</b> C, C++, Python, Bash, JavaScript</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Embarqué</h3>
                        <p><b>En cours :</b> STM32 (ARM Cortex-M), ESP32, Arduino (AVR), FreeRTOS</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Systèmes & réseau</h3>
                        <p><b>Solide :</b> TCP/IP, POSIX Threads/Mutex, GPIO</p>
                        <p><b>En cours :</b> I2C, SPI, UART, PWM</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Outils</h3>
                        <p><b>Solide :</b> Git, Linux, GDB, Make, PlatformIO, STM32CubeIDE, Docker</p>
                    </div>
                </div>
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
        gap: 16,
    },
    skillCategory: {
        flex: '1 1 45%',
        minWidth: 200,
        padding: 12,
        border: '1px solid #ccc',
        boxSizing: 'border-box',
        flexDirection: 'column',
    },
};

export default Experience;
