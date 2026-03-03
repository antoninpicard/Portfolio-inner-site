import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Obstacle {
    x: number;
    y: number;
    w: number;
    h: number;
}

type RobotState = 'FORWARD' | 'SCAN_LEFT' | 'SCAN_RIGHT' | 'TURN_LEFT' | 'TURN_RIGHT' | 'REVERSE' | 'STOPPED';

const CANVAS_W = 600;
const CANVAS_H = 400;
const ROBOT_SIZE = 16;

const OBSTACLES: Obstacle[] = [
    { x: 140, y: 60, w: 50, h: 50 },
    { x: 320, y: 40, w: 60, h: 45 },
    { x: 500, y: 80, w: 50, h: 60 },
    { x: 80, y: 200, w: 45, h: 70 },
    { x: 260, y: 180, w: 70, h: 45 },
    { x: 450, y: 220, w: 55, h: 55 },
    { x: 180, y: 320, w: 60, h: 40 },
    { x: 380, y: 310, w: 50, h: 50 },
];

const circleRectCollision = (cx: number, cy: number, r: number, rx: number, ry: number, rw: number, rh: number): boolean => {
    const nearestX = Math.max(rx, Math.min(cx, rx + rw));
    const nearestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - nearestX;
    const dy = cy - nearestY;
    return (dx * dx + dy * dy) < (r * r);
};

const isPositionBlocked = (px: number, py: number): boolean => {
    if (px < ROBOT_SIZE || px > CANVAS_W - ROBOT_SIZE || py < ROBOT_SIZE || py > CANVAS_H - ROBOT_SIZE) return true;
    for (const obs of OBSTACLES) {
        if (circleRectCollision(px, py, ROBOT_SIZE + 2, obs.x, obs.y, obs.w, obs.h)) return true;
    }
    return false;
};

