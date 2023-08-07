import BookCard from "../../../components/BookCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Book } from "../../../../types";

const page = () => {
  const router = useRouter();
  const { bookId } = router.query;
  const [book, setBook] = useState<Book>();
  const [summaryList, setSummaryList] = useState<any[]>([]);

  useEffect(() => {
    if (!bookId) return console.log("No bookId");
    fetch("/api/books/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        setBook(data.data);
      });
    fetch("/api/books/summaries/" + bookId)
      .then((res) => res.json())
      .then((data) => {
        setSummaryList(data.data);
      });
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] lg:w-[60%] flex flex-col gap-2 mt-10">
        <BookCard book={book} />

        <div className="flex flex-col gap-2">
          <div className=" font-bold text-2xl">Summaries</div>
          {summaryList.map((summary, index) => (
            <div
              onClick={() => router.push("/books/summary/" + summary.id)}
              key={index}
              className="grid grid-col-2 md:grid-cols-5 gap-2 items-center rounded-lg shadow-sm bg-[#F8F8F8]
            hover:scale-105 duration-200 transform cursor-pointer text-lg"
            >
              <div className="flex flex-col">
                <span className="text-base font-semibold">Status: </span>
                {summary.state}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Date: </span>
                {new Date(summary.created_at).toDateString()}
              </div>
              <div className="flex flex-col ">
                <span className="text-base font-semibold">Model1: </span>
                {summary.model1}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Model2: </span>
                {summary.model2}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold">Method: </span>
                {summary.method}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
