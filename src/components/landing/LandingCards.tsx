import { HOME_CONTENT } from "@/constants/landing";
import Image from "next/image";

const LandingCards = () => {
  return (
    <div className="justify-items-center grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-12">
      {HOME_CONTENT.cards.map((card, key) => (
        <div
          key={key}
          className="flex flex-col border border-custom-black rounded-[10px] px-5 py-8 gap-6 text-center relative max-w-[295px]"
        >
          <div className="absolute -top-[37px] left-[37%] w-[72px] h-[72px] flex items-center justify-center bg-primary rounded-full  mr-[35px]">
            <div className="flex items-center justify-center m-2">
              <Image
                {...card.icon}
                alt="icon"
                style={{
                  width: card.icon.width + "px",
                  height: card.icon.height + "px",
                }}
                className=""
              />
            </div>
          </div>
          <span className="text-lg uppercase">{card.title}</span>
          <p>{card.content}</p>
        </div>
      ))}
    </div>
  );
};

export default LandingCards;