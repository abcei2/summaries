import { MENU_SETTINGS } from "@/constants";
import { ReactNode } from "react";



const IndexMenu = ({ label, icon }:{
label:string,
icon:ReactNode
}) => {
  return (
    <div className="flex justify-center items-center p-1 space-x-4 hover:bg-gray-50 ">
      <div className="w-[20px]">{icon}</div>
      <div className="w-[70px]">
        <a href="" className="text-[16px]">
          {label}
        </a>
      </div>
    </div>
  );
};

const MenuItems = () => {
  return (
    <div className="absolute z-20 rounded-lg -left-24 top-[80px] w-[266px] h-[250px] overflow-hidden p-4 border border-2 bg-white">
      <div className="w-full border border-2 border-l-0 border-t-0 border-r-0 pr-10 ">
        {MENU_SETTINGS.map((item:any, key:any) => (
          <IndexMenu key={key} {...item} />
        ))}
      </div>
    </div>
  );
};

export default MenuItems;
