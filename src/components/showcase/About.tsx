import React from 'react';
import me from '../../assets/pictures/workingAtComputer.jpg';
import meNow from '../../assets/pictures/currentme.jpg';
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
                <p>
                    In 2017, I got accepted into Rennselear Polytechnic
                    Institute to study Computer Science. It was my first choice
                    and I was absolutely ecstatic to be going to such a great
                    university. At the end of my sophomore year, I got an
                    internship working for the startup Hover, primarily focusing
                    on frontend work. I continued to work at Hover on and off
                    for about a year and a half, until the start of my senior
                    year when I decided to focus on other opportunities.
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
                        <h3>My Hobbies</h3>
                        <br />
                        <p>
                            Beyond software, I have a lot of hobbies that I
                            enjoy doing in my free time. The more tangible
                            hobbies I have are{' '}
                            <Link to="/projects/music">Music Production</Link>{' '}
                            and creating{' '}
                            <Link to="/projects/art">Digital Art</Link>. You can
                            read more about each of these on their respective
                            pages under my projects tab. Some other hobbies I
                            enjoy are working out, cooking, and (unsurprisingly)
                            playing video games.
                        </p>
                        <br />
                        <p>
                            In college, I was an active member in the fraternity
                            Sigma Alpha Epsilon and held multiple positions in
                            the chapter. I met a lot of amazing people through
                            my fraternity and thoroughly enjoyed the community.
                        </p>
                    </div>
                    <div style={styles.verticalImage}>
                        <img src={meNow} style={styles.image} alt="" />
                        <p>
                            <sub>
                                <b>Figure 2:</b> Me, April 2022
                            </sub>
                        </p>
                    </div>
                </div>
                <br />
                <br />
                <p>
                    Thanks for reading about me! I hope that you enjoy exploring
                    the rest of my portfolio website and everything it has to
                    offer. If you find the easter egg make sure to let me know
                    on twitter{' '}
                    <a
                        rel="noreferrer"
                        target="_blank"
                        href="https://twitter.com/henryheffernan"
                    >
                        @henryheffernan
                    </a>{' '}
                    Good luck and have fun!
                </p>
                <br />
                <p>
                    Si vous avez des questions j'aimerais les entendre. Vous pouvez me les poser ici{' '}
                    <Link to="/contact">contact page</Link> ou m'envoie un mail à{' '}
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
