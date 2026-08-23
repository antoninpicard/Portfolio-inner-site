import React from 'react';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

import computer from '../../../assets/pictures/projects/software/computer.mp4';
import stud from '../../../assets/pictures/projects/software/42.png';

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Projets IT</h1>
            <h3>Systèmes Embarqués, Bas Niveau & Infrastructure</h3>
            <br />
            <p>
                Voici une sélection de mes projets techniques, orientés systèmes embarqués et programmation bas niveau. Chaque projet est conçu autour de contraintes réelles : ressources limitées, temps réel, fiabilité.
            </p>
            <br />
            <ResumeDownload />
            <br />

            {/* Projet 1: Simulateur satellite STM32 */}
            <div className="text-block">
                <h2>Simulateur satellite — STM32 / FreeRTOS</h2>
                <br />
                <p>
                    Simulateur temps réel d'un CubeSat sur Nucleo-F446RE, station au sol ESP32 avec dashboard WiFi. Reproduit à petite échelle l'architecture logicielle d'un satellite réel : plusieurs sous-systèmes concurrents avec leur propre cadence d'acquisition, un bus de données partagé, une gestion d'alarmes et un enregistrement de télémétrie, avec une liaison vers une station au sol.
                </p>
                <br />
                <h3>Ce qui a été construit :</h3>
                <ul>
                    <li><p>Firmware STM32 sous FreeRTOS : 7 tâches concurrentes (IMU, baromètre, alarmes, affichage OLED, télémétrie, liaison ESP32, log SD) synchronisées par mutex.</p></li>
                    <li><p>Acquisition IMU (MPU-6050) et baromètre (BMP280) via bus I2C partagé.</p></li>
                    <li><p>Enregistrement des données capteurs en paquets binaires de 48 octets sur carte SD (boîte noire), bus SPI.</p></li>
                    <li><p>Navigation 5 écrans OLED (SSD1306) au joystick, protocole de commandes texte STM32 ↔ ESP32 via UART à 115200 bauds.</p></li>
                    <li><p>Station au sol ESP32 : point d'accès WiFi, dashboard web temps réel en WebSocket, relais de commandes vers le STM32.</p></li>
                </ul>
                <br />
                <h3>Problèmes résolus :</h3>
                <ul>
                    <li><p>Bus I2C1 partagé entre l'IMU, le baromètre et l'écran OLED : accès concurrent protégé par mutex dédié (mutexI2C).</p></li>
                    <li><p>Cinq modes opérationnels (Nominal / Safe / Science / Error) avec cadences d'acquisition et logique buzzer/LED distinctes par mode.</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>STM32F446RE, FreeRTOS, C, ESP32, I2C, SPI, UART, MPU-6050, BMP280</p>
                <br />
                <p><b>Statut :</b> En pause, reprise prévue (Mars – Avril 2026)</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/STM32-Satellite-Sim">
                            <p><b>[GitHub]</b> - Code source</p>
                        </a>
                    </li>
                </ul>
                <br />
            </div>

            {/* Projet 2: webserv */}
            <div className="text-block">
                <h2>webserv — serveur HTTP/1.1 en C++98</h2>
                <br />
                <p>
                    Serveur HTTP écrit entièrement from scratch, boucle poll() unique non-bloquante, CGI, config nginx-like. Implémenter un serveur HTTP/1.1 conforme, capable de servir un vrai navigateur, sans threads ni I/O bloquante par client.
                </p>
                <br />
                <h3>Ce qui a été construit :</h3>
                <ul>
                    <li><p>Boucle non-bloquante unique via poll() pour tous les sockets (accept/read/write).</p></li>
                    <li><p>Méthodes GET, POST, DELETE, HEAD ; fichiers statiques, listing de répertoire (autoindex), pages d'erreur configurables.</p></li>
                    <li><p>Upload de fichiers avec parsing réel de multipart/form-data.</p></li>
                    <li><p>Exécution CGI (fork/pipe/execve) avec variables d'environnement CGI standard et timeout borné.</p></li>
                    <li><p>Configuration façon nginx : plusieurs server{'{}'} sur un même port, désambiguïsation par Host, virtual hosting.</p></li>
                </ul>
                <br />
                <h3>Problèmes résolus :</h3>
                <ul>
                    <li><p>SIGPIPE non intercepté : un client fermant sa connexion en cours d'écriture terminait le process — signal ignoré explicitement.</p></li>
                    <li><p>Upload multipart/form-data : implémentation du parsing multipart et validation contre client_max_body_size.</p></li>
                    <li><p>Faille de traversée de chemin (path traversal) corrigée par normalisation et validation du chemin résolu.</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>C++98, poll(), fork/exec, HTTP/1.1, CGI</p>
                <br />
                <p><b>Équipe :</b> anpicard, allefran, fdeleard</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_webserv">
                            <p><b>[GitHub]</b> - Code source</p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 3: Inception */}
            <div className="text-block">
                <h2>Inception — infrastructure Docker</h2>
                <br />
                <p>
                    NGINX + WordPress/php-fpm + MariaDB, images buildées from scratch, orchestrées en Compose. Infrastructure multi-services entièrement dockerisée, avec des images buildées depuis une base Debian (aucune image préconstruite Docker Hub), secrets gérés hors Dockerfile.
                </p>
                <br />
                <h3>Ce qui a été construit :</h3>
                <ul>
                    <li><p>NGINX en unique point d'entrée, TLS 1.2/1.3 sur le port 443.</p></li>
                    <li><p>WordPress + php-fpm sans NGINX embarqué côté conteneur applicatif.</p></li>
                    <li><p>MariaDB avec initialisation via secrets Docker (jamais de mot de passe en Dockerfile).</p></li>
                    <li><p>Réseau bridge dédié : résolution par nom de conteneur, aucun port exposé hors 443.</p></li>
                    <li><p>Volumes nommés redirigés vers un chemin hôte contrôlé via driver_opts.</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>Docker, Docker Compose, NGINX, MariaDB, php-fpm, Debian bookworm</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/Inception">
                            <p><b>[GitHub]</b> - Code source</p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 4: miniRT */}
            <div className="text-block">
                <h2>miniRT — moteur de ray tracing en C</h2>
                <br />
                <p>
                    Ray tracer minimaliste : sphères, plans, cylindres, ombrage de Phong, rendu MiniLibX. Génère des images 3D réalistes à partir de fichiers de scène .rt en implémentant le pipeline de ray tracing : intersections rayon/objet, éclairage, ombres — sans bibliothèque de rendu haut niveau.
                </p>
                <br />
                <h3>Ce qui a été construit :</h3>
                <ul>
                    <li><p>Intersections rayon-sphère, rayon-plan, rayon-cylindre (avec caps).</p></li>
                    <li><p>Modèle d'éclairage de Phong : composantes ambiante, diffuse, gestion des ombres.</p></li>
                    <li><p>Caméra configurable (position, orientation, FOV) via fichier de scène.</p></li>
                    <li><p>Parseur de fichiers .rt (format de scène text custom).</p></li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>C, MiniLibX, X11, Mathématiques 3D</p>
                <br />
                <p><b>Équipe :</b> anpicard, Alexlechat</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_miniRT">
                            <p><b>[GitHub]</b> - Code source</p>
                        </a>
                    </li>
                </ul>
                <br />
                <p>
                    <strong>Note :</strong> Une démonstration interactive de miniRT est disponible sur le bureau du portfolio — double-cliquez sur l'icône "miniRT".
                </p>
            </div>

            {/* Projet 5: Fondamentaux 42 */}
            <div className="text-block">
                <h2>Projets fondamentaux — École 42</h2>
                <br />
                <p>
                    Bibliothèque C, algorithmes, concurrence, puis POO en C++ : le socle bas niveau du tronc commun. Reconstruire depuis zéro les fondamentaux d'un environnement Unix, chaque projet validé par peer-review selon la Norme 42.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={stud} alt="École 42 projets" style={styles.stud} />
                </div>
                <h3>Projets réalisés :</h3>
                <ul>
                    <li><strong>Libft</strong> — réimplémentation de fonctions libc : gestion mémoire, chaînes, listes chaînées.</li>
                    <li><strong>Get Next Line</strong> — lecture ligne par ligne via descripteur de fichier, gestion de buffer statique.</li>
                    <li><strong>Printf</strong> — réimplémentation avec parsing de format et gestion des types variadiques.</li>
                    <li><strong>Push Swap</strong> — tri optimisé sur deux piles, minimisation du nombre d'opérations.</li>
                    <li><strong>Pipex / Minishell</strong> — pipes shell en C (fork, exec, redirections) puis shell Unix complet.</li>
                    <li><strong>Philosopher</strong> — problème des philosophes : threads POSIX, mutex, prévention des deadlocks.</li>
                    <li><strong>CPP Modules (CPP00 → CPP09)</strong> — classes et forme canonique, héritage, polymorphisme et exceptions, templates et conteneurs STL.</li>
                </ul>
                <br />
                <h3>Technologies :</h3>
                <p>C, C++98/C++11, Make, POSIX Threads/Mutex, STL, Gestion mémoire manuelle</p>
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
                        <a rel="noreferrer" target="_blank" href="https://github.com/antoninpicard/42_cpp">
                            <p><b>[GitHub]</b> - CPP Modules</p>
                        </a>
                    </li>
                </ul>
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
};

export default Projects;