import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

import computer from '../../../assets/pictures/projects/software/computer.mp4';
import stud from '../../../assets/pictures/projects/software/42.png';

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Projets IT</h1>
            <h3>Systèmes Embarqués, Bas Niveau & Robotique</h3>
            <br />
            <p>
                Voici une sélection de mes projets techniques, orientés systèmes embarqués, programmation bas niveau et robotique. Chaque projet est conçu autour de contraintes réelles : ressources limitées, temps réel, fiabilité matérielle.
            </p>
            <br />
            <ResumeDownload />
            <br />

            {/* Projet 1: Station météo ESP32 */}
            <div className="text-block">
                <h2>Station Météo Connectée — ESP32</h2>
                <br />
                <p>
                    Conception d'une station météo autonome à base d'ESP32. Le système acquiert en temps réel des données de température, humidité et pression atmosphérique via des capteurs I2C (DHT22, BMP280), puis les publie sur un broker MQTT. Une interface web locale (serveur HTTP embarqué) permet la visualisation des mesures en direct depuis n'importe quel appareil du réseau.
                </p>
                <br />
                <h3>Compétences mises en œuvre :</h3>
                <ul>
                    <li><p>Programmation embarquée C/C++ (Arduino framework)</p></li>
                    <li><p>Communication I2C — lecture de capteurs DHT22 & BMP280</p></li>
                    <li><p>Stack réseau WiFi + protocole MQTT (publication de trames)</p></li>
                    <li><p>Gestion de l'alimentation et deep sleep pour autonomie batterie</p></li>
                    <li><p>Serveur HTTP embarqué pour dashboard local</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>ESP32, C/C++, Arduino Framework, MQTT, I2C, DHT22, BMP280, PlatformIO</p>
                <br />
                <Link to="/projects/demo/weather-station" style={styles.demoButton}>
                    Voir la simulation
                </Link>
            </div>

            {/* Projet 2: Simulateur de satellite STM32 */}
            <div className="text-block">
                <h2>Simulateur de Satellite — STM32</h2>
                <br />
                <p>
                    Simulation embarquée du comportement d'un nanosatellite (type CubeSat) sur STM32 (série F4). Le système modélise en temps réel la dynamique d'attitude du satellite via des données inertielles (IMU : accéléromètre + gyroscope), calcule les angles de rotation et simule des commandes de correction d'orientation. Les données télémétriques sont transmises via UART pour visualisation et logging sur PC.
                </p>
                <br />
                <h3>Compétences mises en œuvre :</h3>
                <ul>
                    <li><p>Programmation hardecorel C sur STM32 (HAL / registres)</p></li>
                    <li><p>Interfaçage IMU via SPI (accéléromètre + gyroscope)</p></li>
                    <li><p>Implémentation d'un filtre complémentaire pour fusion de données inertielles</p></li>
                    <li><p>Modélisation de la dynamique d'attitude (angles d'Euler, quaternions)</p></li>
                    <li><p>Transmission de télémétrie en temps réel via UART</p></li>
                    <li><p>Gestion des interruptions et timers hardware pour boucle de contrôle</p></li>
                    <li><p>Debugging via ST-Link / STM32CubeIDE</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>STM32F4, C, HAL STM32, SPI, UART, IMU, STM32CubeIDE, ST-Link</p>
                <br />
                <Link to="/projects/demo/satellite" style={styles.demoButton}>
                    Voir la simulation
                </Link>
            </div>

            {/* Projet 3: Robot éviteur d'obstacles Arduino */}
            <div className="text-block">
                <h2>Robot Autonome Éviteur d'Obstacles — Arduino</h2>
                <br />
                <p>
                    Conception et réalisation d'un robot mobile autonome sur châssis 4 roues piloté par un Arduino Mega. Le robot utilise des capteurs ultrasoniques HC-SR04 en façade et sur les côtés pour détecter les obstacles et adapter sa trajectoire en temps réel via une machine à états. La motorisation est assurée par un pont en H L298N, et une interface Bluetooth (HC-05) permet le contrôle manuel depuis smartphone.
                </p>
                <br />
                <h3>Compétences mises en œuvre :</h3>
                <ul>
                    <li><p>Architecture logicielle embarquée : machine à états finis</p></li>
                    <li><p>Interfaçage capteurs ultrasoniques HC-SR04</p></li>
                    <li><p>Pilotage de moteurs DC via pont en H L298N</p></li>
                    <li><p>Communication série Bluetooth (HC-05, protocole UART)</p></li>
                    <li><p>Gestion des interruptions et timing précis</p></li>
                    <li><p>Calibration des algorithmes de navigation</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>Arduino Mega, C/C++, HC-SR04, L298N, HC-05, UART, Machine à états</p>
                <br />
                <Link to="/projects/demo/robot" style={styles.demoButton}>
                    Voir la simulation
                </Link>
            </div>

            {/* Projet: CyberGuard */}
            <div className="text-block">
                <h2>CyberGuard — Pare-feu Intelligent sur Raspberry Pi</h2>
                <br />
                <p>
                    Système de surveillance réseau déployé sur Raspberry Pi agissant comme point d'accès filtrant. Analyse le trafic réseau en temps réel pour détecter les comportements anormaux et bloquer les menaces. Interface web de monitoring accessible en local.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Python, Raspberry Pi, Linux embarqué, iptables, React.js, Node.js</p>
                <br />
                <Link to="/projects/demo/cyberguard" style={styles.demoButton}>
                    Voir la simulation
                </Link>
            </div>

            {/* Projet: 42 Projects */}
            <div className="text-block">
                <h2>Projets École 42 — Programmation Bas Niveau en C</h2>
                <br />
                <p>
                    Collection de projets réalisés à l'École 42, couvrant les fondamentaux indispensables à l'embarqué : gestion mémoire manuelle, programmation système, concurrence et algorithmes optimisés. Chaque projet est validé par peer-review selon la Norme 42.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={stud} alt="École 42 projets" style={styles.stud} />
                </div>
                <h3>Projets réalisés :</h3>
                <ul>
                    <li><strong>Libft</strong> - Bibliothèque C personnalisée (fonctions libc) — gestion mémoire, chaînes, listes</li>
                    <li><strong>Get Next Line</strong> - Lecture ligne par ligne via descripteur de fichier, gestion des buffers</li>
                    <li><strong>Printf</strong> - Réimplémentation de printf — parsing de format, gestion des types variadic</li>
                    <li><strong>Push Swap</strong> - Algorithme de tri optimisé avec deux piles, complexité minimisée</li>
                    <li><strong>Pipex</strong> - Reproduction des pipes shell en C — fork, exec, redirections</li>
                    <li><strong>Minishell</strong> - Shell Unix complet : parsing, variables d'environnement, pipes, redirections</li>
                    <li><strong>Philosopher</strong> - Problème des philosophes : threading POSIX, mutex, gestion des deadlocks</li>
                    <li><strong>miniRT</strong> - Moteur de ray tracing en C : géométrie 3D, ombres, réflexions</li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>C, Make, POSIX Threads/Mutex, gestion mémoire, MinilibX, Shell scripting</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_libft">
                            <p><b>[GitHub]</b> - Libft</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_get_next_line">
                            <p><b>[GitHub]</b> - Get Next Line</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_printf">
                            <p><b>[GitHub]</b> - Printf</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_push_swap">
                            <p><b>[GitHub]</b> - Push Swap</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_pipex">
                            <p><b>[GitHub]</b> - Pipex</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/Retiks/Minishell">
                            <p><b>[GitHub]</b> - Minishell</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_philosopher">
                            <p><b>[GitHub]</b> - Philosopher</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_miniRT">
                            <p><b>[GitHub]</b> - miniRT</p>
                        </a>
                    </li>
                </ul>
                <br />
                <p>
                    <strong>Note :</strong> Une démonstration interactive de miniRT est disponible sur le bureau du portfolio — double-cliquez sur l'icône "miniRT".
                </p>
            </div>

            {/* Projet: antoninpicard.com */}
            <div className="text-block">
                <h2>antoninpicard.com — Portfolio interactif</h2>
                <br />
                <p>
                    Portfolio personnel intégrant un site 3D (Three.js / Blender) avec ce site OS simulé en React à l'intérieur. Démontre des compétences en architecture logicielle, rendu 3D et gestion d'états complexes.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Image :</b> Scène Blender du site 3D, exportée au format GLTF
                        </sub>
                    </p>
                </div>
                <br />
                <h3>Technologies :</h3>
                <p>React.js, Three.js, Blender, TypeScript, Vercel</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://antoninpicard.com">
                            <p><b>[Site 3D]</b> - antoninpicard.com</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/Portfolio-website-master">
                            <p><b>[GitHub]</b> - Repo site 3D</p>
                        </a>
                    </li>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/portfolio-inner-site">
                            <p><b>[GitHub]</b> - Repo Site OS</p>
                        </a>
                    </li>
                </ul>
            </div>

            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    stud: {
        width: '60%',
        padding: 12,
        margin: 'auto',
        display: 'block',
    },
    caption: {
        width: '80%',
    },
    demoButton: {
        display: 'inline-block',
        padding: '10px 24px',
        backgroundColor: '#1a1a2e',
        color: '#4ecdc4',
        border: '2px solid #4ecdc4',
        borderRadius: 4,
        fontWeight: 'bold',
        fontSize: 14,
        textDecoration: 'none',
        cursor: 'pointer',
        textAlign: 'center',
        marginTop: 4,
    },
};

export default Projects;