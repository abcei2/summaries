import TopNews from "../wrapper/TopNews";
import MegasummaryLogo from "./MegasummaryLogo";

const LandingPageMenu = ({
  hiddeButtons = false,
  backgroundColor = "bg-secondary",
}: {
  hiddeButtons?: boolean;
  backgroundColor?: "bg-primary" | "bg-secondary" | "bg-tertiary";
}) => {
  console.log(hiddeButtons);
  return (
    <div className="flex flex-col-reverse sm:flex-col items-center gap-2 w-full">
      <TopNews backgroundColor={backgroundColor} />
      <div
        className={`flex ${
          hiddeButtons ? "justify-center" : "justify-between"
        } sm:justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-3"`}
      >
        <MegasummaryLogo />
        {!hiddeButtons && (
          <div className="flex items-center gap-4 text-base">
            <a
              href="/login"
              className="btn hover:border-custom-purple hover:text-custom-purple"
            >
              Sign up
            </a>
            <a
              href="/login"
              className="btn hover:border-custom-purple hover:text-custom-purple"
            >
              Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageMenu;
