import { HeadsetIcon } from "../customIcons";
import { useState } from "react";
import { Book } from "../types";
import { useEffect } from "react";
import { HiSearch, HiCog } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Card = ({ book, className }: { book: Book; className?: string }) => {
  if (!book) return null;
  const [bookStatus, setBookStatus] = useState<{
    status: "downloading" | "downloaded" | "queue" | "extracted" | "error";
    progress: number;
    exists: boolean;
    in_my_library?: boolean;
  }>({
    status: book.status || "queue",
    progress: 0,
    exists: false,
    in_my_library: book.in_my_library,
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!bookStatus) return;
    if (bookStatus.exists) return alert("Book already exists in your library");
  }, [bookStatus]);
  const onAddToLibrary = () => {
    if (loading) return;
    setLoading(true);
    fetch(
      `/api/users/library`,
      {
        method: "POST",
        body: JSON.stringify(book),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBookStatus(data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className={`${
        className ?? ""
      } w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col justify-between`}
    >
      <div className="relative flex flex-col">
        <div className="absolute rounded-full w-fit p-2 m-1 border shadow-md">
          {HeadsetIcon}
        </div>

        {Number(book.pages) > 0 && (
          <div className="absolute rounded-full w-fit p-0.5 m-1 border shadow-md right-[0px] text-sm">
            <span className="  text-gray-600 "> Pags. {book.pages} </span>
          </div>
        )}
        <div className="flex justify-center mb-2">
          <img
            className="ounded-lg mt-8 h-20 sm:h-32"
            src={
              book?.cover_img_path != "null"
                ? `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/${book?.cover_img_path}`
                : "/card-img.jpg"
            }
          />
        </div>
        <div className="flex justify-between px-1 text-sm ">
          <span>{book?.language}</span>
          <span>.{book?.extension}</span>
        </div>
      </div>

      <div className="text-center p-1">
        <div className="">
          <span className="font-bold text-gray-600 mb-2">
            {book?.title_2 ? book?.title_2 : ""}
          </span>
        </div>

        {book?.year.toString() != "N/A" && <span>{book?.year}</span>}
        <div className="flex flex-col">
          <span className="  text-gray-600 ">By {book.author}</span>
        </div>
      </div>
      {bookStatus.in_my_library ? (
        <a
          className={`w-full h-10 bg-gray-100 rounded-b-lg flex justify-center items-center text-black`}
          href={`/books/details/${book.global_id}`}
        >
          In my library
        </a>
      ) : (
        <button
          onClick={onAddToLibrary}
          className={`w-full h-10 bg-primary rounded-b-lg flex justify-center items-center text-white`}
        >
          {loading ? (
            <HiCog className="animate-spin duration-300 h-6 w-6" />
          ) : (
            <span className="text-xs text-white">Add to my library</span>
          )}
        </button>
      )}
    </div>
  );
};

export default Card;
