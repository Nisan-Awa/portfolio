import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nisan Awa | Flutter Developer & Engineering Builder",
  description:
    "Portfolio of Nisan Awa, a Flutter Developer and final-year Electrical & Electronics Engineering student building at the intersection of hardware, software, AI and automation.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/brand/nisan-logo.svg",
  },
};

import { Background } from "@/components/ui/Background";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground"
      >
        <Background />
        {children}
      </body>
    </html>
  );
}
