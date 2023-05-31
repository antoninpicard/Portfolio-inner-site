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
                Passionné de programmation depuis toujours, je cherche
                continuellement à me défier et à développer mes
                compétences dans ce milieu. Je prépare actuellement un
                BTS SIO (BAC+2) qui me permet de faire de ma passion mon
                quotidien.
                </p>
                <br />
                <p>
                    Merci de prendre du temps pour regarder mon portfolio. I
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
                     Depuis mon plus jeune âge, j'ai toujours été animé par une curiosité pour comprendre le fonctionnement des choses. J'étais très attiré par les jeux vidéo, notamment Garry's Mod. À l'âge de 13 ans, j'ai développé mon propre serveur Garry's Mod, ce qui a été ma première expérience en programmation. Au collège, j'ai appris, grâce au club de technologie auquel je participais, à créer un site web. J'ai ensuite su que je voulais poursuivre dans cette voie, et j'ai continué au lycée et en études supérieures.
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
                    J'ai commencé la programmation plus sérieusement, en terminal, 
                    j'ai initialement appris comment créer et intéragire avec un site web.
                    J'ai entrepris de nombreux projets passionnants, dont beaucoup avec{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://www.linkedin.com/in/dikra-ben-allel/"
                    >
                        Dikra Ben Allel
                    </a>
                    . Nous avons travaillé sur de nombreux projets ensemble, y compris un logiciel avec ElectronJS, plusieurs projets de jeux, des applications et bien plus encore. Un de ces projets est consultable sur ma page{' '}
                    <Link to="/projects/software">Projets IT</Link>.
                </p>
                <br />
            
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
                        <br />
                        <p>
                            En dehors du domaine du logiciel, j'ai de nombreux hobbies que j'apprécie de pratiquer pendant mon temps libre. Parmi les hobbies plus concrets, j'ai la{' '}
                            <Link to="/projects/music">Musique</Link>{' '}
                            mais aussi les{' '}
                            <Link to="/projects/art">Jeux vidéo</Link>(évidement). Vous pouvez en savoir plus sur chacun d'eux dans leurs pages respectives sous l'onglet "Projets et hobbies" sur mon site. D'autres hobbies que j'apprécie sont la cuisine et la moto.
                        </p>
                        <br />
                        <p>
                            Au lycée, j'ai suivi des études en informatique en partenariat avec la Marine Nationale, ce qui m'a permis d'être beaucoup plus mature et discipliné. Grâce à cela, j'ai rencontré un milieu formidable et beaucoup de personnes qui m'ont aidé.
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
                Merci d'avoir lu à propos de moi ! J'espère que vous apprécierez l'exploration du reste de mon site portfolio et tout ce qu'il a à offrir. Si vous trouvez l'aimez, n'hésitez pas à me le faire savoir.{' '}
                    
                    {' '}
                    Bonne chance et have fun!
                </p>
                <br />
                <p>
                    Si vous avez des questions j'aimerais les entendre. Vous pouvez me les poser ici{' '}
                    <Link to="/contact">Contact</Link> ou m'envoie un mail à{' '}
                    <a href="mailto:antoninpicard.pro@gmail.com">
                        antoninpicard.pro@gmail.com
                    </a>
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
