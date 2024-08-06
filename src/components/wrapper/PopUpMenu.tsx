import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import OutsideAlerter from "../utils/OutsideAlerter";
import CustomImage from "../utils/CustomImage";

const PopUpMenu = () => {
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);
  const [showReportBugModal, setShowReportBugModal] = useState(false);
  const tokenAmount = new Intl.NumberFormat("en-US").format(
    user?.available_tokens ?? 0
  );

  const handleReportBug = () => {
    setShowReportBugModal(true);
    setShowPopup(false); // Close the popup menu when opening the modal
  };

  return (
    <div className="flex flex-col gap-5 font-pt-sans text-xs">
      <div className="flex items-center gap-12 font-pt-sans text-sm">
        {/* Report Bug Button */}
        <button
          className="text-custom-purple hover:text-custom-blue"
          onClick={handleReportBug}
        >
          Report a Bug
        </button>
        {/* Report Bug Modal */}
        {showReportBugModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded-lg">
              <h2 className="text-lg font-bold">Report a Bug</h2>
              <textarea
                className="border border-gray-300 w-full mt-2 p-2"
                placeholder="Describe the bug..."
              />
              <div className="flex justify-end mt-4">
                <button
                  className="bg-custom-purple text-white py-2 px-4 rounded"
                  onClick={() => setShowReportBugModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <OutsideAlerter
          onClick={() => setShowPopup(false)}
          className="relative"
        >
          <CustomImage
            src={showPopup ? "/icons/close.svg" : "/icons/popup-menu.svg"}
            alt="icon"
            className="cursor-pointer"
            onClick={() => setShowPopup(!showPopup)}
            width={17}
            height={12}
          />
          <div
            className={`${
              showPopup ? "max-h-[700px]" : "max-h-0  "
            } absolute right-0 top-[35px] rounded-[10px]
          transition-all duration-500 ease-in-out overflow-hidden min-w-[179px]
          bg-custom-purple text-white z-500`}
            onClick={() => setShowPopup(false)}
          >
            <div className="flex flex-col gap-2 items-center justify-center  px-6 py-4 gap-3  items-center z-10">
              {/* User Info and Token Count */}
              <CustomImage
                src="/icons/account_box.svg"
                alt="icon"
                width={17}
                height={17}
              />
              <div className="flex flex-col leading-3 w-full items-center">
                <span className="font-bold">{"User Email"}</span>
                <span className="text-[10px]">
                  {user?.email || "megasummary@gmail.com"}
                </span>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <CustomImage
                  src="/icons/poker_chip.svg"
                  alt="icon"
                  width={19}
                  height={19}
                />
                <span>{tokenAmount} Tokens</span>
              </div>
              <div className="flex flex-col divide-y divide-custom-red border-t border-b border-custom-red w-full text-center">
                <a className="py-2 sm:hidden block" href="/search">
                  Search/Upload
                </a>
                <a className="py-2 sm:hidden block" href="/mylibrary">
                  My library
                </a>
                <a className="py-2 sm:hidden block" href="/myhighlights">
                  My highlights
                </a>
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
              <div
                onClick={() => signOut && signOut().then(() => router.reload())}
                className="flex gap-2 items-center justify-end w-full cursor-pointer"
              >
                <span className="font-bold">Logout</span>
                <CustomImage
                  src="/icons/move_item.svg"
                  alt="icon"
                  width={16}
                  height={14}
                />
              </div>
            </div>
          </div>
        </OutsideAlerter>
      </div>
    </div>
  );
};

export default PopUpMenu;
