import Card from "@/components/Card";
import { HiSearch, HiCog, HiUpload } from "react-icons/hi";
import { useContext, useState, useEffect } from "react";
import { Book } from "../../types";
import useModelObserver from "@/hooks/useModelObserver";
import { UserContext } from "@/context/UserContext";



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


  const handleLibraryButtonClick = (event) => {
    const libraryUrl = '/mylibrary'; // Replace with the actual URL to your library
    if (event.button === 1) { // Middle mouse button
      window.open(libraryUrl, '_blank'); // Open in new tab without switching
      event.preventDefault();
    } else if (event.button === 0) { // Left mouse button
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
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

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

    setIsLoading(true); // Set loading to true at the start of the search
    setHasSearched(false);
    setBooks([]);

    
    

    const updatedHistory = Array.from(new Set([searchTerm, ...searchHistory]));
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));

    

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
      console.log(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    <div className="w-full flex flex-col gap-6 items-center pt-5">

      
      <div className="w-full h-16 flex justify-center items-center ">
      
      <input
          list="search-history"
          //value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
          className="w-3/4 sm:w-1/2 h-10 border-y-2 border-l-2 border-gray-300 rounded-l-md p-2 "
          placeholder="Search for a book"
        />
        <datalist id="search-history">
          {searchHistory.map((term, index) => (
            <option key={index} value={term} />
          ))}
        </datalist>
        
      
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
          className="ml-4 p-2 rounded border w-1/3 border-2 border-gray-300 h-10"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={handleUrlFetch}
          className="ml-2 bg-primary text-white p-2 rounded h-10"
        >
          Get Summary
        </button>
      </div>
      <div className="w-full flex justify-center items-center">
        <span>Or</span>
        <label className="ml-4 flex items-center bg-primary rounded cursor-pointer w-40 justify-center">
          <span
            className="ml-2 p-2 text-sm text-white"
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
