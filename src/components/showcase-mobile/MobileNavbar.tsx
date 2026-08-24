import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import { useLocation } from 'react-router';
import './MobileNavbar.css';

export interface MobileNavbarProps {}

const MobileNavbar: React.FC<MobileNavbarProps> = () => {
    const location = useLocation();
    const [isHome, setIsHome] = useState(false);
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsHome(location.pathname === '/');
        setProjectsExpanded(location.pathname.includes('/projects'));
        setMenuOpen(false);
    }, [location.pathname]);

    // Mirrors the desktop VerticalNavbar, which also hides itself on the home route.
    if (isHome) {
        return <></>;
    }

    return (
        <div className="mobile-navbar">
            <div className="mobile-navbar-bar">
                <h3 className="mobile-navbar-title">Antonin Picard</h3>
                <div
                    className="big-button-container mobile-navbar-toggle"
                    onMouseDown={() => setMenuOpen((open) => !open)}
                >
                    <p>{menuOpen ? 'FERMER' : 'MENU'}</p>
                </div>
            </div>
            {menuOpen && (
                <div className="mobile-navbar-menu">
                    <Link containerStyle={styles.link} to="" text="ACCUEIL" />
                    <Link
                        containerStyle={styles.link}
                        to="about"
                        text="À PROPOS"
                    />
                    <Link
                        containerStyle={styles.link}
                        to="experience"
                        text="EXPERIENCES"
                    />
                    <Link
                        containerStyle={styles.link}
                        to="projects"
                        text="PROJETS & HOBBIES"
                    />
                    {projectsExpanded && (
                        <div className="mobile-navbar-inset">
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/software"
                                text="IT"
                            />
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/labs"
                                text="LABS"
                            />
                            <Link
                                containerStyle={styles.insetLink}
                                to="projects/music"
                                text="MUSIQUE"
                            />
                        </div>
                    )}
                    <Link
                        containerStyle={styles.link}
                        to="contact"
                        text="CONTACT"
                    />
                </div>
            )}
        </div>
    );
};

const styles: StyleSheetCSS = {
    link: {
        padding: '12px 0',
    },
    insetLink: {
        padding: '8px 0',
        marginLeft: 16,
    },
};

export default MobileNavbar;
