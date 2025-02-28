import "./globals.css";
import { SpreadsheetProvider } from "../context/SpreadsheetContext";
import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        {}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Google Sheets Clone</title>
        <meta
          name="description"
          content="A powerful Google Sheets clone built with Next.js, React, and Tailwind CSS."
        />

        {}
        <meta property="og:title" content="Google Sheets Clone" />
        <meta
          property="og:description"
          content="Collaborate and edit spreadsheets in real-time, just like Google Sheets."
        />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourapp.com" />

        {}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Google Sheets Clone" />
        <meta
          name="twitter:description"
          content="A powerful spreadsheet app built with Next.js."
        />
        <meta name="twitter:image" content="/preview.png" />

        {}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <body className="bg-gray-100 text-gray-900">
        {}
        <SpreadsheetProvider>{children}</SpreadsheetProvider>
      </body>
    </html>
  );
}
