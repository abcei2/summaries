// components/MyHighlights.tsx
import { useEffect, useState } from "react";
import { HiCog } from "react-icons/hi";
import CustomImage from "./utils/CustomImage";

type Highlight = {
  id: number;
  user: string;
  summary: {
    book: {
      title_2: string;
    };
  };
  text: string;
  created_at: string;
  updated_at: string;
  summary_id: number;
  book_name: string;
  comment: string;
};

const HighlightCard = ({ highlight }: { highlight: Highlight }) => {
  const [commentary, setCommentary] = useState<string>(""); // State to hold commentary
  const [currentHighlightCommentary, setCurrentHighlightCommentary] =
    useState<string>("");
  const [editing, setEditing] = useState<boolean>(false); // State to manage edit mode

  useEffect(() => {
    setCommentary(highlight.comment);
    setCurrentHighlightCommentary(highlight.comment);
  }, [highlight]);

  const handleUpdate = () => {
    fetch("/api/users/my-highlights/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: commentary, id: highlight.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert("Error updating commentary");
        } else {
          setEditing(false);
          setCurrentHighlightCommentary(commentary);
        }
      });
  };

  return (
    <div className="w-full rounded-[10px] border border-custom-black flex flex-col gap-3 text-xs py-4 px-6 font-pt-sans">
      <div className="flex flex-col gap-3 text-center">
        <span className="font-bold font-rokkitt">
          {highlight.book_name} (Summary ID: {highlight.summary_id})
        </span>
        <span className="text-[10px]">
          Created At: {new Date(highlight.created_at).toLocaleString()}
        </span>
      </div>

      <div className="flex flex-col gap-2 h-[100px] overflow-auto">
        <span className="font-bold">{"Selected text"}</span>
        <span className="">{highlight.text}</span>
      </div>

      <div className="flex flex-col gap-2 h-[80px]">
        <span className="font-bold">Commentary: </span>
        {editing ? (
          <textarea
            value={commentary || ""}
            onChange={(e) => setCommentary(e.target.value)}
            className="rounded-[10px] p-2"
            rows={3}
            cols={50}
          />
        ) : (
          <span className="overflow-auto">{commentary}</span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        {!editing && (
          <button
            className="btn bg-secondary border-secondary text-gray-200 font-extralight w-[118px] self-center"
            onClick={() => setEditing(!editing)}
          >
            Edit
          </button>
        )}
        {editing && (
          <div className="flex self-center gap-1">
            <button
              className="btn bg-tertiary border-tertiary font-extralight w-[118px]"
              onClick={handleUpdate}
            >
              Save
            </button>
            <button
              className="btn bg-custom-red border-custom-red font-extralight w-[118px]"
              onClick={() => {
                setEditing(false);
                setCommentary(currentHighlightCommentary);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const MyHighlights = () => {
  const [myHighlights, setMyHighlights] = useState<Highlight[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch("/api/users/my-highlights")
      .then((res) => res.json())
      .then((data) => {
        setMyHighlights(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full flex flex-col items-center sm:items-start gap-10">
      <div className="flex gap-2 items-center ">
        <CustomImage
          src="/icons/asterisc.svg"
          alt="punctuation"
          width={18}
          height={18}
        />
        <span className="text-2xl font-bold font-rokkitt">My Highlights</span>
      </div>
      <div className="w-full h-full flex flex-col items-center sm:p-4 ">
        {!loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
            {myHighlights &&
              myHighlights
                .sort(
                  (a, b) =>
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                )
                .map((highlight) => (
                  <HighlightCard key={highlight.id} highlight={highlight} />
                ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-10">
            <span className="text-2xl font-bold">Loading highlights...</span>
            <HiCog className="animate-spin duration-300 h-12 w-12" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHighlights;
