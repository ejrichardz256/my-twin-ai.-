import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EJ's_DIGITAL_TWIN",
  manifest: "/manifest.json",
  themeColor: "#ffd700",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        ` }} />
      </head>
      <body className="bg-black">{children}</body>
    </html>
  );
}
