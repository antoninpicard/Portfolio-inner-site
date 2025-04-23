import React, { useState } from 'react';
// @ts-ignore
import house from '../../../assets/audio/sombrero.mp3';
// @ts-ignore
import dnb from '../../../assets/audio/hugo.mp3';
// @ts-ignore
import cover from '../../../assets/pictures/projects/audio/cover.jpg';
// @ts-ignore
import cover2 from '../../../assets/pictures/projects/audio/whiplash.png';
// @ts-ignore
import whiplash from '../../../assets/audio/Whiplash.mp3';

import houseProject from '../../../assets/pictures/projects/audio/houseProject.png';

import { MusicPlayer } from '../../general';

export interface MusicProjectsProps {}

const MusicProjects: React.FC<MusicProjectsProps> = (props) => {
    const [currentSong, setCurrentSong] = useState<string>('');

    return (
        <div className="site-page-content">
            <h1>Musique</h1>
			<br />
            <h3>Ce que j'écoute</h3>
            <div className="text-block">
                <p>
					La musique a toujours été un moteur pour moi. <br />
					Depuis tout petit, elle m’aide à me concentrer, à me dépasser parfois même à coder plus vite. <br />
					Elle fait partie de mon processus créatif, au même titre que mes projets tech.
                </p>
            </div>
            <h2>Focus Musique</h2>
            <br />
            <p>
				Le morceau que je vous propose, <i>“Sombrero ?”</i>, est une composition originale. <br />
				Derrière son style énergique se cache un outil de focus : rythme soutenu, ambiance électro, idéal pour les sessions de deep work.
            </p>
            <br />
            <p>
				Spoiler : oui, ça fonctionne même à 2h du mat
            </p>
            <br />

            <MusicPlayer
                src={house}
                title="Sombrero ?"
                subtitle="Moi - 2024"
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />

            <br />
            <br />
            <div className="captioned-image">
                <img src={houseProject} alt="Projet musical Sombrero ?" />
                <p>
                    <sub>
                        <b>Image 1:</b> Audio Project " Sombrero ? "
                    </sub>
                </p>
            </div>
            
            <br />
            <h2>Ma Motivation</h2>
            <br />
            <p>
			La bande-son de <a href="https://www.allocine.fr/film/fichefilm_gen_cfilm=225953.html">Whiplash</a> me pousse à viser toujours plus haut. 
			<br />
				Ce film incarne à la perfection : la passion brute, la rigueur extrême et la quête obsessionnelle de l’excellence.
            </p>
            <br />
            <MusicPlayer
                src={whiplash}
                title="Whiplash"
                subtitle="Hank Levy - 2021"
                currentSong={currentSong}
                setCurrentSong={setCurrentSong}
            />
			<br />
			<br />
			<div className="captioned-image">
                <img src={cover2} alt="Projet musical Sombrero ?" />
                <p>
                    <sub>
                        <b>Image 2:</b> Image extrait du film " whiplash "
                    </sub>
                </p>
            </div>
            <br />
            <h2>Enfin le divertissement</h2>
            <br />
            <p>
                Si vous voulez écouter des lyrics sanglantes et un flow à tomber par terre.
                Ce sera un plaisir de vous faire découvrir cette musique.
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
                        <b>Image 3:</b> Cover de l'album Flaque de Samples.
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
