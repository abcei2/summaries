import BookCard from "../../../components/BookCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Book, SummaryType } from "../../../types";
import LoadingSpin from "@/components/utils/LoadingSpin";
import useModelObserver from "@/hooks/useModelObserver";
import SummaryComp from "@/components/summary";

const page = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState<Book>();
  const [sumary, setSummary] = useState<SummaryType>();

  useModelObserver({
    handleData: (data) => {
      setSummary(data[0]);
    },
    subscribedData: sumary?[sumary]:[],
    modelName: "summary",
  });

  useEffect(() => {
    reloadBook();
    reloadSummaries();
  }, [bookId]);

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
        setSummary(data.data && data.data.length>0 ? data.data.find(
          (summary:SummaryType) => summary?.method != "dummy"
        
        ): undefined);
      });
  };

  if (!book || !bookId) return <LoadingSpin text="Loading book details" />;

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-2 ">
        <BookCard
          book={book}
        />
      </div>
      <div className="w-[90%] lg:w-[80%] flex flex-col gap-2 ">
        {sumary && <SummaryComp
          currentSummary={sumary}
        />}
      </div>
    </div>
  );
};

export default page;
