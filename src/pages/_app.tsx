import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TabMenu from "../components/TabMenu";
import BottonMenu from "../components/BottonMenu";
import UserContextProvider from "@/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className="h-screen ">
        <TabMenu />
        <div className="h-[75%] sm:h-full max-w-full overflow-auto">
          <Component {...pageProps} />
        </div>
        <BottonMenu />
      </div>
    </UserContextProvider>
  );
}
