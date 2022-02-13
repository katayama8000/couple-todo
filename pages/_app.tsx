import "../styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { ThemeProvider } from "next-themes";


const fetcher = async (input: RequestInfo, init?: RequestInit) => {
  const res = await fetch(input, init);
  return res.json();
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SWRConfig value={{ fetcher,fallback:{"https://jsonplaceholder.typicode.com/posts":[]} }}>
        <div className="text-center">
          <Link href="/"> | index</Link>
          <Link href="/Cost"> | 合計金額</Link>
          <Link href="/about"> | about</Link>
          <Link href="/Qiita"> | Qiita</Link>
          <Link href="/leak"> | Leak</Link>
          <Link href="/date"> | Date</Link>
        </div>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Component {...pageProps} />
        </ThemeProvider>
      </SWRConfig>
    </>
  );
}

export default MyApp;
