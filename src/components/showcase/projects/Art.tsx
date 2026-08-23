import React from 'react';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Labs</h1>
            <h3>Expérimentations & Side Projects</h3>
            <br />
            <div className="text-block">
                <p>
                    Cette section regroupe mes expérimentations, prototypes et projets exploratoires — des idées que je teste en dehors de mes projets principaux, souvent pour apprendre une nouvelle techno ou explorer un concept.
                </p>
            </div>

            <div className="text-block">
                <h2>Automatisation Python & Bots</h2>
                <br />
                <p>
                    Scripts d'automatisation développés depuis l'adolescence : bots Discord, scrapers, outils CLI pour simplifier des workflows répétitifs. Premières expériences avec les APIs et la gestion de processus en arrière-plan.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Python, asyncio, APIs REST, Discord.py, BeautifulSoup</p>
            </div>

            <div className="text-block">
                <h2>Assistant vocal local (NLP)</h2>
                <br />
                <p>
                    Prototype d'assistant vocal fonctionnant entièrement en local, sans cloud. Reconnaissance vocale, traitement du langage naturel et exécution de commandes système. Un projet qui m'a initié au traitement du signal audio et au NLP embarqué.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Python, SpeechRecognition, pyttsx3, NLP, Linux</p>
            </div>

            <div className="text-block">
                <h2>Homelab & Self-hosting</h2>
                <br />
                <p>
                    Infrastructure personnelle sur Raspberry Pi et serveur local : reverse proxy, monitoring réseau, services auto-hébergés. Un terrain de jeu pour appliquer mes connaissances réseau et Docker dans un contexte réel.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>Docker, Nginx, Raspberry Pi, Linux, Grafana, Prometheus</p>
            </div>

            <div className="text-block">
                <h2>Challenges & Competitive Programming</h2>
                <br />
                <p>
                    Résolution régulière de katas sur CodeWars (profil actif) et CTFs occasionnels. Exercice de rigueur algorithmique et de résolution de problèmes sous contraintes.
                </p>
                <br />
                <h3>Technologies :</h3>
                <p>C, C++, Python, Algorithmes, Structures de données</p>
                <br />
                <h3>Liens :</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://www.codewars.com/users/antoninpicard">
                            <p><b>[CodeWars]</b> - Profil</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ArtProjects;
