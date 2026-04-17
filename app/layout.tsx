import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EJ's_DIGITAL_TWIN",
  description: "Official AI representative of EJ",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
