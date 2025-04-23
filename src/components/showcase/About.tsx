import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme1.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>Bienvenue</h1>
            <h3>Je suis Antonin Picard</h3>
            <br />
            <div className="text-block">
				<p>
					Passionné par le développement, la cybersécurité et la robotique, 
					Actuellement étudiant à l'école 42 Lyon, je développe mes compétences à travers des projets concrets, 
					aussi bien en freelance qu'en équipe. 
					Mon objectif : allier technique, innovation et impact réel.
				</p>
                <br />
                <p>
                    Merci de prendre du temps pour regarder mon portfolio.
                    J'espère que vous allez l'aimer. Si vous avez des questions ou des commentaires, vous 
                    pouvez me contacter en utilisant{' '}
                    <Link to="/contact">ce formulaire</Link> ou m'envoyer un mail sur{' '}
                    <a href="mailto:antoninpicard.pro@gmail.com">
                        antoninpicard.pro@gmail.com
                    </a>
                </p>
            </div>
            <ResumeDownload />
            <div className="text-block">
                <h3>À Propos De Moi</h3>
                <br />
	                <p>
						Depuis mon plus jeune âge, j'ai toujours été animé par une profonde curiosité pour comprendre le fonctionnement des systèmes. 
						Cette passion s’est manifestée très tôt à travers les jeux vidéo, notamment Garry's Mod, où, à seulement 13 ans, 
						j'ai développé mon propre serveur, posant ainsi mes premiers pas dans la programmation. 
						Début collège, j’ai découvert la création web et la robotique grâce à un club de technologie, ce qui a confirmé ma volonté d’évoluer dans ce domaine. 
						<br></br>
						<br></br>
						Progressivement, mon intérêt s’est élargi à la cybersécurité, la robotique et de le développement : des domaines où l’exploration, la logique 
						et l’innovation prennent tout leur sens. Aujourd’hui, je poursuis cette passion à travers mes études à l’école 42, 
						mes projets personnels et professionnels, avec un objectif clair : concevoir, sécuriser et améliorer des systèmes complexes.
					</p>

                <br />
                <div className="captioned-image">
                    <img src={me} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Image 1:</b> Vrai photo de moi pendant que je développe ce site :)
                        </sub>
                    </p>
                </div>

                <p>
					Dès l’adolescence, je codais des scripts pour mon serveur Garry’s Mod et automatisais des tâches en Python. <br />
					Rapidement, j’ai conçu mes propres bots, un assistant vocal local avec NLP, 
					et un pare-feu intelligent basé sur Raspberry Pi pour sécuriser mon réseau. <br /><br />
					Passionné de cybersécurité, de robotique et d’IA, je développe aujourd’hui des projets qui allient back-end, 
					architecture réseau et algorithmes avancés. <br />
					Certains de ces projets sont visibles sur ma page <Link to="/projects/software">Projets IT</Link>.
				</p>
            
                <br />
                <div style={{}}>
                    <div
                        style={{
                            flex: 1,
                            textAlign: 'justify',
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <h3>Mes Loisirs</h3>
                        <p>
							En dehors du code, je me passionne pour la <Link to="/projects/music">musique</Link>, les <Link to="/projects/art">jeux vidéo</Link> que j’explore autant en joueur qu’en créateur mais aussi pour la cuisine et la moto. <br />
							Ces hobbies nourrissent ma créativité autant que mes projets techniques, et m’aident à garder un esprit ouvert et curieux.
						</p>
						<br />
						<p>
							Au lycée, j’ai suivi un cursus informatique en partenariat avec la Marine Nationale. <br />
							Cette expérience m’a apporté discipline, rigueur et goût du défi, des qualités que je mets aujourd’hui au service de mes projets tech les plus ambitieux.
						</p>

                    </div>
                    <div style={styles.verticalImage}>
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Image 2:</b> Moi, Avril 2022
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                Merci d'avoir lu à propos de moi ! J'espère que vous apprécierez l'exploration du reste de mon site portfolio et tout ce qu'il a à offrir. Si vous l'aimez, n'hésitez pas à me le faire savoir.{' '}
                    
                    {' '}
                    Bonne chance et have fun!
                </p>
                <br />
                <p>
                    Si vous avez des questions, j'aimerai les entendre. Vous pouvez me les poser{' '}
                    <Link to="/contact">ici</Link> ou m'envoyer un mail à{' '}
                    <a href="mailto:antoninpicard.pro@gmail.com">
                        antoninpicard.pro@gmail.com
                    </a>.
                </p>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        // width: '80%',
        marginLeft: 32,
        flex: 0.8,

        alignItems: 'center',
        // marginBottom: 32,
        textAlign: 'center',
        flexDirection: 'column',
    },
};

export default About;
