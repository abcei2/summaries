import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "@/context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import MainWrapper from "@/components/wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <MainWrapper>
        <Component {...pageProps} />
      </MainWrapper>
    </UserContextProvider>
  );
}
