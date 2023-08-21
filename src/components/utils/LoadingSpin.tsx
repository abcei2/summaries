import { HiCog } from "react-icons/hi";

const LoadingSpin = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
      <span className="text-2xl font-bold">{text}</span>
      <HiCog className="animate-spin duration-300 h-12 w-12" />
    </div>
  );
};

export default LoadingSpin;
