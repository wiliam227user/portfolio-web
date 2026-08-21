'use client';
import { useState } from 'react';
import Link from 'next/link';

interface LogItem {
  id: number;
  timestamp: string;
  path: string;
  ip: string;
  browser: string;
  os: string;
  device: string;
}

interface AnalyticsData {
  total_views: number;
  unique_visitors: number;
  top_paths: { path: string; count: number }[];
  top_browsers: { browser: string; count: number }[];
  top_os: { os: string; count: number }[];
  recent_logs: LogItem[];
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAnalytics = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`https://api.kimkerans.my.id/api/analytics?key=${encodeURIComponent(adminKey)}`);
      if (!res.ok) {
        throw new Error('Invalid Admin Key or Backend Unreachable');
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch analytics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f18] text-slate-200 font-sans p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h1 className="text-2xl font-black text-white">Axioo Private Telemetry & Analytics</h1>
            </div>
            <p className="text-sm text-slate-400 mt-1">Direct query into SQLite database via Cloudflare Tunnel</p>
          </div>
          <Link href="/" className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-mono text-cyan-400 transition">
            ← Back to Portfolio
          </Link>
        </div>

        {/* Authentication Box */}
        {!data ? (
          <div className="max-w-md mx-auto p-6 bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl mt-12 space-y-4">
            <h2 className="text-base font-bold text-white font-mono">🔑 Authenticate Admin Access</h2>
            <p className="text-xs text-slate-400">Enter the secret key configured in your Axioo FastAPI backend.</p>
            
            <form onSubmit={fetchAnalytics} className="space-y-3">
              <input
                type="password"
                placeholder="Enter Admin Secret Key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono focus:outline-none focus:border-cyan-500 text-white"
              />
              <button
                type="submit"
                disabled={loading || !adminKey}
                className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm transition disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Access Dashboard'}
              </button>
            </form>

            {error && <p className="text-xs font-mono text-rose-400">{error}</p>}
          </div>
        ) : (
          /* Dashboard Content */
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 font-mono">Total Pageviews</span>
                <p className="text-2xl font-black text-cyan-400 mt-1">{data.total_views}</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 font-mono">Unique IP Visitors</span>
                <p className="text-2xl font-black text-emerald-400 mt-1">{data.unique_visitors}</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 font-mono">Top Operating System</span>
                <p className="text-base font-bold text-slate-200 mt-1 truncate">{data.top_os[0]?.os || 'N/A'}</p>
              </div>
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
                <span className="text-xs text-slate-400 font-mono">Top Browser</span>
                <p className="text-base font-bold text-slate-200 mt-1 truncate">{data.top_browsers[0]?.browser || 'N/A'}</p>
              </div>
            </div>

            {/* Aggregation Breakdowns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-mono text-slate-400 uppercase">Top Visited Routes</h3>
                {data.top_paths.map((p, i) => (
                  <div key={i} className="flex justify-between text-xs font-mono py-1 border-b border-slate-800/60">
                    <span className="text-slate-300">{p.path}</span>
                    <span className="text-cyan-400 font-bold">{p.count} hits</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-mono text-slate-400 uppercase">Top Browsers</h3>
                {data.top_browsers.map((b, i) => (
                  <div key={i} className="flex justify-between text-xs font-mono py-1 border-b border-slate-800/60">
                    <span className="text-slate-300">{b.browser}</span>
                    <span className="text-emerald-400 font-bold">{b.count}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-2">
                <h3 className="text-xs font-mono text-slate-400 uppercase">Top Operating Systems</h3>
                {data.top_os.map((o, i) => (
                  <div key={i} className="flex justify-between text-xs font-mono py-1 border-b border-slate-800/60">
                    <span className="text-slate-300">{o.os}</span>
                    <span className="text-blue-400 font-bold">{o.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Visitor Logs Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white font-mono">Recent 30 Visitor Requests</h3>
                <button
                  onClick={() => fetchAnalytics()}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-mono text-cyan-400 transition"
                >
                  ↻ Refresh
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500">
                      <th className="pb-2">Timestamp (UTC)</th>
                      <th className="pb-2">Path</th>
                      <th className="pb-2">IP Address</th>
                      <th className="pb-2">Browser</th>
                      <th className="pb-2">OS</th>
                      <th className="pb-2">Device</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {data.recent_logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/40">
                        <td className="py-2.5 text-slate-500">{new Date(log.timestamp).toLocaleTimeString()}</td>
                        <td className="py-2.5 text-cyan-400">{log.path}</td>
                        <td className="py-2.5 text-slate-400">{log.ip}</td>
                        <td className="py-2.5">{log.browser}</td>
                        <td className="py-2.5">{log.os}</td>
                        <td className="py-2.5 text-slate-500">{log.device}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}