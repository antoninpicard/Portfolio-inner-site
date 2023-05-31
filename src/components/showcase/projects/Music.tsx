import React, { useState } from 'react';
// @ts-ignore
import house from '../../../assets/audio/agressive_phonk.mp3';
// @ts-ignore
import edge from '../../../assets/audio/edge.mp3';
// @ts-ignore
import dnb from '../../../assets/audio/hugo.mp3';
// @ts-ignore
import cover from '../../../assets/pictures/projects/audio/cover.jpg';

import houseProject from '../../../assets/pictures/projects/audio/houseProject.png';

import { MusicPlayer } from '../../general';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    const [currentSong, setCurrentSong] = useState<string>('');

    return (
        <div className="site-page-content">
            <h1>Musique</h1>
            <h3>Ce que j'écoute</h3>
            <br />
            <div className="text-block">
                <p>
                    Depuis petit j'écoute de la musique, 
                    cela me permet de me détendre et d'être plus productif.
                    La musique fait partie intégrante de ma vie et c'est pourquoi 
                    je vais vous faire écouter plusieur morceau que j'aime.
                </p>
                <br />
            </div>
            <h2>Focus Musique</h2>
            <br />
            <p>
                 Malgré les aparences, ce style de musique me permet de me concentrer et d'être beaucoup plus rapide et précis.
            </p>
            <br />
            <p>
                Évidement à ne pas écouter trop fort 😂.
            </p>
            <br />

            <MusicPlayer
                src={house}
                title="Aggressive Phonk"
                subtitle="apmtbeat - 2022"
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />

            <br />
            <br />
            <div className="captioned-image">
                <img src={houseProject} alt="" />
                <p>
                    <sub>
                        <b>Image 1:</b> Projet Audio Phonk
                    </sub>
                </p>
            </div>
            
            <br />
            <h2>Plus Joyeux ?</h2>
            <br />
            <p>
                Voici ce classique qui me permet de bien commencé mes journées.
            </p>
            <br />
            <MusicPlayer
                src={edge}
                title="I'm Still Standing"
                subtitle="Elton John - 2010"
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />
            <br />
            
            <br />
            <h2>Enfin le divertissement</h2>
            <br />
            <p>
                Si vous voulez écoutez des lyrics sanglantes et un flow à tombé par terre.
                Ce sera un plaisir de vous faire découvrire cette musique.
            </p>
            
            <br />
            <MusicPlayer
                src={dnb}
                title="2 minutes pour conclure"
                subtitle="HUGO TSR  - 2012"
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />
            <br />
            <div className="captioned-image">
                <img src={cover} alt="" />
                <p>
                    <sub>
                        <b>Image 2:</b> Cover de l'album Flaque de Samples.
                    </sub>
                </p>
            </div>
            <p>
                J'espère que vous avez aimé ma petite sélection de musique.
            </p>
            <br />
            
        </div>
    );
};

// const styles: StyleSheetCSS = {};

export default MusicProjects;
