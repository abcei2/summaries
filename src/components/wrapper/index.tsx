import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import TabMenu from "./TabMenu";
import BottonMenu from "./BottonMenu";

function MainWrapper({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const { user, loading } = useContext(UserContext);
  console.log(user);
  const notShowMenu =
    !currentPath ||
    !user ||
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/signup");
  return loading ? (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-3xl italic">Mega Summary</div>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div>
      <div className="max-h-screen h-screen xl:overflow-auto overflow-hidden flex flex-col bg-[#F8F8F8]">
        {!notShowMenu && <TabMenu />}     
        <div
          className={`h-full overflow-auto ${!notShowMenu && "mb-20"} lg:mb-2`}
        >
          {children}
        </div>
        {!notShowMenu && <BottonMenu />}
        <ToastContainer autoClose={1000} />
      </div>
    </div>
  );
}

export default MainWrapper;
