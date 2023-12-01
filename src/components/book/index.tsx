import BookDetailsCard from "./BookDetailsCard";
import { useEffect, useState } from "react";
import { Book, SummaryType } from "../../types";
import LoadingSpin from "@/components/utils/LoadingSpin";
import useModelObserver from "@/hooks/useModelObserver";
import SummaryComp from "@/components/summary";
import { BOOK_BACKEND_STATUS, SUMMARY_BACKEND_STATUS } from "@/constants";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import SummaryList from "./SummaryList";
import { BookStatus } from "@/utils/books";
import { get } from "http";

const MainBookComponent = ({ bookId }: { bookId: string }) => {
  const [book, setBook] = useState<Book>();
  const [summaryList, setSummaryList] = useState<SummaryType[]>();
  const { user } = useContext(UserContext);
  const [loadingBook, setLoadingBook] = useState(false);
  const [loadingSummaries, setLoadingSummaries] = useState(false);
  const loading = loadingBook || loadingSummaries;
  

  const currentShowSummary = summaryList?.find(
    (summary) => summary?.method != "dummy" && summary?.state != "error"
  );

  const lastSummary = summaryList?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];

  const subscribeToSummary = (state: string) =>
    [SUMMARY_BACKEND_STATUS.QUEUE, SUMMARY_BACKEND_STATUS.RUNNING].includes(
      state
    );
  // Subscribe to summary each time [TODO change to only subscribe to the summary if is != "done" summary]
  useModelObserver({
    roomName: book?.id ?? "",
    updateData: (data) => {
      const { summary_id, ...rest } = data;
      if (!summaryList)
        return [
          {
            id: summary_id,
            ...rest,
          },
        ];
      const index = summaryList.findIndex(
        (item) => Number(item.id) == Number(summary_id)
      );
      if (index == -1) return;
      summaryList[index] = {
        ...summaryList[index],
        ...rest,
      };
      setSummaryList([...summaryList]);
    },
    connectToWS:
      summaryList?.some((summary) => subscribeToSummary(summary.state ?? "")) &&
      book?.id != undefined,
  });

  const subscribeToBook = (status: string) =>
    [
      BOOK_BACKEND_STATUS.QUEUE,
      BOOK_BACKEND_STATUS.DOWNLOADING,
      BOOK_BACKEND_STATUS.DOWNLOADED,
    ].includes(status);

  useModelObserver({
    updateData: (data) => {
      if (!book) return undefined;
      if (Number(book.id) != Number(data.pk)) return;
      setBook({ ...book, status: data.status, progress: data.progress });
    },
    roomName: "global_library",
    connectToWS: book && book.status && subscribeToBook(book.status),
  });

  useEffect(() => {
    reloadBook();
    reloadSummaries();
  }, [bookId]);

  useEffect(() => {
    if (!book) return;
    if (
      book.status == BOOK_BACKEND_STATUS.EXTRACTED &&
      book.can_do_summary &&
      !currentShowSummary &&
      !user?.is_superuser &&
      user?.is_subscribed
    ) {
      reloadSummaries();
    }
  }, [book]);

  const reloadBook = () => {
    if (!bookId) return console.log("No bookId");
    setLoadingBook(true);
    fetch("/api/books/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        setBook(data.data);
      })
      .finally(() => setLoadingBook(false));
  };

  const reloadSummaries = () => {
    if (!bookId) return console.log("No bookId");
    setLoadingSummaries(true);
    fetch("/api/books/summaries/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        setSummaryList(data.data);
      })
      .finally(() => setLoadingSummaries(false));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (summaryList) {
        summaryList.forEach((summary) => {
          if (summary.state !== SUMMARY_BACKEND_STATUS.DONE && summary.state !== SUMMARY_BACKEND_STATUS.ERROR) {
            console.log('Fetching summary progress for summary:', summary.id);
            fetch(`/api/summaries/${summary.id}`)
              .then((res) => res.json())
              .then((data) => {
                console.log('Summary progress:', data.data.progress);
                // Update the progress of the summary in summaryList
                const updatedSummaries = summaryList.map((item) => {
                  if (item.id === summary.id) {
                    return { ...item, progress: data.data.progress };
                  }
                  return item;
                });
                setSummaryList(updatedSummaries);
              })
              .catch((error) => console.error('Error fetching summary progress:', error));
          }
        });
      }
    }, 30000); // 10000 milliseconds = 10 seconds
  
    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [summaryList]);
  

  if (!book || !bookId) return <LoadingSpin text="Loading book details" />;

  const getStatusText = (book: Book) => {
    //console.log(book);
    switch (book.status) {
      case BOOK_BACKEND_STATUS.DOWNLOADING:
        return `Downloading ${book?.progress ? book?.progress + "%" : ""}`;
      case BOOK_BACKEND_STATUS.DOWNLOADED:
        return "Retrieving text";
      case BOOK_BACKEND_STATUS.EXTRACTED:
        return "Extracted";
      case BOOK_BACKEND_STATUS.QUEUE:
        return "Waiting in queue";
      case BOOK_BACKEND_STATUS.ERROR:
        return "Download error";
      default:
        return book?.status;
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-2 ">
        <BookDetailsCard
          book={book}
          lastSummary={lastSummary}
          loading={loading}
          reloadSummaries={reloadSummaries}
          handleUpdateBook={(newBook) => {
            setBook({
              ...book,
              ...newBook,
            });
          }}
        />
      </div>

      

      {user &&
        
          //check if the book is not extracted or if the summary is running
          (book.status != BOOK_BACKEND_STATUS.EXTRACTED ||
            lastSummary?.state == SUMMARY_BACKEND_STATUS.RUNNING || 
            lastSummary?.state == SUMMARY_BACKEND_STATUS.QUEUE
            ) && (
          <div className="flex gap-2">
            {
              <LoadingSpin
                text={
                  lastSummary?.state == SUMMARY_BACKEND_STATUS.RUNNING
                    ? `Generating summary. ${(
                        Number(lastSummary?.progress) * 100
                      ).toFixed(1)} %`
                    : lastSummary?.state == SUMMARY_BACKEND_STATUS.QUEUE? "Waiting in queue" : getStatusText(book)
                }
              />
            }
          </div>
        )
        }

      <div className="w-[90%] lg:w-[80%] flex flex-col gap-2 ">
        {user && (user.is_staff || user.is_superuser) ? (
          <SummaryList summaryList={summaryList ?? []} />
        ) : (
          <SummaryComp currentShowSummary={currentShowSummary} />
        )}
      </div>
    </div>
  );
};

export default MainBookComponent;
