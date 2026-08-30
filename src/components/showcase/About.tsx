import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme1.jpg';
import mePro from '../../assets/pictures/currentme3.jpg';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';
import useIsMobile from '../../hooks/useIsMobile';
import './About.css';

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    const isMobile = useIsMobile();

    return (
        // add on resize listener
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <div style={{ ...styles.headerSection, flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ ...styles.headerText, flex: isMobile ? 'unset' : '0 0 40%' }}>
                    <h1 style={{ marginLeft: -16, fontSize: 72 }}>Bienvenue</h1>
                    <h3 style={{ fontSize: 28, marginTop: 24 }}>Je suis Antonin Picard</h3>
                </div>
                <div style={{ ...styles.proImageWrapper, marginLeft: isMobile ? 0 : 140, marginTop: isMobile ? 16 : 0, width: isMobile ? '100%' : 260, flex: isMobile ? 'unset' : '0 0 260px' }}>
                    <img src={mePro} style={styles.proImage} alt="Antonin Picard" />
                </div>
            </div>
            <div className="text-block">
                <p>
                    Je code depuis mes 13 ans. Mon premier vrai projet a été un serveur Garry's Mod que j'administrais et pour lequel j'écrivais mes propres scripts — la première fois que j'ai eu envie de comprendre comment un système fonctionne pour pouvoir le construire moi-même. Cette curiosité ne m'a jamais quittée.
                </p>
                <br />
                <p>
                    N'hésitez pas à explorer ce portfolio interactif. Pour toute question,
                    contactez-moi via{' '}
                    <Link to="/contact">le formulaire</Link> ou par mail à{' '}
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
                    Je poursuis aujourd'hui ma formation à l'École 42 Lyon, en tronc commun : pas de cours magistraux, les projets sont validés entre pairs (peer-review), sur du C et du C++ bas niveau — gestion mémoire manuelle, programmation système, algorithmes, architecture logicielle. Webserv (serveur HTTP en C++98), Inception (infrastructure Docker) ou miniRT (ray tracer) en sont les preuves concrètes.
                </p>

                <br />
                <div className="captioned-image">
                    <img src={me} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Image 1:</b> Vraie photo de moi pendant que je développe ce site :)
                        </sub>
                    </p>
                </div>

                <p>
                    Avant 42, j'ai suivi un Bac Pro Systèmes Numériques en partenariat avec la Marine nationale (Saint-Mandrier), qui m'a apporté une rigueur que j'applique aujourd'hui à l'ingénierie logicielle, puis un BTS SIO à Dijon, axé réseaux et protocoles. Je m'oriente vers les systèmes embarqués : C/C++, STM32, FreeRTOS, Linux embarqué. STM32-Satellite-Sim — un firmware FreeRTOS multi-tâches avec capteurs I2C/SPI et station au sol ESP32 — est le point de départ de cette spécialisation. Je recherche un stage pour 2027 en Rhône-Alpes (Lyon, Grenoble), avec l'objectif de le poursuivre en alternance.
                </p>
                <br />
                <p>
                    Certains de ces projets sont visibles sur ma page <Link to="/projects/software">Projets IT</Link>.
                </p>

                <br />
                <div style={{ flexDirection: isMobile ? 'column' : 'row' }}>
                    <div
                        style={{
                            flex: isMobile ? 'unset' : 1,
                            minWidth: 0,
                            textAlign: 'justify',
                            alignSelf: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <h3>Mes Loisirs</h3>
                        <p>
                            En dehors du code, je me passionne pour la <Link to="/projects/music">musique</Link>, les jeux vidéo que j'explore autant en joueur qu'en créateur mais aussi pour la cuisine et la moto. <br />
                            Ces hobbies nourrissent ma créativité autant que mes projets techniques, et m'aident à garder un esprit ouvert et curieux.
                        </p>

                    </div>
                    <div
                        style={{
                            ...styles.verticalImage,
                            marginLeft: isMobile ? 0 : 32,
                            marginTop: isMobile ? 16 : 0,
                            width: isMobile ? '100%' : undefined,
                            flex: isMobile ? 'unset' : 0.8,
                        }}
                    >
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Image 2:</b> Moi, Mai 2026
                            </sub>
                        </p>
                    </div>
                </div>


                <br />
                <p>
                    Si vous avez des questions, j'aimerais les entendre. Vous pouvez me les poser{' '}
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
    headerSection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 0,
        marginBottom: 24,
        overflow: 'visible',
    },
    headerText: {
        flex: '0 0 40%',
        display: 'flex',
        flexDirection: 'column',
    },
    proImageWrapper: {
        flex: '0 0 260px',
        width: 260,
        marginLeft: 140,
    },
    proImage: {
        width: '100%',
        height: 'auto',
        borderRadius: 4,
        objectFit: 'cover',
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
