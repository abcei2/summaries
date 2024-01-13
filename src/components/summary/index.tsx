import LoadingSpin from "@/components/utils/LoadingSpin";
import { HighlightsIcon } from "@/customIcons";
import { SummaryType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import HelpUs from "../HelpUs";

const SummaryComp = ({
  summaryId,
  currentShowSummary,
  showDetails,
  bookId,
}: {
  summaryId?: string;
  currentShowSummary?: SummaryType;
  showDetails?: boolean;
  bookId?: string;
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

  const [highlightedTexts, setHighlightedTexts] = useState<string[]>([]);

  const handleTextSelection = () => {
    const selected = window?.getSelection()?.toString().trim();

    if (!selected) return;

    setSelectedText(selected);
    //console.log(selected);
    if (selected.length > 0) {
      const range = window?.getSelection()?.getRangeAt(0);
      if (!range) return console.log("No range");
      const rect = range.getBoundingClientRect();
      setFloatingButtonPos({
        top: rect.top + document.body.scrollTop - 40,
        left: rect.right,
      });
    }
  };

  const updateFloatingButtonPosOnScroll = () => {
    if (floatingBtnRef.current) {
      const rect = floatingBtnRef.current.getBoundingClientRect();
      var scrollPos = document.body.scrollTop;
      console.log(scrollPos);

      setFloatingButtonPos({
        top: rect.top + scrollPos,
        left: rect.left,
      });
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleTextSelection);
    document.addEventListener("wheel", updateFloatingButtonPosOnScroll);

    return () => {
      document.removeEventListener("click", handleTextSelection);
      document.removeEventListener("wheel", updateFloatingButtonPosOnScroll);
    };
  }, []);

  const handleHighlightClick = async () => {
    
    
    if (selectedText.length <20) alert("Please select more than 20 characters");
    else {
      console.log(summaryId);
    const response = await fetch("/api/highlight/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        highlighted_text: selectedText,
        summary_id: summaryId || summary?.id,
      }),
    });
    // Handle response
    fetchHighlightedText();
  }
  };

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

    const RecapRegex = /Recap:(.*?)Bulletpoints:/gs;
    const bulletPointsRegex = /Bulletpoints:(.*?)Title:/gs;

    const titles = text
      ?.match(titleRegex)
      ?.map((match) => match.replace(/Title:|Summary:/g, "").trim());
    const summaries = text
      ?.match(summaryRegex)
      ?.map((match) => match.replace(/Summary:|Title:/g, "").trim().replace(/§/g, ""));

    const Recap = text
      ?.match(RecapRegex)
      ?.map((match) => match.replace(/Recap:|Bulletpoints:/g, "").trim());

    const bulletPoints = text
      ?.match(bulletPointsRegex)
      ?.map((match) => match.replace(/Bulletpoints:|Title:/g, "").trim());

    console.log(summaries?.length,titles?.length,Recap?.length,bulletPoints?.length);

    if (summaries && titles && summaries?.length === titles?.length) {
      
      if (Recap && bulletPoints) {
        
        summaries.unshift(bulletPoints[0].replace(/§/g, ""));
        summaries.unshift(Recap[0]);
        titles.unshift("Bullet points");
        titles.unshift("Short summary");
        

            }
      setContent(
        summaries.map((summary, index) => ({
          title: titles[index] || "No title",
          summary,
        }))
      );
    } else {
      setContent([{ title: "", summary: summary.text?.replace(/§/g, "") ?? "" }]);
    }
  }, [summary]);

  // Fetching the highlighted text when summaryId is available.
  const fetchHighlightedText = async () => {
    if (!(summaryId || summary?.id)) return;

    try {
      const response = await fetch(
        `/api/get-highlighted-text/?summary_id=${summaryId || summary?.id}`
      );
      const data = await response.json();

      if (data.data) {
        const highlightedTextsArray = data.data.map(
          (item: { text: string }) => item.text
        );

        setHighlightedTexts(highlightedTextsArray);
      }
    } catch (error) {
      console.error("Error fetching highlighted text:", error);
    }
  };

  useEffect(() => {
    fetchHighlightedText();
  }, [summaryId]);

  const highlightText = (text: string) => {
    let newText = text.replace(/\n\n\n/g, "\n").split("\n").join("<br/>");

    highlightedTexts.forEach((ht) => {
      //console.log(ht);
      const replaceWith = `<span class='highlighted'>${ht}</span>`;
      newText = newText.split(ht).join(replaceWith);
    });
    return { __html: newText };
  };

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

            <div className="flex flex-col gap-2">
              <div className="font-bold text-2xl">Prompt1</div>
              <div>{summary.prompt1}</div>
            </div>
            
          </div>
        )}
        
        <div>
          Summary Id: {summary.id}
        </div>
          
        <div className="flex flex-col gap-2">
          
          {content && content.length > 0
            ? content.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="font-bold text-2xl text-center">
                    {item.title}
                  </div>
                  <div
                    className="text-justify"
                    dangerouslySetInnerHTML={highlightText(item.summary)}
                  ></div>
                </div>
              ))
            : null}
        </div>

        {/* Floating button */}
        {selectedText.length > 0 && (
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
        <HelpUs />
      </div>
    </div>
    
    
  );
};

export default SummaryComp;
