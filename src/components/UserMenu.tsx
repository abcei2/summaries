"use client";
import { ArrowIcon, UserIcon } from "@/icons/Index";
import { useState } from "react";
import MenuItems from "./IndexMenu";

const UserMenu = () => {
  const [show, setShow] = useState(true);
  return (
    <div className="relative flex justify-center  lg:w-[20%] p-3">
      <div onClick={()=>setShow(!show)} className="flex p-3 hover:bg-primary rounded-full border border-2  w-12 h-12">
        {UserIcon}
      </div>
      <div onClick={()=>setShow(!show)} className="flex p-3 rounded-full  w-12 h-12">
        {ArrowIcon}
      </div>
      {show || <MenuItems/>}
    </div>
  );
}; 

export default UserMenu;
