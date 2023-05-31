import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Formation</h1>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Baccalauréat Professionnel SN avec la Marine Nationale</h3>
                        <b>
                            <p>2020 ~ 2022</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                        Première approche vers la programmation et réseau.
                        J'ai effectué quelques stages qui m'ont permis de me familiariser
                        avec le monde professionnel.
                        </p>
                    </li>
                    
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>Brevet Technicien Supérieur SIO</h3>
                        <b>
                            <p>2022 ~ 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                        Première année en BTS SIO afin de développer et
                        confirmer mon approche vers la programmation.
                        Développement de mon image professionnelle.
                        </p>
                    </li>
                    
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>DIIAGE à Venir</h3>
                        <b>
                            <p>2022 ~ 2024</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                        Après mon BTS, je me tourne pour l'instant vers le DIIAGE à Dijon.
                        </p>
                    </li>
                    
                </ul>
            </div>
            
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Stage</h1>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    J'ai effectué différents satge mais je n'ai noté que les plus pertinents.
                </p>
                <br />
                <br />
                <ul>
                    <li>
                        <p>
                            Stage avec un administrateur réseau, ce qui ma permis de comprendre le fonctionnementd'un réseau.
                        </p>
                    </li>
                    <li>
                        <p>
                            Stage dans la Marine Nationale, ma appris la discipline et la cohésion.
                        </p>
                    </li>
                    <li>
                        <p>
                            Stage avec un webmaster, ma appris le webdesign et à approfondis mes connéssances sur la création de site.
                        </p>
                    </li>
                    <li>
                        <p>
                             Création d'un site web pour une imprimerie, mon premier projet professionnel en solo. Malheureusement, le site n'est plus en ligne actuellement.
                        </p>
                    </li>
                    
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
