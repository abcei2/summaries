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
    window.addEventListener('online', () => console.log('Network status: online'));
window.addEventListener('offline', () => console.log('Network status: offline'));

    if (!roomName || !connectToWS) {
      console.log("Room name or connectToWS flag is not set");
      return;
    }

    const wsUrl = `${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}consumer/${roomName}/`;
    let attempts = 0;
    let ws: WebSocket;
    let immediateReconnect = true;

    const connectWebSocket = () => {
      console.log(`Connection attempt #${attempts + 1}`);
      if (attempts >= 4) {
        console.log("Maximum reconnect attempts reached.");
        return;
      }

      console.log(`Attempting to connect to WebSocket at: ${wsUrl}`);
      ws = new WebSocket(wsUrl);

      let heartbeatInterval: NodeJS.Timeout;

      ws.onopen = () => {
        console.log("Connected to WebSocket");
        // Start a heartbeat interval
          heartbeatInterval = setInterval(() => {
            ws.send(JSON.stringify({ type: "heartbeat" }));
          }, 1000); // Send heartbeat every 30 seconds
        attempts = 0; // Reset reconnect attempts on successful connection
        immediateReconnect = true; // Reset immediate reconnect flag
      };

      ws.onmessage = (e: any) => {
        try {
          const eData = JSON.parse(e.data);
          console.log(eData);
          if (eData.type === "downloading_book" || eData.type === "summarizing" || eData.type === "searching" || eData.type === "vectorizing") {
            
            eData.data["type"] = eData.type;
            
            updateData(eData.data);
          } else {
            console.log("Received unexpected message type:", eData.type);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error occurred:", error);
      };

      ws.onclose = (event) => {
        clearInterval(heartbeatInterval);
        console.log(`WebSocket disconnected with code: ${event.code}, reason: ${event.reason}`);
        attempts++;
        if (immediateReconnect) {
          console.log("Attempting to reconnect immediately...");
          immediateReconnect = false; // Disable immediate reconnect for next attempts
          connectWebSocket();
        } else {
          console.log("Attempting to reconnect after a delay...");
          setTimeout(connectWebSocket, 2000); // Reconnect after 2 seconds
        }
      };
    };

    connectWebSocket();

    return () => {
      console.log("Closing WebSocket");
      ws.close();
    };
  }, [roomName, connectToWS]);
};

export default useModelObserver;
