import { useRouter } from "next/router";
import { Book } from "../../types";
import { HeadsetIcon } from "@/icons/Index";
import { useState } from "react";
import { CustomModal2 } from "../utils/custommodals";

const MyBook = ({ book }: { book: Book }) => {
  const router = useRouter();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDelete = () => {
    fetch(`/api/users/library/${book.global_id}`, {
      method: "DELETE",
    }).then(() => {
      router.reload();
    });
  };

  return (
    <div>
      {showDeleteModal && (
        <CustomModal2 handleClose={() => setShowDeleteModal(false)}>
          <div className="bg-white rounded-lg flex flex-col items-center p-2 h-fit">
            <div className="text-4xl mb-2">🗑️</div>
            <span className="text-2xl font-bold mb-2 text-center">
              Confirm the deletion of the book
              <div className="text-xl">{book?.title_2 ? book?.title_2.slice(0, 20) : ""}....{" "}</div>
            </span>
            <span className="text-gray-500 mb-2">
              This action cannot be undone
            </span>
            <div className="flex justify-center items-center">
              <button
                className="bg-red-500 text-white rounded-lg px-4 py-2 mr-2"
                onClick={onDelete}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white rounded-lg px-4 py-2"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </CustomModal2>
      )}
      <div className="relative w-fit h-fit">
        <div
          className="absolute w-fit right-[2px] z-10 cursor-pointer hover:scale-105 top-1"
          onClick={() => setShowDeleteModal(true)}
        >
          ❌
        </div>
        <div className="absolute w-fit left-[2px] z-10 cursor-pointer hover:scale-105 top-1">
          {HeadsetIcon}
        </div>
        <div
          onClick={() => {
            book.status == "extracted"
              ? router.push(`/books/details/${book.global_id}`)
              : alert("El libro no esta disponible");
          }}
          className={`w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col 
        ${
          book?.status != "extracted"
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-gray-200 hover:shadow-xl"
        }
        justify-between h-[300px] duration-500  bg-white`}
        >
          <div className="flex justify-center mb-2">
            <img className="ounded-lg mt-8 h-20 sm:h-32" src="/card-img.jpg" />
          </div>

          <div className="p-1 text-center overflow-auto">
            <div className="flex flex-col ">
              {book.status == "downloading" ? (
                <span className="font-bold text-gray-600 mb-2">
                  Descargando {book?.progress + "%"}
                </span>
              ) : book.status == "downloaded" ? (
                <span className="font-bold text-gray-600 mb-2">
                  Extrayendo texto
                </span>
              ) : book.status == "extracted" ? (
                <span className="font-bold text-gray-600 mb-2">
                  Texto disponible
                </span>
              ) : book.status == "queue" ? (
                <span className="font-bold text-gray-600 mb-2">
                  En cola para descarga
                </span>
              ) : (
                <span className="font-bold text-gray-600 mb-2">
                  {book?.status}
                </span>
              )}

              <span className="font-bold text-gray-600 mb-2">
                {book?.title_2 ? book?.title_2.slice(0, 20) : ""}....
              </span>
            </div>
            <div className="p-1">
              <span className="  text-gray-600 mb-2">
                By {book?.author ? book?.author?.slice(0, 20) : ""}...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBook;
