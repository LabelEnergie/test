import { Montserrat as font } from "next/font/google";
import dynamic from 'next/dynamic';
import "animate.css";
import { Metadata } from "next";
import { AppProviders } from "./providers";
import Layout from '@/components/Layout';  // Importation statique au lieu de dynamique

const typo = font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Label Energie",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={typo.className}>
        <AppProviders>
          <Layout>{children}</Layout>
        </AppProviders>
      </body>
    </html>
  );
}
