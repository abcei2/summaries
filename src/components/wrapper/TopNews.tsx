const TEXT_ARRAY = [
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
  "dense articles",
  "case studies",
  "books",
  "youtube videos",
];

const TopNews = ({
  backgroundColor = "bg-secondary",
}: {
  backgroundColor?: "bg-primary" | "bg-secondary" | "bg-tertiary";
}) => {
  return (
    <div className={`w-full relative flex overflow-hidden ${backgroundColor}`}>
      <div className="animate-rtlTranslation100 whitespace-nowrap flex gap-5">
        {TEXT_ARRAY.map((text, index) => (
          <div className="flex items-center text-3xl justify-center">
            <span>{text}</span>
            <span className="text-3xl flex h-fit"> * </span>
          </div>
        ))}
      </div>

      <div className="absolute top-0 animate-ltrTranslation100 whitespace-nowrap flex  gap-5 ml-5">
        {TEXT_ARRAY.map((text, index) => (
          <div className="flex items-centertext-3xl">
            <span className="text-3xl">{text}</span>
            <span className="text-xl"> * </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNews;
