import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const HOME_CONTENT = {
  title: "Struggling with information overload?",
  listItems: [
    "🎥 Want to condense lengthy YouTube videos?",
    "📚 Got a pile of books to read?",
    "🔬 Need to digest dense articles or case studies?",
  ],
  cards: [
    {
      title: "Streamline Learning",
      content:
        "Search and summarize millions of books, condense online articles, and even distill YouTube videos down to their key ideas – (the ideal solution for tackling long-form video content like podcasts, TED Talks, instructional videos and academic lectures.)",
    },
    {
      title: "Master Your Material",
      content:
        "MegaSummary extracts the core ideas from lengthy texts and videos – Perfect for study sessions, understanding complex topics quickly and catching up on reading lists.",
    },
    {
      title: "Always Accessible",
      content:
        "Saved in your library, your summaries are available anytime, anywhere, ensuring you’re always prepared. The insights you need are just a click away.",
    },
    {
      title: "Focus on What Matters",
      content:
        "Don’t just manage your information intake; master it. With MegaSummary, spend less time learning more.",
    },
  ],
  bottom: "Ready to Optimize The Way You Learn? ",
};
const page = () => {
  const { user } = useContext(UserContext);

  const videoUrl_1 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/1.mp4`;
  const videoUrl_2 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/2.mp4`;


  return (
    <div className="flex h-full w-full justify-center md:pt-5 ">
      {!user || user?.is_superuser || user?.is_subscribed ? (
        <div className="flex flex-col gap-10 w-full sm:w-[90%] p-5 sm:p-10 text-2xl font-[000] h-full">
   
          <div className="w-full h-12 flex items-center font-bold text-3xl md:text-4xl">
            Struggling with information overload?
          </div>

          <div className="flex flex-col gap-6">
            {HOME_CONTENT.listItems.map((item, key) => (
              <span key={key}>{item}</span>
            ))}
          </div>

          

          <a
            href={!user ? "/login" : "/search"}
            className="text-3xl font-bold underline w-full text-center"
          >
            Meet MegaSummary!  Login 🚀
          </a>

          


          {/* Video element */}
          <div className="video-container">
            <video width="100%" height="auto" controls>
              <source src={videoUrl_1} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Video element */}
          <div className="video-container">
            <video width="100%" height="auto" controls>
              <source src={videoUrl_2} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex justify-center items-center">
              <a href={!user ? "/signup" : "/search"}>
                <button className="text-3xl font-bold underline w-full text-center">
                  Create an account.
                </button>
              </a>
            </div>

          


          {HOME_CONTENT.cards.map((card, key) => (
            <div
              key={key}
              className="border border-[#d1d1d1] rounded-lg px-5 py-10 flex flex-col gap-3"
            >
              <span className="text-3xl font-bold">{card.title}</span>
              <p>{card.content}</p>
            </div>
          ))}

          <div className="flex flex-col gap-10 p-2 text-2xl w-full font-[000] h-full ">
            <div className="w-full h-12 flex justify-center font-bold text-3xl md:text-4xl text-center">
              <span>{HOME_CONTENT.bottom}</span>
            </div>
           
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-2xl font-bold">
            You are not allowed to access this page
          </div>
          <div className="text-xl font-bold">
            Please contact the administrator
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
