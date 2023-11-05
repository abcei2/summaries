import { MENU_SETTINGS } from "@/constants";
import { UserContext } from "@/context/UserContext";
import { LogOutIcon, ArticleIcon } from "@/customIcons";
import { ReactNode } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";
import OutsideAlerter from "../utils/OutsideAlerter";

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
    <div
      className="min-w-[180px] flex gap-2 hover:bg-gray-100 text-[16px]"
      onClick={onClick}
    >
      <div className="h-[20px] pl-2">{icon}</div>
      <div className="">{label}</div>
    </div>
  );
};

const MenuItems = ({ handleClose }: { handleClose: () => void }) => {
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();
  return (
    <OutsideAlerter
      onClick={() => {
       // handleClose();
      }}
      className="absolute z-10 rounded-lg right-[20%] top-[110%] overflow-hidden border border-2 bg-white max-w-[300px]"
    >
      <div className="w-full w-full bg-white">
        {user && (
          <div className="w-full flex flex-col justify-left  p-2">
            <div>{user.email}</div>

            <div>Available tokens:</div>

            <div>{user.available_tokens.toLocaleString()}</div>
          </div>
        )}

        {MENU_SETTINGS.map((item: any, key: any) => (
          <IndexMenu key={key} {...item} />
        ))}

        <IndexMenu
          label="Take our Surveys"
          icon={ArticleIcon}
          onClick={() => {
            router.push("/surveys");
          }}
        />

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
