import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kim Kerans | Full-Stack & Homelab Security",
  description: "Security Research, Embedded Exploits & Hybrid Homelab Infrastructure by Ignatius Wilhelmus Kim Kerans",
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
    <html lang="en" className="dark">
      <body className="bg-[#0a0f18] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}