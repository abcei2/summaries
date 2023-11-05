"use client";
import { ArrowIcon, UserIcon } from "@/customIcons";
import { useState } from "react";
import MenuItems from "./IndexMenu";
import OutsideAlerter from "../utils/OutsideAlerter";

const UserMenu = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex justify-center p-3">
      <div className="relative">
        <OutsideAlerter onClick={() => setShow(false)}>
          <div
            onClick={() => setShow(!show)}
            className="bg-white flex p-3 hover:bg-primary rounded-full border border-2  w-12 h-12 relative z-20"
            style={{ cursor: "pointer" }} // Add this line
          >
            {UserIcon}
          </div>
          {show && <MenuItems handleClose={() => setShow(false)} />}
        </OutsideAlerter>
      </div>
    </div>
  );
};

export default UserMenu;
