import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../showcase/Home';
import About from '../showcase/About';
import Window from '../os/Window';
import Experience from '../showcase/Experience';
import Projects from '../showcase/Projects';
import Contact from '../showcase/Contact';
import SoftwareProjects from '../showcase/projects/Software';
import MusicProjects from '../showcase/projects/Music';
import ArtProjects from '../showcase/projects/Art';
import VerticalNavbar from '../showcase/VerticalNavbar';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import WeatherStationDemo from '../showcase/projects/demos/WeatherStationDemo';
import SatelliteDemo from '../showcase/projects/demos/SatelliteDemo';
import RobotDemo from '../showcase/projects/demos/RobotDemo';
import CyberGuardDemo from '../showcase/projects/demos/CyberGuardDemo';

export interface ShowcaseExplorerProps extends WindowAppProps {}

const ShowcaseExplorer: React.FC<ShowcaseExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    return (
        <Window
            top={24}
            left={56}
            width={initWidth}
            height={initHeight}
            windowTitle="Antonin Picard - Portfolio 2026"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2026 Antonin Picard'}
        >
            <Router>
                <div className="site-page">
                    <VerticalNavbar />
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
                        <Route path="/projects/art" element={<ArtProjects />} />
                        <Route path="/projects/demo/weather-station" element={<WeatherStationDemo />} />
                        <Route path="/projects/demo/satellite" element={<SatelliteDemo />} />
                        <Route path="/projects/demo/robot" element={<RobotDemo />} />
                        <Route path="/projects/demo/cyberguard" element={<CyberGuardDemo />} />
                    </Routes>
                </div>
            </Router>
        </Window>
    );
};

export default ShowcaseExplorer;
