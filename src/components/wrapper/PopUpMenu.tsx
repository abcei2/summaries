import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import OutsideAlerter from "../utils/OutsideAlerter";
import Image from "next/image";

const PopUpMenu = () => {
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const tokenAmount = new Intl.NumberFormat("en-US").format(1000000);
  return (
    <div className="relative z-[1] flex flex-col gap-5 font-pt-sans text-xs">
      <div className="flex items-center gap-12 font-pt-sans text-sm">
        <a href="/search">Search/Upload</a>
        <a href="/mylibrary">My library</a>
        <a href="/myhighlights">My highlights</a>
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
                <a className="py-2" href="/settings">
                  Edit your profile
                </a>
                <a className="py-2" href="/billing">
                  Buy tokens
                </a>
                <a className="py-2" href="/surveys">
                  Take our survey
                </a>
              </div>
              <a
                onClick={() => signOut && signOut().then(() => router.reload())}
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

export default PopUpMenu;
