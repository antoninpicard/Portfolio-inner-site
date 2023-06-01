import React from 'react';
// @ts-ignore
// @ts-ignore
import computer from '../../../assets/pictures/projects/software/computer.mp4';
// @ts-ignore

import ResumeDownload from '../ResumeDownload';
import VideoAsset from '../../general/VideoAsset';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>IT</h1>
            <h3>Projets</h3>
            <br />
            <p>
                Voici quelques-uns de mes projets préférés sur lesquels j'ai travaillé ces dernières années.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>antoninpicard.com</h2>
                <br />
                <p>
                    antoninpicard.com est mon portfolio, et c'est également le site sur lequel vous vous trouvez actuellement. J'ai travaillé sur ce projet tout au long de mon dernier semestre à l'école et si vous lisez ceci, il est pratiquement terminé !
                </p>
                <br />
                <div className="captioned-image">
                    <VideoAsset src={computer} />
                    <p style={styles.caption}>
                        <sub>
                            <b>Image 1:</b> Scène Blender du site 3D.
                            La scène de Blender a été rendue et exportée au format GLTF.
                        </sub>
                    </p>
                </div>
                <p>
                    Maintenant, une brève description technique du site. Le site est divisé en deux parties : le site 3D et le site OS 2D. Le site 3D utilise Three.js pour afficher la scène et afficher le site 2D à l'intérieur en utilisant une balise iframe. Le site OS 2D est un site React simple qui est hébergé{' '}
                    et fonctionne comme une application web autonome. Le rendu réel du site 2D est réalisé à l'aide d'un moteur de rendu CSS fourni par Three.js qui transforme le code HTML du site 2D avec des transformations CSS 3D pour donner l'illusion de la tridimensionnalité.
                </p>
                <br />
                <h3>Liens:</h3>
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
                <p>
                Je passe rapidement sur de nombreux détails pour des raisons de concision, mais, j'ai l'intention de fournir une analyse plus détaillée pour ceux qui sont intéressés à l'avenir.
                </p>
            </div>
            <div className="text-block">
                <h2>BlackJack API</h2>
                <br />
                <p>
                    Site web qui utilise une API pour jouer au BlackJack.
                </p>
                <br />
                <br />
                <h3>Liens:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/blackjackAPI"
                        >
                            <p>
                                <b>[GitHub]</b> - BlackJack API Repo
                            </p>
                        </a>
                    </li>
                    
                </ul>
            </div>
            <div className="text-block">
                <h2>CircleGame</h2>
                <br />
                <p>
                    Un jeu HTML,CSS,JS disponible en extension chrome, en executable, en static, et en React.
                </p>
                <br />
                
                <br />
                <h3>Liens:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://github.com/antoninpicard/Circle-Game"
                        >
                            <p>
                                <b>[GitHub]</b> - CircleGame Repo
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
    caption: {
        width: '80%',
    },
};

export default SoftwareProjects;
