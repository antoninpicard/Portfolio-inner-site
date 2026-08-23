import React from 'react';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Hardware & Veille</h1>
            <h3>Électronique, instrumentation & montée en compétences</h3>
            <br />

            <div className="text-block">
                <p>
                    L'ingénierie embarquée ne se limite pas au code. Comprendre ce qui se passe au niveau électrique, savoir lire un signal sur un oscilloscope, diagnostiquer un bus qui ne répond pas — c'est aussi important que d'écrire un driver. Cette section présente mon environnement de travail hardware et les ressources sur lesquelles je m'appuie pour progresser.
                </p>
            </div>

            <div className="text-block">
                <h2>Environnement de développement hardware</h2>
                <br />
                <h3>Microcontrôleurs & cartes</h3>
                <ul>
                    <li><p><b>STM32 Nucleo-F446RE</b> — ARM Cortex-M4, 180 MHz. Carte principale pour mes projets FreeRTOS et drivers bas niveau.</p></li>
                    <li><p><b>ESP32 DevKit</b> — WiFi/BLE intégré. Utilisé comme station au sol (WebSocket, point d'accès) et pour le prototypage IoT.</p></li>
                    <li><p><b>Arduino Mega</b> — prototypage rapide, tests capteurs avant portage sur STM32.</p></li>
                    <li><p><b>Raspberry Pi 4</b> — Linux embarqué, serveur local, passerelle réseau.</p></li>
                </ul>
                <br />
                <h3>Instrumentation</h3>
                <ul>
                    <li><p><b>Oscilloscope numérique</b> — visualisation et debug de signaux I2C, SPI, UART, PWM. Indispensable pour valider le timing et détecter les glitchs.</p></li>
                    <li><p><b>Analyseur logique</b> — décodage de protocoles série, capture de trames pour vérifier la conformité des échanges bus.</p></li>
                    <li><p><b>Multimètre</b> — mesure de consommation, vérification d'alimentations, continuité.</p></li>
                    <li><p><b>Alimentation de laboratoire</b> — tension/courant ajustables pour tester les limites des circuits.</p></li>
                    <li><p><b>Station de soudure</b> — assemblage de PCB, rework de composants CMS.</p></li>
                </ul>
                <br />
                <h3>Capteurs & modules utilisés</h3>
                <ul>
                    <li><p><b>IMU MPU-6050</b> — accéléromètre + gyroscope 6 axes, bus I2C. Utilisé dans le simulateur satellite.</p></li>
                    <li><p><b>Baromètre BMP280</b> — pression atmosphérique + température, I2C/SPI.</p></li>
                    <li><p><b>OLED SSD1306</b> — affichage 128x64, I2C. Interface utilisateur embarquée.</p></li>
                    <li><p><b>Lecteur micro-SD</b> — SPI, enregistrement de données (boîte noire télémétrie).</p></li>
                    <li><p><b>HC-SR04</b> — capteur ultrasonique, mesure de distance.</p></li>
                    <li><p><b>Modules Bluetooth HC-05</b> — communication UART sans fil.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>Méthode de debug hardware</h2>
                <br />
                <p>
                    Mon workflow typique quand un périphérique ne répond pas :
                </p>
                <br />
                <ol>
                    <li><p>Vérification physique — câblage, alimentation, pull-ups I2C présentes.</p></li>
                    <li><p>Oscilloscope sur le bus — le master émet-il ? Le slave ACK-t-il ?</p></li>
                    <li><p>Analyseur logique — décodage de la trame complète, comparaison avec la datasheet.</p></li>
                    <li><p>Isolation — test du périphérique seul sur le bus pour éliminer les conflits d'adresse.</p></li>
                    <li><p>Debug logiciel — breakpoints GDB sur les fonctions HAL, vérification des registres de status.</p></li>
                </ol>
            </div>

            <div className="text-block">
                <h2>Veille & ressources techniques</h2>
                <br />
                <h3>Livres de référence</h3>
                <ul>
                    <li><p><b>Making Embedded Systems</b> (Elecia White) — architecture logicielle embarquée, patterns, machines à états.</p></li>
                    <li><p><b>Mastering STM32</b> (Carmine Noviello) — HAL, périphériques, DMA, interruptions sur STM32.</p></li>
                    <li><p><b>The Definitive Guide to ARM Cortex-M</b> (Joseph Yiu) — architecture du processeur, modes d'exécution, NVIC.</p></li>
                    <li><p><b>FreeRTOS Reference Manual</b> — tâches, queues, semaphores, bonnes pratiques RTOS.</p></li>
                </ul>
                <br />
                <h3>Chaînes & blogs</h3>
                <ul>
                    <li><p><b>Phil's Lab</b> — conception PCB, filtres, contrôle moteur, STM32 avancé.</p></li>
                    <li><p><b>Ben Eater</b> — architecture ordinateur from scratch, logique digitale.</p></li>
                    <li><p><b>EEVblog</b> — revues d'instrumentation, teardowns, électronique pratique.</p></li>
                    <li><p><b>Embedded Artistry</b> — patterns C embarqué, architecture firmware professionnelle.</p></li>
                    <li><p><b>Interrupt (Memfault)</b> — articles techniques sur debugging, RTOS, OTA, testing embarqué.</p></li>
                </ul>
                <br />
                <h3>Documentation de référence</h3>
                <ul>
                    <li><p>Reference Manuals ST (RM0390 pour STM32F446) — registres, périphériques, clock tree.</p></li>
                    <li><p>Datasheets capteurs (MPU-6050, BMP280) — protocoles, registres, timing.</p></li>
                    <li><p>ARM Architecture Reference Manual — jeu d'instructions, modes privilégiés.</p></li>
                    <li><p>FreeRTOS.org — API, configuration kernel, portage sur Cortex-M.</p></li>
                </ul>
            </div>

            <div className="text-block">
                <h2>Objectifs en cours</h2>
                <br />
                <ul>
                    <li><p>Concevoir un PCB custom pour un projet embarqué (KiCad).</p></li>
                    <li><p>Approfondir Linux embarqué : Buildroot, device tree, drivers kernel.</p></li>
                    <li><p>Explorer le contrôle moteur BLDC avec STM32 et capteurs Hall.</p></li>
                    <li><p>Mettre en place du testing automatisé sur cible réelle (Hardware-in-the-Loop).</p></li>
                </ul>
            </div>
        </div>
    );
};

export default ArtProjects;
