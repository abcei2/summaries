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
    (summary) => summary?.method != "dummy" //&& summary?.state != "error"
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
    roomName: bookId,
    updateData: (data) => {
      console.log("data", data);
      if (!summaryList) return;
      const index = summaryList.findIndex(
        (item) => Number(item.id) == Number(data.summary_id)
      );
      if (index == -1) return;
      summaryList[index] = {
        ...summaryList[index],
        state: data.state,
        progress: data.progress,
      };
      setSummaryList([...summaryList]);
    },
    connectToWS: summaryList?.some((summary) =>
      subscribeToSummary(summary.state ?? "")
    ),
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
      if (Number(book.global_id) != Number(data.book_id)) return;
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
      !book.can_do_summary &&
      !currentShowSummary &&
      !user?.is_superuser &&
      user?.is_subscribed
    ) {
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

      {book.status === BOOK_BACKEND_STATUS.DOWNLOADING && (
        <LoadingSpin text={`Downloading. ${book.progress}%`} />
      )}

      {user &&
        !user.is_staff &&
        !user.is_superuser &&
        user.is_subscribed &&
        currentShowSummary?.state == "running" && (
          <div className="flex gap-2">
            {book.can_do_summary}

            {
              <LoadingSpin
                text={`Generating summary. ${(
                  Number(currentShowSummary?.progress) * 100
                ).toFixed(1)} %`}
              />
            }
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
