import Image from "next/image";
import CustomImage from "./utils/CustomImage";
import { useRouter } from "next/router";

const MegasummaryLogo = () => {
  const router = useRouter();
  const useVariant = router.pathname === "/surveys";

  return (
    <a href="/" className="flex items-center justify-center text-xl leading-3">
      <CustomImage
        src={useVariant ? "/icons/logo-variant.svg" : "/icons/logo.svg"}
        alt="icon"
        width={66}
        height={66}
      />
      <div className="flex-col gap-0.5 sm:flex flex">
        <span>
          <b>Mega</b>
        </span>
        <span>Summary</span>
      </div>
    </a>
  );
};

export default MegasummaryLogo;
