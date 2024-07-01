import Image from "next/image";
import CustomImage from "../utils/CustomImage";

const Footer = () => {
  return (
    <footer className="bg-custom-purple text-white py-6 px-6 sm:px-16 sm:pt-16 sm:pb-8 flex flex-col gap-10">
      <div className="flex items-center  gap-5">
        <CustomImage
          src="/icons/sprinkle_group.svg"
          alt="icon"
          width={75}
          height={26}
        />
        <span className="text-3xl">Don't Miss out</span>
      </div>
      <div className="flex sm:gap-16 gap-8 grid grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="uppercase text-tertiary">Company</span>
          <span>About</span>
          <span>Support</span>
          <span>FAQ</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-16">
          <div className="flex flex-col gap-4">
            <span className="uppercase text-tertiary w-max">Get involved</span>
            <span>Create an account</span>
          </div>

          <div className="flex flex-col gap-4 col-span-2 w-full ">
            <span className="uppercase text-tertiary w-max ">Get in touch</span>
            <span>hello@megasummary.com </span>
          </div>
        </div>
        <div className="flex flex-col gap-4  col-span-3 sm:col-span-1 text-center items-center sm:items-start">
          <div className="flex gap-3 items-center">
            <span className="uppercase text-custom-gray"> Subscribe</span>
            <CustomImage
              src="/icons/sprinkle-plus-icon.svg"
              alt="icon"
              width={10}
              height={13}
              className="pb-0.5"
            />
          </div>
          <input
            type="email"
            className="rounded-[10px] px-2 py-0.5 sm:w-full w-[85%]"
            placeholder="Email address"
          />
          <span className="italic">
            ©Megasummary 2024, All Rights Reserved.
          </span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between items-center text-center">
        <div className="flex sm:gap-12 flex-col-reverse gap-4 sm:flex-row">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
        <div className="flex gap-6">
          {[
            "/icons/twitter.svg",
            "/icons/discord.svg",
            "/icons/telegram.svg",
          ].map((icon, index) => (
            <CustomImage
              key={index}
              src={icon}
              alt="icon"
              width={27}
              height={27}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
