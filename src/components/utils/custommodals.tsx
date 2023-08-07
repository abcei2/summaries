import OutsideAlerter from "./OutsideAlerter";

export const CustomModal2 = ({
    children,
    handleClose,
  }: {
    children: React.ReactNode;
    handleClose: () => void;
  }) => {
    return (
      <div
        className="absolute top-[0px] left-[0px] w-full h-full
        before:w-full before:h-full before:z-30 before:bg-black before:opacity-[0.35] before:content-['.'] before:absolute"
      >
        <div className="flex justify-center relative z-40 w-full h-full overflow-auto">
          <OutsideAlerter
            onClick={() => handleClose()}
            className="lg:w-[50%] w-[95%] h-[80%] lg:h-full flex  py-5 justify-center "
          >    
              {children}
          </OutsideAlerter>
        </div>
      </div>
    );
  };