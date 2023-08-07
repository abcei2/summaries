import { useEffect } from "react";
import { Book } from "../../types";
import { useState } from "react";
import Card from "@/components/Card";
import { HeadsetIcon } from "@/icons/Index";
import { useRouter } from "next/router";

const page = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/users/my-library")
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data.data);
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="w-full bg-[#F8F8F8] h-20 flex items-center justify-center">
        <span className="w-[80%] text-3xl font-bold text-gray-600 w-full ">
          My Library
        </span>
      </div>

      <div className="w-full h-20 flex items-center justify-center">
        <span className="w-[80%] text-4xl font-semibold text-gray-600 w-full ">
          Reading Now
        </span>
      </div>
      <div className="w-[80%] h-full ">
        <div className="w-fit grid grid-cols-4 gap-2">
          {myBooks.map((book, key) => (
            <div
              key={key}
              onClick={() => {
                router.push(`/books/details/${book.global_id}`);
              }}
              className={`w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col justify-between max-h-[300px] duration-500 hover:shadow-2xl`}
            >
              <div className=" relative">
                <div className="absolute rounded-full w-fit  bg-white p-2 m-1 border shadow-md">
                  {HeadsetIcon}
                </div>
                <div className="flex justify-center mb-2">
                  <img
                    className="ounded-lg mt-8 h-20 sm:h-32"
                    src="/card-img.jpg"
                  />
                </div>
              </div>

              <div className="p-1 text-center">
                <div className="p-1">
                  <span className="font-bold text-gray-600 mb-2">
                    {book?.title_2 ? book?.title_2.slice(0, 50) : ""}
                  </span>
                </div>
                <div className="p-1">
                  <span className="  text-gray-600 mb-2">
                    By {book?.author ? book?.author?.slice(0, 50) : ""}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
