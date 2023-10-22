import { useEffect } from "react";

const useModelObserver = ({
  roomName,
  updateData,
  connectToWS,
}: {
  updateData: (data: any) => void;
  roomName: string;
  connectToWS?: boolean;
}) => {
  useEffect(() => {
    if (!roomName || !connectToWS) return;
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}consumer/${roomName}/`
    );
    ws.onopen = () => {
      console.log("Connected to ws");
    };
    ws.onmessage = (e: any) => {
      const eData = JSON.parse(e.data);
      if (eData.type == "downloading_book" || eData.type == "summarizing") {
        updateData(eData.data);
      } 
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
    return () => {
      console.log("Closing ws");
      ws.close();
    };
  }, [roomName, connectToWS]);
};
export default useModelObserver;
