<div align="center">

# 🌐 Hybrid Multi-Node Infrastructure & Full-Stack Portfolio

**A modern, resilient distributed architecture connecting Vercel Global Edge CDN, on-premise Debian hardware, and cloud AI agent workspaces via encrypted Cloudflare Zero-Trust Tunnels.**

[![Production Live](https://img.shields.io/badge/Production-kimkerans.my.id-00f2fe?style=for-the-badge&logo=vercel&logoColor=black)](https://kimkerans.my.id)
[![AI Studio](https://img.shields.io/badge/AI_Studio-kimkerans.eu.cc-a855f7?style=for-the-badge&logo=openai&logoColor=white)](https://kimkerans.eu.cc)
[![Backend Status](https://img.shields.io/badge/Telemetry_API-Online-10b981?style=for-the-badge&logo=fastapi&logoColor=white)](https://api.kimkerans.my.id/api/homelab-status)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-100%2F100-34d399?style=for-the-badge&logo=googlechrome&logoColor=black)](https://pagespeed.web.dev/analysis/https-kimkerans-my-id/8r89q3crx7)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ System Architecture

```mermaid
graph TD
    User["🌐 Visitor / Client Browser"]

    subgraph EdgeLayer ["1. Global Edge & CDN Layer"]
        Vercel["⚡ Vercel Global Edge CDN<br/><b>kimkerans.my.id</b><br/>(Next.js 15 + Tailwind CSS)"]
        CF_DNS["🛡️ Cloudflare Zero Trust DNS<br/>(DDoS Mitigation & WAF)"]
    end

    subgraph OnPremNode ["2. On-Premise Node: Axioo MyBook 14H (Debian 12)"]
        CFTunnel_Home["🔒 cloudflared Tunnel Daemon"]
        FastAPI["🚀 FastAPI ASGI Engine (Port 8000)<br/><b>api.kimkerans.my.id</b>"]
        
        subgraph AxiooServices ["Self-Hosted Services"]
            psutil["📊 Hardware Sensors (psutil)"]
            NVMe["💾 256GB NVMe Public Storage"]
            SQLite["🗄️ SQLite Visitor Analytics"]
            Pihole["🛡️ Pi-hole DNS Sinkhole"]
            Vault["🔑 Vaultwarden Vault"]
            Kuma["📈 Uptime Kuma Monitor"]
            Navi["🎵 Navidrome & Syncthing"]
        end
    end

    subgraph CloudAINode ["3. Cloud AI & Agent Node: Linux VPS"]
        CFTunnel_Cloud["🔒 cloudflared Tunnel Daemon"]
        Odysseus["🧠 Odysseus AI Studio (Port 7000)<br/><b>kimkerans.eu.cc</b>"]
        OpenClaw["🦞 OpenClaw 2.0 Autonomous Agent<br/>(Telegram Gateway)"]
    end

    subgraph AIProviders ["4. High-Speed Inference Engine"]
        Groq["⚡ Groq Cloud LPU (Llama 3.3 70B / 300+ tok/s)"]
        OpenRouter["🤖 OpenRouter (DeepSeek-R1 / Qwen-2.5-Coder)"]
    end

    %% Network Routing
    User -->|"1. HTTPS Static Page Load"| Vercel
    User -->|"2. Async Real-time Telemetry"| CF_DNS
    CF_DNS -->|"3. Encrypted Outbound Route"| CFTunnel_Home
    CFTunnel_Home --> FastAPI

    FastAPI --> psutil
    FastAPI --> NVMe
    FastAPI --> SQLite
    FastAPI -.->|"Proxy Stream"| Groq

    %% Cloud AI Studio Route
    User -->|"4. Interactive Studio & Canvas"| CF_DNS
    CF_DNS -->|"5. Zero-Trust Route"| CFTunnel_Cloud
    CFTunnel_Cloud --> Odysseus
    Odysseus -.-> OpenRouter
    OpenClaw -.->|"24/7 Mobile Tasks"| OpenRouter

✨ Key Engineering Highlights
1. 🌐 Decoupled Full-Stack Architecture
Frontend: Next.js App Router edge-cached on Vercel with sub-second First Contentful Paint (<0.8s) and 0 layout shift (CLS: 0.00).
Backend: Asynchronous Python API built with FastAPI running on on-premise hardware, streaming token-by-token responses via Server-Sent Events (SSE).
Security: 100% Zero-Trust networking via Cloudflare Tunnels (cloudflared), completely eliminating public IP exposure and open router inbound ports.
2. 📊 Live Real-Time Telemetry & SSD Storage
Queries physical hardware sensors (CPU load, RAM utilization, NVMe capacity) dynamically using psutil.
Scans local socket ports for active homelab containers (Pi-hole, Vaultwarden, Navidrome, Uptime Kuma, Syncthing).
Direct file streaming from the host's NVMe SSD for fast public artifact distribution.
3. 🤖 Dual AI Ecosystem
Public Resume Assistant: Embedded on https://kimkerans.my.id, streaming instant technical answers at 300+ tokens/sec using Groq LPUs.
Private Cloud AI Studio: Self-hosted Odysseus Studio on https://kimkerans.eu.cc featuring side-by-side artifact editing, multi-user role management, and 200+ multi-model switching via OpenRouter.
Autonomous Telegram Agent: OpenClaw 2.0 daemon executing scheduled tasks, web research, and server automations straight from mobile chat.
4. 🛡️ Cybersecurity Research
Detailed technical breakdown and weaponized proof-of-concept for CVE-2018-12633 (TP-Link TL-WR840N Authentication Bypass and CGI parameter injection).
🛠️ Complete Tech Stack
Domain	Technologies Used
Frontend	Next.js 15, React 19, TypeScript, Tailwind CSS, Vercel Web Analytics
Backend	FastAPI, Uvicorn (ASGI), Python 3.11+, Pydantic, psutil, aiofiles
AI & LLM Orchestration	Groq Cloud LPU SDK, OpenRouter, Odysseus Studio, OpenClaw 2.0, Ollama
Edge & Security	Cloudflare Zero Trust Tunnels, Cloudflare Email Routing, UFW Firewall, Tailscale Mesh
On-Premise Infrastructure	Axioo MyBook 14H (Intel Celeron N4020, 4GB RAM, 256GB NVMe SSD, Debian 12)
Cloud Node	Dedicated Linux VPS (x86_64, Docker Compose, Systemd)

👨‍💻 Author
Ignatius Wilhelmus Kim Kerans
Portfolio: https://kimkerans.my.id
AI Studio: https://kimkerans.eu.cc
GitHub: @wiliam227user
Contact: wiliam.ignasius@gmail.com