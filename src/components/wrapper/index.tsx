import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import TabMenu from "./TabMenu";
import BottonMenu from "./BottonMenu";

function MainWrapper({ children }:{
    children: React.ReactNode
}) {
  const currentPath = usePathname();
  const { user } = useContext(UserContext);
  console.log(user);
  const notShowMenu =
    !currentPath ||
    !user ||
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/signup");
  return (
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
