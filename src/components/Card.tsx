import { HeadsetIcon } from "@/icons/Index";
import { useState } from "react";
import { Book } from "../../types";
import { useEffect } from "react";
import { HiSearch, HiCog } from "react-icons/hi";

const Card = ({ book, className }: { book: Book; className?: string }) => {
  if(!book) return null
  const [bookStatus, setBookStatus] = useState<{
    status: "downloading" | "downloaded" | "queue";
    progress: number;
  }>();
  const [itsPollingInterval, setItsPollingInterval] = useState<NodeJS.Timer>();
  const [loading, setLoading] = useState(false);
  const [startPolling, setStartPolling] = useState(false);
  
  useEffect(() => {
    if (startPolling) {
      setItsPollingInterval(
        setInterval(() => {
          syncStatus();
        }, 1000)
      );
    } else {
      if (itsPollingInterval) {
        console.log("CLEARING")
        clearInterval(itsPollingInterval);
      }
    }
  }, [startPolling]);

  useEffect(() => {
    return () => {
      if (itsPollingInterval) {
        console.log("CLEARING")
        clearInterval(itsPollingInterval);
      }
    };
  }, []);

  const syncStatus = async () => {
    await fetch(`http://192.168.1.3:8000/download/`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookStatus(data);
        console.log(data);
        if (data.status === "downloaded") {
          setStartPolling(false);
          setLoading(false);
        } else if (data.status === "downloading") {
          setLoading(false);
        }
      });
  };

  const onDownload = () => {
    if (loading) return;
    setLoading(true);
    fetch(`http://192.168.80.13:8000/download/`, {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookStatus(data);
        console.log(data);
        if (data.status !== "downloaded") {
          console.log("polling");
          setStartPolling(true)
        } else {
          setLoading(false);
        }
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
          <img
            className="ounded-lg mt-8 h-20 sm:h-32"
            src="/card-img.jpg"
          />
        </div>
      </div>

      <div className="p-1 text-center">
        <div className="p-1">
          <span className="font-bold text-gray-600 mb-2">
            {book?.title_2?book?.title_2.lice(0, 50):""}
          </span>
        </div>
        <div className="p-1">
          <span className="  text-gray-600 mb-2">By {book.author}</span>
        </div>
      </div>
      <button
        onClick={onDownload}
        className="w-full h-10 bg-primary rounded-b-lg flex justify-center items-center text-white"
      >
        {loading ? (
          <HiCog className="animate-spin duration-300 h-6 w-6" />
        ) : bookStatus?.status === "downloading" ? (
          <div className="flex flex-col items-center">
            <span className="text-xs text-white">{bookStatus.progress}%</span>
            <div className="w-20 h-1 bg-white rounded-full">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${bookStatus.progress}%` }}
              ></div>
            </div>
          </div>
        ) : bookStatus?.status === "downloaded" ? (
          <span className="text-xs text-white">Downloaded</span>
        ) : (
          <span className="text-xs text-white">Download</span>
        )}
      </button>
    </div>
  );
};

export default Card;
