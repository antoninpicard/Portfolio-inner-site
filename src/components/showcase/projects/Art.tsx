import React from 'react';

import tacticalBot from '../../../assets/pictures/projects/art/tacticalBot.png';
import neuroArm from '../../../assets/pictures/projects/art/neuroArm.png';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Robotique</h1>
            <h3>Quelques projets</h3>
            <br />
            <div className="text-block">
                <p>
                	La robotique est pour moi un terrain de jeu parfait où se rencontrent programmation, mécanique, électronique et IA. <br />
					J’expérimente avec des microcontrôleurs, des capteurs et des algorithmes pour concevoir des systèmes autonomes, réactifs et parfois même imprévisibles. <br />
					<br />Ce domaine me permet de toucher du doigt l’ingénierie au sens large — et de concrétiser des idées qui, parfois, semblaient irréalisables.
                </p>
            </div>
            <div className="text-block">
                <h2>TacticalTrackBot : Robot autonome & simulateur d'engin défensif</h2>
                <br />
                <p>
					TacticalTrackBot est un robot suiveur de cible doté d’un système de tir embarqué (factice), pensé comme une simulation d’un engin mobile semi-autonome de défense. <br />
					En plus de suivre une cible en mouvement grâce à des capteurs de distance, le robot peut engager une action ciblée via un petit canon factice motorisé et une commande vocal.

                </p>
                <br />
                <br />
                <div className="captioned-image">
                    <img src={tacticalBot} alt="" />
                    <p>
                        <sub>
                            <b>Image 1:</b> Reconstitution IA (un peu mieux😂)
                        </sub>
                    </p>
                </div>
                <br />
				<h2>NeuroArm : Contrôle musculaire d’un bras robotisé</h2>
				<br />
                <br />
                <div className="captioned-image">
                    <img src={neuroArm} alt="" />
                    <p>
                        <sub>
                            <b>Image 2:</b> Reconstitution IA
                        </sub>
                    </p>
                </div>
                <p>
                	NeuroArm est un prototype de bras articulé que j’ai conçu pour réagir en temps réel à des contractions musculaires. <br />
					Grâce à un capteur EMG (électromyographie), les signaux électriques générés par les muscles de l’avant-bras sont interprétés 
					pour piloter les différents moteurs du bras. <br /><br />L’objectif ? Offrir une interface homme-machine aussi naturelle qu’intuitive.
                </p>
				<p>
					Ce projet m’a permis de mêler électronique, biomécanique et logique embarquée. <br />
					Il représente pour moi une première étape vers des systèmes plus avancés de prothèses intelligentes et de robotique assistive.
				</p>
                <br />
				<br />
            </div>
        </div>
    );
};

export default ArtProjects;
