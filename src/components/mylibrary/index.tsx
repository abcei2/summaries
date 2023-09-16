import { useEffect } from "react";
import { Book } from "../../types";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import MyBook from "./MyBook";
import useModelObserver from "@/hooks/useModelObserver";

const MyLibrary = () => {
  const [myBooks, setMyBooks] = useState<Book[]>();
  const [loading, setLoading] = useState(false);

  useModelObserver({
    handleData: (data) => {
      setMyBooks(data);
    },
    subscribedData: myBooks?.filter(
      (book) =>
        book?.status &&
        ["queue", "downloading", "downloaded"].includes(book.status)
    ),
    noSubscribeData: myBooks?.filter(
      (book) =>
        !book?.status ||
        !["queue", "downloading", "downloaded"].includes(book.status)
    ),
    modelName: "book",
  });

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch("/api/users/my-library")
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#F8F8F8] h-20 flex items-center justify-center">
        <span className="w-[80%] text-4xl font-bold text-gray-600 w-full ">
          My Library
        </span>
      </div>

      <div className="w-full h-20 flex items-center justify-center">
        <span className="w-[80%] text-3xl font-semibold text-gray-600 w-full ">
          Reading Now
        </span>
      </div>
      <div className="w-full h-full flex justify-center ">
        {!loading ? (
          <div className="w-fit grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myBooks &&
              myBooks.map((book, key) => <MyBook book={book} key={key} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
            <span className="text-2xl font-bold">Loading library...</span>
            <HiCog className="animate-spin duration-300 h-12 w-12" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
