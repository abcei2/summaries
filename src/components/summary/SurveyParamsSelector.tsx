import { useState } from "react";
import { SurveyCreateParams } from "../../../types";
import { PARAMS } from "@/constants/model";
import { CustomInput } from "../utils/custominputs";


const SurveyParamsSelector = ({
  handleClose,
  handleCreateResume,
}: {
  handleClose: () => void;
  handleCreateResume: (creationParams: SurveyCreateParams) => void;
}) => {
  const [formData, setFormData] = useState<SurveyCreateParams>({
    m1: "sections",
    m2: "gpt-3.5-turbo-16k",
    length: "short",
    method: "sections",
    p1: "Summarize the text, explaining key concepts and ideas in a detailed, long, well-structured summary, (not bullet points or numbered).",
    p2: "Give a title and summarize the text. The summary must contain insights and relevant ideas.",
    temp: "0.5",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white h-fit rounded-lg p-2 w-full">
      <div className="text-2xl font-bold">Create a new summary</div>
      {PARAMS &&
        PARAMS.map((param, index) => (
          <CustomInput
            key={index}
            name={param.name}
            type={param.type}
            values={param.values}
            handleChange={handleChange}
            title={param.name}
            defaultValue={formData[param.name as keyof SurveyCreateParams]}
          />
        ))}

      <div className="flex gap-2">
        <button
          onClick={() => handleCreateResume(formData)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-2xl w-fit "
        >
          Create
        </button>
        <button
          onClick={() => handleClose()}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded-2xl w-fit "
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SurveyParamsSelector;
