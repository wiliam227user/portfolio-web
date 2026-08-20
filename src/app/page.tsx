'use client';
import { useEffect, useState } from 'react';

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
    // 1. Fetch live telemetry from Axioo N4020
    fetch(`${API_URL}/api/homelab-status`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // 2. Fetch shared SSD files
    fetch(`${API_URL}/api/files`)
      .then((res) => res.json())
      .then((json) => setFiles(json.files || []))
      .catch(() => {});

    // 3. Log visitor beacon to local SQLite
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
        
        {/* HERO SECTION */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/30 text-cyan-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Security Research • Homelab Infrastructure
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

          {/* Social / Direct Links */}
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
              href="mailto:contact@kimkerans.eu.cc"
              className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-sm font-medium text-cyan-300 transition"
            >
              Get in Touch
            </a>
          </div>
        </section>

        {/* FEATURED RESEARCH & PROJECTS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Security Research & Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CVE Case Study Card */}
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
                <a
                  href="https://github.com/wiliam227user/CVE-2018-12633-TPLink-Auth-Bypass"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  View Case Study →
                </a>
              </div>
            </div>

            {/* Hybrid Cloud Architecture Card */}
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

          </div>
        </section>

        {/* HOMELAB LIVE TELEMETRY & SSD STORAGE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">#</span> Live Homelab Telemetry
            </h2>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${data ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-slate-400">{data ? "Axioo N4020 Online" : "Connecting..."}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* System Specs Column */}
            <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Hardware Metrics</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Polling sensors...</p>
              ) : data ? (
                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>CPU Load</span>
                      <span className="text-slate-200">{data.system.cpu_usage_percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${Math.min(data.system.cpu_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>RAM Utilization</span>
                      <span className="text-slate-200">{data.system.ram_usage_percent}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${Math.min(data.system.ram_usage_percent, 100)}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex justify-between">
                    <span className="text-slate-400">NVMe Free</span>
                    <span className="text-emerald-400 font-bold">{data.system.disk_free_gb} GB</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Node unreachable</p>
              )}
            </div>

            {/* Running Services Column */}
            <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">Self-Hosted Services</h3>
              {loading ? (
                <p className="text-xs text-slate-500 font-mono">Scanning ports...</p>
              ) : data ? (
                <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                  {Object.entries(data.services).map(([name, status]) => (
                    <div key={name} className="flex justify-between items-center px-2.5 py-1.5 bg-slate-950/40 rounded border border-slate-800/60">
                      <span className="capitalize text-slate-300">{name.replace('_', ' ')}</span>
                      <span className={status === 'online' ? 'text-emerald-400' : 'text-rose-400'}>
                        ● {status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-rose-400 font-mono">Services offline</p>
              )}
            </div>

            {/* Shared SSD Downloads Column */}
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
                          className="px-2 py-0.5 bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 rounded text-[11px] hover:bg-cyan-600/40"
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
    </div>
  );
}