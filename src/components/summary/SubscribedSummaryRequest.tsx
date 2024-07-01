import { SumaryCreateParams,SummaryType } from '@/types';
import { useState, useEffect } from 'react';
import { DEFAULT_SUMMARY_PARAMS } from "@/constants/model";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { set } from 'react-hook-form';

const SubscribedSummaryRequest = ({
  handleClose,
  handleConfirm,
  title,
  bookCover,
  bookId,
  summaryList
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



  const promptOptions = [
    "prompt1-english-",
    "prompt1-spanish-",
  ];

  const filteredPromptOptions = promptOptions.filter(option => 
    !summaryList.some(summary => option.includes(summary.prompt1))
  );

  return (
    <div className="bg-white rounded-lg flex flex-col items-center p-2 h-fit gap-2">
      <span className="text-2xl mb-2 text-center font-bold">
        Confirm you want to request the summary of the book
      </span>
      
      <span className="text-xl mb-2 text-center w-[80%]">
        {title}
      </span>
      
      <div className="flex justify-center mb-2">
        <img className="rounded-lg h-20 sm:h-32" src={bookCover} />
      </div>
      <div className="text-xl mb-2 text-center w-[80%]">
        <span className="text-gray-500 text-center italic">
          You will spend:
        </span>
      </div>
      <span className="text-gray-500 text-center italic text-red-400">
        {loading ? "Loading cost..." : currentCost}
      </span>
      
      <div className="text-xl mb-2 text-center w-[80%]">
        <span className="text-gray-500 text-center italic">
          Available tokens:
        </span>
      </div>

      <span className="text-gray-500 text-center italic ">
        {user && user.available_tokens.toLocaleString()}
      </span>

      <div className="text-xl mb-2 text-center w-[80%]">
        <span className="text-gray-500 text-center italic">
          Select the language of the summary:
        </span>
      </div>
      <select className="w-[40%] p-2 rounded-lg border border-gray-300" id="prompt" name="prompt">
        {filteredPromptOptions.map((option, index) => (
          <option key={index} value={option}>{option.split('-')[1].charAt(0).toUpperCase() + option.split('-')[1].slice(1)}</option>
        ))}
      </select>

      <div className="flex justify-center items-center">
        <button
          className={`${
            user && user.available_tokens - parseFloat(currentCost) >= 0
              ? "bg-green-500"
              : "bg-green-200"
          } text-white rounded-lg px-4 py-2 mr-2`}
          onClick={() => {
            const selector = document.getElementById("prompt") as HTMLSelectElement;
            handleConfirm(selector.value);
            handleClose(); // Close the modal immediately after confirm
          }}
          disabled={user && user.available_tokens - parseFloat(currentCost) < 0}
        >
          Confirm
        </button>

        <button
          className="bg-gray-500 text-white rounded-lg px-4 py-2"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SubscribedSummaryRequest;