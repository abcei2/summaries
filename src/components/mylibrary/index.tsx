import { useEffect } from "react";
import { Book } from "../../types";
import { useState } from "react";
import { HiCog } from "react-icons/hi";
import MyBook from "./MyBook";

const MyLibrary = () => {
  const [myBooks, setMyBooks] = useState<Book[]>();
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false)
  const [websocket, setWebsocket] = useState<WebSocket>()
  const [status, setStatus] = useState("init")

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch("/api/users/my-library")
      .then((res) => res.json())
      .then((data) => {
        setMyBooks(data.data ?? []);
      })
      .finally(() => setLoading(false));
    return () => {
      if(websocket){
        myBooks && myBooks.forEach((book) => {
          if (book.status == "extracted") return;
          websocket.send(
            JSON.stringify({
              action: "subscribe_instance",
              request_id: new Date().getTime(),
              pk: book.id,
            })
          );
        });

        websocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (websocket || !myBooks) return;
    try {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_DJANGO_WS ?? "");

      console.log("Connecting to ws");
      setStatus("connecting")
      ws.onopen = () => {
        console.log("Connected to ws");
        setStatus("connected")
        
      };
      ws.onmessage = (e: any) => {
        const eData = JSON.parse(e.data);
        if (eData.action == "update" && myBooks) {
          console.log(eData,myBooks)
          setMyBooks(
            myBooks.map((book) => {
              if (book.id == eData.data.pk) {
                return {
                  ...book,
                  ...eData.data,
                };
              }
              return book;
            })
          );
        }     
      };
      ws.onclose = () => {
        console.log("disconnected");
      };

      setWebsocket(ws)
    
    } catch (e) {
      console.log(e);
    }
  },[myBooks])
      
  useEffect(() =>
    {
      if(!myBooks || !websocket || subscribed) return
      if(status!="connected") return
      console.log("Subscribing to books");
      myBooks.forEach((book) => {
        if (book.status == "extracted") return;
        websocket.send(
          JSON.stringify({
            action: "subscribe_instance",
            request_id: new Date().getTime(),
            pk: book.id,
          })
        );
      });
      setSubscribed(true)
    },[websocket, myBooks, status]
  )
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#F8F8F8] h-20 flex items-center justify-center">
        <span className="w-[80%] text-3xl font-bold text-gray-600 w-full ">
          My Library
        </span>
      </div>

      <div className="w-full h-20 flex items-center justify-center">
        <span className="w-[80%] text-4xl font-semibold text-gray-600 w-full ">
          Reading Now
        </span>
      </div>
      <div className="w-full lg:w-[80%] h-full flex justify-center ">
        {!loading ? (
          <div className="w-fit grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {myBooks&&myBooks.map((book, key) => (
              <MyBook book={book} key={key} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
            <span className="text-2xl font-bold">Loading library...</span>
            <HiCog className="animate-spin duration-300 h-12 w-12" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLibrary;
