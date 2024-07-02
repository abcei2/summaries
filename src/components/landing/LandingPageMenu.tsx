import { useContext, useState } from "react";
import TopNews from "../wrapper/TopNews";
import MegasummaryLogo from "./MegasummaryLogo";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import Image from "next/image";
import OutsideAlerter from "../utils/OutsideAlerter";

const LandingPageMenu = ({
  hiddeButtons = false,
  
}: {
  hiddeButtons?: boolean;
}) => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const backgroundColor = selectBackground(router);

  const [showPopup, setShowPopup] = useState(false);

  const showMenu = user ? false : true;

  return (
    <div className="flex flex-col-reverse sm:flex-col items-center gap-2 w-full">
      <TopNews backgroundColor={backgroundColor} />
      <div
        className={`flex ${hiddeButtons ? "justify-center" : "justify-between"} 
        sm:justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-3"`}
      >
        <MegasummaryLogo />
        {!hiddeButtons ? null : showMenu ? (
          <PopUpMenu />
        ) : (
          <div className="flex items-center gap-4 text-base">
            <a
              href="/login"
              className="hover:border-custom-purple hover:text-custom-purple"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="hover:border-custom-purple hover:text-custom-purple"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageMenu;

const PopUpMenu = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const tokenAmount = new Intl.NumberFormat("en-US").format(1000000);
  return (
    <div className="relative z-[1] flex flex-col gap-5 font-pt-sans text-xs">
      <div className="flex items-center gap-12 font-pt-sans text-sm">
        <a href="/search">Search/Upload</a>
        <a href="/library">My library</a>
        <a href="/library">My highlights</a>
        <OutsideAlerter
          onClick={() => setShowPopup(false)}
          className="relative"
        >
          <Image
            src={showPopup ? "/icons/close.svg" : "/icons/popup-menu.svg"}
            alt="icon"
            width={17}
            height={12}
            className=" cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
          />
          <div
            className={`${
              showPopup ? "max-h-[700px]" : "max-h-0  "
            } absolute right-0 top-[35px] rounded-[10px]
        transition-all duration-500 ease-in-out overflow-hidden min-w-[179px]
        bg-custom-purple text-white`}
            onClick={() => setShowPopup(false)}
          >
            <div className="flex flex-col gap-2 items-center justify-center  px-6 py-4 gap-3  items-center">
              <Image
                src="/icons/account_box.svg"
                alt="icon"
                width={17}
                height={17}
              />
              <div className="flex flex-col leading-3 w-full items-center">
                <span className="font-bold"> {"Usern Name"}</span>
                <span className="text-[10px]">
                  {" "}
                  {user?.email || "megasummary@gmail.com"}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Image
                  src="/icons/poker_chip.svg"
                  alt="icon"
                  width={19}
                  height={19}
                />
                <span> {tokenAmount} Tokens </span>
              </div>
              <div className="flex flex-col divide-y divide-custom-red border-t border-b border-custom-red w-full text-center">
                <a className="py-2" href="/profile">
                  Edit your profile
                </a>
                <a className="py-2" href="/buy">
                  Buy tokens
                </a>
                <a className="py-2" href="/survey">
                  Take our survey
                </a>
              </div>
              <a
                href="/logout"
                className="flex gap-2 items-center justify-end w-full relati"
              >
                <span className="font-bold"> {"Logout"}</span>
                <Image
                  src="/icons/move_item.svg"
                  alt="icon"
                  width={16}
                  height={14}
                />
              </a>
            </div>
          </div>
        </OutsideAlerter>
      </div>
    </div>
  );
};

const selectBackground = (router: any) => {
  const { pathname } = router;
  switch (pathname) {
    case "/":
      return "bg-primary";
    case "/search":
      return "bg-secondary";
    case "/library":
      return "bg-tertiary";
    default:
      return "bg-primary";
  }
};
