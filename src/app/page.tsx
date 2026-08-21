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

export default function Home() {
  const [data, setData] = useState<HomelabData | null>(null);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://api.kimkerans.eu.cc";

  useEffect(() => {
    fetch(`${API_URL}/api/homelab-status`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Backend offline:", err);
        setLoading(false);
      });

    fetch(`${API_URL}/api/files`)
      .then((res) => res.json())
      .then((json) => setFiles(json.files || []))
      .catch(() => {});

    fetch(`${API_URL}/api/collect`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: window.location.pathname }),
    }).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <main className="relative max-w-5xl mx-auto px-6 py-12 md:py-20 space-y-16">
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Security Research • Homelab Infrastructure
            </div>

            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-xs font-mono text-slate-300">
              <span className={`w-2 h-2 rounded-full ${data ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              {data ? "Axioo Home Server: Online" : "Home Server: Connecting..."}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Ignatius Wilhelmus <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">
              Kim Kerans
            </span>
          </h1>

          <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed">
            Exploring embedded security vulnerabilities, edge cloud architectures, and self-hosted high-availability homelab infrastructure.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://github.com/wiliam227user"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-sm font-medium transition flex items-center gap-2 text-slate-200"
            >
              <span>GitHub</span> →
            </a>
            <a
              href="#contact"
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-300 transition"
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

        {/* FEATURED RESEARCH & PROJECTS (4-CARD GRID) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Security Research & Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-rose-950/60 text-rose-400 border border-rose-800/50">
                    CVE-2018-12633
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Firmware Exploit</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">
                  TP-Link TL-WR840N Auth Bypass
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Technical case study and exploitation analysis of authentication bypass vulnerabilities in legacy TP-Link router firmware.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Shell / Python</span>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/wiliam227user/CVE-2018-12633-TPLink-Auth-Bypass"
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-cyan-400 transition"
                  >
                    GitHub PoC ↗
                  </a>
                  <Link
                    href="/case-studies/cve-2018-12633"
                    className="text-cyan-400 font-semibold hover:underline"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                    Hybrid Homelab
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Infrastructure</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition">
                  Debian 12 Edge-to-Vercel Bridge
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Decoupled architecture connecting an on-premise Axioo N4020 server to Vercel global CDN using secure encrypted Cloudflare Tunnels.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>FastAPI • Cloudflared</span>
                <span className="text-emerald-400">Active Production</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/50">
                    DNS Defense
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Network Security</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                  Network-Wide DNS Sinkhole (Pi-hole)
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  Bare-metal DNS resolver filtering malicious telemetry, tracker networks, and automated botnet C2 traffic across all local subnets.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>FTL Engine • Tailscale</span>
                <span className="text-emerald-400">Self-Hosted</span>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-slate-800/80 rounded-2xl hover:border-cyan-500/50 transition flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-purple-950/60 text-purple-400 border border-purple-800/50">
                    Identity & Access
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Zero-Trust</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">
                  Vaultwarden Micro-Service
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                  High-efficiency Rust implementation of Bitwarden API with encrypted local SQLite storage, automated backups, and zero external dependency.
                </p>
              </div>
              <div className="pt-6 flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Docker • Rust</span>
                <span className="text-emerald-400">Isolated Container</span>
              </div>
            </div>

          </div>
        </section>

        {/* LIVE HOMELAB TELEMETRY & PUBLIC STORAGE (3 COLS) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Live Homelab Telemetry
            </h2>
            <span className="text-xs font-mono text-slate-500">Node: Axioo N4020 / Debian 12</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Hardware Metrics</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Polling hardware sensors...</p>
              ) : data ? (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>CPU Load</span>
                      <span className="text-slate-200">{data.system.cpu_usage_percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 transition-all duration-500" style={{ width: `${Math.min(data.system.cpu_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>RAM Utilization</span>
                      <span className="text-slate-200">{data.system.ram_usage_percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${Math.min(data.system.ram_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">NVMe Free</span>
                    <span className="text-emerald-400 font-bold">{data.system.disk_free_gb} GB</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Node telemetry unreachable</p>
              )}
            </div>

            <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Self-Hosted Services</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Scanning container ports...</p>
              ) : data ? (
                <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                  {Object.entries(data.services).map(([name, status]) => (
                    <div key={name} className="flex justify-between items-center px-2.5 py-1.5 bg-slate-950/40 rounded border border-slate-800/60">
                      <span className="capitalize text-slate-300">{name.replace('_', ' ')}</span>
                      <span className={status === 'online' ? 'text-emerald-400 font-semibold' : 'text-rose-400'}>
                        ● {status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Services offline</p>
              )}
            </div>

            <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Public SSD Storage</h3>
                {files.length === 0 ? (
                  <p className="text-xs text-slate-500 font-mono mt-3">No public artifacts in directory.</p>
                ) : (
                  <div className="space-y-2 mt-2">
                    {files.map((file) => (
                      <div key={file.name} className="flex justify-between items-center p-2 bg-slate-950/40 rounded border border-slate-800/60 text-xs">
                        <span className="truncate max-w-[120px] text-slate-300 font-mono">{file.name}</span>
                        <a
                          href={`${API_URL}/api/files/download/${encodeURIComponent(file.name)}`}
                          className="px-2 py-0.5 bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 rounded text-[11px] hover:bg-cyan-600/40 transition font-mono"
                          download
                        >
                          {file.size_mb}MB ↓
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-600 font-mono border-t border-slate-800/80 pt-2">
                Origin: Debian 12 / NVMe
              </p>
            </div>

          </div>
        </section>

        {/* INTERACTIVE CONTACT FORM */}
        <section id="contact" className="p-6 md:p-8 bg-slate-900/50 border border-slate-800 rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">#</span> Direct Contact Dispatch
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Messages are stored locally on Axioo NVMe & trigger instant encrypted Telegram notifications.
              </p>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 bg-cyan-950/60 text-cyan-400 border border-cyan-800/50 rounded-lg">
              Telegram Connected
            </span>
          </div>

          <ContactForm />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-slate-800/80 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <p>© {new Date().getFullYear()} Ignatius Wilhelmus Kim Kerans</p>
          <p className="flex items-center gap-1.5">
            <span>Edge Hosted on</span>
            <span className="text-slate-300">Vercel</span>
            <span>+</span>
            <span className="text-slate-300">Cloudflare Tunnel</span>
          </p>
        </footer>

      </main>

      {/* STEP 4: FLOATING AI RESUME ASSISTANT WIDGET */}
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
      const res = await fetch('https://api.kimkerans.eu.cc/api/contact', {
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
          <label className="text-xs font-mono text-slate-400">Your Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-400">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-xs font-mono text-slate-400">Message</label>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Let's collaborate on a security audit, vulnerability research, or full-stack deployment..."
          className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-cyan-500 transition"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl text-xs font-mono tracking-wider uppercase transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Dispatching...' : 'Send Message →'}
        </button>

        {status === 'success' && (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-fade-in">
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
// STEP 4: REAL-TIME STREAMING AI CHAT WIDGET
// =====================================================
function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: "Hello! I am Kim's AI Portfolio Assistant. Ask me anything about his CVE security research, homelab setup, or full-stack projects." },
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = async (questionText?: string) => {
    const query = questionText || input;
    if (!query.trim() || isStreaming) return;

    setInput('');
    const newMessages = [...messages, { role: 'user' as const, text: query }];
    setMessages([...newMessages, { role: 'assistant', text: '' }]);
    setIsStreaming(true);

    try {
      const response = await fetch('https://api.kimkerans.eu.cc/api/chat/stream', {
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
              }
            } catch {
              // Ignore non-JSON chunks
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
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-full shadow-2xl transition hover:scale-105"
        >
          <span className="text-base">💬</span>
          <span className="text-xs font-mono">Ask AI Assistant</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {open && (
        <div className="w-[90vw] md:w-96 h-[500px] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Top Header */}
          <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-sm font-bold text-white font-mono">Kim's AI Assistant</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-white text-sm px-2 py-0.5 rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs font-mono">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none'
                      : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none leading-relaxed'
                  }`}
                >
                  {m.text || <span className="animate-pulse">Thinking...</span>}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-slate-900/60 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto text-[10px] font-mono">
            <button
              onClick={() => handleSend('Tell me about his CVE-2018-12633 research.')}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded whitespace-nowrap"
            >
              CVE Research?
            </button>
            <button
              onClick={() => handleSend('What hardware runs in his homelab?')}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded whitespace-nowrap"
            >
              Homelab Specs?
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
              type="text"
              value={input}
              disabled={isStreaming}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Kim..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-cyan-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isStreaming || !input.trim()}
              className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs font-mono disabled:opacity-50 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}