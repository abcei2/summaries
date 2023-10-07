import Card from "@/components/Card";
import { HiSearch, HiCog } from "react-icons/hi";
import { useState } from "react";
import { Book } from "../types";
import { HiUpload } from 'react-icons/hi';

export default function Home() {
  const [books, setBooks] = useState<Book[]>();
  const [searching, setSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const onSearch = () => {
    if (searchTerm.length >= 2) {
      setSearching(true);
      setBooks([]);
      fetch(`/api/search?word=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data.data);
        })
        .finally(() => setSearching(false));
        setHasSearched(true);
    } else {
      alert("Please enter at least 2 characters");
    }
  };

  // Function to handle document upload
  const handleDocumentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Create FormData and append the file
    const formData = new FormData();
    formData.append("document", file);
  
    try {
      const response = await fetch("api/upload_doc", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        // Handle successful upload
        console.log("1111");
      } else {
        // Handle error
        console.log(response);
        console.log("22222");
      }
    } catch (error) {
      // Handle fetch error
      console.log(error);
      console.log("33333");
    }
  };
  

  return (
    <div className="w-full flex flex-col gap-6 items-center">
      <div className="w-full h-16 flex justify-center items-center ">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              onSearch();
            }
          }}
          className="w-3/4 sm:w-1/2 h-10 border-y-2 border-l-2 border-gray-300 rounded-l-md p-2 "
          placeholder="Search for a book"
        />
        <button
          onClick={onSearch}
          className="w-10 h-10 bg-primary rounded-r-md flex justify-center items-center "
        >
          <HiSearch className="hover:scale-125 duration-300 hover:animate-pulse" />
        </button>

        
        <div className="w-1 h-10 bg-white"></div>


        <label className="w-10 h-10 bg-primary rounded flex justify-center items-center cursor-pointer">
          <input 
            type="file"
            className="hidden"
            onChange={handleDocumentUpload}
          />
          <HiUpload className="hover:scale-125 duration-300 hover:animate-pulse" />
        </label>
        

      </div>
      {books && books.length > 0 ? (
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
        <div className="w-full h-full text-center text-2xl text-gray-500 flex flex-col items-center gap-2">
          <span>Searching...</span>
          <HiCog className="animate-spin duration-[3000] h-12 w-12" />
        </div>
      ) : hasSearched ? (
        <div className="w-full h-full text-center text-2xl text-gray-500">No books found</div>
      ) : null}

    </div>
  );
}
