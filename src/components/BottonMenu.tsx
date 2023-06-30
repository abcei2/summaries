"use client";
import { USER_TABS } from "@/constants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const BottonMenuItem = ({ pathname, label, icon }:{
  pathname:string,
  label:string,
  icon:ReactNode
}) => {
  return (
    <div className="flex flex-col  justify-center items-center w-24">
      <div className=" w-[20px]">{icon}</div>
      <a href={pathname} className="text-[14px]">
        {label}
      </a>
    </div>
  );
};

const BottonMenu = () => {
  const currentPath = usePathname();
  if (currentPath.startsWith("/login") || currentPath.startsWith("/singup"))
    return null;
  return (
    <div className="fixed bottom-0 left-0   flex justify-around border border-2 border-black h-24 w-full hover:border-b-4 lg:hidden">

        {USER_TABS.map((item, key) => (
          <BottonMenuItem key={key} {...item} />
        ))}
    </div>
  );
};
export default BottonMenu;
