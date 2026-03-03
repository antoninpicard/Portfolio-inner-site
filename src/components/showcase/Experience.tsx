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
                        <h3>Langages </h3>
                        <p> C, C++, Python, Bash, JavaScript</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Microcontrôleurs</h3>
                        <p>STM32 (ARM Cortex-M), ESP32, Arduino (AVR)</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Protocoles & Bus</h3>
                        <p>I2C, SPI, UART, PWM, GPIO, TCP/IP</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Outils</h3>
                        <p>Git, Linux, GDB, Make, PlatformIO, STM32CubeIDE</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Concepts</h3>
                        <p>Hardcore, RTOS, machines à états, interruptions, DMA, gestion mémoire</p>
                    </div>
                    <div style={styles.skillCategory}>
                        <h3>Électronique</h3>
                        <p>Capteurs (IMU, température, pression), actionneurs, oscilloscope, multimètre</p>
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
                        <h3>42 Lyon - Programmation Système C/C++, Architecture Bas Niveau</h3>
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
                            École d'ingénierie par les pairs. La piscine (immersion intensive en C) a posé les bases de ma rigueur en programmation bas niveau. Le tronc commun couvre la programmation système en C, la gestion mémoire, les algorithmes et l'architecture logicielle — des fondamentaux directement applicables aux systèmes embarqués.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>BTS SIO — Réseaux, Protocoles & Systèmes</h3>
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
                            Lycée Saint-Bénigne, Dijon. Formation axée réseaux et protocoles : TCP/IP, routage, administration système, architecture client-serveur. Compétences complémentaires à ma pratique de l'embarqué, notamment sur la communication inter-systèmes et l'infrastructure réseau.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>Bac Pro SN (Marine Nationale)</h3>
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
                            Baccalauréat Professionnel Systèmes Numériques en partenariat avec la Marine Nationale. Formation orientée électronique, systèmes numériques et réseaux. Cette expérience a forgé ma discipline, ma rigueur et ma capacité à travailler sous pression — des qualités que j'applique quotidiennement dans mes projets embarqués.
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
                            <b>Freelance — Développeur & Automatisation (Nov. 2023 - Nov. 2024)</b> : Conception et développement d'applications complètes en autonomie totale. Développement d'outils d'automatisation et intégration de modèles de langage via API. Gestion de projet, relation client et livraison en production.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>ReMarket — Chef de Projet & Développeur (Mai 2023 - Déc. 2023)</b> : En tant qu'associé, j'ai piloté une équipe de trois développeurs pour concevoir un MVP intégrant l'IA. Coordination design, développement et tests utilisateurs. Leadership technique et gestion de projet agile.
                        </p>
                    </li>
                </ul>
                <br />
                <h2>Stages</h2>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>Stage — Développeur Systèmes Embarqués (PME industrielle)</b> : Développement firmware en C sur STM32 pour un système de monitoring de capteurs industriels. Interfaçage I2C/SPI, gestion d'interruptions, et mise en place d'une communication UART vers un superviseur. Tests sur oscilloscope et validation hardware.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage — Administrateur Réseau</b> : Configuration et maintenance d'infrastructures réseau. Analyse de trafic, routage, et diagnostic de pannes — compétences directement transférables à la communication embarquée.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage — Marine Nationale</b> : Discipline, rigueur opérationnelle et travail en équipe sous contraintes. Valeurs appliquées quotidiennement dans mes projets techniques.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage — Développeur Web (Imprimerie)</b> : Premier projet professionnel en autonomie. Expérience qui a confirmé mon orientation vers les systèmes et le bas niveau.
                        </p>
                    </li>
                </ul>
                <br />
                <h2>Autre</h2>
                <br />
                <ul>
                    <li>
                        <p>
                            <b>CABAIA — Vendeur, CDI temps partiel (Nov. 2023 - En cours)</b> : Développement du sens du travail d'équipe et de la communication — qualités essentielles pour collaborer sur des projets techniques.
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
