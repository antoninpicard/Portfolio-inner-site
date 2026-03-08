import React from 'react';



import tacticalBot from '../../../assets/pictures/projects/art/tacticalBot.png';

import neuroArm from '../../../assets/pictures/projects/art/neuroArm.png';



export interface ArtProjectsProps {}



const ArtProjects: React.FC<ArtProjectsProps> = (props) => {

    return (

        <div className="site-page-content">

            <h1>Robotique</h1>

            <h3>Prototypes & Systèmes Embarqués</h3>

            <br />

            <div className="text-block">

                <p>

                    La robotique est pour moi le terrain idéal où convergent électronique, programmation embarquée et mécanique.

                    Je conçois des systèmes autonomes à base de microcontrôleurs, en gérant l'interfaçage de capteurs, le contrôle moteur et la logique temps réel.

                </p>

            </div>



            <div className="text-block">

                <h2>TacticalTrackBot — Robot suiveur de cible autonome</h2>

                <br />

                <p>

                    Robot mobile semi-autonome conçu autour d'un Arduino, capable de détecter et suivre une cible en mouvement grâce à un réseau de capteurs ultrasoniques. 

                    Le système embarque également un servomoteur pour orienter un module factice en direction de la cible, avec activation par commande vocale via un module Bluetooth.

                </p>

                <br />

                <h3>Compétences mises en œuvre :</h3>

                <ul>

                    <li><p>Programmation embarquée C/C++ sur Arduino</p></li>

                    <li><p>Interfaçage capteurs ultrasoniques HC-SR04 (détection + tracking)</p></li>

                    <li><p>Contrôle de servomoteurs via PWM</p></li>

                    <li><p>Communication Bluetooth UART (HC-05) pour commande vocale</p></li>

                    <li><p>Architecture logicielle en machine à états (suivi, attaque, arrêt)</p></li>

                    <li><p>Pilotage de moteurs DC via pont en H L298N</p></li>

                </ul>

                <br />

                <h3>Technologies :</h3>

                <p>Arduino, C/C++, HC-SR04, L298N, HC-05, Servomoteur, UART, PWM</p>

                <br />

                <div className="captioned-image">

                    <img src={tacticalBot} alt="TacticalTrackBot" />

                    <p>

                        <sub>

                            <b>Image 1:</b> TacticalTrackBot — prototype

                        </sub>

                    </p>

                </div>

            </div>



            <div className="text-block">

                <h2>NeuroArm — Bras robotisé à contrôle musculaire (EMG)</h2>

                <br />

                <p>

                    Prototype de bras articulé (3 axes) piloté en temps réel par les signaux électriques des muscles de l'avant-bras via un capteur EMG.

                    Le signal analogique brut est filtré, amplifié puis converti en commandes de servomoteurs, offrant une interface homme-machine naturelle sans aucun bouton.

                </p>

                <br />

                <h3>Compétences mises en œuvre :</h3>

                <ul>

                    <li><p>Acquisition et traitement de signal analogique (EMG)</p></li>

                    <li><p>Filtrage du signal et seuillage pour détection de contraction</p></li>

                    <li><p>Conversion signal → commande moteur en temps réel</p></li>

                    <li><p>Contrôle multi-servomoteurs (3 axes indépendants)</p></li>

                    <li><p>Conception de la structure mécanique articulée</p></li>

                    <li><p>Programmation embarquée C/C++ (Arduino Mega)</p></li>

                </ul>

                <br />

                <h3>Technologies :</h3>

                <p>Arduino Mega, C/C++, Capteur EMG, Servomoteurs, ADC, Traitement du signal</p>

                <br />

                <div className="captioned-image">

                    <img src={neuroArm} alt="NeuroArm" />

                    <p>

                        <sub>

                            <b>Image 2:</b> NeuroArm — bras articulé à contrôle EMG

                        </sub>

                    </p>

                </div>

            </div>

        </div>

    );

};



export default ArtProjects;

