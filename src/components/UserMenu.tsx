"use client";
import { ArrowIcon, UserIcon } from "@/customIcons";
import { useState } from "react";
import MenuItems from "./IndexMenu";

const UserMenu = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex justify-center p-3">
      <div className="relative">
        <div
          onClick={() => setShow(!show)}
          className="bg-white flex p-3 hover:bg-primary rounded-full border border-2  w-12 h-12 relative z-20" 
        >
        {UserIcon}
        </div>
        {show && <MenuItems 
          handleClose={()=>setShow(false)}
          />}
      </div>
    </div>
  );
};

export default UserMenu;
