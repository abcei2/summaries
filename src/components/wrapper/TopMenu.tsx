import { useContext, useState } from "react";
import TopNews from "../wrapper/TopNews";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import PopUpMenu from "./PopUpMenu";
import MegasummaryLogo from "../MegasummaryLogo";

const TopMenu = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const backgroundColor = selectBackground(router);

  const [showPopup, setShowPopup] = useState(false);

  const showMenu = !!user;
  const hiddeButtons =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <div className="flex flex-col-reverse sm:flex-col items-center gap-2 w-full">
      <TopNews backgroundColor={backgroundColor} />
      <div
        className={`flex ${hiddeButtons ? "justify-center" : "justify-between"} 
        sm:justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-3"`}
      >
        <MegasummaryLogo />
        {hiddeButtons ? null : showMenu ? (
          <PopUpMenu />
        ) : (
          <div className="flex items-center gap-4 text-base">
            <a
              href="/login"
              className="btn py-0.5 px-8 hover:border-custom-purple hover:text-custom-purple"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="btn py-0.5 px-8 hover:border-custom-purple hover:text-custom-purple"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMenu;

const selectBackground = (router: any) => {
  const { pathname } = router;
  switch (pathname) {
    case "/":
      return "bg-primary";
    case "/login":
    case "/signup":
      return "bg-secondary";
    case "/library":
      return "bg-tertiary";
    default:
      return "bg-primary";
  }
};
