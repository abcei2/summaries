import { useState } from "react";
import { useEffect } from "react";
import { HiSearch, HiCog } from "react-icons/hi";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Book } from "@/types";
import CustomImage from "../utils/CustomImage";

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
    fetch(`/api/users/library`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    })
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
      className={`hover:before:bg-primary hover:before:opacity-40 hover:before:w-full hover:before:h-full 
        before:absolute before:top-0 before:left-0 before:z-[0] before:content-[''] relative
        ${
          className ?? ""
        } rounded-[10px] h-[220px] w-full shadow-lg border border-custom-black
        justify-between px-3 py-4 text-xs`}
    >
      <div className="relative z-[1] flex flex-col gap-4">
        <div className="flex flex-col  ">
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
                {book?.year.toString() != "N/A" && <span>{book?.year}</span>}
                <CustomImage
                  src="/icons/headset.svg"
                  alt="Headset"
                  width={14}
                  height={14}
                />
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
          {bookStatus.in_my_library ? (
            <a
              className={`book-card-button bg-tertiary`}
              href={`/books/details/${book.global_id}`}
            >
              In my library
            </a>
          ) : (
            <button
              onClick={onAddToLibrary}
              className={`book-card-button bg-primary`}
            >
              {loading ? (
                <HiCog className="animate-spin duration-300 h-6 w-6" />
              ) : (
                <span>Add to my library</span>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
