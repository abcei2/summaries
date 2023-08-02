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
    <div className="flex justify-center gap-2 items-center hover:border-b-4">
      <div className="w-[25px]">{icon}</div>
      <a href={pathname} className="text-[16px]">
        {label}
      </a>
    </div>
  );
};

const TabMenu = () => {
  const currentPath = usePathname();
  if (!currentPath || currentPath.startsWith("/login") || currentPath.startsWith("/signup"))
    return null;
  return (
    <>
      <div className="flex w-full h-20 justify-between">
        <div className="p-8 pl-16 pr-2 ">
          <img src="/tab-menu.svg"></img>
        </div>
        <div className="lg:flex lg:w-fit overflow-hidden hidden gap-4 px-2">
          {USER_TABS.map((item, key: any) => (
            <MenuTabItem key={key} {...item} />
          ))}
        </div>
        <UserMenu />
      </div>
    </>
  );
};

export default TabMenu;
