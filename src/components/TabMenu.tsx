import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { USER_TABS } from "../constants";
import { ReactNode } from "react";

const MenuTabItem = ({
  pathname,
  label,
  icon,
}: {
  pathname: string;
  label: string;
  icon: ReactNode;
}) => {
  return (
    <a href={pathname} className="flex justify-center gap-2 items-center hover:border-b-4 cursor-pointer">
      <div className="w-[25px]">{icon}</div>
      <span  className="text-[16px]">
        {label}
      </span>
    </a>
  );
};

const TabMenu = () => {
  const currentPath = usePathname();
  if (!currentPath || currentPath.startsWith("/login") || currentPath.startsWith("/signup"))
    return null;
  return (
    <>
      <div className="flex justify-center w-full h-20 relative">
        <div className="lg:flex lg:w-fit overflow-hidden hidden gap-4 px-2 ">
          {USER_TABS.map((item, key: any) => (
            <MenuTabItem key={key} {...item} />
          ))}
        </div>
        <div className="flex justify-end items-center gap-4 absolute right-[0px] z-10">
          <UserMenu />
        </div>
      </div>
    </>
  );
};

export default TabMenu;
