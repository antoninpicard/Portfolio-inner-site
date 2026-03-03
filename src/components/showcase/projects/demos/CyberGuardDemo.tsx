import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface PacketEntry {
    id: number;
    timestamp: string;
    src: string;
    dst: string;
    protocol: string;
    port: number;
    size: number;
    status: 'ALLOWED' | 'BLOCKED' | 'FLAGGED';
    reason?: string;
}

interface ThreatEntry {
    timestamp: string;
    type: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    source: string;
    detail: string;
}

const PROTOCOLS = ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'DNS', 'SSH', 'MQTT'];
const THREAT_TYPES = [
    { type: 'Port Scan', severity: 'HIGH' as const, detail: 'Scan séquentiel détecté sur ports 1-1024' },
    { type: 'Brute Force SSH', severity: 'CRITICAL' as const, detail: 'Tentatives multiples sur port 22' },
    { type: 'DNS Tunneling', severity: 'MEDIUM' as const, detail: 'Requêtes DNS anormalement longues' },
    { type: 'DDoS SYN Flood', severity: 'CRITICAL' as const, detail: 'Volume SYN anormal depuis subnet externe' },
    { type: 'ARP Spoofing', severity: 'HIGH' as const, detail: 'Conflit ARP détecté sur le réseau local' },
    { type: 'Ping Sweep', severity: 'LOW' as const, detail: 'ICMP Echo sur plage réseau complète' },
    { type: 'Payload suspect', severity: 'MEDIUM' as const, detail: 'Pattern malveillant dans payload HTTP' },
];

const randomIP = (internal: boolean) => {
    if (internal) return `192.168.1.${Math.floor(Math.random() * 254) + 1}`;
    return `${Math.floor(Math.random() * 200) + 20}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 254) + 1}`;
};

