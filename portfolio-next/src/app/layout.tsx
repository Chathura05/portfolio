import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Chathura Weerasinghe | Software Engineering Undergraduate",
  description:
    "Portfolio of Chathura Weerasinghe — Full-Stack Developer & Automation Testing specialist. Passionate Software Engineering undergraduate building beautiful, performant web applications.",
  keywords: [
    "Chathura Weerasinghe",
    "Software Engineer",
    "Full-Stack Developer",
    "React",
    "PHP",
    "Selenium",
    "Portfolio",
    "Sri Lanka",
  ],
  authors: [{ name: "Chathura Weerasinghe" }],
  openGraph: {
    title: "Chathura Weerasinghe | Portfolio",
    description: "Full-Stack Developer & Automation Testing specialist.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chathura Weerasinghe | Portfolio",
    description: "Full-Stack Developer & Automation Testing specialist.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-slate-800 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
