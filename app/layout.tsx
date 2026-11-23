import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { Background } from "@/components/ui/Background";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nisanawa.tech"),
  title: "Nisan Awa | Software Engineer · Web & Mobile App Developer",
  description: "Awa Nisan Tojah is a Software Engineer, web and mobile app developer, Electrical & Electronics Engineer and ICT educator. B.Eng., Second Class Upper, Afe Babalola University, 2026. Explore client websites, mobile apps, engineering and mentorship.",
  openGraph: {
    title: "Nisan Awa | Software Engineer, Web & Mobile App Developer",
    description: "Engineering knowledge. Practical software. A commitment to sharing what I learn.",
    type: "website",
    locale: "en_NG",
    images: [{ url: "/assets/portraits/suit-3.webp", width: 1200, height: 1500, alt: "Awa Nisan Tojah" }],
  },
  twitter: { card: "summary_large_image", title: "Nisan Awa | Software Engineer, Web & Mobile App Developer", images: ["/assets/portraits/suit-3.webp"] },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/brand/nisan-logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <MotionProvider><Background />{children}</MotionProvider>
      </body>
    </html>
  );
}
