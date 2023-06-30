
import { usePathname } from 'next/navigation'
import UserMenu from "./UserMenu";
import { USER_TABS } from '../constants';

const MenuTabItem = ({ pathname, label, icon }:{
  pathname:string,
  label:string,
  icon:string
}) => {
  
  return (
    <div className="flex justify-center items-center hover:border-b-4">
      <div className="w-[20px]">{icon}</div>
      <a href={pathname} className="text-[16px]">
        {label}
      </a>
    </div>
  );
};

const TabMenu = () => {
	const currentPath = usePathname()
	if(currentPath.startsWith("/login") || currentPath.startsWith("/signup"))
	return null
  return (
    <>
      <div className="flex w-full h-20 border border-2 ">
        <div className="p-8 pl-16 pr-2 ">
          <img src="/tab-menu.svg"></img>
        </div>
        <div className="flex w-[90%] gap-28 p-2 pt-5">
          {USER_TABS.map((item, key:any) => (
            <MenuTabItem key={key} {...item} />
          ))}
        </div>
        <UserMenu />
      </div>
    </>
  );
};

export default TabMenu;
