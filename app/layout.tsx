import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EJ's_DIGITAL_TWIN",
  description: "Official AI representative of EJ",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
