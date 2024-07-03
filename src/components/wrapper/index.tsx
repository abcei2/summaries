import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import BottonMenu from "./BottonMenu";
import Footer from "./Footer";
import TopMenu from "./TopMenu";
import TopNews from "./TopNews";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const backgroundColor = selectBackground(router);

  return !dataLoaded ? (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <div className="text-3xl italic">MegaSummary</div>
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  ) : (
    <div>
      <div className="flex flex-col flex flex-col items-center">
        <div className="flex flex-col w-full overflow-auto">
          <TopNews backgroundColor={backgroundColor} />
          <TopMenu />
          {children}
          <ToastContainer autoClose={1000} />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default MainWrapper;

const selectBackground = (router: any) => {
  const { pathname } = router;
  switch (pathname) {
    case "/":
      return "bg-primary";
    case "/login":
    case "/signup":
      return "bg-secondary";
    case "/mylibrary":
      return "bg-tertiary";
    default:
      return "bg-primary";
  }
};
