import Card from "@/components/Card";
import { HiSearch, HiCog } from "react-icons/hi";
import { useState } from "react";
import { Book } from "../../types";
import { useEffect } from "react";

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onSearch = () => {
    if (searchTerm.length > 5) {
      setSearching(true);
      setBooks([]);
      fetch(`http://192.168.80.13:8000/search-topic?word=${searchTerm}&n=5`)
        .then((res) => res.json())
        .then((data) => setBooks(data.data))
        .finally(() => setSearching(false));
    } else {
      alert("Please enter at least 5 characters");
    }
  };
  

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full h-16 flex justify-center items-center ">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/4 sm:w-1/2 h-10 border-y-2 border-l-2 border-gray-300 rounded-l-md p-2 "
          placeholder="Search for a book"
        />
        <button
          onClick={onSearch}
         className="w-10 h-10 bg-primary rounded-r-md flex justify-center items-center ">
          <HiSearch className="hover:scale-125 duration-300 hover:animate-pulse" />
        </button>
      </div>
      {books.length > 0 ? (
        <div className="w-full xl:w-[90%] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 overflow-auto">
          {books.map((book) => (
            <Card
              className="justify-self-center mt-2 "
              key={book.global_id}
              book={book}
            />
          ))}
        </div>
      ) : searching ? (
        <div className="w-full h-full  text-center text-2xl text-gray-500 flex flex-col items-center gap-2">
          <span>Searching...</span>
          <HiCog
            className="animate-spin duration-[3000] h-12 w-12"
          />
        </div>
      ) : (
        <div className="w-full h-full  text-center text-2xl text-gray-500">
          No books found
        </div>
      )}
    </div>
  );
}
