import { HiSearch, HiCog, HiUpload, HiSearchCircle } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { Book } from "../../types";
import useModelObserver from "@/hooks/useModelObserver";
import { UserContext } from "@/context/UserContext";
import CustomImage from "../utils/CustomImage";
import Card from "./Card";

function BookSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);

  const { user } = useContext(UserContext);
  const [books, setBooks] = useState<Book[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [search_response, setSearchResponse] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState<{
    status: string;
    seeking_books: boolean;
    current_search_task_id?: string;
    last_searched_book?: string;
    current_book_list?: Book[];
  }>();
  const [url, setUrl] = useState<string>("");

  const handleLibraryButtonClick = (event: any) => {
    const libraryUrl = "/mylibrary"; // Replace with the actual URL to your library
    if (event.button === 1) {
      // Middle mouse button
      window.open(libraryUrl, "_blank"); // Open in new tab without switching
      event.preventDefault();
    } else if (event.button === 0) {
      // Left mouse button
      window.location.href = libraryUrl; // Open in the same tab
    }
  };

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
    const history = localStorage.getItem("searchHistory");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  useEffect(() => {
    fetch(`/api/search/status`).then(async (res) => {
      if (res.status == 200) {
        const data = await res.json();
        setCurrentStatus({
          status: data.status,
          seeking_books: data.seeking_books,
          current_search_task_id: data.current_search_task_id,
          last_searched_book: data.last_searched_book,
          current_book_list: data.current_book_list,
        });
        setBooks(data.current_book_list);
        //setSearchTerm(data.last_searched_book);
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

    setIsLoading(true); // Set loading to true at the start of the search
    setHasSearched(false);
    setBooks([]);

    const updatedHistory = Array.from(new Set([searchTerm, ...searchHistory]));
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    try {
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
      setBooks(data.current_book_list);
      console.log(data);
    } catch (error: any) {
      setSearchResponse(`${error.message}`);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleUrlFetch = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await fetch("api/fetch_url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        setUploadCompleted(true); // Set upload completed to true
      } else {
        const errorData = await response.json();

        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      window.alert(`Error: ${error}`);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDocumentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log("asdas  ");
    if (!file) return;
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("document", file);

    try {
      const response = await fetch("api/upload_doc", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadCompleted(true); // Set upload completed to true
      } else {
        const errorData = await response.json();
        window.alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-10 font-pt-sans text-xs">
      <div className="flex gap-2 items-center">
        <CustomImage
          src="/icons/doodle3.svg"
          alt="Doodle"
          width={21}
          height={41}
        />
        <span className="text-2xl font-bold font-rokkitt">Search/Upload</span>
      </div>
      <div className="flex flex-col gap-6 lg:w-1/2 w-full">
        <div className="relative flex w-full items-center">
          <input
            list="search-history"
            //value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            className="input bg-primary w-full"
            placeholder="Search for a book"
          />

          <HiSearch
            onClick={onSearch}
            className="absolute right-3 hover:scale-125 duration-300 hover:animate-pulse w-[16px] h-[16px]"
          />
        </div>

        <div className="w-full flex flex-col sm:flex-row gap-6">
          <div className="flex  items-center gap-4 w-full">
            <input
              type="text"
              placeholder="Paste a URL (youtube, file, or web page)"
              className="input bg-primary w-full"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              onClick={handleUrlFetch}
              className="btn bg-secondary text-white min-w-max"
            >
              Get Summary
            </button>
          </div>

          
          <div className="flex items-center gap-4">
            <span>Or</span>
            <label className="btn flex items-center gap-2 bg-primary cursor-pointer justify-center w-max">
              <span className="w-max">Upload Document</span>
              <input
                type="file"
                className="hidden"
                onChange={handleDocumentUpload}
              />
              <CustomImage
                src="/icons/upload.svg"
                className="hover:scale-125 duration-300 hover:animate-pulse text-secondary"
                width={12}
                height={13}
                alt="Upload"
              />
            </label>
          </div>
          
        </div>
      </div>

      {isLoading && (
        <div className="w-full h-full text-center text-2xl text-gray-500 flex flex-col items-center gap-2">
          <span>Loading...</span>
          <HiCog className="animate-spin duration-500 h-12 w-12" />
        </div>
      )}

      {uploadCompleted && !isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          Upload Completed!
          <button
            className="bg-primary text-white p-2 rounded"
            onMouseDown={handleLibraryButtonClick} // Use onMouseDown instead of onClick for more consistent behavior across browsers
          >
            Go to My Library
          </button>
        </div>
      )}

      {books && books.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-2">
          {books.map((book) => (
            <Card key={book.global_id} book={book} />
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
