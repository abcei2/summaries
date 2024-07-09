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
import ChatBot from "./ChatBot";
import CustomImage from "../utils/CustomImage";
import HelpUs from "../HelpUs";

const MainBookComponent = ({ bookId }: { bookId: string }) => {
  const [book, setBook] = useState<Book>();
  const [summaryList, setSummaryList] = useState<SummaryType[]>();
  const { user } = useContext(UserContext);
  const [loadingBook, setLoadingBook] = useState(false);
  const [loadingSummaries, setLoadingSummaries] = useState(false);
  const loading = loadingBook || loadingSummaries;

  const [shouldFetchMessages, setShouldFetchMessages] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState("prompt1-english-");
  const [currentShowSummary, setCurrentShowSummary] = useState<SummaryType>();

  /*
  const currentShowSummary = summaryList?.find(
    (summary) => summary?.method != "dummy" && summary?.state != "error" && summary.prompt1 == selectedPrompt
  );*/

  const lastSummary = summaryList?.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  )[0];

  const subscribeToSummary = (state: string) =>
    [SUMMARY_BACKEND_STATUS.QUEUE, SUMMARY_BACKEND_STATUS.RUNNING].includes(
      state
    );

  const handlePromptChange = (prompt: string) => {
    //console.log('--------Prompt changed:', prompt);
    setSelectedPrompt(prompt);

    /*
      console.log('Prompt changed:', prompt);
      setSelectedPrompt(prompt);
      reloadSummaries();
  
      const newCurrentShowSummary = summaryList?.find(
        (summary) => summary?.method !== "dummy" && summary?.state !== "error" && summary.prompt1 === prompt
      );
  
      console.log('//////New current show summary:', newCurrentShowSummary);
      
      if (newCurrentShowSummary==undefined) {
        console.log('Creating summary');
        //reloadSummaries();
        setCurrentShowSummary(undefined);
      }
      else{
        console.log('Not creating summary');
        setCurrentShowSummary(newCurrentShowSummary);
      }
      setCurrentShowSummary(undefined);*/
  };

  useEffect(() => {
    //console.log('*********Reloading summaries');
    reloadBook();
    reloadSummaries();
    //console.log('summaryList:', summaryList);
  }, [bookId]);
  /*
  useEffect(() => {
      console.log('Selected prompt:', selectedPrompt);
      console.log('Summary list:', summaryList);
  
      const foundSummary = summaryList?.find(
        (summary) => summary?.method !== "dummy" && summary?.state !== "error" && summary.prompt1 === selectedPrompt
      );
  
      console.log('Found summary for prompt:', foundSummary);
      setCurrentShowSummary(undefined);
  
  }, [summaryList, selectedPrompt, currentShowSummary]);
  
*/

  useEffect(() => {
    // This useEffect now is solely responsible for updating currentShowSummary when selectedPrompt changes
    const newCurrentShowSummary = summaryList?.find(
      (summary) =>
        summary.method !== "dummy" &&
        summary.state !== "error" &&
        summary.prompt1 === selectedPrompt
    );

    //console.log('^^^^^New current show summary based on prompt:', newCurrentShowSummary);
    setCurrentShowSummary(newCurrentShowSummary);
    //console.log('^^^^^Current show summary:', currentShowSummary);
  }, [selectedPrompt, summaryList]); // Dependencies include selectedPrompt and summaryList

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
      //console.log('Summary data:', data.data);
      if (data.data?.text) {
        summaryList[index].text = data.data.text;
      }
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
    const newcurrentShowSummary = summaryList?.find(
      (summary) =>
        summary?.method != "dummy" &&
        summary?.state != "error" &&
        summary.prompt1 == selectedPrompt
    );
    //console.log('CurrentShowSummary:', currentShowSummary);
    //console.log('New current show summary:', newcurrentShowSummary);

    setCurrentShowSummary(newcurrentShowSummary);

    if (!book) return;

    //console.log('----------------------');
    /*
    console.log(
      book.status == BOOK_BACKEND_STATUS.EXTRACTED, 
      book.can_do_summary, !currentShowSummary, 
      !user?.is_superuser, user?.is_subscribed, 
      currentShowSummary?.prompt1 != selectedPrompt);*/

    if (
      book.status == BOOK_BACKEND_STATUS.EXTRACTED &&
      book.can_do_summary &&
      !currentShowSummary &&
      !user?.is_superuser &&
      user?.is_subscribed
      //currentShowSummary?.prompt1 != selectedPrompt
    ) {
      //console.log('Creating summary');
      reloadSummaries();
    } else {
      //console.log('Not creating summary');
    }
  }, [book, selectedPrompt]);

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
    fetch(`/api/books/summaries/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        //console.log('Summary list:', data.data);

        setSummaryList(data.data);
      })
      .finally(() => setLoadingSummaries(false));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (summaryList) {
        summaryList.forEach((summary) => {
          if (
            summary.state !== SUMMARY_BACKEND_STATUS.DONE &&
            summary.state !== SUMMARY_BACKEND_STATUS.ERROR
          ) {
            //console.log('Fetching summary progress for summary:', summary.id);
            fetch(`/api/summaries/${summary.id}`)
              .then((res) => res.json())
              .then((data) => {
                //console.log('Summary progress:', data.data.progress);
                // Update the progress of the summary in summaryList
                const updatedSummaries = summaryList.map((item) => {
                  if (item.id === summary.id) {
                    return {
                      ...item,
                      progress: data.data.progress,
                      text: data.data.text ? data.data.text : item.text,
                      state: data.data.state ? data.data.state : item.state,
                    };
                  }
                  return item;
                });
                setSummaryList(updatedSummaries);
              })
              .catch((error) =>
                console.error("Error fetching summary progress:", error)
              );
          }
        });
      }
    }, 20000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, [summaryList]);

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

  if (!book || !bookId)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpin text="Loading book details" />;
      </div>
    );

  return (
    <div className="">
      <div className="w-full relative z-10">
        <div className="absolute top-0 right-0">
          <HelpUs />
        </div>
      </div>
      <div className="w-full flex flex-col gap-14 md:w-[70%] lg:w-[50%] min-h-screen">
        <div className="w-full relative">
          <a href={"/mylibrary"} className="flex gap-4 items-center w-fit">
            <CustomImage
              src={"/icons/sprinkle_group_reverse.svg"}
              width={37.64}
              height={13.25}
              alt="return to search"
            />
            <span className="text-xl font-bold">{"Back to My Library"}</span>
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:pl-10">
          {summaryList ? (
            <BookDetailsCard
              book={book}
              lastSummary={lastSummary}
              summaryList={summaryList}
              loading={loading}
              reloadSummaries={reloadSummaries}
              handleUpdateBook={(newBook) => {
                setBook({
                  ...book,
                  ...newBook,
                });
              }}
              onPromptChange={handlePromptChange}
            />
          ) : (
            <LoadingSpin text="Loading summaries" />
          )}
          {user &&
            //check if the book is not extracted or if the summary is running
            (book.status != BOOK_BACKEND_STATUS.EXTRACTED ||
              lastSummary?.state == SUMMARY_BACKEND_STATUS.RUNNING ||
              lastSummary?.state == SUMMARY_BACKEND_STATUS.QUEUE) && (
              <div className="flex gap-2">
                {
                  <LoadingSpin
                    text={
                      lastSummary?.state == SUMMARY_BACKEND_STATUS.RUNNING
                        ? `Generating summary. ${(
                            Number(lastSummary?.progress) * 100
                          ).toFixed(1)} %`
                        : lastSummary?.state == SUMMARY_BACKEND_STATUS.QUEUE
                        ? "Waiting in queue"
                        : getStatusText(book)
                    }
                  />
                }
              </div>
            )}

          <div className="flex flex-col gap-2 ">
            {user && (user.is_staff || user.is_superuser) ? (
              <div className="flex flex-col gap-2">
                <SummaryComp
                  currentShowSummary={currentShowSummary}
                  bookId={bookId}
                  onSearchReferencesComplete={() =>
                    setShouldFetchMessages(true)
                  }
                />
                <SummaryList summaryList={summaryList ?? []} />
              </div>
            ) : (
              <SummaryComp
                currentShowSummary={currentShowSummary}
                bookId={bookId}
                onSearchReferencesComplete={() => setShouldFetchMessages(true)}
              />
            )}
          </div>
        </div>
      </div>
      <ChatBot
        book_id={bookId}
        embeddings_state={book.embeddings_state}
        shouldFetchMessages={shouldFetchMessages}
        resetShouldFetchMessages={() => setShouldFetchMessages(false)}
      />
    </div>
  );
};

export default MainBookComponent;
