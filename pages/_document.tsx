import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Media Downloader - Unduh konten dari Instagram, TikTok, Pinterest, dan lainnya dengan mudah dan cepat!" />
        <meta name="keywords" content="Media Downloader, Instagram Downloader, TikTok Downloader, Pinterest Downloader, Download Video, Save Media" />
        <meta name="author" content="Bima Adam" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}