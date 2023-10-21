// components/MyHighlights.tsx
import { useEffect, useState } from "react";
import { HiCog } from "react-icons/hi";

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
  const [editing, setEditing] = useState<boolean>(false); // State to manage edit mode

  useEffect(() => {
    
    setCommentary(highlight.comment);
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
        }
      });
    
  };

  return (
    <div className="w-full rounded-lg shadow-lg border border-2 flex flex-col mb-4">
      <div className="text-center p-2">
        <span className="font-bold text-gray-600 mb-2">
          {highlight.book_name} (Summary ID: {highlight.summary_id})
        </span>
      </div>
      
      <div className="flex flex-col p-2">
        <span className="text-gray-600">{highlight.text}</span>
        <span>Created At: {new Date(highlight.created_at).toLocaleString()}</span>
        <span>Commentary: </span>
        
        {editing ? (
          <textarea 
            value={commentary || ""}
            onChange={(e) => setCommentary(e.target.value)} 
            rows={3} 
            cols={50}
          />
        ) : (
          commentary
        )}
        {!editing && (
        <label className="flex items-center bg-primary rounded cursor-pointer w-40 justify-center mt-2">
        <button className="mr-2 text-sm text-white" onClick={() => setEditing(!editing)}>Edit</button>
      </label>
      )}
      {editing && (
        <label className="flex items-center bg-primary rounded cursor-pointer w-40 justify-center mt-2">
          <button className="mr-2 text-sm text-white" onClick={handleUpdate}>Save</button>
        </label>
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
    <div className="w-full flex flex-col items-center">
      <div className="w-full bg-[#F8F8F8] h-20 flex items-center justify-center">
        <span className="w-[80%] text-4xl font-bold text-gray-600">
          My Highlights
        </span>
      </div>
      <div className="w-full h-full flex flex-col items-center p-4">
        {!loading ? (
          <div className="w-full flex flex-col items-center">
            {myHighlights &&
              myHighlights
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
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
