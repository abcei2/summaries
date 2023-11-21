import { useRouter } from "next/router";
import { Book } from "../../types";
import { use, useEffect, useState } from "react";
import { CustomModal2 } from "../utils/custommodals";
import { CgHeadset, CgSoftwareDownload } from "react-icons/cg";
import DeleteModal from "./DeleteModal";
import RetryDownloadModal from "./RetryDownloadModal";
import { BookStatus } from "@/utils/books";

const MyBook = ({
  updateBook,
  book,
}: {
  book: Book;
  updateBook: (book: Book) => void;
}) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRetryDownloadModal, setShowRetryDownloadModal] = useState(false);
  const bookCover = book?.cover_img_path
    ? `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/${book?.cover_img_path}`
    : "/card-img.jpg";

  const bookModalTitle = book?.title_2
    ? book?.title_2.length > 80
      ? book?.title_2.slice(0, 80) + "..."
      : book?.title_2
    : "";

  const onDelete = () => {
    fetch(`/api/users/library/${book.global_id}`, {
      method: "DELETE",
    }).then(() => {
      router.reload();
    });
  };

  const onRetryDowload = () => {
    fetch(`/api/books/download/${book.global_id}`, {
      method: "GET",
    })
      .then(async (resp) => {
        if (resp.status == 200) {
          updateBook({
            ...book,
            ...(await resp.json()),
          });
        } else {
          alert("Error, please try again");
        }
      })
      .finally(() => {
        setShowRetryDownloadModal(false);
      });
  };

  const handleMouseDown = (event) => {
    const bookDetailsUrl = `/books/details/${book.global_id}`;
    if (event.button === 0) { // Left click
      router.push(bookDetailsUrl);
    } else if (event.button === 1) { // Middle click
      
      window.open(bookDetailsUrl, '_blank'); // Open in a new tab without switching to it
      event.preventDefault(); // Prevent the default behavior
    }
  };
  

  return (
    <div>
      {showDeleteModal && (
        <CustomModal2 handleClose={() => setShowDeleteModal(false)}>
          <DeleteModal
            title={bookModalTitle}
            handleConfirm={onDelete}
            handleClose={() => setShowDeleteModal(false)}
          />
        </CustomModal2>
      )}
      {showRetryDownloadModal && (
        <CustomModal2 handleClose={() => setShowRetryDownloadModal(false)}>
          <RetryDownloadModal
            bookCover={bookCover}
            title={bookModalTitle}
            handleConfirm={onRetryDowload}
            handleClose={() => setShowRetryDownloadModal(false)}
          />
        </CustomModal2>
      )}
      <div className="relative w-fit h-fit flex justify-center">
        <div
          className="absolute w-fit right-[2px] z-9 cursor-pointer hover:scale-105 top-1 "
          onClick={() => setShowDeleteModal(true)}
        >
          ❌
        </div>

        {Number(book.pages) > 0 && (
          <div className="absolute rounded-full w-fit  bg-white p-0.5 m-1 border shadow-md text-sm">
            <span className="  text-gray-600 "> Pags. {book.pages} </span>
          </div>
        )}
        <div className="absolute w-fit left-[2px] z-10 cursor-pointer hover:scale-105 top-1">
          {["error", "extract text error"].includes(book?.status??"") ? (
            <CgSoftwareDownload
              className="w-6 h-6"
              onClick={() => setShowRetryDownloadModal(true)}
            />
          ) : (
            <CgHeadset className="w-6 h-6" />
          )}
        </div>
        <div
          onMouseDown={handleMouseDown}
          className={`w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col 
          justify-between h-[300px] duration-500  bg-white`}
        >
          <div className="flex justify-center mb-2">
            <img className="ounded-lg mt-8 h-20 sm:h-32" src={bookCover} />
          </div>

          <div className="flex justify-between px-1 text-sm ">
            <span>{book?.language}</span>
            <span>.{book?.extension}</span>
          </div>

          <div className="p-1 text-center overflow-auto">
            <div className="flex flex-col ">
              <BookStatus book={book} />

              <span className="font-bold text-gray-600 mb-2">
                {book?.title_2}
                
              </span>

              {book?.year.toString() != "N/A" && <span>{book?.year}</span>}
            </div>
            <div className="p-1">
              <span className="text-gray-600 mb-2">
                By {book?.author ? book?.author?.slice(0, 50) : ""}...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
