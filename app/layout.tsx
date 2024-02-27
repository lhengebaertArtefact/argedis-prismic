import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/prismicio";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: settings.data.meta_title || "argedis fallback",
    description: settings.data.meta_description || "argedis description",
    manifest: "/manifest.json",
    openGraph: {
      images: [settings.data.meta_image.url || ""],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="/script.js" />
        <Script src="/script2.js" />
        {children}
      </body>
    </html>
  );
}
