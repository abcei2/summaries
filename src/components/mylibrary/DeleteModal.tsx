const DeleteModal = ({
  handleClose,
  handleConfirm,
  title,
}: {
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
}) => {
  return (
    <div className="bg-white rounded-lg flex flex-col items-center p-2 h-fit">
      <div className="text-4xl mb-2">🗑️</div>
      <span className="text-2xl font-bold mb-2 text-center">
        Confirm the deletion of the book
        <div className="text-xl">{title}</div>
      </span>
      <span className="text-gray-500 mb-2">This action cannot be undone</span>
      <div className="flex justify-center items-center">
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2"
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

export default DeleteModal;
