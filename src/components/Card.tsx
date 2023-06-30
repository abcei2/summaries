import { HeadsetIcon } from "@/icons/Index";

const Card = () => {
  return (
      <div className="w-[60%] md:w-[40%] lg:w-[30%] rounded-lg shadow-lg border border-2">
        <div       >
          <div className="flex justify-center items-center border border-2 border-black rounded-full w-12 h-12">
            {HeadsetIcon}
          </div>
          <div>
          <img className="border border-2 mt-8 shadow-lg" src="/card-img.png" /> 
          </div>
          
        </div>

        <div className="p-8">
          <span className=" text-xl text-gray-600 mb-2 ">CAREER/SUCCES</span>
        </div>
        <div className="p-8">
          <span className="font-bold text-xl text-gray-600 mb-2">Deep Work</span>
        </div>
        <div className="p-8 ">
          <span className=" text-xl text-gray-600 mb-2">By Cal Newport</span>
        </div>
      </div>
  );
};

export default Card;
