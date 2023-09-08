import LoadingSpin from "@/components/utils/LoadingSpin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SummaryComp = ({ summaryId }: { summaryId: string }) => {
  const [summary, setSummary] = useState<{
    id: string;
    state: string;
    created_at: string;
    model1: string;
    model2: string;
    method: string;
    text: string;
  }>();

  const [content, setContent] = useState<
    {
      title: string;
      summary: string;
    }[]
  >([]);

  useEffect(() => {
    if (!summaryId) return console.log("No summaryId", summaryId);
    fetch("/api/summaries/" + summaryId)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.data);

        const text = data.data.text + "Title:";
        const titleRegex = /Title:(.*?)Summary:/gs;
        const summaryRegex = /Summary:(.*?)Title:/gs;
        const titles = text
          ?.match(titleRegex)
          ?.map((match) => match.replace(/Title:|Summary:/g, "").trim());
        const summaries = text
          ?.match(summaryRegex)
          ?.map((match) => match.replace(/Summary:|Title:/g, "").trim());

          console.log(titles, summaries)
        if (summaries && titles && summaries?.length == titles?.length) {
          setContent(
            summaries.map((summary, index) => ({
              title: titles[index] || "No title",
              summary,
            }))
          );
        }
      });
  }, [summaryId]);

  if (!summaryId || !summary) return <LoadingSpin text="Loading summary" />;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] lg:w-[90%] flex flex-col gap-2 mt-10">
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
          {content && content.length > 0
            ? content.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="font-bold text-2xl text-center">{item.title}</div>
                  <div className="text-justify">{item.summary}</div>
                </div>
              ))
            : summary.text}
        </div>
      </div>
      )
    </div>
  );
};

export default SummaryComp;