const CyberGuardDemo: React.FC = () => {
    const [isRunning, setIsRunning] = useState(true);
    const [packets, setPackets] = useState<PacketEntry[]>([]);
    const [threats, setThreats] = useState<ThreatEntry[]>([]);
    const [totalPackets, setTotalPackets] = useState(0);
    const [blockedCount, setBlockedCount] = useState(0);
    const [flaggedCount, setFlaggedCount] = useState(0);
    const [allowedCount, setAllowedCount] = useState(0);
    const [bandwidth, setBandwidth] = useState(0);
    const [cpuUsage, setCpuUsage] = useState(12);
    const [memUsage, setMemUsage] = useState(34);
    const [rules, setRules] = useState([
        { id: 1, rule: 'BLOCK incoming port 23 (Telnet)', active: true },
        { id: 2, rule: 'BLOCK incoming port 445 (SMB)', active: true },
        { id: 3, rule: 'RATE LIMIT port 22 (SSH) — max 5/min', active: true },
        { id: 4, rule: 'BLOCK outgoing DNS non-standard', active: true },
        { id: 5, rule: 'ALLOW LAN 192.168.1.0/24 ↔ all', active: true },
        { id: 6, rule: 'LOG all ICMP traffic', active: true },
        { id: 7, rule: 'BLOCK known malicious IPs (threat feed)', active: true },
    ]);
    const [bandwidthHistory, setBandwidthHistory] = useState<number[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const packetLogRef = useRef<HTMLDivElement>(null);
    const threatLogRef = useRef<HTMLDivElement>(null);
    const packetIdRef = useRef(0);

    const getTimestamp = useCallback(() => {
        return new Date().toLocaleTimeString('fr-FR');
    }, []);

    // Simulation loop
    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            const numPackets = Math.floor(Math.random() * 4) + 1;
            const newPackets: PacketEntry[] = [];

            for (let i = 0; i < numPackets; i++) {
                packetIdRef.current++;
                const isIncoming = Math.random() > 0.4;
                const protocol = PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
                const port = [22, 23, 53, 80, 443, 445, 1883, 3000, 8080, 8443][Math.floor(Math.random() * 10)];
                const size = Math.floor(Math.random() * 1400) + 40;

                let status: PacketEntry['status'] = 'ALLOWED';
                let reason: string | undefined;

                // Apply rules
                if (port === 23 && isIncoming && rules[0].active) {
                    status = 'BLOCKED';
                    reason = 'Rule #1: Telnet bloqué';
                } else if (port === 445 && isIncoming && rules[1].active) {
                    status = 'BLOCKED';
                    reason = 'Rule #2: SMB bloqué';
                } else if (Math.random() < 0.08) {
                    status = 'FLAGGED';
                    reason = 'Pattern suspect détecté';
                } else if (Math.random() < 0.05) {
                    status = 'BLOCKED';
                    reason = 'Rule #7: IP malveillante';
                }

                newPackets.push({
                    id: packetIdRef.current,
                    timestamp: getTimestamp(),
                    src: isIncoming ? randomIP(false) : '192.168.1.100',
                    dst: isIncoming ? '192.168.1.100' : randomIP(false),
                    protocol,
                    port,
                    size,
                    status,
                    reason,
                });
            }

            setPackets(prev => [...prev.slice(-29), ...newPackets]);
            setTotalPackets(prev => prev + numPackets);
            setBlockedCount(prev => prev + newPackets.filter(p => p.status === 'BLOCKED').length);
            setFlaggedCount(prev => prev + newPackets.filter(p => p.status === 'FLAGGED').length);
            setAllowedCount(prev => prev + newPackets.filter(p => p.status === 'ALLOWED').length);

            const newBandwidth = newPackets.reduce((sum, p) => sum + p.size, 0) * 8 / 1000;
            setBandwidth(parseFloat(newBandwidth.toFixed(1)));
            setBandwidthHistory(prev => [...prev.slice(-59), newBandwidth]);

            setCpuUsage(parseFloat((12 + Math.random() * 15).toFixed(1)));
            setMemUsage(parseFloat((34 + Math.random() * 8).toFixed(1)));

            // Random threat
            if (Math.random() < 0.12) {
                const threat = THREAT_TYPES[Math.floor(Math.random() * THREAT_TYPES.length)];
                setThreats(prev => [...prev.slice(-9), {
                    timestamp: getTimestamp(),
                    type: threat.type,
                    severity: threat.severity,
                    source: randomIP(false),
                    detail: threat.detail,
                }]);
            }
        }, 800);

        return () => clearInterval(interval);
    }, [isRunning, rules, getTimestamp]);

    // Auto-scroll
    useEffect(() => {
        if (packetLogRef.current) packetLogRef.current.scrollTop = packetLogRef.current.scrollHeight;
    }, [packets]);
    useEffect(() => {
        if (threatLogRef.current) threatLogRef.current.scrollTop = threatLogRef.current.scrollHeight;
    }, [threats]);

    // Draw bandwidth chart
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

        // Grid
        ctx.strokeStyle = '#1a1a2e';
        ctx.lineWidth = 0.5;
        for (let i = 1; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(0, (h / 4) * i);
            ctx.lineTo(w, (h / 4) * i);
            ctx.stroke();
        }

        if (bandwidthHistory.length < 2) return;
        const maxBw = Math.max(...bandwidthHistory, 10);

        // Fill area
        ctx.beginPath();
        ctx.moveTo(0, h);
        bandwidthHistory.forEach((val, i) => {
            const x = (i / 59) * w;
            const y = h - (val / maxBw) * h * 0.9;
            ctx.lineTo(x, y);
        });
        ctx.lineTo(((bandwidthHistory.length - 1) / 59) * w, h);
        ctx.closePath();
        ctx.fillStyle = 'rgba(78, 205, 196, 0.1)';
        ctx.fill();

        // Line
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        bandwidthHistory.forEach((val, i) => {
            const x = (i / 59) * w;
            const y = h - (val / maxBw) * h * 0.9;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.stroke();

        ctx.font = '11px monospace';
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText(`Bandwidth: ${bandwidth.toFixed(1)} kbps`, 10, 15);
    }, [bandwidthHistory, bandwidth]);

    const severityColor = (s: string) => {
        switch (s) {
            case 'CRITICAL': return '#ff4444';
            case 'HIGH': return '#ff6b6b';
            case 'MEDIUM': return '#ffe66d';
            case 'LOW': return '#4ecdc4';
            default: return '#888';
        }
    };

    const statusColor = (s: string) => {
        switch (s) {
            case 'ALLOWED': return '#4ecdc4';
            case 'BLOCKED': return '#ff6b6b';
            case 'FLAGGED': return '#ffe66d';
            default: return '#888';
        }
    };

    return (
        <div className="site-page-content">
            <div style={{ marginBottom: 16 }}>
                <Link to="/projects/software">← Retour aux projets</Link>
            </div>
            <h1>CyberGuard — Pare-feu Intelligent</h1>
            <h3>Dashboard de monitoring réseau</h3>
            <br />
            <p>
                Cette démo simule le dashboard de monitoring de CyberGuard, déployé sur Raspberry Pi. Le système analyse le trafic réseau en temps réel, applique des règles iptables et détecte les menaces via analyse comportementale.
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
                <div style={styles.statusChip}>
                    <span style={{ color: isRunning ? '#4ecdc4' : '#ff6b6b' }}>●</span>
                    {' '}{isRunning ? 'MONITORING ACTIF' : 'EN PAUSE'}
                </div>
                <div style={styles.statusChip}>🖥️ CPU: {cpuUsage}%</div>
                <div style={styles.statusChip}>💾 RAM: {memUsage}%</div>
            </div>

            {/* Stats cards */}
            <div style={styles.statsRow}>
                <div style={{ ...styles.statCard, borderColor: '#4ecdc4' }}>
                    <div style={{ color: '#888', fontSize: 11 }}>TOTAL PAQUETS</div>
                    <div style={{ fontSize: 28, fontWeight: 'bold', color: '#fff', fontFamily: 'monospace' }}>{totalPackets}</div>
                </div>
                <div style={{ ...styles.statCard, borderColor: '#4ecdc4' }}>
                    <div style={{ color: '#888', fontSize: 11 }}>AUTORISÉS</div>
                    <div style={{ fontSize: 28, fontWeight: 'bold', color: '#4ecdc4', fontFamily: 'monospace' }}>{allowedCount}</div>
                </div>
                <div style={{ ...styles.statCard, borderColor: '#ff6b6b' }}>
                    <div style={{ color: '#888', fontSize: 11 }}>BLOQUÉS</div>
                    <div style={{ fontSize: 28, fontWeight: 'bold', color: '#ff6b6b', fontFamily: 'monospace' }}>{blockedCount}</div>
                </div>
                <div style={{ ...styles.statCard, borderColor: '#ffe66d' }}>
                    <div style={{ color: '#888', fontSize: 11 }}>SUSPECTS</div>
                    <div style={{ fontSize: 28, fontWeight: 'bold', color: '#ffe66d', fontFamily: 'monospace' }}>{flaggedCount}</div>
                </div>
            </div>

            {/* Bandwidth chart */}
            <div style={styles.section}>
                <h3>📊 Bande passante (temps réel)</h3>
                <canvas ref={canvasRef} width={700} height={120} style={styles.canvas} />
            </div>

            {/* Packet log + Threats side by side */}
            <div style={styles.row}>
                <div style={{ flex: 2 }}>
                    <h3>📦 Trafic réseau (derniers paquets)</h3>
                    <div ref={packetLogRef} style={styles.terminal}>
                        {packets.map((pkt) => (
                            <div key={pkt.id} style={{ color: statusColor(pkt.status), fontSize: 11, lineHeight: '17px' }}>
                                [{pkt.timestamp}] {pkt.status.padEnd(7)} {pkt.protocol.padEnd(5)} {pkt.src}:{pkt.port} → {pkt.dst} ({pkt.size}B)
                                {pkt.reason && <span style={{ color: '#888' }}> — {pkt.reason}</span>}
                            </div>
                        ))}
                        {isRunning && <span style={{ color: '#4ecdc4' }}>_</span>}
                    </div>
                </div>
                <div style={{ flex: 1, minWidth: 250 }}>
                    <h3>🚨 Alertes & Menaces</h3>
                    <div ref={threatLogRef} style={{ ...styles.terminal, maxHeight: 220 }}>
                        {threats.length === 0 && (
                            <div style={{ color: '#4ecdc4' }}>Aucune menace détectée...</div>
                        )}
                        {threats.map((t, i) => (
                            <div key={i} style={{ marginBottom: 8, borderBottom: '1px solid #1a1a2e', paddingBottom: 6 }}>
                                <div style={{ color: severityColor(t.severity), fontWeight: 'bold', fontSize: 12 }}>
                                    [{t.severity}] {t.type}
                                </div>
                                <div style={{ color: '#888', fontSize: 10 }}>
                                    {t.timestamp} — Source: {t.source}
                                </div>
                                <div style={{ color: '#b0b0b0', fontSize: 11 }}>
                                    {t.detail}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Firewall rules */}
            <div style={styles.section}>
                <h3>🔧 Règles iptables actives</h3>
                <div style={styles.rulesBox}>
                    {rules.map((rule) => (
                        <div key={rule.id} style={styles.ruleRow}>
                            <button
                                style={{
                                    ...styles.ruleToggle,
                                    backgroundColor: rule.active ? '#4ecdc4' : '#333',
                                    color: rule.active ? '#000' : '#888',
                                }}
                                onClick={() => {
                                    setRules(prev => prev.map(r =>
                                        r.id === rule.id ? { ...r, active: !r.active } : r
                                    ));
                                }}
                            >
                                {rule.active ? 'ON' : 'OFF'}
                            </button>
                            <span style={{ color: rule.active ? '#e0e0e0' : '#555', fontFamily: 'monospace', fontSize: 12 }}>
                                #{rule.id} — {rule.rule}
                            </span>
                        </div>
                    ))}
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
    statsRow: {
        display: 'flex',
        gap: 12,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    statCard: {
        flex: 1,
        minWidth: 120,
        backgroundColor: '#0d1117',
        border: '1px solid',
        borderRadius: 8,
        padding: 16,
        textAlign: 'center',
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
    row: {
        display: 'flex',
        gap: 16,
        marginBottom: 24,
        flexWrap: 'wrap',
    },
    terminal: {
        backgroundColor: '#0a0a0a',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 16,
        fontFamily: 'monospace',
        fontSize: 12,
        maxHeight: 220,
        overflowY: 'auto',
        marginTop: 8,
    },
    rulesBox: {
        backgroundColor: '#0d1117',
        border: '1px solid #1a1a2e',
        borderRadius: 8,
        padding: 12,
        marginTop: 8,
    },
    ruleRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '6px 0',
        borderBottom: '1px solid #1a1a2e',
    },
    ruleToggle: {
        padding: '3px 10px',
        border: 'none',
        borderRadius: 3,
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 11,
        minWidth: 40,
    },
};

export default CyberGuardDemo;
