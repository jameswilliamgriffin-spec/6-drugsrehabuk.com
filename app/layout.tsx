import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://drugsrehabuk.com"),
  title: "Drug Rehab and Detox UK | The Wellbourne Clinic",
  description:
    "Clear, responsible guidance on drug addiction treatment, medically assisted detox and residential drug rehab in the UK, linked to The Wellbourne Clinic.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Drug Rehab and Detox UK | The Wellbourne Clinic",
    description:
      "Responsible guidance on drug detox, withdrawal and residential drug rehab in the UK.",
    url: "https://drugsrehabuk.com",
    siteName: "Drugs Rehab UK",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/images/home.jpg" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
