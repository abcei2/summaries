import { subscribe } from "diagnostics_channel";
import { cp } from "fs";
import { use, useEffect, useState } from "react";
import { set } from "react-hook-form";

const useModelObserver = ({
  handleData,
  subscribedData,
  noSubscribeData,
  modelName,
}: {
  handleData: (data: any[]) => void;
  subscribedData?: any[];
  noSubscribeData?: any[];
  modelName: "book" | "summary";
}) => {
  const [subscribed, setSubscribed] = useState(false);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [status, setStatus] = useState("init");

  useEffect(() => {
    if(subscribedData && subscribedData.length==0)  {
      reloadData();
    }
    if (status != "init" || !subscribedData || subscribedData.length==0) return;

    console.log("Connecting to ws");
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}${modelName}/`
    );
    setStatus("connecting");
    ws.onopen = () => {
      console.log("Connected to ws");
      setStatus("connected");
    };
    ws.onmessage = (e: any) => {
      const eData = JSON.parse(e.data);
      if (eData.action == "update") {
        updateMessage(eData);
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
    };
    setWebsocket(ws);
  }, [subscribedData, status]);
  


  useEffect(() => {
    if (!subscribedData || !websocket || status != "connected" || subscribed)
      return;
    subscribeDataMessage();
  }, [websocket, status, subscribedData]);
  
  const subscribeDataMessage = () => {
    if (!subscribedData || !websocket) return;

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
  };

  const reloadData = () => {
    setSubscribed(false);
    setStatus("init");
    if (websocket) websocket.close();
    setWebsocket(undefined)
  };

  const updateMessage = (eData: any) => {

    handleData([
      ...(subscribedData
        ? subscribedData.map((item) => {
            if (item.id == eData.data.pk) {
              return {
                ...item,
                ...eData.data,
              };
            }
            return item;
          })
        : []),
      ...(noSubscribeData ?? []),
    ]);
  };
};
export default useModelObserver;
