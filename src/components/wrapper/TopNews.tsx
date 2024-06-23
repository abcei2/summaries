const TEXT_ARRAY = [
  "dense articles*",
  "case studies  *",
  "books         *",
  "youtube videos*",
];

const TopNews = ({
  backgroundColor = "bg-secondary",
}: {
  backgroundColor?: "bg-primary" | "bg-secondary" | "bg-tertiary";
}) => {
  const amountOfRepeats = 2;
  return (
    <div className={`w-full  flex ${backgroundColor}`}>
      <div className="w-full flex gap-5 animate-ltrTranslation25">
        {TEXT_ARRAY.map((text, index) => (
          <div
            key={index}
            className="flex items-center text-3xl justify-center"
          >
            <span>{text}</span>
            <span className="text-3xl flex"> * </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopNews;
