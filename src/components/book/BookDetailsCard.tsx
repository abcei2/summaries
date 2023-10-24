import { useState, useEffect } from "react";
import { HiCog } from "react-icons/hi";
import { Book, SumaryCreateParams, SummaryType } from "../../types";
import { CustomModal2 } from "../utils/custommodals";
import SummaryParamsSelector from "../summary/SummaryParamsSelector";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { CgHeadset, CgSoftwareDownload } from "react-icons/cg";
import RetryDownloadModal from "@/components/mylibrary/RetryDownloadModal";
import { BOOK_BACKEND_STATUS, SUMMARY_BACKEND_STATUS } from "@/constants";
import SubscribedSummaryRequest from "@/components/summary/SubscribedSummaryRequest";
import { DEFAULT_SUMMARY_PARAMS } from "@/constants/model";

const BookDetailsCard = ({
  book,
  handleUpdateBook,
  reloadSummaries,
  lastSummary,
}: {
  book: Book;
  handleUpdateBook: (book: Book) => void;
  reloadSummaries: () => void;
  lastSummary?: SummaryType;
}) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showRetryDownloadModal, setShowRetryDownloadModal] = useState(false);

  const bookCover = book?.cover_img_path
    ? `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/${book?.cover_img_path}`
    : "/card-img.jpg";

  const bookModalTitle = book?.title_2
    ? book?.title_2.length > 80
      ? book?.title_2.slice(0, 80) + "..."
      : book?.title_2
    : "";

  const onRetryDowload = () => {
    if (!book) return console.log("No book");

    fetch(`/api/books/download/${book.global_id}$`, {
      method: "GET",
    })
      .then(async (resp) => {
        if (resp.status == 200) {
          handleUpdateBook({
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

  const onAskForSummary = () => {
    if (loading) return console.log("Loading...");
    if (!book.can_do_summary)
      return alert("The Summary is being " + book.status);

    setLoading(true);
    setShowSummaryModal(true);

    fetch("/api/books/" + book.global_id, {
      method: "GET",
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        handleUpdateBook(data.data);
        if (!data.data.can_do_summary) setShowSummaryModal(false);
      })
      .finally(() => setLoading(false));
  };

  const createResume = (creationParams: SumaryCreateParams) => {
    if (loading) return console.log("Loading...");
    if (!creationParams) return console.log("No creation params");
    setLoading(true);
    fetch("/api/summaries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: book.global_id,
        ...creationParams,
      }),
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log(res.status, res.statusText);
        }
      })
      .then((data) => {
        if (!data) return console.log("No data");
        console.log("createsummari, reload", data);
        reloadSummaries();
      })
      .finally(() => {
        setLoading(false);
        setShowSummaryModal(false);
      });
  };

  const summaryModalChildren = () => {
    if (loading)
      return (
        <div
          className={`rounded-lg bg-gray-200 animate-pulse ${
            user?.is_superuser
              ? "h-[400px] w-[300px]"
              : !user?.is_superuser && user?.is_subscribed
              ? "h-[300px] w-[600px]"
              : ""
          } 
        }`}
        ></div>
      );
    if (!book.can_do_summary)
      return (
        <div className="flex flex-col gap-4 bg-white h-fit rounded-lg p-2 w-full">
          <div className="text-2xl font-bold">Working on it</div>
          <div className="flex items-center justify-center h-64">
            <HiCog className="text-gray-500 animate-spin duration-[1000] h-24 w-24" />
          </div>
          <button
            onClick={() => setShowSummaryModal(false)}
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-2xl w-fit "
          >
            Close
          </button>
        </div>
      );
    else if (user?.is_superuser) {
      return (
        <SummaryParamsSelector
          handleClose={() => setShowSummaryModal(false)}
          handleCreateResume={(creationParams: SumaryCreateParams) =>
            createResume(creationParams)
          }
          bookId={book.global_id}
        />
      );
    } else if (!user?.is_superuser && user?.is_subscribed) {
      return (
        <SubscribedSummaryRequest
          handleClose={() => setShowSummaryModal(false)}
          handleConfirm={() => createResume(DEFAULT_SUMMARY_PARAMS)}
          title={bookModalTitle}
          bookCover={bookCover}
          bookId={book.global_id}
        />
      );
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden h-full w-full">
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
      {showSummaryModal && (
        <CustomModal2 handleClose={() => setShowSummaryModal(false)}>
          <div className="flex justify-center items-center w-full">
            <div className="w-[80%]">{summaryModalChildren()}</div>
          </div>
        </CustomModal2>
      )}

      <div className="flex lg:flex-row flex-col h-full items-center">
        <div className="bg-blue-300 p-2 rounded-lg overflow-hidden w-[200px] lg:w-[400px] h-fit">
          <img
            src={
              book?.cover_img_path
                ? `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/${book?.cover_img_path}`
                : "/card-img.jpg"
            }
            alt="Book cover"
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="lg:p-4 flex flex-col justify-center gap-2 w-full h-full ">
          <div>
            <h2 className="text-2xl md:text-4xl pb-2 font-bold capitalize w-fit flex items-center">
              {book.title_2}
            </h2>
            <p className="text-[#505258] text-base capitalize">
              <b>By:</b> {book.author}
            </p>
            <p className="text-[#505258] text-base capitalize">
              <b>Year: </b> {book.year}
            </p>
            <p className="text-[#505258] text-base capitalize">
              <b>Language:</b> {book.language}
            </p>
            <p className="text-[#505258] text-base">
              <b>File extension:</b> .{book.extension}
            </p>
            {Number(book.pages) > 0 && (
              <p className="text-[#505258] text-base capitalize">
                {book.pages} pages
              </p>
            )}
          </div>

          {book?.status == "error" ? (
            <CgSoftwareDownload
              className="w-6 h-6"
              onClick={() => setShowRetryDownloadModal(true)}
            />
          ) : (
            <CgHeadset className="w-6 h-6" />
          )}

          

          {book.status == BOOK_BACKEND_STATUS.EXTRACTED &&
            (user?.is_superuser ||
              (!user?.is_superuser && user?.is_subscribed && !lastSummary)) && (
                
              <button
                onClick={() => onAskForSummary()}
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-fit self-center lg:self-start "
              >
                
                {lastSummary &&
                (lastSummary.state != SUMMARY_BACKEND_STATUS.DONE &&
                lastSummary.state != SUMMARY_BACKEND_STATUS.ERROR) ? (
                  <div className="flex items-center justify-center">
                    Loading{" "}
                    
                    <HiCog className="text-gray-500 animate-spin duration-[1000] h-10 w-10" />
                  </div>
                ) : (
                  <span>Generate summary</span>
                )}
              </button>
            )}
        </div>

        <span className="border opacity-50 lg:block hidden" />
      </div>
    </div>
  );
};

export default BookDetailsCard;
