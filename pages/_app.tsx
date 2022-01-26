import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="text-center">
        <Link href="/"> | index</Link>
        <Link href="/Cost"> | 合計金額</Link>
        <Link href="/about"> | about</Link>
      </div>
      <ThemeProvider attribute="class" defaultTheme="light">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
