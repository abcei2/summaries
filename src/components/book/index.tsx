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

const MainBookComponent = ({ bookId }: { bookId: string }) => {
  const [book, setBook] = useState<Book>();
  const [summaryList, setSummaryList] = useState<SummaryType[]>();
  const { user } = useContext(UserContext);

  const currentShowSummary = summaryList?.find(
    (summary) => summary?.method != "dummy"
  );

  const lastSummary = summaryList?.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];

  const subscribeToBook =
    book &&
    book.status &&
    [
      BOOK_BACKEND_STATUS.QUEUE,
      BOOK_BACKEND_STATUS.DOWNLOADING,
      BOOK_BACKEND_STATUS.DOWNLOADED,
    ].includes(book.status) 

  const subscribeToSummary = (state: string) =>
    [SUMMARY_BACKEND_STATUS.QUEUE, SUMMARY_BACKEND_STATUS.RUNNING].includes(
      state
    );

  // Subscribe to book model if book is in queue, downloading or downloaded, to get the progress
  useModelObserver({
    handleData: (data) => {
      setBook(data[0]);
    },
    subscribedData: subscribeToBook ? [book] : [],
    noSubscribeData: !subscribeToBook ? [book] : [],
    modelName: "book",
  });

  // Subscribe to summary each time [TODO change to only subscribe to the summary if is != "done" summary]
  useModelObserver({
    handleData: (data) => {
      setSummaryList(data);
    },
    subscribedData: summaryList?.filter((summary) =>
      subscribeToSummary(summary.state ?? "")
    ),
    noSubscribeData: summaryList?.filter(
      (summary) => !subscribeToSummary(summary.state ?? "")
    ),
    modelName: "summary",
  });

  useEffect(() => {
    reloadBook();
    reloadSummaries();
  }, [bookId]);

  useEffect(() => {
    if (!book) return;
    console.log("Book changed", book.status);
    console.log("Current summary", currentShowSummary?.state);
    
    if (
      book.status == BOOK_BACKEND_STATUS.EXTRACTED &&
      !book.can_do_summary &&
      !currentShowSummary &&
      !user?.is_superuser &&
      user?.is_subscribed
    ) {
      console.log("RELOAD SUMMARIES");
      reloadSummaries();
    }
  }, [book]);

  const reloadBook = () => {
    if (!bookId) return console.log("No bookId");

    fetch("/api/books/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.data);
      });
  };

  const reloadSummaries = () => {
    if (!bookId) return console.log("No bookId");
    fetch("/api/books/summaries/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        setSummaryList(data.data);
      });
  };

  if (!book || !bookId) return <LoadingSpin text="Loading book details" />;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-2 ">
        <BookDetailsCard
          book={book}
          lastSummary={lastSummary}
          reloadSummaries={reloadSummaries}
          handleUpdateBook={(newBook) => {
            setBook({
              ...book,
              ...newBook,
            });
          }}
        />
      </div>
      {user && !user.is_staff && !user.is_superuser && user.is_subscribed && (
        <div className="flex gap-2">
          {book.can_do_summary}
          <span>{currentShowSummary?.state} </span>
          <span>{currentShowSummary?.progress}</span>
        </div>
      )}

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
