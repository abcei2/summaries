import { useEffect } from "react";
import { Book } from "../../types";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import MyBook from "./MyBook";
import useModelObserver from "@/hooks/useModelObserver";
import { BOOK_BACKEND_STATUS } from "@/constants";
import { HiUpload } from "react-icons/hi";
import CustomImage from "../utils/CustomImage";
const MyLibrary = () => {
  const [myBooks, setMyBooks] = useState<Book[]>();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>("");

  const handleUrlFetch = async () => {
    try {
      const response = await fetch("api/fetch_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToBook = (status?: string) =>
    status &&
    [
      BOOK_BACKEND_STATUS.QUEUE,
      BOOK_BACKEND_STATUS.DOWNLOADING,
      BOOK_BACKEND_STATUS.DOWNLOADED,
    ].includes(status);

  useModelObserver({
    updateData: (data) => {
      if (!myBooks) return undefined;
      const index = myBooks.findIndex(
        (item) => Number(item.id) == Number(data.pk)
      );
      if (index == -1) return;
      myBooks[index] = {
        ...myBooks[index],
        status: data.status,
        progress: data.progress,
      };
      setMyBooks([...myBooks]);
    },
    roomName: "global_library",
    connectToWS: myBooks?.some((book) => subscribeToBook(book.status)),
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

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("api/upload_doc", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Refresh the page when the file is successfully uploaded
        window.location.reload();
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col font-pt-sans">
      <div className="flex gap-2 items-center">
        <CustomImage
          src="/icons/punctuation.svg"
          alt="punctuation"
          width={16}
          height={16}
        />
        <span className="text-2xl font-bold font-rokkitt">My library</span>
      </div>

      <span className="text-2xl md:text-3xl font-semibold text-gray-600 ">
        Reading Now
      </span>
      <br></br>

      <div className="w-full h-full flex justify-center ">
        {!loading ? (
          <div className="w-fit grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {myBooks?.map((book, key) => (
              <MyBook
                book={book}
                updateBook={(book) => {
                  setMyBooks(
                    myBooks.map((b) => {
                      if (b.global_id == book.global_id) {
                        return book;
                      }
                      return b;
                    })
                  );
                }}
                key={key}
              />
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
