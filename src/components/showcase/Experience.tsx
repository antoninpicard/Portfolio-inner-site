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
                    <br />
                    <div style={styles.headerRow}>
                        <h3>42 Lyon - Développeur, Architecture Réseaux, Cybersécurité</h3>
                        <b>
                            <p>2024 ~ En cours</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Actuellement étudiant à 42 Lyon, j’ai relevé le défi de la piscine, une immersion intense qui teste la logique et la persévérance. Dans le tronc commun, j’affine mes compétences en C, Git, et architectures réseaux, tout en me préparant à me spécialiser en cybersécurité et développement. Mon objectif : maîtriser les systèmes complexes et repousser les limites de l’innovation.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>BTS SIO - Option SLAM</h3>
                        <b>
                            <p>2021 ~ 2023</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Après mon Bac Pro, j’ai poursuivi un BTS Services Informatiques aux Organisations (SLAM) au Lycée Saint-Bénigne à Dijon. Ce cursus m’a plongé dans le développement logiciel, les bases de données et les rudiments de la cybersécurité. J’ai appris à concevoir des solutions pragmatiques, posant les fondations de ma passion pour l’innovation technologique.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h3>Bac Pro SN (Marine Nationale)</h3>
                        <b>
                            <p>2018 ~ 2021</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <ul>
                    <li>
                        <p>
                            Fasciné par le code et les systèmes complexes depuis mon plus jeune âge, j’ai intégré un Baccalauréat Professionnel Systèmes Numériques en partenariat avec la Marine Nationale. Cette formation m’a initié aux bases des réseaux et de l’électronique, tout en forgeant ma discipline et ma capacité à travailler sous pression.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Expériences</h1>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Mes expériences, qu’elles soient professionnelles ou personnelles, témoignent de ma capacité à transformer ma passion pour la technologie en solutions concrètes et innovantes.
                </p>
                <br />
                <ul>
                <li>
                        <p>
                            <b>CABAIA - Vendeur, CDI temps partiel (Nov. 2023 - En cours)</b>: Ce rôle m’a permis d’aiguiser ma sociabilité et mon sens du travail d’équipe, des qualités essentielles pour collaborer efficacement sur des projets techniques.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>ReMarket - Développeur Chef de Projet (Mai 2023 - Déc. 2023)</b>: En tant qu’associé, j’ai piloté une équipe de trois développeurs pour créer un MVP intégrant l’IA. J’ai coordonné design, développement, et tests utilisateurs, développant mes compétences en leadership et gestion de projet.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Freelance - Développeur Full-Stack (Nov. 2023 - Nov. 2024)</b>: J’ai conçu des applications web complètes, gérant backend, frontend, et bases de données. J’ai également intégré des solutions d’IA, renforçant ma capacité à créer des systèmes intelligents et performants.
                        </p>
                    </li>
					<br />
                    <h2>Stages</h2>
                    <br />
                    <li>
                        <p>
                            <b>Stage - Développeur Web (Imprimerie)</b>: J’ai réalisé un site web pour une imprimerie, mon premier projet professionnel en autonomie. Bien que le site ne soit plus en ligne, cette expérience a marqué un tournant, confirmant mon ambition de me spécialiser en cybersécurité et développement logiciel plutôt qu’en développement web.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage - Webmaster</b>: Initié au webdesign et au développement backend, j’ai acquis des compétences pratiques en création de sites web, renforçant mon intérêt pour les technologies web.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage - Marine Nationale</b>: Cette expérience m’a enseigné la discipline et l’importance de la cohésion d’équipe, des valeurs que j’applique dans tous mes projets collaboratifs.
                        </p>
                    </li>
                    <li>
                        <p>
                            <b>Stage - Administrateur Réseau</b>: Aux côtés d’un administrateur réseau, j’ai exploré la structure et le fonctionnement des réseaux, développant une compréhension approfondie des infrastructures informatiques.
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
