import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface TelemetryEntry {
    timestamp: string;
    roll: number;
    pitch: number;
    yaw: number;
    gyroX: number;
    gyroY: number;
    gyroZ: number;
}

const SatelliteDemo: React.FC = () => {
    const [roll, setRoll] = useState(0);
    const [pitch, setPitch] = useState(0);
    const [yaw, setYaw] = useState(0);
    const [gyroX, setGyroX] = useState(0);
    const [gyroY, setGyroY] = useState(0);
    const [gyroZ, setGyroZ] = useState(0);
    const [accelX, setAccelX] = useState(0);
    const [accelY, setAccelY] = useState(0);
    const [accelZ, setAccelZ] = useState(9.81);
    const [isRunning, setIsRunning] = useState(true);
    const [correctionActive, setCorrectionActive] = useState(true);
    const [telemetryLog, setTelemetryLog] = useState<string[]>([]);
    const [rollHistory, setRollHistory] = useState<number[]>([]);
    const [pitchHistory, setPitchHistory] = useState<number[]>([]);
    const [yawHistory, setYawHistory] = useState<number[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const satCanvasRef = useRef<HTMLCanvasElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const getTimestamp = useCallback(() => {
        const now = new Date();
        return now.toLocaleTimeString('fr-FR', { hour12: false });
    }, []);

    // Simulation loop
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            // Simulate perturbations (solar pressure, magnetic torque)
            const perturbX = (Math.random() - 0.5) * 2.0;
            const perturbY = (Math.random() - 0.5) * 2.0;
            const perturbZ = (Math.random() - 0.5) * 1.5;

            let newGyroX = gyroX + perturbX;
            let newGyroY = gyroY + perturbY;
            let newGyroZ = gyroZ + perturbZ;

            // Correction algorithm (PD controller)
            if (correctionActive) {
                const kp = 0.15;
                const kd = 0.3;
                newGyroX -= kp * roll + kd * newGyroX;
                newGyroY -= kp * pitch + kd * newGyroY;
                newGyroZ -= kp * yaw + kd * newGyroZ;
            }

            // Clamp gyro
            newGyroX = Math.max(-30, Math.min(30, newGyroX));
            newGyroY = Math.max(-30, Math.min(30, newGyroY));
            newGyroZ = Math.max(-30, Math.min(30, newGyroZ));

            // Integrate angular velocity → angles
            const dt = 0.1;
            const newRoll = parseFloat((roll + newGyroX * dt).toFixed(2));
            const newPitch = parseFloat((pitch + newGyroY * dt).toFixed(2));
            const newYaw = parseFloat((yaw + newGyroZ * dt).toFixed(2));

            // Simulated accelerometer
            const newAccelX = parseFloat((Math.sin(newPitch * Math.PI / 180) * 9.81 + (Math.random() - 0.5) * 0.2).toFixed(3));
            const newAccelY = parseFloat((-Math.sin(newRoll * Math.PI / 180) * 9.81 + (Math.random() - 0.5) * 0.2).toFixed(3));
            const newAccelZ = parseFloat((Math.cos(newRoll * Math.PI / 180) * Math.cos(newPitch * Math.PI / 180) * 9.81 + (Math.random() - 0.5) * 0.1).toFixed(3));

            setGyroX(parseFloat(newGyroX.toFixed(2)));
            setGyroY(parseFloat(newGyroY.toFixed(2)));
            setGyroZ(parseFloat(newGyroZ.toFixed(2)));
            setRoll(newRoll);
            setPitch(newPitch);
            setYaw(newYaw);
            setAccelX(newAccelX);
            setAccelY(newAccelY);
            setAccelZ(newAccelZ);

            setRollHistory(prev => [...prev.slice(-59), newRoll]);
            setPitchHistory(prev => [...prev.slice(-59), newPitch]);
            setYawHistory(prev => [...prev.slice(-59), newYaw]);

            const ts = getTimestamp();
            setTelemetryLog(prev => [
                ...prev.slice(-24),
                `[${ts}] UART TX → ROLL:${newRoll.toFixed(1)}° PITCH:${newPitch.toFixed(1)}° YAW:${newYaw.toFixed(1)}° | GX:${newGyroX.toFixed(1)} GY:${newGyroY.toFixed(1)} GZ:${newGyroZ.toFixed(1)} °/s`,
            ]);
        }, 200);

        return () => clearInterval(interval);
    }, [isRunning, roll, pitch, yaw, gyroX, gyroY, gyroZ, correctionActive, getTimestamp]);

    // Auto-scroll log
    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [telemetryLog]);

    // Draw satellite visualization
    useEffect(() => {
        const canvas = satCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;

        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, w, h);

        // Stars
        for (let i = 0; i < 40; i++) {
            const sx = (Math.sin(i * 137.508) * 0.5 + 0.5) * w;
            const sy = (Math.cos(i * 137.508) * 0.5 + 0.5) * h;
            ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.4})`;
            ctx.fillRect(sx, sy, 1, 1);
        }

        // Save context and apply rotations
        ctx.save();
        ctx.translate(cx, cy);

        const rollRad = (roll * Math.PI) / 180;
        const pitchRad = (pitch * Math.PI) / 180;

        ctx.rotate(rollRad);

        // Satellite body
        const bodyW = 60;
        const bodyH = 40 + Math.sin(pitchRad) * 10;
        ctx.fillStyle = '#2a2a4a';
        ctx.strokeStyle = '#4a4a8a';
        ctx.lineWidth = 2;
        ctx.fillRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH);
        ctx.strokeRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH);

        // Solar panels
        ctx.fillStyle = '#1a3a5a';
        ctx.strokeStyle = '#3a7aba';
        ctx.lineWidth = 1;
        // Left panel
        ctx.fillRect(-bodyW / 2 - 70, -15, 65, 30);
        ctx.strokeRect(-bodyW / 2 - 70, -15, 65, 30);
        // Right panel
        ctx.fillRect(bodyW / 2 + 5, -15, 65, 30);
        ctx.strokeRect(bodyW / 2 + 5, -15, 65, 30);

        // Panel grid lines
        ctx.strokeStyle = '#2a5a8a';
        for (let i = 1; i < 4; i++) {
            // Left
            ctx.beginPath();
            ctx.moveTo(-bodyW / 2 - 70 + i * 16, -15);
            ctx.lineTo(-bodyW / 2 - 70 + i * 16, 15);
            ctx.stroke();
            // Right
            ctx.beginPath();
            ctx.moveTo(bodyW / 2 + 5 + i * 16, -15);
            ctx.lineTo(bodyW / 2 + 5 + i * 16, 15);
            ctx.stroke();
        }

        // Antenna
        ctx.strokeStyle = '#888';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -bodyH / 2);
        ctx.lineTo(0, -bodyH / 2 - 20);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, -bodyH / 2 - 22, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ff6b6b';
        ctx.fill();

        // Correction thrusters (show when active)
        if (correctionActive && (Math.abs(roll) > 1 || Math.abs(pitch) > 1)) {
            ctx.fillStyle = 'rgba(255, 165, 0, 0.6)';
            if (roll > 1) {
                ctx.fillRect(bodyW / 2 - 5, bodyH / 2, 8, 6 + Math.random() * 4);
            }
            if (roll < -1) {
                ctx.fillRect(-bodyW / 2 - 3, -bodyH / 2 - 6 - Math.random() * 4, 8, 6);
            }
        }

        ctx.restore();

        // Axes indicators
        ctx.font = '11px monospace';
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText(`ROLL: ${roll.toFixed(1)}°`, 10, h - 40);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText(`PITCH: ${pitch.toFixed(1)}°`, 10, h - 25);
        ctx.fillStyle = '#ffe66d';
        ctx.fillText(`YAW: ${yaw.toFixed(1)}°`, 10, h - 10);

        // Status
        ctx.fillStyle = correctionActive ? '#4ecdc4' : '#ff6b6b';
        ctx.fillText(correctionActive ? 'ADCS: ACTIVE' : 'ADCS: OFF', w - 100, 20);
    }, [roll, pitch, yaw, correctionActive]);

    // Draw attitude chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, w, h);

        // Zero line
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        const drawLine = (data: number[], color: string) => {
            if (data.length < 2) return;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            const maxAngle = 30;
            data.forEach((val, i) => {
                const x = (i / 59) * w;
                const y = h / 2 - (val / maxAngle) * (h / 2);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        };

        drawLine(rollHistory, '#ff6b6b');
        drawLine(pitchHistory, '#4ecdc4');
        drawLine(yawHistory, '#ffe66d');

        ctx.font = '11px monospace';
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText('● Roll', 10, 15);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText('● Pitch', 70, 15);
        ctx.fillStyle = '#ffe66d';
        ctx.fillText('● Yaw', 140, 15);
    }, [rollHistory, pitchHistory, yawHistory]);

    return (
        <div className="site-page-content">
            <div style={{ marginBottom: 16 }}>
                <Link to="/projects/software">← Retour aux projets</Link>
            </div>
            <h1>Simulateur de Satellite — STM32</h1>
            <h3>Simulation ADCS temps réel</h3>
            <br />
            <p>
                Cette démo simule le système de contrôle d'attitude (ADCS) d'un nanosatellite CubeSat. Les données IMU (gyroscope + accéléromètre) sont simulées avec perturbations réalistes, et un contrôleur PD corrige l'orientation. La télémétrie est affichée comme elle le serait via UART.
            </p>
            <br />

            {/* Controls */}
            <div style={styles.controlBar}>
                <button
                    style={{ ...styles.button, backgroundColor: isRunning ? '#ff6b6b' : '#4ecdc4' }}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? '⏸ Pause' : '▶ Démarrer'}
                </button>
                <button
                    style={{ ...styles.button, backgroundColor: correctionActive ? '#ffe66d' : '#666' }}
                    onClick={() => setCorrectionActive(!correctionActive)}
                >
                    {correctionActive ? '🎯 ADCS ON' : '❌ ADCS OFF'}
                </button>
                <div style={styles.statusChip}>
                    <span style={{ color: isRunning ? '#4ecdc4' : '#ff6b6b' }}>●</span>
                    {' '}{isRunning ? 'SIMULATION ACTIVE' : 'EN PAUSE'}
                </div>
            </div>

            {/* Satellite visualization + IMU data side by side */}
            <div style={styles.row}>
                <div style={{ flex: 2 }}>
                    <h3>🛰️ Vue satellite (attitude)</h3>
                    <canvas ref={satCanvasRef} width={400} height={300} style={styles.canvas} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                    <h3>📐 Données IMU (SPI)</h3>
                    <div style={styles.imuBox}>
                        <div style={styles.imuSection}>
                            <div style={styles.imuTitle}>Gyroscope (°/s)</div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ff6b6b' }}>X: {gyroX.toFixed(2)}</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#4ecdc4' }}>Y: {gyroY.toFixed(2)}</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ffe66d' }}>Z: {gyroZ.toFixed(2)}</span>
                            </div>
                        </div>
                        <div style={styles.imuSection}>
                            <div style={styles.imuTitle}>Accéléromètre (m/s²)</div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ff6b6b' }}>X: {accelX}</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#4ecdc4' }}>Y: {accelY}</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ffe66d' }}>Z: {accelZ}</span>
                            </div>
                        </div>
                        <div style={styles.imuSection}>
                            <div style={styles.imuTitle}>Angles d'Euler</div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ff6b6b' }}>Roll: {roll.toFixed(1)}°</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#4ecdc4' }}>Pitch: {pitch.toFixed(1)}°</span>
                            </div>
                            <div style={styles.imuRow}>
                                <span style={{ color: '#ffe66d' }}>Yaw: {yaw.toFixed(1)}°</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attitude Chart */}
            <div style={styles.section}>
                <h3>📊 Historique d'attitude (filtre complémentaire)</h3>
                <canvas ref={canvasRef} width={700} height={180} style={styles.canvas} />
            </div>

            {/* UART Telemetry */}
            <div style={styles.section}>
                <h3>📡 Télémétrie UART (115200 baud)</h3>
                <div ref={logRef} style={styles.terminal}>
                    <div style={{ color: '#4ecdc4', marginBottom: 4 }}>
                        [BOOT] STM32F4 — ADCS Satellite Simulator v1.0
                    </div>
                    <div style={{ color: '#4ecdc4', marginBottom: 4 }}>
                        [INIT] IMU MPU-6050 détecté via SPI (WHO_AM_I: 0x68)
                    </div>
                    <div style={{ color: '#4ecdc4', marginBottom: 8 }}>
                        [INIT] UART1 configuré → 115200 baud, 8N1
                    </div>
                    {telemetryLog.map((line, i) => (
                        <div key={i} style={{ color: '#b0b0b0', fontSize: 11, lineHeight: '16px' }}>
                            {line}
                        </div>
                    ))}
                    {isRunning && <span style={{ color: '#4ecdc4' }}>_</span>}
                </div>
            </div>

            {/* SPI Frame */}
            <div style={styles.section}>
                <h3>🔌 Trame SPI simulée (lecture IMU)</h3>
                <div style={styles.frameBox}>
                    <code>
                        CS↓ → TX: 0x{(0x3B).toString(16).toUpperCase()} [ACCEL_XOUT_H] → RX: 0x{Math.abs(Math.round(accelX * 100)).toString(16).toUpperCase().padStart(4, '0')} → CS↑
                    </code>
                </div>
                <div style={styles.frameBox}>
                    <code>
                        CS↓ → TX: 0x{(0x43).toString(16).toUpperCase()} [GYRO_XOUT_H] → RX: 0x{Math.abs(Math.round(gyroX * 100)).toString(16).toUpperCase().padStart(4, '0')} → CS↑
                    </code>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    controlBar: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    button: {
        padding: '8px 20px',
        border: 'none',
        borderRadius: 4,
        color: '#000',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 14,
    },
    statusChip: {
        backgroundColor: '#1a1a2e',
        color: '#e0e0e0',
        padding: '6px 14px',
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'monospace',
    },
    row: {
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    canvas: {
        width: '100%',
        borderRadius: 8,
        border: '1px solid #1a1a2e',
        marginTop: 8,
    },
    imuBox: {
        backgroundColor: '#0d1117',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 16,
        marginTop: 8,
        fontFamily: 'monospace',
        fontSize: 13,
    },
    imuSection: {
        marginBottom: 12,
    },
    imuTitle: {
        color: '#888',
        fontSize: 11,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    imuRow: {
        marginLeft: 8,
        lineHeight: '20px',
    },
    section: {
        marginBottom: 24,
    },
    terminal: {
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 16,
        fontFamily: 'monospace',
        fontSize: 12,
        maxHeight: 200,
        overflowY: 'auto',
        marginTop: 8,
    },
    frameBox: {
        backgroundColor: '#0d1117',
        border: '1px solid #1a1a2e',
        borderRadius: 4,
        padding: 12,
        fontFamily: 'monospace',
        fontSize: 12,
        color: '#ffe66d',
        marginTop: 8,
        overflowX: 'auto',
    },
};

export default SatelliteDemo;
