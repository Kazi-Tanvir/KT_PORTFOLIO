import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Kazi Tanvir | Portfolio",
  description: "Full-Stack Developer Specializing in Neobrutalist Design & High-Performance Systems",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-on-surface font-body border-[8px] border-black min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
