

import { HeadsetIcon, SaveIcon } from "@/icons/Index";

const Card = () => {
  return (
      <div className="w-[60%] md:w-[35%] lg:w-[25%] rounded-lg shadow-lg border border-2 m-10 ">
        <div className="bg-amber-50">
         <div className="flex justify-center items-center border border-2 rounded-full w-12 h-12 bg-white m-2">
            {HeadsetIcon}
          </div>
          <div className="flex justify-center mb-2">
          <img className="border border-2  rounded-lg mt-8 shadow-xl" src="/card-img.png" /> 
          </div>
          </div>
          <div className="w-full border border-2 h-3 rounded-lg">
            <div className="h-2 bg-blue-500 w-1/4 rounded-l-lg"></div>
          </div>
        <div className="p-1  border border-2 border-black">
          <span className="flex text-xl text-gray-600 mb-2 ">CAREER/SUCCES<div className="flex justify-center items-center border border-2 rounded-full w-16 h-16 md:w-8 md:h-8 bg-white ml-24">
            {SaveIcon}
          </div></span>
          
        </div>
        <div className="p-1">
          <span className="font-bold text-xl text-gray-600 mb-2">Deep Work</span>
        </div>
        <div className="p-1">
          <span className=" text-xl text-gray-600 mb-2">By Cal Newport</span>
        </div>
      </div>
  );
};

export default Card;
