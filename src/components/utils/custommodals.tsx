import OutsideAlerter from "./OutsideAlerter";

export const CustomModal2 = ({
  children,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => void;
}) => {
  return (
    <div className="absolute top-[0px] left-[0px] w-full h-screen before:w-full before:h-full before:z-30 before:bg-[#F1F1F1] before:opacity-[0.7] before:content-['.'] before:absolute">
      <div className="flex justify-center items-center relative z-40 w-full h-full overflow-auto">
        <OutsideAlerter onClick={() => handleClose()}>
          {children}
        </OutsideAlerter>
      </div>
    </div>
  );
};
