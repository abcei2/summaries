import { useState } from "react";
import { SurveyCreateParams } from "../../../types";

const MODELS = [
  {
    value: "gpt-3.5-turbo-16k",
    label: "gpt-3.5-turbo-16k",
  },
];

const METHODS = [
  {
    value: "sections",
    label: "sections",
  },
];

const SurveyParamsSelector = ({
  handleClose,
  handleCreateResume,
}: {
  handleClose: () => void;
  handleCreateResume: (creationParams:SurveyCreateParams) => void;
}) => {
  const [formData, setFormData] = useState<SurveyCreateParams>({
    m1: "gpt-3.5-turbo-16k",
    m2: "gpt-3.5-turbo-16k",
    method: "sections",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white h-fit rounded-lg p-2 w-full">
      <div className="text-2xl font-bold">Create a new summary</div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Select Model 1</div>
        <select
          name="m1"
          onChange={handleChange}
          value={formData.m1}
          className="border border-gray-300 rounded-lg p-2"
        >
          {MODELS.map((model, index) => (
            <option key={index} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Select Model 2</div>
        <select
          name="m2"
          onChange={handleChange}
          value={formData.m2}
          className="border border-gray-300 rounded-lg p-2"
        >
          {MODELS.map((model, index) => (
            <option key={index} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">Select Method</div>
        <select
          name="method"
          onChange={handleChange}
          value={formData.method}
          className="border border-gray-300 rounded-lg p-2"
        >
          {METHODS.map((model, index) => (
            <option key={index} value={model.value}>
              {model.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={()=>handleCreateResume(formData)}
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
