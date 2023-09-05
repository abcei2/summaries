import { useEffect, useState } from "react";

const useModelObserver = ({
    handleData,
    subscribedData,
    noSubscribeData
}:{
    handleData: (data: any[]) => void,
    subscribedData?: any[],
    noSubscribeData?: any[]
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [status, setStatus] = useState("init");

  useEffect(() => {
    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (websocket || !subscribedData) return;
    try {
      const ws = new WebSocket(process.env.NEXT_PUBLIC_DJANGO_WS ?? "");
      console.log("Connecting to ws");
      setStatus("connecting");
      ws.onopen = () => {
        console.log("Connected to ws");
        setStatus("connected");
      };
      ws.onmessage = (e: any) => {
        const eData = JSON.parse(e.data);
        if (eData.action == "update" && subscribedData) {
          console.log(eData, subscribedData);
          handleData(
            [
                ...noSubscribeData ?? [],
                ...subscribedData.map((item) => {
                    if (item.id == eData.data.pk) {
                      return {
                        ...item,
                        ...eData.data,
                      };
                    }
                    return item;
                })
            ]
           
          );
        }
      };
      ws.onclose = () => {
        console.log("disconnected");
      };

      setWebsocket(ws);
    } catch (e) {
      console.log(e);
    }
  }, [subscribedData]);

  useEffect(() => {
    if (!subscribedData || !websocket || subscribed) return;
    if (status != "connected") return;
    console.log("Subscribing to books");
    subscribedData.forEach((item) => {
      websocket.send(
        JSON.stringify({
          action: "subscribe_instance",
          request_id: new Date().getTime(),
          pk: item.id,
        })
      );
    });
    setSubscribed(true);
  }, [websocket, subscribedData, status]);

};
export default useModelObserver;