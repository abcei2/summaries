const SubscribedSummaryRequest = ({
  handleClose,
  handleConfirm,
  title,
  bookCover,
}: {
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  bookCover: string;
}) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center p-2 h-fit gap-2">
      <span className="text-2xl mb-2 text-center font-bold ">
        Confirm you want to request the summary of the book
      </span>
      <span className="text-xl mb-2 text-center w-[80%]">
        <div className="text-xl">{title}</div>
      </span>
      <div className="flex justify-center mb-2">
        <img className="ounded-lg h-20 sm:h-32" src={bookCover} />
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-green-500 text-white rounded-lg px-4 py-2 mr-2"
          onClick={handleConfirm}
        >
          Confirm
        </button>
        <button
          className="bg-gray-500 text-white rounded-lg px-4 py-2"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscribedSummaryRequest;
