import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kimkerans.eu.cc"),
  title: "Ignatius Wilhelmus Kim Kerans | Full-Stack & Homelab Security",
  description:
    "Cybersecurity Research, Embedded Router Exploits (CVE-2018-12633), and On-Premise Hybrid Homelab Infrastructure.",
  keywords: [
    "Kim Kerans",
    "Ignatius Wilhelmus Kim Kerans",
    "Cybersecurity",
    "Homelab",
    "CVE-2018-12633",
    "FastAPI",
    "Next.js",
    "Cloudflare Tunnels",
    "Full-Stack",
  ],
  authors: [{ name: "Ignatius Wilhelmus Kim Kerans", url: "https://kimkerans.eu.cc" }],
  creator: "Ignatius Wilhelmus Kim Kerans",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kimkerans.eu.cc",
    siteName: "Kim Kerans Portfolio & Telemetry Hub",
    title: "Ignatius Wilhelmus Kim Kerans | Full-Stack & Security Researcher",
    description:
      "Hybrid edge-to-on-premise architecture with real-time homelab telemetry, CVE research, and AI integration.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kim Kerans Portfolio & Homelab Hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignatius Wilhelmus Kim Kerans | Full-Stack & Security Researcher",
    description:
      "Hybrid edge-to-on-premise architecture with real-time homelab telemetry and CVE research.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0a0f18] text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}