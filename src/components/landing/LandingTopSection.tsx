import { HOME_CONTENT } from "@/constants/landing";
import Image from "next/image";

const LandingTopSection = () => {
  return (
    <div className="w-full  p-2 flex justify-center">
      <div className="flex flex-col gap-10 w-full">
        <div className="text-3xl md:text-7xl">
          <div className=" w-full flex flex-col items-center font-bold md:leading-[60px] ">
            <span>Struggling with</span>
            <span>information overload?</span>
          </div>
        </div>

        <div className=" flex flex-col gap-4 p-4">
          {HOME_CONTENT.listItems.map((item, key) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center gap-2"
            >
              <div className="flex w-[30px] h-[30px] items-center justify-center">
                <Image
                  src={item.iconPath}
                  alt="icon"
                  width={100}
                  height={100}
                />
              </div>
              <span className="text-xl">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Image
        src="/images/landing-bg-icon.svg"
        alt="banner"
        width={1154}
        height={1240}
        className="absolute sm:max-w-[150%] md:max-w-full md:top-[unset] top-[20%] "
      />
    </div>
  );
};

export default LandingTopSection;
