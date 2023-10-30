import Card from "@/components/Card";
import { HiSearch, HiCog, HiUpload } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { Book } from "../../types";
import useModelObserver from "@/hooks/useModelObserver";
import { UserContext } from "@/context/UserContext";

function BookSearch() {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState<Book[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [search_response, setSearchResponse] = useState("");
  const [currentStatus, setCurrentStatus] = useState<{
    status: string;
    seeking_books: boolean;
    current_search_task_id?: string;
    last_searched_book?: string;
    current_book_list?: Book[];
  }>();
  const [url, setUrl] = useState<string>("");

  useModelObserver({
    roomName: user?.id ? `user_${user?.id}` : "",
    connectToWS: user && user?.id != undefined && currentStatus?.seeking_books,
    updateData: (data) => {
      setCurrentStatus({
        ...currentStatus,
        status: data.status,
        seeking_books: data.seeking_books,
        current_book_list: data.current_book_list,
      });
      setBooks(data.current_book_list);
    },
  });

  useEffect(() => {
    fetch(`/api/search/status`).then(async (res) => {
      if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        setCurrentStatus({
          status: data.status,
          seeking_books: data.seeking_books,
          current_search_task_id: data.current_search_task_id,
          last_searched_book: data.last_searched_book,
          current_book_list: data.current_book_list,
        });
        setBooks(data.current_book_list);
        setSearchTerm(data.last_searched_book);
      }
    });
  }, []);

  const onSearch = async () => {
    if (searchTerm.length < 2) {
      alert("Please enter at least 2 characters");
      return;
    }

    if (currentStatus && currentStatus?.seeking_books) {
      alert("Please wait for the current search to finish");
      return;
    }

    try {
      setBooks([]);
      const res = await fetch(`/api/search?word=${searchTerm}`);

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      setCurrentStatus({
        status: data.status,
        seeking_books: data.seeking_books,
        current_search_task_id: data.current_search_task_id,
      });
      console.log(data);
    } catch (error: any) {
      setSearchResponse(`${error.message}`);
    } finally {
      setHasSearched(true);
    }
  };

  const handleUrlFetch = async () => {
    try {
      const response = await fetch("api/fetch_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("api/upload_doc", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        // Refresh the page when the file is successfully uploaded
        window.location.reload();
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
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
      </div>

      <div className="w-full flex justify-center items-center">
        <span> Or</span>

        <input
          type="text"
          placeholder="Paste a URL (youtube, file, or web page)"
          className="ml-4 p-2 rounded border w-1/3"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleUrlFetch}
          className="ml-2 bg-primary text-white p-2 rounded"
        >
          Get Article
        </button>
      </div>
      <div className="w-full flex justify-center items-center">
        <span>Or</span>
        <label className="ml-4 flex items-center bg-primary rounded cursor-pointer w-40 justify-center">
          <span
            className="mr-2 p-2 text-sm text-white ju
            "
          >
            Upload Document
          </span>
          <input
            type="file"
            className="hidden"
            onChange={handleDocumentUpload}
          />
          <HiUpload className="hover:scale-125 duration-300 hover:animate-pulse text-white" />
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
      ) : currentStatus && currentStatus?.seeking_books ? (
        <div className="w-full h-full text-center text-2xl text-gray-500 flex flex-col items-center gap-2">
          <span>Searching...</span>
          <HiCog className="animate-spin duration-[3000] h-12 w-12" />
        </div>
      ) : hasSearched ? (
        <div className="w-full h-full text-center text-2xl text-gray-500">
          {search_response || "No books found"}
        </div>
      ) : null}
    </div>
  );
}

export default BookSearch;
