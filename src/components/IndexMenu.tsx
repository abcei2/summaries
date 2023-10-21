import { MENU_SETTINGS } from "@/constants";
import { UserContext } from "@/context/UserContext";
import { LogOutIcon } from "@/customIcons";
import { ReactNode } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import OutsideAlerter from "./utils/OutsideAlerter";

const IndexMenu = ({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  return (
    <div className="w-full flex justify-center items-center p-2 space-x-4 hover:bg-gray-100" onClick={onClick}>
      <div className="w-[20px]">{icon}</div>
      <div className="w-[70px] text-[16px]">{label}</div>
    </div>
  );
};


const MenuItems = ({ handleClose }: { handleClose: () => void }) => {
  const { user,signOut } = useContext(UserContext);
  const router = useRouter();
  return (
    <OutsideAlerter
      onClick={() => {
        //handleClose();
      }}
      className="absolute z-10 rounded-lg right-[20%] top-[110%] overflow-hidden border border-2 bg-white"
    >
      <div className="w-full w-full bg-white">
        {user && (
          <div className="w-full flex justify-center items-center p-2">
            <span>{user.email}</span>
          </div>
        )}
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
    </OutsideAlerter>
  );
};

export default MenuItems;
