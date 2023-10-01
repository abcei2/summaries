import { BOOK_BACKEND_STATUS } from "@/constants";
import { Book } from "@/types";

export const bookStatus = (book: Book) => {
  switch (book.status) {
    case BOOK_BACKEND_STATUS.DOWNLOADING:
      return (
        <span className="font-bold text-gray-600 mb-2">
          Downloading {book?.progress + "%"}
        </span>
      );
    case BOOK_BACKEND_STATUS.DOWNLOADED:
      return (
        <span className="font-bold text-gray-600 mb-2">Retreiving text</span>
      );
    case BOOK_BACKEND_STATUS.EXTRACTED:
      return null;
    case BOOK_BACKEND_STATUS.QUEUE:
      return (
        <span className="font-bold text-gray-600 mb-2">Waiting in queue</span>
      );
    case BOOK_BACKEND_STATUS.ERROR:
      return (
        <span className="font-bold text-gray-600 mb-2">Download error</span>
      );
    default:
      return (
        <span className="font-bold text-gray-600 mb-2">{book?.status}</span>
      );
  }
};
