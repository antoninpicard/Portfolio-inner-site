import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation } from 'react-router';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [isHome, setIsHome] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('/projects')) {
            setProjectsExpanded(true);
        } else {
            setProjectsExpanded(false);
        }
        if (location.pathname === '/') {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        return () => {};
    }, [location.pathname]);

    return !isHome ? (
        <div style={styles.navbar}>
            <div style={styles.header}>
                <h1 style={styles.headerText}>Antonin</h1>
                <h1 style={styles.headerText}>Picard</h1>
                <h3 style={styles.headerShowcase}>Portfolio '26</h3>
            </div>
            <div style={styles.links}>
                <Link containerStyle={styles.link} to="" text="ACCUEIL" />
                <Link containerStyle={styles.link} to="about" text="À PROPOS" />
                <Link
                    containerStyle={styles.link}
                    to="experience"
                    text="EXPERIENCES"
                />
                <Link
                    containerStyle={Object.assign(
                        {},
                        styles.link,
                        projectsExpanded && styles.expandedLink
                    )}
                    to="projects"
                    text="PROJETS & HOBBIES"
                />
                {
                    // if current path contains projects
                    projectsExpanded && (
                        <div style={styles.insetLinks}>
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/software"
                                text="IT"
                            />
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/art"
                                text="ROBOTIQUE"
                            />
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/music"
                                text="MUSIQUE"
                            />
                        </div>
                    )
                }
                <Link
                    containerStyle={styles.link}
                    to="contact"
                    text="CONTACT"
                />
            </div>
            <div style={styles.spacer} />
            <a
                href="https://github.com/antoninpicard"
                target="_blank"
                rel="noreferrer"
                style={styles.githubLink}
            >
                <div className="big-button-container" style={styles.githubButton}>
                    GitHub
                </div>
            </a>
        </div>
    ) : (
        <></>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        width: 300,
        height: '100%',
        flexDirection: 'column',
        padding: 48,
        boxSizing: 'border-box',
        position: 'fixed',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 64,
    },
    headerText: {
        fontSize: 38,
        lineHeight: 1,
    },
    headerShowcase: {
        marginTop: 12,
    },
    logo: {
        width: '100%',
        marginBottom: 8,
    },
    link: {
        marginBottom: 32,
    },
    expandedLink: {
        marginBottom: 16,
    },
    insetLinks: {
        flexDirection: 'column',
        marginLeft: 32,
        marginBottom: 16,
    },
    insetLink: {
        marginBottom: 8,
    },
    links: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
    },
    image: {
        width: '80%',
    },
    spacer: {
        flex: 1,
    },
    githubLink: {
        textDecoration: 'none',
        color: 'inherit',
        width: '100%',
    },
    githubButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
    },
};

export default VerticalNavbar;
