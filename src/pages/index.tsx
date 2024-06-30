import LandingCards from "@/components/landing/LandingCards";
import LandingPageMenu from "@/components/landing/LandingPageMenu";
import LandingTopSection from "@/components/landing/LandingTopSection";
import { HOME_CONTENT } from "@/constants/landing";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useContext } from "react";

const page = () => {
  const { user } = useContext(UserContext);

  const videoUrl_1 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/1.mp4`;
  const videoUrl_2 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/2.mp4`;

  return (
    <div className="h-full w-full bg-custom-gray">
      {!user || user?.is_superuser || user?.is_subscribed ? (
        <div className="flex flex-col w-full  items-center  gap-32">
          <LandingPageMenu />
          <LandingTopSection />

          <div
            className={`before:absolute md:before:top-[-340px] before:left-0 before:w-full before:z-[0]
              before:h-full md:before:bg-landing-bg before:top-[-340px] before:bg-landing-bg-mobile before:bg-cover md:before:bg-contain lg:before:bg-cover
            flex flex-col gap-16 md:gap-10  px-8 relative py-8 bg-primary w-full`}
          >
            <div className="max-w-[750px] self-center w-full">
              <video width="100%" height="auto" controls>
                <source src={videoUrl_1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <LandingCards />

            <div className="max-w-[750px] self-center w-full">
              <video width="100%" height="auto" controls>
                <source src={videoUrl_2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex flex-col p-2 w-full h-full items-center gap-10 relative">
              <Image
                src="/icons/landing-asterisk.svg"
                alt="icon"
                width={30}
                height={30}
              />
              <div className="w-full flex justify-center items-center text-6xl  md:text-7xl text-center gap-2 text-custom-purple">
                <Image
                  src={"/icons/left-doodle.svg"}
                  alt="icon"
                  width={32}
                  height={58}
                />
                <div className="text-center">
                  <span>{HOME_CONTENT.bottom}</span>
                </div>
                <Image
                  src={"/icons/right-doodle.svg"}
                  alt="icon"
                  width={32}
                  height={58}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold">
            You are not allowed to access this page
          </div>
          <div className="text-xl font-bold">
            Please contact the administrator
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
