import React from 'react';

import girlRun from '../../../assets/pictures/projects/art/elden-ring.jpg';
import gsts from '../../../assets/pictures/projects/art/hollow.jpg';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Jeux Vidéo</h1>
            <h3>PASSION 2</h3>
            <br />
            <div className="text-block">
                <p>
                Bien que j'adore la programmation et le développement de logiciels, les jeux vidéos ont une place spéciale dans mon cœur.
                </p>
                <br />
                <p>
                    Je vais vous présenter quelques jeux que j'adore.
                </p>
            </div>
            <div className="text-block">
                <h2>Elden Ring</h2>
                <br />
                <p>
                    J'adore les jeux complexes et récemment, je suis tombé sur Elden Ring, un jeu incroyablement difficile qui demande beaucoup de patience. Les combats sont épiques, les défis sont nombreux et les zones du jeu sont magnifiques. C'est un véritable chef-d'œuvre du jeu vidéo qui m'a captivé dès les premières minutes. J'ai été fasciné par la richesse de l'univers d'Elden Ring, créé en collaboration entre Hidetaka Miyazaki et George R.R. Martin. Chaque recoin du monde est soigneusement conçu, avec des paysages variés et des détails minutieux. L'exploration de ces environnements immersifs est un plaisir en soi.
                </p>
                <br />
                <p>
                Le jeu exige une grande maîtrise des mécaniques de combat, avec des affrontements intenses contre des ennemis redoutables. Chaque victoire est gratifiante et chaque défaite est une occasion d'apprendre et de s'améliorer. La difficulté du jeu est élevée, mais cela ajoute à son attrait, car chaque défi surmonté procure une véritable sensation de satisfaction.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={girlRun} alt="" />
                    <p>
                        <sub>
                            <b>Image 1:</b> Images elden ring
                        </sub>
                    </p>
                </div>
                <br />
                
                <br />
                <p>
                    Après ce jeu exceptionnelle, je vous présente ✨Hollow Knight✨
                </p>
                <br />
                <div className="captioned-image">
                    <img src={gsts} alt="" />
                    <p>
                        <sub>
                            <b>Image 2:</b> Hollow knight image
                        </sub>
                    </p>
                </div>
                <br />
                <p>
                Hollow Knight est un jeu d'action-aventure en plateforme avec une ambiance sombre et mystérieuse. Vous incarnez un chevalier insecte dans le vaste monde souterrain de Hallownest. Explorez, combattez des ennemis redoutables et résolvez des énigmes tout en découvrant des secrets cachés. Avec son esthétique artistique unique et ses combats exigeants, Hollow Knight offre une expérience immersive et gratifiante.
                </p>
                <br />
                {/* <h3> Screen record time-lapses and make gifs</h3> */}
                <h3>Lien Vidéo:</h3>
                <br />
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://www.youtube.com/watch?v=JldMvQMO_5U&ab_channel=BANDAINAMCOEurope"
                        >
                            <p>
                                <b>VIDEO</b> - ELDEN RING - Gameplay Preview
                            </p>
                        </a>
                    </li>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://www.youtube.com/watch?v=rXMX4YJ7Lks&ab_channel=PlayStation"
                        >
                            <p>
                                <b>VIDEO</b> - SEKIRO, un jeu que je n'ai pas présenté mais qui est tout aussi incroyable.
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ArtProjects;
