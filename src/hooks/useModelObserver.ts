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
}): {
  triggerReload: () => void;
} => {
  const [subscribed, setSubscribed] = useState(false);
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [status, setStatus] = useState("init");
  const [reload, setReload] = useState(false);

  const triggerReload = () => {
    setReload(true);
  };

  useEffect(() => {
    return () => {
      // if (websocket) {
      //   websocket.close();
      //   setWebsocket(undefined);
      // }
    };
  }, [websocket]);

  useEffect(() => {
    
    if(websocket || !subscribedData) return;
    console.log(`${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}${modelName}/`);
    try {
      connect();
    } catch (e) {
      console.log(e);
    }
  }, [subscribedData]);

  useEffect(() => {
    if(!subscribedData || subscribedData.length==0) return;
    if (!reload) return;
    setSubscribed(false);
    if (websocket) {
      websocket.close();
      setWebsocket(undefined);
    }
    setStatus("init");
    setReload(false);

    try {
      connect();
    } catch (e) {
      console.log(e);
    }
  }, [reload, subscribedData]);

  useEffect(() => {
    if (!subscribedData || !websocket || subscribed) return;
    if (status != "connected") return;
    console.log("Subscribing to books", subscribedData);
    subscribedData.forEach((item) => {
      websocket.send(
        JSON.stringify({
          action: "subscribe_instance",
          request_id: new Date().getTime(),
          pk: item.id,
        })
      );
    });
    subscribedData.forEach((item) => {
        websocket.send(JSON.stringify({
          action: "retrieve",
          request_id: new Date().getTime(),
          pk: item.id,
      }))
    });
    setSubscribed(true);
  }, [websocket, subscribedData, status]);

  const connect = () => {
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_DJANGO_WS ?? ""}${modelName}/`
    );
    console.log("Connecting to ws");
    setStatus("connecting");
    ws.onopen = () => {
      console.log("Connected to ws");
      setStatus("connected");
    };
    ws.onmessage = (e: any) => {
      const eData = JSON.parse(e.data);
      if ((eData.action == "update")) {
        console.log("update");
        handleData([
          ...subscribedData?subscribedData.map((item) => {
            if (item.id == eData.data.pk) {
              return {
                ...item,
                ...eData.data,
              };
            }
            return item;
          }):[],
          ...(noSubscribeData ?? []),
        ]);
      }
    };
    ws.onclose = () => {
      console.log("disconnected");
    };

    setWebsocket(ws);
  };
  return {
    triggerReload,
  };
};
export default useModelObserver;
