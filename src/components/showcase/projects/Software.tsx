import React from 'react';
import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

// Imports des assets (décommentez et ajustez les chemins selon votre structure)
// import getIt from '../../assets/pictures/getitonot.jpg';
// import cyber from '../../assets/pictures/cyberguard.jpg';
import drone from '../../../assets/pictures/projects/software/drone.png';
// import nlp from '../../assets/pictures/nlpbot.jpg';
// import quantum from '../../assets/pictures/quantum.jpg';
import computer from '../../../assets/pictures/projects/software/computer.mp4';
import stud from '../../../assets/pictures/projects/software/42.png';
// import circle from '../../../assets/pictures/projects/software/circle.png';

export interface ProjectsProps {}

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Projets IT</h1>
            <h3>Code, Innovation, Impact</h3>
            <br />
            <p>
                Voici une sélection de mes projets préférés, alliant développement, cybersécurité, robotique, intelligence artificielle et conception 3D. Chaque projet est conçu pour résoudre des problèmes réels avec des technologies de pointe. Plongez dans le code via les repos GitHub ou testez les démos pour voir mes idées en action !
            </p>
            <br />
            <ResumeDownload />
            <br />

            {/* Projet 1: Get-it-or-Not */}
            <div className="text-block">
                <h2>Get-it-or-Not</h2>
                <br />
                <p>
                    Une application de feedback en temps réel pour la salle de classe, permettant aux étudiants d'indiquer s'ils comprennent le cours via une interface intuitive. Les professeurs visualisent les retours instantanément sur un tableau de bord dynamique, avec un chat intégré pour des interactions approfondies.
                </p>
                <br />
                <br />
                <h3>Technologies :</h3>
                <p>React.js, Node.js, Socket.IO, Electron, Express.js, Marked</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Get-it-or-Not"
                        >
                            <p>
                                <b>[GitHub]</b> - Get-it-or-Not Repo
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 2: CyberGuard */}
            <div className="text-block">
                <h2>CyberGuard</h2>
                <br />
                <p>
                    Une plateforme open-source de cybersécurité pour sécuriser les réseaux domestiques. Déployée sur Raspberry Pi, elle utilise des modèles de machine learning pour détecter les intrusions en temps réel et propose une interface web pour monitorer les menaces.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Python, TensorFlow, React.js, Node.js, Raspberry Pi</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Portefolio-Project/tree/main/Projects/CyberGuard"
                        >
                            <p>
                                <b>[GitHub]</b> - CyberGuard Repo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://portefolio-project.vercel.app/Projects/CyberGuard/demo/index.html"
                        >
                            <p>
                                <b>[Demo]</b> - Démo en ligne
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 3: SwarmDrone */}
            <div className="text-block">
                <h2>SwarmDrone</h2>
                <br />
                <p>
                    Un système de contrôle pour une flotte de drones autonomes, basé sur ROS et des algorithmes d'intelligence en essaim. Les drones collaborent pour cartographier des environnements en 3D, avec une interface React pour le pilotage et la visualisation.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={drone} alt="SwarmDrone interface" style={styles.drone} />
                    
                </div>
                <br />
                <h3>Technologies :</h3>
                <p>ROS, Python, React.js, Three.js, WebSocket</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Portefolio-Project/tree/main/Projects/SwarmDrone"
                        >
                            <p>
                                <b>[GitHub]</b> - SwarmDrone Repo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://portefolio-project.vercel.app/Projects/SwarmDrone/demo/index.html"
                        >
                            <p>
                                <b>[Demo]</b> - Simulateur en ligne
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 4: NLP Assistant */}
            <div className="text-block">
                <h2>NLP Assistant</h2>
                <br />
                <p>
                    Un assistant vocal local exploitant le traitement du langage naturel (NLP) pour automatiser des tâches et répondre aux commandes vocales. Conçu pour fonctionner hors ligne avec un modèle lightweight optimisé pour les appareils à faible puissance.
                </p>
                <br />
                <br />
                <h3>Technologies :</h3>
                <p>Python, PyTorch, React Native, WebRTC</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Portefolio-Project/tree/main/Projects/NLP-Assistant"
                        >
                            <p>
                                <b>[GitHub]</b> - QuantumSandbox Repo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://portefolio-project.vercel.app/Projects/NLP-Assistant/demo/index.html"
                        >
                            <p>
                                <b>[Demo]</b> - Simulateur en ligne
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            {/* Projet 5: QuantumSandbox */}
            <div className="text-block">
                <h2>QuantumSandbox</h2>
                <br />
                <p>
                    Une plateforme éducative pour simuler des algorithmes quantiques dans le navigateur. Construite avec Qiskit et WebAssembly, elle permet aux utilisateurs d'expérimenter avec des circuits quantiques via une interface visuelle interactive.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Qiskit, WebAssembly, React.js, D3.js</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Portefolio-Project/tree/main/Projects/QuantumSandbox"
                        >
                            <p>
                                <b>[GitHub]</b> - QuantumSandbox Repo
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://portefolio-project.vercel.app/Projects/QuantumSandbox/demo/index.html"
                        >
                            <p>
                                <b>[Demo]</b> - Simulateur en ligne
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
			{/* Projet: 42 Projects */}
			<div className="text-block">
			    <h2>42 Projects - École 42</h2>
			    <br />
			    <p>
			        Collection de projets réalisés à l'École 42, couvrant les fondamentaux de la programmation en C, 
			        la gestion mémoire, les algorithmes, les processus système et la programmation concurrente. 
			        Chaque projet suit la Norme de 42 et a été validé selon les critères d'évaluation rigoureux de l'école.
			    </p>
			    <br />
				<div className="captioned-image">
                    <img src={stud} alt="SwarmDrone interface" style={styles.stud} />
                    
                </div>
			    <h3>Projets réalisés :</h3>
			    <ul>
			        <li><strong>Libft</strong> - Bibliothèque de fonctions C personnalisée recréant les fonctions standards de la libc</li>
			        <li><strong>Get Next Line</strong> - Fonction de lecture ligne par ligne depuis un descripteur de fichier</li>
			        <li><strong>Printf</strong> - Réimplémentation complète de la fonction printf de la libc</li>
			        <li><strong>Push Swap</strong> - Algorithme de tri optimisé utilisant deux piles avec opérations limitées</li>
			        <li><strong>Pipex</strong> - Reproduction du comportement des pipes shell (|) en C</li>
			        <li><strong>So Long</strong> - Jeu 2D développé avec la MinilibX, gestion d'événements et graphismes</li>
			        <li><strong>Minishell</strong> - Création d'un shell Unix avec gestion des commandes, variables d'environnement, pipes et redirections</li>
			        <li><strong>Philosopher</strong> - Simulation du problème des philosophes explorant threading et synchronisation</li>
			    </ul>
			    <br />

			    <h3>Technologies :</h3>
			    <p>C, Make, MinilibX, Threads/Mutex, Shell scripting, Algorithmes de tri, Gestion mémoire</p>
			    <br />

			    <h3>Liens :</h3>
			    <ul>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_libft"
			            >
			                <p>
			                    <b>[GitHub]</b> - Libft
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_get_next_line"
			            >
			                <p>
			                    <b>[GitHub]</b> - Get Next Line
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_printf"
			            >
			                <p>
			                    <b>[GitHub]</b> - Printf
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_push_swap"
			            >
			                <p>
			                    <b>[GitHub]</b> - Push Swap
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_pipex"
			            >
			                <p>
			                    <b>[GitHub]</b> - Pipex
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_so_long"
			            >
			                <p>
			                    <b>[GitHub]</b> - So Long
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/Retiks/Minishell"
			            >
			                <p>
			                    <b>[GitHub]</b> - Minishell
			                </p>
			            </a>
			        </li>
			        <li>
			            <a
			                rel="noreferrer"
			                target="_blank"
			                href="https://github.com/antoninpicard/42_philosopher"
			            >
			                <p>
			                    <b>[GitHub]</b> - Philosopher
			                </p>
			            </a>
			        </li>
			    </ul>
			</div>

            {/* Projet 7: antoninpicard.com */}
            <div className="text-block">
                <h2>antoninpicard.com</h2>
                <br />
                <p>
                    Mon portfolio personnel, intégrant un site 3D interactif et un site 2D en React. Le site 3D utilise Three.js pour afficher une scène immersive, avec le site 2D rendu à l'intérieur via une iframe et des transformations CSS 3D pour un effet tridimensionnel.
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Image 2:</b> Scène Blender du site 3D, exportée au format GLTF
                        </sub>
                    </p>
                </div>
                <br />
                <h3>Technologies :</h3>
                <p>React.js, Three.js, Blender, CSS 3D, Vercel</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://antoninpicard.com"
                        >
                            <p>
                                <b>[Site 3D]</b> - antoninpicard.com
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://antoninpicard-inner.vercel.app/"
                        >
                            <p>
                                <b>[Site OS]</b> - antoninpicard-inner.vercel.app
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Portfolio-website-master"
                        >
                            <p>
                                <b>[GitHub]</b> - Repo site 3D
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/portfolio-inner-site"
                        >
                            <p>
                                <b>[GitHub]</b> - Repo Site OS
                            </p>
                        </a>
                    </li>
                </ul>
            </div>

            <ResumeDownload />
        </div>
    );
};

const styles: StyleSheetCSS = {
    video: {
        width: '100%',
        padding: 12,
    },
    drone: {
        width: '65%',  // Taille réduite de l'image
        padding: 12,
        margin: 'auto',
        display: 'block',
    },
    caption: {
        width: '80%',
    },
};

export default Projects;