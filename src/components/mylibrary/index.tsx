import { useEffect } from "react";
import { Book } from "../../../types";
import { useState } from "react";
import { HeadsetIcon } from "@/icons/Index";
import { useRouter } from "next/router";
import { HiCog } from "react-icons/hi";

const MyLibrary = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch("/api/users/my-library")
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data.data ?? []);
      })
      .finally(() => setLoading(false));

    try {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_DJANGO_WS ?? "");
      ws.onopen = () => {
        myBooks.forEach((book) => {
          if (book.status == "extracted") return;
          ws.send(
            JSON.stringify({
              action: "subscribe_instance",
              request_id: new Date().getTime(),
              pk: book.id,
            })
          );
        });
      };
      ws.onmessage = (e: any) => {
        const eData = JSON.parse(e.data);
        console.log(eData);
        if (eData.action == "update") {
          setMyBooks(
            myBooks.map((book) => {
              if (book.id == eData.data.pk) {
                return {
                  ...book,
                  ...eData.data,
                };
              }
              return book;
            })
          );
        }
      };
      ws.onclose = () => {
        console.log("disconnected");
      };

      return () => {
        ws.close();
      };
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
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
      <div className="w-full lg:w-[80%] h-full flex justify-center ">
        {!loading ? (
          <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myBooks.map((book, key) => (
              <MyBook book={book} key={key} />
            ))}
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

const MyBook = ({ book }: { book: Book }) => {
  const router = useRouter();
  return (
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
          : "cursor-pointer hover:scale-105 hover:shadow-xl"
      }
      justify-between max-h-[300px] duration-500  bg-white`}
    >
      <div className=" relative">
        <div className="absolute rounded-full w-fit p-2 m-1 border shadow-md">
          {HeadsetIcon}
        </div>
        <div className="flex justify-center mb-2">
          <img className="ounded-lg mt-8 h-20 sm:h-32" src="/card-img.jpg" />
        </div>
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
            <span className="font-bold text-gray-600 mb-2">{book?.status}</span>
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
  );
};