import { useState, useEffect } from "react";
import { HiCog } from "react-icons/hi";
import { Book, SumaryCreateParams } from "../../types";
import { CustomModal2 } from "../utils/custommodals";
import SurveyParamsSelector from "../summary/SurveyParamsSelector";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { CgHeadset, CgSoftwareDownload } from "react-icons/cg";
import RetryDownloadModal from "@/components/mylibrary/RetryDownloadModal";
import { bookStatus } from "@/utils/books";

const BookDetailsCard = ({
  book,
  handleUpdateBook,
}: {
  book: Book;
  handleUpdateBook: (book: Book) => void;
}) => {
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentBookData, setCurrentBookData] = useState<Book>(book);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showRetryDownloadModal, setShowRetryDownloadModal] = useState(false);

  useEffect(() => {
    setCurrentBookData(book);
  }, [book]);

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

    fetch(`/api/books/download/${book.global_id}`, {
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
    setLoading(true);
    fetch("/api/books/" + book.global_id, {
      method: "GET",
    })
      .then((res) => {
        if (res.status == 200) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setCurrentBookData(data.data);
      })
      .finally(() => setLoading(false));

    if (!currentBookData.can_do_summary)
      return alert("Book is being " + currentBookData.status);
    setShowSummaryModal(true);
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
        setCurrentBookData({
          ...currentBookData,
          status: data.status,
          can_do_summary: data.can_do_summary,
        });
      })
      .finally(() => {
        setLoading(false);
        setShowSummaryModal(false);
      });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden lg:h-full  lg:w-full">
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
          {currentBookData.can_do_summary ? (
            <SurveyParamsSelector
              handleClose={() => setShowSummaryModal(false)}
              handleCreateResume={createResume}
              bookId={book.global_id}
            />
          ) : (
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
          )}
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
            <h2 className="text-4xl pb-2 font-bold capitalize w-fit flex items-center">
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
          
          {bookStatus(book)}
          
          {user?.is_superuser && (
            <button
              onClick={() => onAskForSummary()}
              className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded w-fit self-center lg:self-start "
            >
              {!currentBookData.can_do_summary ? (
                <div className="flex items-center justify-center">
                  Loading{" "}
                  <HiCog className="text-gray-500 animate-spin duration-[1000] h-10 w-10" />
                </div>
              ) : (
                <span>Ask for summary</span>
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
