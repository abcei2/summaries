import LoadingSpin from "@/components/utils/LoadingSpin";
import { HighlightsIcon } from "@/customIcons";
import { SummaryType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";

const SummaryComp = ({
  summaryId,
  currentShowSummary,
  showDetails,
}: {
  summaryId?: string;
  currentShowSummary?: SummaryType;
  showDetails?: boolean;
}) => {
  const [summary, setSummary] = useState<SummaryType | undefined>(
    currentShowSummary
  );

  const [content, setContent] = useState<
    {
      title: string;
      summary: string;
    }[]
  >([]);

  const [floatingButtonPos, setFloatingButtonPos] = useState({
    top: 0,
    left: 0,
  });
  const [selectedText, setSelectedText] = useState("");
  const floatingBtnRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  const handleTextSelection = () => {
    const selected = window?.getSelection()?.toString().trim();
    if (!selected) return;
    setSelectedText(selected);
    if (selected.length > 0) {
      const range = window?.getSelection()?.getRangeAt(0);
      if (!range) return console.log("No range");
      const rect = range.getBoundingClientRect();
      setFloatingButtonPos({
        top: rect.top + window.scrollY - 40,
        left: rect.right,
      });
    }
  };

  const updateFloatingButtonPosOnScroll = () => {
    if (floatingBtnRef.current) {
      const rect = floatingBtnRef.current.getBoundingClientRect();
      setFloatingButtonPos({
        top: rect.top + window.scrollY,
        left: rect.right,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    window.addEventListener("scroll", updateFloatingButtonPosOnScroll);

    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
      window.removeEventListener("scroll", updateFloatingButtonPosOnScroll);
    };
  }, []);

  const handleHighlightClick = async () => {
    const response = await fetch("/django_endpoint/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ highlighted_text: selectedText }),
    });
    // Handle response
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleTextSelection);
    return () => {
      document.removeEventListener("mouseup", handleTextSelection);
    };
  }, []);

  useEffect(() => {
    if (!summaryId) return console.log("No summaryId", summaryId);
    fetch("/api/summaries/" + summaryId)
      .then((res) => res.json())
      .then((data) => {
        setSummary(data.data);
      });
  }, [summaryId]);

  useEffect(() => {
    if (!currentShowSummary) return;
    setSummary(currentShowSummary);
  }, [currentShowSummary]);

  useEffect(() => {
    if (!summary) return console.log("No summary");
    const text = summary.text + "Title:";
    const titleRegex = /Title:(.*?)Summary:/gs;
    const summaryRegex = /Summary:(.*?)Title:/gs;
    const titles = text
      ?.match(titleRegex)
      ?.map((match) => match.replace(/Title:|Summary:/g, "").trim());
    const summaries = text
      ?.match(summaryRegex)
      ?.map((match) => match.replace(/Summary:|Title:/g, "").trim());
    if (summaries && titles && summaries?.length == titles?.length) {
      setContent(
        summaries.map((summary, index) => ({
          title: titles[index] || "No title",
          summary,
        }))
      );
    }
  }, [summary]);

  if (!summary) return null;

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[90%] lg:w-[90%] flex flex-col gap-2 mt-10">
        {showDetails && (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Status</div>
              <div>{summary.state}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Date</div>
              <div>{new Date(summary.created_at).toDateString()}</div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Model1</div>
              <div>{summary.model1}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Model2</div>
              <div>{summary.model2}</div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Method</div>
              <div>{summary.method}</div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {content && content.length > 0
            ? content.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="font-bold text-2xl text-center">
                    {item.title}
                  </div>
                  <div className="text-justify">{item.summary}</div>
                </div>
              ))
            : summary.text}
        </div>
        {/* Floating button */}
        {selectedText && (
          <div
            ref={floatingBtnRef}
            style={{
              position: "absolute",
              top: `${floatingButtonPos.top}px`,
              left: `${floatingButtonPos.left}px`,
            }}
          >
            <button onClick={handleHighlightClick}>{HighlightsIcon}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryComp;
