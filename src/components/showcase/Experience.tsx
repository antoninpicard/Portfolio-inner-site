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
                        Depuis toujours passionné par la programmation, les réseaux, la cybersécurité et les technologies en général, j'ai choisi de suivre un baccalauréat en Systèmes Numériques (SN) en partenariat avec la Marine nationale pour approfondir mes connaissances et développer mes compétences dans ces domaines fascinants.
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
                        Trois ans après mon baccalauréat, j'ai choisi de poursuivre un BTS SIO, m'immergeant dans les systèmes et les technologies qui façonnent notre monde. J'ai exploré les rouages de la cybersécurité, étudié les subtilités du développement logiciel, et même touché à l'intelligence artificielle, avec une volonté constante de comprendre le fonctionnement de ces technologies. Ce parcours m'a permis de développer une vision globale des outils numériques et de leur fonctionnement.                        </p>
                    </li>
                    
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>42 Lyon</h3>
                        <b>
                            <p>2024 ~ ...</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                        Après ce parcours enrichissant, j'ai récemment relevé le défi de la piscine de 42 Lyon, une épreuve intense qui met à l’épreuve la détermination et les compétences des étudiants en programmation. Fraîchement intégré, je suis actuellement dans le tronc commun, où j'acquiers une base solide tout en me préparant à me spécialiser dans mes domaines de prédilection, comme la cybersécurité, le développement, et bien plus encore, avec l'objectif de devenir excellent dans ces disciplines.
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
                    J'ai effectué divers stages, mais j'ai choisi de ne mentionner ici que les plus anciens, ceux qui ont transformé ce qui n'était au départ qu'une passion en une véritable ambition.
                </p>
                <br />
                <br />
                <ul>
                    <li>
                        <p>
                            Stage aux côtés d'un administrateur réseau, qui m'a permis de saisir en profondeur le fonctionnement et la structure des réseaux.
                        </p>
                    </li>
                    <li>
                        <p>
                            Stage au sein de la Marine Nationale, où j'ai appris l'importance de la discipline et de la cohésion de groupe.
                        </p>
                    </li>
                    <li>
                        <p>
                            Stage auprès d'un webmaster, qui m'a initié au webdesign et m'a permis d'approfondir mes connaissances en création de sites et de sont backend.
                        </p>
                    </li>
                    <li>
                        <p>
                            Réalisation d'un site web pour une imprimerie, mon premier projet professionnel en autonomie. Bien que le site ne soit plus en ligne, cette expérience a marqué un tournant dans mon parcours. Malgré mes compétences en développement web, je ne compte en faire qu'occasionnellement, car mes ambitions sont orientées vers des domaines plus vastes comme la cybersécurité et le développement logiciel.
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
