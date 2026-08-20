<div align="center">

# 🌐 Hybrid Homelab & Full-Stack Portfolio

**A modern, resilient web architecture bridging Vercel Global Edge CDN with an on-premise Debian Linux server via encrypted Cloudflare Tunnels.**

[![Production URL](https://img.shields.io/badge/Live-kimkerans.eu.cc-00f2fe?style=for-the-badge&logo=vercel&logoColor=black)](https://kimkerans.eu.cc)
[![Backend Status](https://img.shields.io/badge/API-api.kimkerans.eu.cc-10b981?style=for-the-badge&logo=fastapi&logoColor=white)](https://api.kimkerans.eu.cc/api/homelab-status)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## ⚡ Overview

This repository powers **[kimkerans.eu.cc](https://kimkerans.eu.cc)** — the personal portfolio and live telemetry dashboard for **Ignatius Wilhelmus Kim Kerans**. 

Instead of hosting a standard static site, this project utilizes a **Hybrid Cloud/On-Premise Architecture**:
* **Frontend:** Built with Next.js & Tailwind CSS, globally edge-cached on **Vercel**.
* **Backend:** Asynchronous Python API built with **FastAPI** running on a bare-metal **Axioo MyBook 14H** (Intel Celeron N4020, Debian 12).
* **Zero-Trust Network:** Secure outbound communication through **Cloudflare Tunnel (`cloudflared`)**, completely eliminating open router ports and exposing zero public IP addresses.

---

## 🏗️ System Architecture

```text
[ Visitor / Client Browser ]
         │
         ├── (1) HTTPS Page Load (Static Assets / HTML)
         ▼
[ Vercel Edge Global CDN ] ──────> https://kimkerans.eu.cc
         │
         ├── (2) Async Telemetry & File Downloads
         ▼
[ Cloudflare Zero Trust Edge ] ──> https://api.kimkerans.eu.cc
         │
         ▼ (Encrypted Outbound Tunnel — No Port Forwarding)
┌─────────────────────────────────────────────────────────────┐
│       ON-PREMISE NODE: AXIOO MYBOOK 14H (DEBIAN 12)         │
│                                                             │
│   [ cloudflared ] ───> [ FastAPI Backend (Port 8000) ]      │
│                               │                             │
│        ┌──────────────────────┼──────────────────────┐      │
│        ▼                      ▼                      ▼      │
│   [ psutil ]          [ NVMe Storage ]        [ SQLite DB ] │
│   (Telemetry)         (File Downloads)        (Analytics)   │
│                                                             │
│   ───────────────────────────────────────────────────────   │
│   [ Isolated Docker Infrastructure ]                        │
│   • Pi-hole   • Vaultwarden   • Navidrome   • Syncthing     │
│   • Uptime Kuma   • Dashy     • Cockpit Admin               │
└─────────────────────────────────────────────────────────────┘
```

## ✨ Key Features

- **🔴 Real-Time Homelab Telemetry:** Reads live CPU usage, RAM utilization, SSD capacity, and socket statuses for on-premise Docker services.
- **💾 Edge-to-Disk Shared Storage:** Streams and serves file downloads directly from the host's NVMe SSD over the encrypted tunnel.
- **🛡️ Privacy-Preserving Analytics:** Lightweight visitor logging engine using FastAPI and SQLite without invasive third-party trackers.
- **🔒 Zero-Trust Security:** No ports are forwarded on the local ISP router; Cloudflare handles DDoS mitigation, WAF screening, and SSL termination.
- **📑 Embedded Security Case Study:** Interactive documentation covering exploitation analysis of **CVE-2018-12633** (TP-Link Router Authentication Bypass).

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend UI** | Next.js 14/15, React, TypeScript, Tailwind CSS |
| **Edge Hosting** | Vercel Global Edge Network |
| **Backend API** | FastAPI, Uvicorn (ASGI), Python 3.11+ |
| **Edge Routing & Tunnel** | Cloudflare DNS, Cloudflare Zero Trust Tunnels (`cloudflared`) |
| **Database & Storage** | SQLite 3, Local NVMe SSD Storage |
| **On-Premise Infrastructure** | Debian 12 (Bookworm), Docker Compose, Systemd, Tailscale |

---

## 📁 Repository Structure

```text
portfolio-web/
├── src/
│   └── app/
│       ├── layout.tsx         # Root application layout and meta tags
│       ├── page.tsx           # Main portfolio dashboard & live telemetry UI
│       └── globals.css        # Tailwind styling & dark-mode themes
├── public/                    # Static assets & icons
├── package.json               # Node.js dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind design system tokens
└── README.md                  # System architecture documentation