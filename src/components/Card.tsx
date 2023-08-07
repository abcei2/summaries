import { HeadsetIcon } from "@/icons/Index";
import { useState } from "react";
import { Book } from "../../types";
import { useEffect } from "react";
import { HiSearch, HiCog } from "react-icons/hi";

const Card = ({ book, className }: { book: Book; className?: string }) => {
  if (!book) return null;
  const [bookStatus, setBookStatus] = useState<{
    status: "downloading" | "downloaded" | "queue";
    progress: number;
  }>();
  const [loading, setLoading] = useState(false);

  const onAddToLibrary = () => {
    if (loading) return;
    setLoading(true);
    fetch(`/api/users/library/add`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
      <div className=" relative">
        <div className="absolute rounded-full w-fit  bg-white p-2 m-1 border shadow-md">
          {HeadsetIcon}
        </div>
        <div className="flex justify-center mb-2">
          <img className="ounded-lg mt-8 h-20 sm:h-32" src="/card-img.jpg" />
        </div>
      </div>

      <div className="p-1 text-center">
        <div className="p-1">
          <span className="font-bold text-gray-600 mb-2">
            {book?.title_2 ? book?.title_2.slice(0, 50) : ""}
          </span>
        </div>
        <div className="p-1">
          <span className="  text-gray-600 mb-2">By {book.author}</span>
        </div>
      </div>
      <button
        onClick={onAddToLibrary}
        className="w-full h-10 bg-primary rounded-b-lg flex justify-center items-center text-white"
      >
        {loading ? (
          <HiCog className="animate-spin duration-300 h-6 w-6" />
        ) : (
          <span className="text-xs text-white">Add to my library</span>
        )}
      </button>
    </div>
  );
};

export default Card;
