import { SummaryType } from "@/types";
import { useRouter } from "next/router";

const SummaryList = ({ summaryList }: { summaryList: SummaryType[] }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2">
      <div className=" font-bold text-2xl">Summaries</div>
      {summaryList &&
        summaryList.map((summary, index) => (
          <div
            onClick={() => router.push("/summary/" + summary.id)}
            key={index}
            className="grid grid-col-2 md:grid-cols-5 gap-2 items-center rounded-lg shadow-sm bg-[#F8F8F8]
      hover:scale-105 duration-200 transform cursor-pointer text-lg"
          >
            <div className="flex flex-col">
              <span className="text-base font-semibold">Status: </span>
              {summary.state}{": "}{summary.status_message}
              {summary.state == "running" && " "+
                (Number(summary.progress) * 100).toFixed(1) + "%"}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">Date: </span>
              {new Date(summary.created_at).toDateString()}
            </div>
            <div className="flex flex-col ">
              <span className="text-base font-semibold">Model: </span>
              {summary.model1}
            </div>
            
            <div className="flex flex-col">
              <span className="text-base font-semibold">Method: </span>
              {summary.method}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SummaryList;