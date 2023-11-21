import { useEffect } from "react";

const useModelObserver = ({
  roomName,
  updateData,
  connectToWS,
}: {
  updateData: (data: any) => void;
  roomName: string; // "global_library" or "book_pk" of book model
  connectToWS?: boolean;
}) => {
  useEffect(() => {
    if (!roomName || !connectToWS) {
      console.log("Room name or connectToWS flag is not set");
      return;
    }
    
    const wsUrl = `${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}consumer/${roomName}/`;
    console.log(`Attempting to connect to WebSocket at: ${wsUrl}`);

    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (e: any) => {
      console.log("Message received from WebSocket", e.data);
      try {
        const eData = JSON.parse(e.data);
        if (eData.type === "downloading_book" || eData.type === "summarizing" || eData.type === "searching") {
          updateData(eData.data);
        } else {
          console.log("Received unexpected message type:", eData.type);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      console.log("Closing WebSocket");
      ws.close();
    };
  }, [roomName, connectToWS]);
};

export default useModelObserver;
