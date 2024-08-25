import { useState } from "react";
import CustomImage from "./utils/CustomImage";

const HelpUs = () => {
  const [show, setShow] = useState(true);
  if (!show) return <></>;
  return (
    <div className="px-5 py-3  text-white font-pt-sans text-sm flex flex-col gap-4 w-full max-w-[500px] rounded-[10px] bg-secondary  sm:px-8 sm:py-4 text-justify ">
      <CustomImage
        src="/images/helpus.svg"
        alt="Help Us"
        width={48.28}
        height={31.24}
        className="self-center"
      />
      <div>
        <b>Hey there!</b>
        <br />
        We need your help. Your insights are crucial to help us fine tune the
        user experience on MegaSummary.
        <br />
        It would mean a lot to us if you take a moment to complete two quick
        surveys.
        <br />
        <div className="flex gap-1">
          As a thank you, you’ll get
          <div className="relative">
            free tokens
            <CustomImage
              src="/images/fancy-underline.svg"
              alt="Free Tokens"
              width={0}
              height={8}
              className="absolute bottom-0 left-0 w-full"
            />
          </div>
        </div>
      </div>
      <a
        className="btn text-sm bg-custom-red border-custom-red flex items-center justify-center max-w-[167px] self-center mt-2"
        href="/surveys"
      >
        Take the Surveys Now!
      </a>
      {/*
      <div
        onClick={() => setShow(false)}
        className={`rounded-full absolute -top-[14px] -right-[14px]
         cursor-pointer bg-primary text-white w-[28px] h-[28px] flex items-center justify-center`}
      >
        <CustomImage
          src="/icons/close.svg"
          alt="Close"
          width={10}
          height={10}
        />
      </div>
      */}
    </div>
  );
};

export default HelpUs;
