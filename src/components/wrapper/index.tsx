import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import TabMenu from "./TabMenu";
import BottonMenu from "./BottonMenu";
import TopNews from "./TopNews";
import Footer from "./Footer";

function MainWrapper({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const { user, dataLoaded } = useContext(UserContext);
  //console.log(user);
  const notShowMenu =
    !currentPath ||
    !user ||
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/signup") ||
    currentPath.startsWith("/verify-email");
  return !dataLoaded ? (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-3xl italic">MegaSummary</div>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div>
      <div className="max-h-screen h-screen overflow-hidden flex flex-col flex flex-col items-center">
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <TopNews />
          {!notShowMenu && <TabMenu />}
        </div>
        <div className="flex flex-col w-full overflow-auto">
          <div>{children}</div>
          {!notShowMenu && <BottonMenu />}
          <ToastContainer autoClose={1000} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainWrapper;
