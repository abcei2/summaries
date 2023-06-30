import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TabMenu from "../components/TabMenu";
import BottonMenu from "../components/BottonMenu";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <TabMenu/>
      <Component {...pageProps} />
      <BottonMenu/>
    </div>
  );
}
