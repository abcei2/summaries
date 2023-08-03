import { MENU_SETTINGS } from "@/constants";
import { UserContext } from "@/context/UserContext";
import { LogOutIcon } from "@/icons/Index";
import { ReactNode } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";

const IndexMenu = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="flex justify-center items-center p-1 space-x-4 hover:bg-gray-50 ">
      <div className="w-[20px]">{icon}</div>
      <div className="w-[70px]">
        <a onClick={onClick} className="text-[16px]">
          {label}
        </a>
      </div>
    </div>
  );
};

const MenuItems = () => {
  const { signOut } = useContext(UserContext);
  const router = useRouter();
  return (
    <div className="absolute z-20 rounded-lg -left-24 top-[80px] w-[266px] h-[250px] overflow-hidden p-4 border border-2 bg-white">
      <div className="w-full border border-2 border-l-0 border-t-0 border-r-0 pr-10 ">
        {MENU_SETTINGS.map((item: any, key: any) => (
          <IndexMenu key={key} {...item} />
        ))}

        <IndexMenu
          label="Logout"
          icon={LogOutIcon}
          onClick={() => {
            signOut && signOut().then(() => router.reload());
          }}
        />
      </div>
    </div>
  );
};

export default MenuItems;
