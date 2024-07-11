// surveys.tsx
import CustomImage from "@/components/utils/CustomImage";
import MainContainer from "@/components/utils/MainContainer";
import React from "react";

const Surveys: React.FC = () => {
  return (
    <MainContainer className="min-h-screen font-pt-sans text-xs">
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-2">
          <CustomImage
            src="/icons/survey-main-icon.svg"
            alt="Survey top icon"
            width={11}
            height={29}
            className="self-center"
          />
          <span className="text-2xl font-bold font-rokkitt">Surveys:</span>
          <span className="font-bold text-center">
            Request for Your Valuable Feedback to Enhance MegaSummary User
            Experience
          </span>
          <span className="text-center leading-[15.53px]">
            Dear User, <br /> Your insights are essential for improving the user
            experience on MegaSummary. Please take a <br /> moment to complete
            two brief surveys. In appreciation, you'll gain early access to new
            features.
          </span>
        </div>

        <div className="flex sm:flex-row flex-col gap-8 sm:gap-3">
          <div className="flex flex-col border border-custom-black rounded-[10px] px-6 py-6 gap-6 text-center relative min-w-[231px]">
            <div className="absolute -top-[20px] left-[42%] w-[40px] h-[40px] flex items-center justify-center">
              <div className="flex items-center justify-center w-full h-full bg-primary rounded-full">
                <CustomImage
                  src="/icons/not_listed_location.svg"
                  alt="icon"
                  width={25.16}
                  height={31.68}
                  className=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4  text-xs">
              <span className="font-bold"> Summary Quality Survey: </span>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSco9eg7nA8I8mmnHlWkJ7ml5pTk6p3y8oesu7_Xl6fDWe7wAA/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex items-center justify-center bg-secondary border-secondary text-gray-200 font-extralight w-[118px] self-center"
              >
                Link to Survey
              </a>
            </div>
          </div>

          <div className="flex flex-col border border-custom-black rounded-[10px] px-6 py-6 gap-6 text-center relative min-w-[231px]">
            <div className="absolute -top-[20px] left-[42%] w-[40px] h-[40px] flex items-center justify-center">
              <div className="flex items-center justify-center w-full h-full bg-primary rounded-full">
                <CustomImage
                  src="/icons/not_listed_location.svg"
                  alt="icon"
                  width={25.16}
                  height={31.68}
                  className=""
                />
              </div>
            </div>
            <div className="flex flex-col items-center gap-4  text-xs">
              <span className="font-bold">Website Experience Survey: </span>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSf71lCYXCfkHR-JBVSRDYEv9XPMdGWPve8tEn45VDRcuO7AwQ/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="btn flex items-center justify-center bg-secondary border-secondary text-gray-200 font-extralight w-[118px] self-center"
              >
                Link to Survey
              </a>
            </div>
          </div>
        </div>
        <span className="text-center leading-5">
          <b>Thank you for your contribution.</b> Best, <br /> The MegaSummary
          Team
        </span>
      </div>
    </MainContainer>
  );
};

export default Surveys;
