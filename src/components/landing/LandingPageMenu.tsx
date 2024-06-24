import MegasummaryLogo from "./MegasummaryLogo";

const LandingPageMenu = () => {
  return (
    <div className="flex justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-3">
      <MegasummaryLogo />
      <div className="flex items-center gap-4 text-base">
        <button className="btn hover:border-custom-purple hover:text-custom-purple">
          Sign up
        </button>
        <button className="btn hover:border-custom-purple hover:text-custom-purple">
          Login
        </button>
      </div>
    </div>
  );
};

export default LandingPageMenu;