const RobotDemo: React.FC = () => {
    const [robotX, setRobotX] = useState(50);
    const [robotY, setRobotY] = useState(50);
    const [robotAngle, setRobotAngle] = useState(0);
    const [robotState, setRobotState] = useState<RobotState>('FORWARD');
    const [isRunning, setIsRunning] = useState(true);
    const [isManual, setIsManual] = useState(false);
    const [sensorFront, setSensorFront] = useState(999);
    const [sensorLeft, setSensorLeft] = useState(999);
    const [sensorRight, setSensorRight] = useState(999);
    const [motorLeft, setMotorLeft] = useState(0);
    const [motorRight, setMotorRight] = useState(0);
    const [log, setLog] = useState<string[]>([]);
    const [trail, setTrail] = useState<{x: number; y: number}[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef({ x: 50, y: 50, angle: 0, state: 'FORWARD' as RobotState, turnCounter: 0, stuckCounter: 0, lastX: 50, lastY: 50 });

    const getTimestamp = useCallback(() => {
        return new Date().toLocaleTimeString('fr-FR');
    }, []);

    const castRay = useCallback((ox: number, oy: number, angle: number): number => {
        const rad = (angle * Math.PI) / 180;
        const step = 2;
        const maxDist = 150;
        for (let d = ROBOT_SIZE; d < maxDist; d += step) {
            const px = ox + Math.cos(rad) * d;
            const py = oy + Math.sin(rad) * d;
            if (px < 0 || px > CANVAS_W || py < 0 || py > CANVAS_H) return d - ROBOT_SIZE;
            for (const obs of OBSTACLES) {
                if (px >= obs.x && px <= obs.x + obs.w && py >= obs.y && py <= obs.y + obs.h) {
                    return d - ROBOT_SIZE;
                }
            }
        }
        return maxDist;
    }, []);

    // Simulation loop
    useEffect(() => {
        if (!isRunning || isManual) return;

        const interval = setInterval(() => {
            const s = stateRef.current;
            const speed = 2.0;

            // Read 5 sensors for better coverage
            const front = castRay(s.x, s.y, s.angle);
            const frontLeft = castRay(s.x, s.y, s.angle - 25);
            const frontRight = castRay(s.x, s.y, s.angle + 25);
            const left = castRay(s.x, s.y, s.angle - 60);
            const right = castRay(s.x, s.y, s.angle + 60);

            const minFront = Math.min(front, frontLeft, frontRight);
            setSensorFront(Math.round(front));
            setSensorLeft(Math.round(left));
            setSensorRight(Math.round(right));

            // Stuck detection: if barely moved in last 20 ticks
            s.stuckCounter++;
            if (s.stuckCounter >= 20) {
                const dx = s.x - s.lastX;
                const dy = s.y - s.lastY;
                if (Math.sqrt(dx * dx + dy * dy) < 5) {
                    s.state = 'REVERSE';
                    s.turnCounter = 0;
                    const ts = getTimestamp();
                    setLog(prev => [...prev.slice(-19), `[${ts}] ⚠ STUCK DETECTED → REVERSE`]);
                }
                s.lastX = s.x;
                s.lastY = s.y;
                s.stuckCounter = 0;
            }

            // State machine
            let newState = s.state;
            let ml = 0;
            let mr = 0;
            const dangerClose = 25;
            const threshold = 45;

            switch (s.state) {
                case 'FORWARD':
                    ml = 180; mr = 180;
                    // Slight steering to avoid walls on the side
                    if (left < 40 && left < right) { ml = 200; mr = 150; }
                    if (right < 40 && right < left) { ml = 150; mr = 200; }
                    // Obstacle ahead
                    if (minFront < threshold) {
                        newState = left > right ? 'TURN_LEFT' : 'TURN_RIGHT';
                        s.turnCounter = 0;
                    } else if (left < dangerClose) {
                        newState = 'TURN_RIGHT';
                        s.turnCounter = 0;
                    } else if (right < dangerClose) {
                        newState = 'TURN_LEFT';
                        s.turnCounter = 0;
                    }
                    break;
                case 'TURN_LEFT':
                    ml = -80; mr = 150;
                    s.turnCounter++;
                    if (front > threshold + 15 && frontLeft > threshold && s.turnCounter > 5) {
                        newState = 'FORWARD';
                    }
                    if (s.turnCounter > 30) {
                        newState = 'REVERSE';
                        s.turnCounter = 0;
                    }
                    break;
                case 'TURN_RIGHT':
                    ml = 150; mr = -80;
                    s.turnCounter++;
                    if (front > threshold + 15 && frontRight > threshold && s.turnCounter > 5) {
                        newState = 'FORWARD';
                    }
                    if (s.turnCounter > 30) {
                        newState = 'REVERSE';
                        s.turnCounter = 0;
                    }
                    break;
                case 'REVERSE':
                    ml = -140; mr = -100; // slight arc in reverse
                    s.turnCounter++;
                    if (s.turnCounter > 12) {
                        // After reversing, pick the clearest direction
                        const farLeft = castRay(s.x, s.y, s.angle - 90);
                        const farRight = castRay(s.x, s.y, s.angle + 90);
                        newState = farLeft > farRight ? 'TURN_LEFT' : 'TURN_RIGHT';
                        s.turnCounter = 0;
                    }
                    break;
                default:
                    break;
            }

            if (newState !== s.state) {
                const ts = getTimestamp();
                setLog(prev => [...prev.slice(-19), `[${ts}] STATE: ${s.state} → ${newState} | F:${Math.round(front)}cm L:${Math.round(left)}cm R:${Math.round(right)}cm`]);
            }

            setMotorLeft(ml);
            setMotorRight(mr);
            s.state = newState;

            // Movement with collision check
            const avgSpeed = (ml + mr) / 2;
            const turnRate = (mr - ml) / 250;
            s.angle += turnRate * 3;
            const rad = (s.angle * Math.PI) / 180;
            const newX = s.x + Math.cos(rad) * (avgSpeed / 200) * speed;
            const newY = s.y + Math.sin(rad) * (avgSpeed / 200) * speed;

            // Only move if new position is not blocked
            if (!isPositionBlocked(newX, newY)) {
                s.x = newX;
                s.y = newY;
            } else if (!isPositionBlocked(s.x, newY)) {
                s.y = newY; // slide along X axis
            } else if (!isPositionBlocked(newX, s.y)) {
                s.x = newX; // slide along Y axis
            }
            // else: stuck, don't move

            setRobotX(s.x);
            setRobotY(s.y);
            setRobotAngle(s.angle);
            setRobotState(s.state);
            setTrail(prev => [...prev.slice(-300), { x: s.x, y: s.y }]);
        }, 50);

        return () => clearInterval(interval);
    }, [isRunning, isManual, castRay, getTimestamp]);

    // Manual control
    useEffect(() => {
        if (!isManual) return;
        const handleKey = (e: KeyboardEvent) => {
            const s = stateRef.current;
            const speed = 5;
            switch (e.key) {
                case 'ArrowUp':
                case 'z':
                    s.x += Math.cos((s.angle * Math.PI) / 180) * speed;
                    s.y += Math.sin((s.angle * Math.PI) / 180) * speed;
                    setMotorLeft(200); setMotorRight(200);
                    break;
                case 'ArrowDown':
                case 's':
                    s.x -= Math.cos((s.angle * Math.PI) / 180) * speed;
                    s.y -= Math.sin((s.angle * Math.PI) / 180) * speed;
                    setMotorLeft(-200); setMotorRight(-200);
                    break;
                case 'ArrowLeft':
                case 'q':
                    s.angle -= 5;
                    setMotorLeft(-120); setMotorRight(120);
                    break;
                case 'ArrowRight':
                case 'd':
                    s.angle += 5;
                    setMotorLeft(120); setMotorRight(-120);
                    break;
            }
            s.x = Math.max(ROBOT_SIZE, Math.min(CANVAS_W - ROBOT_SIZE, s.x));
            s.y = Math.max(ROBOT_SIZE, Math.min(CANVAS_H - ROBOT_SIZE, s.y));

            const front = castRay(s.x, s.y, s.angle);
            const left = castRay(s.x, s.y, s.angle - 45);
            const right = castRay(s.x, s.y, s.angle + 45);
            setSensorFront(Math.round(front));
            setSensorLeft(Math.round(left));
            setSensorRight(Math.round(right));

            setRobotX(s.x);
            setRobotY(s.y);
            setRobotAngle(s.angle);
            setTrail(prev => [...prev.slice(-200), { x: s.x, y: s.y }]);
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isManual, castRay]);

    // Draw
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

        // Background
        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Grid
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 0.5;
        for (let x = 0; x < CANVAS_W; x += 30) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_H); ctx.stroke();
        }
        for (let y = 0; y < CANVAS_H; y += 30) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_W, y); ctx.stroke();
        }

        // Obstacles
        OBSTACLES.forEach(obs => {
            ctx.fillStyle = '#2a1a1a';
            ctx.strokeStyle = '#ff6b6b';
            ctx.lineWidth = 1;
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
            ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);
        });

        // Trail
        trail.forEach((p, i) => {
            const alpha = i / trail.length * 0.5;
            ctx.fillStyle = `rgba(78, 205, 196, ${alpha})`;
            ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        });

        // Sensor rays
        const drawRay = (angle: number, dist: number, color: string) => {
            const rad = (angle * Math.PI) / 180;
            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(robotX, robotY);
            ctx.lineTo(robotX + Math.cos(rad) * dist, robotY + Math.sin(rad) * dist);
            ctx.stroke();
            ctx.setLineDash([]);
            // Distance marker
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(robotX + Math.cos(rad) * dist, robotY + Math.sin(rad) * dist, 3, 0, Math.PI * 2);
            ctx.fill();
        };

        drawRay(robotAngle, sensorFront, '#ffe66d');
        drawRay(robotAngle - 45, sensorLeft, '#4ecdc4');
        drawRay(robotAngle + 45, sensorRight, '#ff6b6b');

        // Robot
        ctx.save();
        ctx.translate(robotX, robotY);
        ctx.rotate((robotAngle * Math.PI) / 180);

        // Body
        ctx.fillStyle = '#4ecdc4';
        ctx.strokeStyle = '#2a9d8f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, ROBOT_SIZE, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Direction indicator
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.moveTo(ROBOT_SIZE, 0);
        ctx.lineTo(ROBOT_SIZE - 8, -5);
        ctx.lineTo(ROBOT_SIZE - 8, 5);
        ctx.closePath();
        ctx.fill();

        // Wheels
        ctx.fillStyle = '#333';
        ctx.fillRect(-12, -ROBOT_SIZE - 3, 8, 4);
        ctx.fillRect(-12, ROBOT_SIZE - 1, 8, 4);
        ctx.fillRect(4, -ROBOT_SIZE - 3, 8, 4);
        ctx.fillRect(4, ROBOT_SIZE - 1, 8, 4);

        ctx.restore();

        // HUD
        ctx.font = '11px monospace';
        ctx.fillStyle = '#888';
        ctx.fillText(`X: ${Math.round(robotX)} Y: ${Math.round(robotY)} θ: ${Math.round(robotAngle)}°`, 10, CANVAS_H - 10);
        ctx.fillStyle = robotState === 'FORWARD' ? '#4ecdc4' : robotState === 'REVERSE' ? '#ff6b6b' : '#ffe66d';
        ctx.fillText(`STATE: ${robotState}`, CANVAS_W - 150, CANVAS_H - 10);

    }, [robotX, robotY, robotAngle, sensorFront, sensorLeft, sensorRight, trail, robotState]);

    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [log]);

    return (
        <div className="site-page-content">
            <div style={{ marginBottom: 16 }}>
                <Link to="/projects/software">← Retour aux projets</Link>
            </div>
            <h1>Robot Éviteur d'Obstacles — Arduino</h1>
            <h3>Simulation machine à états</h3>
            <br />
            <p>
                Cette démo simule le comportement du robot autonome piloté par Arduino Mega. Les capteurs HC-SR04 (3 rayons) détectent les obstacles, et la machine à états adapte la trajectoire en temps réel. Passez en mode manuel pour contrôler le robot avec les touches fléchées (ou ZQSD).
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
                    style={{ ...styles.button, backgroundColor: isManual ? '#ffe66d' : '#666' }}
                    onClick={() => { setIsManual(!isManual); setRobotState(isManual ? 'FORWARD' : 'STOPPED'); }}
                >
                    {isManual ? '🎮 Manuel (ZQSD)' : '🤖 Autonome'}
                </button>
                <button
                    style={{ ...styles.button, backgroundColor: '#666' }}
                    onClick={() => {
                        stateRef.current = { x: 50, y: 50, angle: 0, state: 'FORWARD', turnCounter: 0, stuckCounter: 0, lastX: 50, lastY: 50 };
                        setRobotX(50); setRobotY(50); setRobotAngle(0);
                        setRobotState('FORWARD'); setTrail([]); setLog([]);
                    }}
                >
                    🔄 Reset
                </button>
                <div style={styles.statusChip}>
                    <span style={{ color: robotState === 'FORWARD' ? '#4ecdc4' : '#ffe66d' }}>●</span>
                    {' '}{robotState}
                </div>
            </div>

            {/* Canvas */}
            <div style={{ marginBottom: 24 }}>
                <canvas ref={canvasRef} width={CANVAS_W} height={CANVAS_H} style={styles.canvas} />
            </div>

            {/* Sensor + Motor data */}
            <div style={styles.row}>
                <div style={styles.dataCard}>
                    <h3>📡 Capteurs HC-SR04</h3>
                    <div style={styles.sensorGrid}>
                        <div>
                            <span style={{ color: '#4ecdc4' }}>← Gauche</span>
                            <div style={styles.sensorValue}>{sensorLeft} cm</div>
                        </div>
                        <div>
                            <span style={{ color: '#ffe66d' }}>↑ Front</span>
                            <div style={styles.sensorValue}>{sensorFront} cm</div>
                        </div>
                        <div>
                            <span style={{ color: '#ff6b6b' }}>Droite →</span>
                            <div style={styles.sensorValue}>{sensorRight} cm</div>
                        </div>
                    </div>
                </div>

                <div style={styles.dataCard}>
                    <h3>⚙️ Moteurs (PWM L298N)</h3>
                    <div style={styles.motorRow}>
                        <span>Gauche:</span>
                        <div style={styles.motorBar}>
                            <div style={{
                                ...styles.motorFill,
                                width: `${Math.abs(motorLeft) / 2.55}%`,
                                backgroundColor: motorLeft >= 0 ? '#4ecdc4' : '#ff6b6b',
                            }} />
                        </div>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, minWidth: 50 }}>{motorLeft} PWM</span>
                    </div>
                    <div style={styles.motorRow}>
                        <span>Droite:</span>
                        <div style={styles.motorBar}>
                            <div style={{
                                ...styles.motorFill,
                                width: `${Math.abs(motorRight) / 2.55}%`,
                                backgroundColor: motorRight >= 0 ? '#4ecdc4' : '#ff6b6b',
                            }} />
                        </div>
                        <span style={{ fontFamily: 'monospace', fontSize: 12, minWidth: 50 }}>{motorRight} PWM</span>
                    </div>
                </div>
            </div>

            {/* State machine log */}
            <div style={styles.section}>
                <h3>📋 Log machine à états</h3>
                <div ref={logRef} style={styles.terminal}>
                    <div style={{ color: '#4ecdc4', marginBottom: 4 }}>
                        [BOOT] Arduino Mega — Robot Éviteur d'Obstacles v1.0
                    </div>
                    <div style={{ color: '#4ecdc4', marginBottom: 4 }}>
                        [INIT] HC-SR04 x3 configurés (TRIG: D2,D4,D6 / ECHO: D3,D5,D7)
                    </div>
                    <div style={{ color: '#4ecdc4', marginBottom: 8 }}>
                        [INIT] L298N prêt (ENA: D9, ENB: D10, IN1-4: D22-D25)
                    </div>
                    {log.map((line, i) => (
                        <div key={i} style={{ color: '#b0b0b0', fontSize: 11, lineHeight: '16px' }}>{line}</div>
                    ))}
                    {isRunning && <span style={{ color: '#4ecdc4' }}>_</span>}
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
    canvas: {
        width: '100%',
        borderRadius: 8,
        border: '1px solid #1a1a2e',
    },
    row: {
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    dataCard: {
        flex: 1,
        minWidth: 250,
        backgroundColor: '#0d1117',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 16,
    },
    sensorGrid: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: 12,
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: 12,
    },
    sensorValue: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#fff',
        marginTop: 4,
    },
    motorRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginTop: 8,
        fontSize: 13,
    },
    motorBar: {
        flex: 1,
        height: 10,
        backgroundColor: '#1a1a2e',
        borderRadius: 5,
        overflow: 'hidden',
    },
    motorFill: {
        height: '100%',
        borderRadius: 5,
        transition: 'width 0.1s',
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
};

export default RobotDemo;
