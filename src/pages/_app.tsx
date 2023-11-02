import "@/styles/globals.css";
import type { AppProps } from "next/app";
import TabMenu from "../components/TabMenu";
import BottonMenu from "../components/BottonMenu";
import UserContextProvider from "@/context/UserContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <div className="h-screen xl:overflow-auto overflow-hidden flex flex-col">
        <TabMenu />
        <div className="h-[80%] sm:h-full max-w-full overflow-auto">
          <Component {...pageProps} />        
        </div>
        <BottonMenu />
      </div>
      <ToastContainer 
      
        autoClose={1000}
      />
    </UserContextProvider>
  );
}
