import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EJ's_DIGITAL_TWIN",
  description: "Official AI representative of EJ",
  manifest: "/manifest.json",
  icons: {
    icon: "https://flaticon.com",
    apple: "https://flaticon.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffd700" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body>{children}</body>
    </html>
  );
}
