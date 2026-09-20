'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface HomelabData {
  status: string;
  system: {
    cpu_usage_percent: number;
    ram_usage_percent: number;
    disk_free_gb: number;
    disk_total_gb: number;
  };
  services: Record<string, string>;
}

interface FileItem {
  name: string;
  size_mb: number;
}

const API_URL = "https://api.kimkerans.my.id";

export default function Home() {
  const [data, setData] = useState<HomelabData | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch live telemetry from Axioo N4020 backend
    fetch(`${API_URL}/api/homelab-status`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend telemetry offline:", err);
        setLoading(false);
      });

    // 2. Fetch shared files on SSD storage
    fetch(`${API_URL}/api/files`)
      .then((res) => res.json())
      .then((json) => setFiles(json.files || []))
      .catch(() => {});

    // 3. Log visitor beacon to local SQLite database
    fetch(`${API_URL}/api/collect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* =====================================================
            1. HERO SECTION
        ===================================================== */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 text-xs font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Security Research • Distributed Infrastructure
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 shadow-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${data ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              {data ? "Axioo Home Server: Online" : "Home Server: Connecting..."}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Ignatius Wilhelmus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              Kim Kerans
            </span>
          </h1>

          <p className="text-slate-300 max-w-2xl text-base md:text-lg leading-relaxed">
            Exploring embedded security vulnerabilities, edge cloud architectures, and self-hosted high-availability homelab infrastructure.
          </p>

          <div className="flex flex-wrap gap-3 pt-3">
            <a
              href="https://github.com/wiliam227user"
              target="_blank"
              rel="noreferrer"
              className="px-4.5 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-sm font-medium transition flex items-center gap-2 text-slate-100 hover:border-cyan-500/50 shadow-md"
            >
              <span>GitHub Profile</span> →
            </a>
            <a
              href="#contact"
              className="px-4.5 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-sm font-medium text-cyan-300 transition shadow-md"
            >
              Get in Touch
            </a>
            <Link
              href="/admin"
              className="px-4 py-2 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-400 hover:text-cyan-400 transition flex items-center"
            >
              Telemetry Admin ↗
            </Link>
          </div>
        </section>

        {/* =====================================================
            2. FEATURED RESEARCH & PROJECTS (6-CARD GRID)
        ===================================================== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Security Research & Infrastructure
            </h2>
            <span className="text-xs font-mono text-slate-400">6 Active Nodes & Projects</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* 1. CVE Case Study */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/80 text-rose-300 border border-rose-800/60 font-semibold">
                    CVE-2018-12633
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Firmware Exploit</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                  TP-Link TL-WR840N Auth Bypass
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  Exploitation analysis of unauthenticated CGI parameter handling and session bypass in legacy router firmware.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <a href="https://github.com/wiliam227user/CVE-2018-12633-TPLink-Auth-Bypass" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-300">
                  GitHub PoC ↗
                </a>
                <Link href="/case-studies/cve-2018-12633" className="text-cyan-400 font-semibold hover:underline">
                  Case Study →
                </Link>
              </div>
            </div>

            {/* 2. Hybrid Cloud Bridge */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold">
                    Hybrid Bridge
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">api.kimkerans.my.id</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition">
                  Axioo On-Premise Engine
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  Asynchronous FastAPI backend streaming hardware telemetry, visitor analytics, and storage via Cloudflare Tunnels.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <span className="text-slate-400">FastAPI • Debian 12</span>
                <span className="text-emerald-400 font-semibold">● Active</span>
              </div>
            </div>

            {/* 3. Odysseus AI Studio */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/60 font-semibold">
                    AI Studio
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">kimkerans.eu.cc</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition">
                  Odysseus AI Workspace
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  Self-hosted multi-model research studio with interactive artifact editing, password authentication, and OpenRouter integration.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <span className="text-slate-400">Docker • OpenRouter</span>
                <a href="https://kimkerans.eu.cc" target="_blank" rel="noreferrer" className="text-purple-400 hover:underline">
                  Launch Studio ↗
                </a>
              </div>
            </div>

            {/* 4. OpenClaw Autonomous Agent */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-semibold">
                    Autonomous
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Telegram Gateway</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition">
                  OpenClaw 2.0 Agent
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  24/7 background AI daemon processing server tasks, web research, and tool automation via mobile Telegram chat.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <span className="text-slate-400">Node.js • Systemd</span>
                <span className="text-emerald-400 font-semibold">● Connected</span>
              </div>
            </div>

            {/* 5. DNS Sinkhole (Pi-hole) */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 text-amber-300 border border-amber-800/60 font-semibold">
                    DNS Defense
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Network Security</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition">
                  Pi-hole DNS Sinkhole
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  Bare-metal recursive DNS resolver filtering tracker telemetry and malicious C2 botnet domains network-wide.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <span className="text-slate-400">FTL Engine • Tailscale</span>
                <span className="text-emerald-400 font-semibold">● Active</span>
              </div>
            </div>

            {/* 6. Vaultwarden Micro-Service */}
            <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-cyan-500/60 transition flex flex-col justify-between group shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 font-semibold">
                    Zero-Trust
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">Identity Access</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition">
                  Vaultwarden Key Vault
                </h3>
                <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                  High-efficiency Rust password management cluster with AES-256 local encrypted storage and zero third-party dependencies.
                </p>
              </div>
              <div className="pt-4 flex justify-between items-center text-xs font-mono border-t border-slate-800/80 mt-3">
                <span className="text-slate-400">Docker • Rust</span>
                <span className="text-emerald-400 font-semibold">● Isolated</span>
              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            3. LIVE HOMELAB TELEMETRY & PUBLIC STORAGE (3 COLS)
        ===================================================== */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Live Homelab Telemetry
            </h2>
            <span className="text-xs font-mono text-slate-400">Node: Axioo N4020 / Debian 12</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Col 1: Hardware Specs */}
            <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-4 shadow-lg">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Hardware Metrics</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Polling hardware sensors...</p>
              ) : data ? (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>CPU Load</span>
                      <span className="font-bold text-white">{data.system.cpu_usage_percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal-400 to-cyan-500 transition-all duration-500" style={{ width: `${Math.min(data.system.cpu_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1.5">
                      <span>RAM Utilization</span>
                      <span className="font-bold text-white">{data.system.ram_usage_percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500" style={{ width: `${Math.min(data.system.ram_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">NVMe Free</span>
                    <span className="text-emerald-400 font-bold font-mono">{data.system.disk_free_gb} GB</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Node telemetry unreachable</p>
              )}
            </div>

            {/* Col 2: Self-Hosted Services */}
            <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3 shadow-lg">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Self-Hosted Services</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Scanning container ports...</p>
              ) : data ? (
                <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                  {Object.entries(data.services).map(([name, status]) => (
                    <div key={name} className="flex justify-between items-center px-3 py-1.5 bg-slate-950/50 rounded-lg border border-slate-800/80">
                      <span className="capitalize text-slate-200">{name.replace('_', ' ')}</span>
                      <span className={status === 'online' ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        ● {status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Services offline</p>
              )}
            </div>

            {/* Col 3: Public SSD Storage */}
            <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Public SSD Storage</h3>
                {files.length === 0 ? (
                  <p className="text-xs text-slate-400 font-mono mt-3">No public artifacts in directory.</p>
                ) : (
                  <div className="space-y-2 mt-2">
                    {files.map((file) => (
                      <div key={file.name} className="flex justify-between items-center p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/80 text-xs">
                        <span className="truncate max-w-[120px] text-slate-200 font-mono">{file.name}</span>
                        <a
                          href={`${API_URL}/api/files/download/${encodeURIComponent(file.name)}`}
                          className="px-2.5 py-1 bg-cyan-600/20 text-cyan-300 border border-cyan-500/40 rounded-md text-[11px] hover:bg-cyan-600/40 transition font-mono font-medium"
                          download
                        >
                          {file.size_mb}MB ↓
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-mono border-t border-slate-800 pt-2.5">
                Origin: Debian 12 / NVMe SSD
              </p>
            </div>

          </div>
        </section>

        {/* =====================================================
            4. INTERACTIVE CONTACT FORM WITH TELEGRAM DISPATCH
        ===================================================== */}
        <section id="contact" className="p-6 md:p-8 bg-slate-900/60 border border-slate-800 rounded-3xl space-y-6 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">#</span> Direct Contact Dispatch
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Messages are stored locally on Axioo NVMe & trigger instant encrypted Telegram notifications.
              </p>
            </div>
            <span className="text-xs font-mono px-3 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded-lg font-semibold">
              Telegram Connected
            </span>
          </div>

          <ContactForm />
        </section>

        {/* =====================================================
            5. FOOTER
        ===================================================== */}
        <footer className="border-t border-slate-800/80 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-400">
          <p>© {new Date().getFullYear()} Ignatius Wilhelmus Kim Kerans</p>
          <p className="flex items-center gap-1.5">
            <span>Edge Hosted on</span>
            <span className="text-slate-200 font-semibold">Vercel</span>
            <span>+</span>
            <span className="text-slate-200 font-semibold">Cloudflare Tunnel</span>
          </p>
        </footer>

      </main>

      {/* =====================================================
          6. UPGRADED REAL-TIME STREAMING AI ASSISTANT
      ===================================================== */}
      <AiAssistant />
    </div>
  );
}

// =====================================================
// CONTACT FORM COMPONENT
// =====================================================
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-300">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-300">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-mono text-slate-300">Message</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Let's collaborate on a security audit, vulnerability research, or full-stack deployment..."
          className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider uppercase transition disabled:opacity-50 shadow-md"
        >
          {status === 'loading' ? 'Dispatching...' : 'Send Message →'}
        </button>

        {status === 'success' && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            ✓ Dispatched to Ignatius's node & Telegram
          </span>
        )}
        {status === 'error' && (
          <span className="text-xs font-mono text-rose-400">
            ⚠ Failed to reach backend node.
          </span>
        )}
      </div>
    </form>
  );
}

// =====================================================
// UPGRADED AI CHAT ASSISTANT COMPONENT
// =====================================================
function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: "Hello! I am Kim's AI Portfolio Assistant. Ask me anything about his CVE security research, homelab setup, Odysseus Studio, or full-stack projects." },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClear = () => {
    if (isStreaming) return;
    setMessages([
      { role: 'assistant', text: "Chat cleared. What else would you like to know about Kim's infrastructure or projects?" },
    ]);
  };

  const handleSend = async (questionText?: string) => {
    const query = questionText || input;
    if (!query.trim() || isStreaming) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: query }];
    setMessages([...newMessages, { role: 'assistant', text: '' }]);
    setIsStreaming(true);

    try {
      const response = await fetch(`${API_URL}/api/chat/stream`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query }),
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to connect to streaming backend.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let streamedAnswer = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.replace('data: ', '').trim();
            if (dataStr === '[DONE]') {
              setIsStreaming(false);
              return;
            }
            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.token) {
                streamedAnswer += parsed.token;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', text: streamedAnswer };
                  return updated;
                });
              } else if (parsed.error) {
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = { role: 'assistant', text: `⚠ ${parsed.error}` };
                  return updated;
                });
              }
            } catch {
              // Ignore non-JSON lines
            }
          }
        }
      }
    } catch (err: any) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', text: '⚠ Error connecting to streaming node.' };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Circular Toggle Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 px-4.5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-full shadow-2xl transition hover:scale-105 active:scale-95"
        >
          <span className="text-base">💬</span>
          <span className="text-xs font-mono tracking-wide">Ask AI Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {open && (
        <div className="w-[92vw] sm:w-96 h-[520px] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          
          {/* Top Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white font-mono">Kim's AI Assistant</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleClear}
                disabled={isStreaming}
                title="Clear Conversation"
                className="text-slate-400 hover:text-cyan-300 text-xs px-2 py-1 rounded-lg hover:bg-slate-800 transition font-mono disabled:opacity-40"
              >
                Clear
              </button>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-slate-800 transition"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs font-mono">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none leading-relaxed shadow-sm'
                  }`}
                >
                  <span className="whitespace-pre-wrap">{m.text}</span>
                  {isStreaming && idx === messages.length - 1 && (
                    <span className="inline-block w-1.5 h-3.5 ml-1 bg-cyan-400 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto text-[10px] font-mono scrollbar-none">
            <button
              onClick={() => handleSend('Tell me about your CVE-2018-12633 router research.')}
              disabled={isStreaming}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg whitespace-nowrap transition disabled:opacity-40 border border-slate-700/60"
            >
              CVE Research?
            </button>
            <button
              onClick={() => handleSend('What hardware & docker apps run in your homelab?')}
              disabled={isStreaming}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg whitespace-nowrap transition disabled:opacity-40 border border-slate-700/60"
            >
              Homelab Specs?
            </button>
            <button
              onClick={() => handleSend('Tell me about your Odysseus AI Studio at kimkerans.eu.cc.')}
              disabled={isStreaming}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg whitespace-nowrap transition disabled:opacity-40 border border-slate-700/60"
            >
              Odysseus Studio?
            </button>
            <button
              onClick={() => handleSend('What is your full-stack technology stack?')}
              disabled={isStreaming}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg whitespace-nowrap transition disabled:opacity-40 border border-slate-700/60"
            >
              Tech Stack?
            </button>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isStreaming}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Kim..."
              className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50 transition"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs font-mono disabled:opacity-50 transition shadow-sm"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}