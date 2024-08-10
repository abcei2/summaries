import { useRouter } from "next/router";
import { Book } from "../../types";
import { useEffect, useState } from "react";
import { CustomModal2 } from "../utils/custommodals";
import { CgHeadset, CgSoftwareDownload } from "react-icons/cg";
import DeleteModal from "./DeleteModal";
import RetryDownloadModal from "./RetryDownloadModal";
import CustomImage from "../utils/CustomImage";

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

  return (
    <div className="">
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

      <div
        className={`hover:before:bg-primary hover:before:opacity-40 hover:before:w-full hover:before:h-full 
      before:absolute before:top-0 before:left-0 before:z-[0] before:content-[''] relative
     rounded-[10px] h-[220px] w-full shadow-lg border border-custom-black
      justify-between px-3 py-4 text-xs z-1`}
      >
        <div
          className="absolute w-fit right-[2px] z-1 cursor-pointer hover:scale-105 top-1"
          onClick={() => setShowDeleteModal(true)}
        >
          ❌
        </div>

        <div className="relative z-1 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              className="rounded-[10px] min-w-[100px]  h-[140px]"
              alt="book cover"
              src={
                book?.cover_img_path != "null"
                  ? `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/${book?.cover_img_path}`
                  : "/card-img.jpg"
              }
            />

            <div className="p-1 w-full flex flex-col gap-2">
              <div className="">
                <span className="font-bold">
                  {book?.title_2 ? book?.title_2 : ""}
                </span>
              </div>

              <span className="italic text-[10px]">By {book.author}</span>

              <div className="flex gap-1 items-center font-bold">
                
              {book?.year?.toString() !== "N/A" && <span>{book?.year}</span>}

                <div className="w-fit left-[2px] z-1 cursor-pointer hover:scale-105 top-1">
                  {["error", "extract text error"].includes(
                    book?.status ?? ""
                  ) ? (
                    <CgSoftwareDownload
                      className="w-6 h-6"
                      onClick={() => setShowRetryDownloadModal(true)}
                    />
                  ) : (
                    <CgHeadset className="w-6 h-6" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-1 px-1 justify-between">
            <div className="flex gap-1 items-center">
              {Number(book.pages) > 0 && (
                <span className="book-tags">{book.pages} pgs.</span>
              )}
              <span className="book-tags">{book?.language}</span>
              <span className="book-tags">.{book?.extension}</span>
            </div>
            <a
              className={`book-card-button bg-primary`}
              href={`/books/details/${book.global_id}`}
            >
              Details
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;