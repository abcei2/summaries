import "@/styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "@/context/UserContext";
import "react-toastify/dist/ReactToastify.css";
import MainWrapper from "@/components/wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <meta httpEquiv="Content-Security-Policy" content="font-src 'self' data:; img-src 'self' data:; default-src 'self' http://121.0.0:3000/"/>
      <MainWrapper>
        <Component {...pageProps} />
      </MainWrapper>
    </UserContextProvider>
  );
}
