import LoadingSpin from "@/components/utils/LoadingSpin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SummaryComp = ({
    summaryId,
}:{
    summaryId: string;
}) => {
  const [summary, setSummary] = useState<{
    id: string;
    state: string;
    created_at: string;
    model1: string;
    model2: string;
    method: string;
    text: string;
  }>();

  useEffect(() => {
    if (!summaryId) return console.log("No summaryId", summaryId);
    fetch("/api/summaries/" + summaryId)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.data);
      });
  }, [summaryId]);

  if (!summaryId || !summary) return <LoadingSpin text="Loading summary" />;

  return (
    <div className="w-full flex">
      <div className="w-[90%] lg:w-[60%] flex flex-col gap-2 mt-10">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">Status</div>
            <div>{summary.state}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">Date</div>
            <div>{new Date(summary.created_at).toDateString()}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">Model1</div>
            <div>{summary.model1}</div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">Model2</div>
            <div>{summary.model2}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-2xl">Method</div>
            <div>{summary.method}</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {summary?.text &&
            summary?.text.split("§").reduce((prev: any, curr: any) => {
              const content = curr.split(":").slice(1, curr.split(":").length);
              return [
                ...prev,
                ...content.map((item: any, index: any) => (
                  <div
                    className={
                      index == content.length - 1 ? "" : "font-bold text-2xl"
                    }
                    key={index}
                  >
                    {item}
                  </div>
                )),
              ];
            }, [])}
        </div>
      </div>
      )
    </div>
  );
};

export default SummaryComp;
