import { SumaryCreateParams, SummaryType } from "@/types";
import { useState, useEffect } from "react";
import { DEFAULT_SUMMARY_PARAMS } from "@/constants/model";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { set } from "react-hook-form";

const SubscribedSummaryRequest = ({
  handleClose,
  handleConfirm,
  title,
  bookCover,
  bookId,
  summaryList,
}: {
  handleClose: () => void;
  handleConfirm: (prompt: string) => void;
  title: string;
  bookCover: string;
  bookId: number;
  summaryList: SummaryType[];
}) => {
  const [currentCost, setCurrentCost] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [summaryParams, setSummaryParams] = useState(DEFAULT_SUMMARY_PARAMS);
  const { user } = useContext(UserContext);

  useEffect(() => {
    calculateCost(DEFAULT_SUMMARY_PARAMS);
  }, []);

  const calculateCost = (data: SumaryCreateParams) => {
    if (loading) return;

    console.log(bookId);
    setLoading(true);
    fetch("/api/summaries/cost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        bookId,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log(res.status, res.statusText);
        }
      })
      .then((dataJson) => {
        if (!dataJson) return console.log("No data");
        setCurrentCost(dataJson);
      })
      .finally(() => setLoading(false));
  };

  const promptOptions = ["prompt1-english-", "prompt1-spanish-"];

  const filteredPromptOptions = promptOptions.filter(
    (option) => !summaryList.some((summary) => option.includes(summary.prompt1))
  );

  return (
    <div className=" bg-secondary rounded-lg flex flex-col items-center px-4 pt-3 pb-6 h-fit gap-2 text-white">
      <span className="text-xl mb-2 text-center font-bold  text-tertiary">
        Confirm you want to request the summary of the book
      </span>

      <span className="text-xl mb-2 text-center text-tertiary">{title}</span>

      <div className="flex justify-center mb-2">
        <img
          className="border border-[3px] border-secondary rounded-[10px] max-w-[200px]"
          src={bookCover}
        />
      </div>

      <div className="flex flex-col md:w-[100%] text-sm font-pt-sans">
        <div className="italic gap-2 flex ">
          <span className="font-bold">You will spend:</span>
          <span className="text-red-400">
            {loading ? "Loading cost..." : parseInt(currentCost).toLocaleString()}
          </span>
        </div>

        <div className="italic gap-2 flex ">
          <span className="font-bold">Available tokens: </span>
          <span>{user && user.available_tokens.toLocaleString()}</span>
        </div>

        <div className="italic gap-2 flex flex-col">
          <span className="font-bold">Select the language of the summary:</span>
          <select className="btn text-custom-black" id="prompt" name="prompt">
            {filteredPromptOptions.map((option, index) => (
              <option key={index} value={option}>
                {option.split("-")[1].charAt(0).toUpperCase() +
                  option.split("-")[1].slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center items-center gap-2 w-full mt-2 text-xs">
          <button
            className={`${
              user && user.available_tokens - parseFloat(currentCost) >= 0
                ? "bg-tertiary text-white"
                : "bg-gray-500"
            } btn text-white  border-tertiary w-1/2 `}
            onClick={() => {
              const selector = document.getElementById(
                "prompt"
              ) as HTMLSelectElement;
              handleConfirm(selector.value);
              handleClose(); // Close the modal immediately after confirm
            }}
            disabled={
              user && user.available_tokens - parseFloat(currentCost) < 0
            }
          >
            Confirm
          </button>

          <button
            className="btn border border-tertiary text-tertiary w-1/2"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribedSummaryRequest;
