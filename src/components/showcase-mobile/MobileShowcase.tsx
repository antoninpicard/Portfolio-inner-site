import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Experience from '../showcase/Experience';
import Projects from '../showcase/Projects';
import Contact from '../showcase/Contact';
import SoftwareProjects from '../showcase/projects/Software';
import MusicProjects from '../showcase/projects/Music';
import LabsProjects from '../showcase/projects/Art';
import MobileNavbar from './MobileNavbar';
import MobileDemoFallback from './MobileDemoFallback';
import './MobileShowcase.css';

export interface MobileShowcaseProps {}

/**
 * Mobile equivalent of ShowcaseExplorer: same pages, no Window/Desktop chrome.
 * The 4 interactive demo routes are intercepted here and show a fallback
 * instead of mounting the (desktop-oriented, potentially heavy) demo components.
 */
const MobileShowcase: React.FC<MobileShowcaseProps> = () => {
    return (
        <Router>
            <div className="mobile-showcase">
                <MobileNavbar />
                <div className="site-page">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/experience" element={<Experience />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route
                            path="/projects/software"
                            element={<SoftwareProjects />}
                        />
                        <Route
                            path="/projects/music"
                            element={<MusicProjects />}
                        />
                        <Route path="/projects/labs" element={<LabsProjects />} />
                        <Route
                            path="/projects/demo/weather-station"
                            element={<MobileDemoFallback />}
                        />
                        <Route
                            path="/projects/demo/satellite"
                            element={<MobileDemoFallback />}
                        />
                        <Route
                            path="/projects/demo/robot"
                            element={<MobileDemoFallback />}
                        />
                        <Route
                            path="/projects/demo/cyberguard"
                            element={<MobileDemoFallback />}
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default MobileShowcase;
