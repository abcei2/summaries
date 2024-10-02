import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import PopUpMenu from "./PopUpMenu";
import MegasummaryLogo from "../MegasummaryLogo";

const TopMenu = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const showMenu = !!user;
  const hiddeButtons =
    router.pathname === "/login" || router.pathname === "/signup";

  return (
    <div
      className={`flex ${hiddeButtons ? "justify-center" : "justify-between"} 
        sm:justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-6`}
    >
      <MegasummaryLogo />
      {hiddeButtons ? null : showMenu ? (
        <PopUpMenu />
      ) : (
        <div className="flex items-center gap-4 text-base">
          <a
            href="/signup"
            className="btn py-0.5 px-1 sm:px-8 hover:border-custom-purple hover:text-custom-purple"
          >
            Sign up
          </a>
          <a
            href="/login"
            className="btn py-0.5 px-1 sm:px-8 hover:border-custom-purple hover:text-custom-purple"
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
};

export default TopMenu;
