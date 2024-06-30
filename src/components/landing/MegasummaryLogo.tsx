import Image from "next/image";

const MegasummaryLogo = () => {
  return (
    <div className="flex items-center justify-center text-xl leading-3">
      <Image src="/icons/logo.svg" alt="icon" width={66} height={66} />
      <div className="flex-col gap-0.5 sm:flex hidden">
        <span>
          <b>Mega</b>
        </span>
        <span>Summary</span>
      </div>
    </div>
  );
};

export default MegasummaryLogo;
