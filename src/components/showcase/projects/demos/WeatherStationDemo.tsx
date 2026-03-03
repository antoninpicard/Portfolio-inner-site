import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const WeatherStationDemo: React.FC = () => {
    const [temperature, setTemperature] = useState(22.5);
    const [humidity, setHumidity] = useState(58);
    const [pressure, setPressure] = useState(1013.25);
    const [mqttLog, setMqttLog] = useState<string[]>([]);
    const [tempHistory, setTempHistory] = useState<number[]>([]);
    const [humHistory, setHumHistory] = useState<number[]>([]);
    const [pressHistory, setPressHistory] = useState<number[]>([]);
    const [isRunning, setIsRunning] = useState(true);
    const [batteryLevel, setBatteryLevel] = useState(87);
    const [wifiStrength, setWifiStrength] = useState(-42);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    const getTimestamp = useCallback(() => {
        const now = new Date();
        return now.toLocaleTimeString('fr-FR');
    }, []);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            const newTemp = parseFloat((temperature + (Math.random() - 0.5) * 0.8).toFixed(1));
            const newHum = Math.max(30, Math.min(90, Math.round(humidity + (Math.random() - 0.5) * 3)));
            const newPress = parseFloat((pressure + (Math.random() - 0.5) * 0.5).toFixed(2));
            const newBatt = Math.max(0, batteryLevel - Math.random() * 0.05);
            const newWifi = Math.round(-42 + (Math.random() - 0.5) * 10);

            setTemperature(newTemp);
            setHumidity(newHum);
            setPressure(newPress);
            setBatteryLevel(parseFloat(newBatt.toFixed(1)));
            setWifiStrength(newWifi);

            setTempHistory(prev => [...prev.slice(-59), newTemp]);
            setHumHistory(prev => [...prev.slice(-59), newHum]);
            setPressHistory(prev => [...prev.slice(-59), newPress]);

            const ts = getTimestamp();
            setMqttLog(prev => [
                ...prev.slice(-19),
                `[${ts}] MQTT PUB → esp32/sensors/dht22 {"temp":${newTemp},"hum":${newHum}}`,
                `[${ts}] MQTT PUB → esp32/sensors/bmp280 {"press":${newPress}}`,
            ]);
        }, 1500);
        return () => clearInterval(interval);
    }, [isRunning, temperature, humidity, pressure, batteryLevel, getTimestamp]);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [mqttLog]);

    // Draw chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Background
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, w, h);

        // Grid
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
            const y = (h / 5) * i + h / 10;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }

        // Draw temperature line
        const drawLine = (data: number[], color: string, min: number, max: number) => {
            if (data.length < 2) return;
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            data.forEach((val, i) => {
                const x = (i / 59) * w;
                const y = h - ((val - min) / (max - min)) * h;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        };

        drawLine(tempHistory, '#ff6b6b', 15, 35);
        drawLine(humHistory, '#4ecdc4', 20, 100);
        drawLine(pressHistory, '#ffe66d', 1005, 1025);

        // Legend
        ctx.font = '11px monospace';
        ctx.fillStyle = '#ff6b6b';
        ctx.fillText('● Temp (°C)', 10, 15);
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText('● Hum (%)', 120, 15);
        ctx.fillStyle = '#ffe66d';
        ctx.fillText('● Press (hPa)', 220, 15);
    }, [tempHistory, humHistory, pressHistory]);

    const getGaugeColor = (val: number, min: number, max: number) => {
        const ratio = (val - min) / (max - min);
        if (ratio < 0.3) return '#4ecdc4';
        if (ratio < 0.7) return '#ffe66d';
        return '#ff6b6b';
    };

    return (
        <div className="site-page-content">
            <div style={{ marginBottom: 16 }}>
                <Link to="/projects/software">← Retour aux projets</Link>
            </div>
            <h1>Station Météo Connectée — ESP32</h1>
            <h3>Simulation en temps réel</h3>
            <br />
            <p>
                Cette démo simule le dashboard embarqué de la station météo ESP32. Les données des capteurs DHT22 et BMP280 sont simulées avec des variations réalistes et publiées via MQTT.
            </p>
            <br />

            {/* Controls */}
            <div style={styles.controlBar}>
                <button
                    style={{
                        ...styles.button,
                        backgroundColor: isRunning ? '#ff6b6b' : '#4ecdc4',
                    }}
                    onClick={() => setIsRunning(!isRunning)}
                >
                    {isRunning ? '⏸ Pause' : '▶ Démarrer'}
                </button>
                <div style={styles.statusChip}>
                    <span style={{ color: isRunning ? '#4ecdc4' : '#ff6b6b' }}>●</span>
                    {' '}{isRunning ? 'ACQUISITION EN COURS' : 'EN PAUSE'}
                </div>
                <div style={styles.statusChip}>
                    🔋 {batteryLevel.toFixed(1)}%
                </div>
                <div style={styles.statusChip}>
                    📶 WiFi: {wifiStrength} dBm
                </div>
            </div>

            {/* Gauges */}
            <div style={styles.gaugesContainer}>
                <div style={styles.gaugeCard}>
                    <div style={styles.gaugeLabel}>🌡️ Température</div>
                    <div style={{ ...styles.gaugeValue, color: getGaugeColor(temperature, 15, 35) }}>
                        {temperature.toFixed(1)}°C
                    </div>
                    <div style={styles.sensorTag}>DHT22 — I2C</div>
                    <div style={styles.progressBg}>
                        <div style={{
                            ...styles.progressFill,
                            width: `${((temperature - 15) / 20) * 100}%`,
                            backgroundColor: getGaugeColor(temperature, 15, 35),
                        }} />
                    </div>
                </div>

                <div style={styles.gaugeCard}>
                    <div style={styles.gaugeLabel}>💧 Humidité</div>
                    <div style={{ ...styles.gaugeValue, color: getGaugeColor(humidity, 30, 90) }}>
                        {humidity}%
                    </div>
                    <div style={styles.sensorTag}>DHT22 — I2C</div>
                    <div style={styles.progressBg}>
                        <div style={{
                            ...styles.progressFill,
                            width: `${((humidity - 30) / 60) * 100}%`,
                            backgroundColor: getGaugeColor(humidity, 30, 90),
                        }} />
                    </div>
                </div>

                <div style={styles.gaugeCard}>
                    <div style={styles.gaugeLabel}>🌀 Pression</div>
                    <div style={{ ...styles.gaugeValue, color: '#ffe66d' }}>
                        {pressure.toFixed(2)} hPa
                    </div>
                    <div style={styles.sensorTag}>BMP280 — I2C</div>
                    <div style={styles.progressBg}>
                        <div style={{
                            ...styles.progressFill,
                            width: `${((pressure - 1005) / 20) * 100}%`,
                            backgroundColor: '#ffe66d',
                        }} />
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div style={styles.section}>
                <h3>📊 Historique des mesures (60 dernières acquisitions)</h3>
                <canvas ref={canvasRef} width={700} height={200} style={styles.canvas} />
            </div>

            {/* MQTT Log */}
            <div style={styles.section}>
                <h3>📡 Log MQTT (broker local)</h3>
                <div ref={logRef} style={styles.terminal}>
                    <div style={{ color: '#4ecdc4', marginBottom: 4 }}>
                        [SYSTEM] ESP32 connecté au broker MQTT → mqtt://192.168.1.1:1883
                    </div>
                    <div style={{ color: '#4ecdc4', marginBottom: 8 }}>
                        [SYSTEM] Topics enregistrés : esp32/sensors/dht22, esp32/sensors/bmp280
                    </div>
                    {mqttLog.map((line, i) => (
                        <div key={i} style={{ color: '#b0b0b0', fontSize: 11, lineHeight: '16px' }}>
                            {line}
                        </div>
                    ))}
                    {isRunning && <span style={styles.cursor}>_</span>}
                </div>
            </div>

            {/* I2C Frame */}
            <div style={styles.section}>
                <h3>🔌 Trame I2C simulée</h3>
                <div style={styles.frameBox}>
                    <code>
                        START → 0x76 [W] → REG 0xFA → RESTART → 0x76 [R] → DATA[{Math.round(pressure * 100).toString(16).toUpperCase()}] → STOP
                    </code>
                </div>
                <div style={styles.frameBox}>
                    <code>
                        START → 0x44 [W] → REG 0x00 → RESTART → 0x44 [R] → DATA[{temperature.toFixed(1)}|{humidity}] → STOP
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
    gaugesContainer: {
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    gaugeCard: {
        flex: 1,
        minWidth: 180,
        backgroundColor: '#0d1117',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 20,
        textAlign: 'center',
    },
    gaugeLabel: {
        fontSize: 14,
        color: '#888',
        marginBottom: 8,
    },
    gaugeValue: {
        fontSize: 36,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        marginBottom: 4,
    },
    sensorTag: {
        fontSize: 10,
        color: '#555',
        marginBottom: 12,
        fontFamily: 'monospace',
    },
    progressBg: {
        width: '100%',
        height: 6,
        backgroundColor: '#1a1a2e',
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 3,
        transition: 'width 0.5s ease',
    },
    section: {
        marginBottom: 24,
    },
    canvas: {
        width: '100%',
        borderRadius: 8,
        border: '1px solid #1a1a2e',
        marginTop: 8,
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
    cursor: {
        animation: 'blink 1s infinite',
        color: '#4ecdc4',
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

export default WeatherStationDemo;
