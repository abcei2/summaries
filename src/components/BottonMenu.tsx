"use client";
import { USER_TABS } from "@/constants";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const BottonMenuItem = ({ pathname, label, icon }: {
  pathname: string,
  label: string,
  icon: ReactNode
}) => {
  return (
    <a href={pathname} className="flex flex-col justify-center items-center w-24">
      <div className="w-[20px]">{icon}</div>
      <div className="text-[14px]">{label}</div>
    </a>
  );
};


const BottonMenu = () => {
  const currentPath = usePathname();
  if (!currentPath || currentPath.startsWith("/login") || currentPath.startsWith("/singup"))
    return null;
  return (
    <div className="bg-white  flex justify-around h-20 w-full hover:border-b-4 lg:hidden">

        {USER_TABS.map((item, key) => (
          <BottonMenuItem key={key} {...item} />
        ))}
    </div>
  );
};
export default BottonMenu;
