import { HiCog } from "react-icons/hi";
import { useState, useEffect } from "react";

type Highlight = {
  id: number;
  user: string;
  summary: number;
  text: string;
  created_at: string;
  updated_at: string;
};

const HighlightCard = ({ highlight, className }: { highlight: Highlight; className?: string }) => {
  if (!highlight) return null;

  return (
    <div className={`${className ?? ""} w-[150px] sm:w-[200px] rounded-lg shadow-lg border border-2 flex flex-col justify-between`}>
      <div className="text-center p-1">
        <div className="">
          <span className="font-bold text-gray-600 mb-2">
            Summary: {highlight.summary}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600">Text: {highlight.text.slice(0, 50)}...</span>
        </div>
      </div>

      <div className="w-full h-10 bg-gray-100 rounded-b-lg flex justify-center items-center text-black">
        <span className="text-xs">Created: {new Date(highlight.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default HighlightCard;
