import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { USER_TABS } from "../../constants";
import { ReactNode } from "react";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

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
    <a
      href={pathname}
      className="flex justify-center gap-2 items-center hover:border-b-4"
    >
      <div className="w-[25px]">{icon}</div>
      <span className="text-[16px]">{label}</span>
    </a>
  );
};

const TabMenu = () => {
  const currentPath = usePathname();
  const { user } = useContext(UserContext);
  if (
    !currentPath ||
    !user ||
    currentPath.startsWith("/login") ||
    currentPath.startsWith("/signup")
  )
    return null;
  return (
    <>
      <div className="flex justify-center items-center w-full h-20 relative">
        <div className="lg:flex lg:w-fit overflow-hidden hidden gap-4 px-2">
          {USER_TABS.map((item, key: any) => (
            <MenuTabItem key={key} {...item} />
          ))}
        </div>

        <div className=" flex justify-center items-center gap-4 absolute left-[10px] z-10 text-3xl italic">
          <a href="/">Mega Summary</a>
        </div>
        <div className="flex justify-end items-center gap-4 absolute right-[0px] z-10">
          <UserMenu />
        </div>
      </div>
    </>
  );
};

export default TabMenu;
