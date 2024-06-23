import { Psychology, Videocam } from "@/assests/icons";
import { UserContext } from "@/context/UserContext";
import Image from "next/image";
import { useContext } from "react";

const HOME_CONTENT = {
  title: "Struggling with information overload?",
  listItems: [
    {
      iconPath: "/icons/psychology.svg",
      text: "Need to digest dense articles or case studies?",
    },
    {
      iconPath: "/icons/videocam.svg",
      text: "Want to condense lengthy YouTube videos?",
    },
    {
      iconPath: "/icons/menu-book.svg",
      text: "Got a pile of books to read?",
    },
  ],
  cards: [
    {
      title: (
        <span>
          <b>Streamline</b> Learning
        </span>
      ),
      content:
        "Search and summarize millions of books, condense online articles, and even distill YouTube videos down to their key ideas.",
      icon: {
        src: "/icons/feed.svg",
        width: 57,
        height: 57,
      },
    },
    {
      title: (
        <span>
          <b>Master</b> your material
        </span>
      ),
      content:
        "MegaSummary extracts the core ideas from lengthy texts and videos. Perfect for study sessions, understanding complex topics quickly and catching up on reading lists.",
      icon: {
        src: "/icons/lightbulb.svg",
        width: 30,
        height: 43,
      },
    },
    {
      title: (
        <span>
          Always <b>Accessible</b>
        </span>
      ),
      content:
        "Saved in your library, your summaries are available anytime, anywhere, ensuring you’re always prepared. The insights you need are just a click away.",
      icon: {
        src: "/icons/collections_bookmark.svg",
        width: 40,
        height: 40,
      },
    },
    {
      title: (
        <span>
          <b>Focus</b> on What Matters
        </span>
      ),
      content:
        "Don’t just manage your information intake; master it. With MegaSummary, spend less time learning more.",
      icon: {
        src: "/icons/alarm_on.svg",
        width: 45,
        height: 41,
      },
    },
  ],
  bottom: "Ready to Optimize The Way You Learn? ",
};

const page = () => {
  const { user } = useContext(UserContext);

  const videoUrl_1 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/1.mp4`;
  const videoUrl_2 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/2.mp4`;

  return (
    <div className="h-full w-full bg-primary">
      {!user || user?.is_superuser || user?.is_subscribed ? (
        <div className="flex flex-col gap-16 w-ful  items-center ">
          <div className="overflow-hidden w-full relative valley-div  bg-custom-gray p-2 flex justify-center">
            <div className="max-w-[1400px] flex flex-col gap-10 w-full">
              <div className="relative z-10 w-full flex flex-col items-center font-bold text-3xl md:text-7xl">
                <span>Struggling with</span>
                <span> information overload?</span>
              </div>

              <div className="relative z-10 flex flex-col gap-4 p-4">
                {HOME_CONTENT.listItems.map((item, key) => (
                  <div
                    key={key}
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <div className="flex w-[30px] h-[30px] items-center justify-center">
                      <Image
                        src={item.iconPath}
                        alt="icon"
                        width={100}
                        height={100}
                      />
                    </div>
                    <span className="text-xl">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <Image
              src="/images/landing-bg.svg"
              alt="banner"
              width={1154}
              height={1240}
              className="absolute z-[5] self-center self-justify-center"
            />
          </div>

          <div className="flex flex-col gap-10 max-w-[1400px]">
            {/* Video element */}
            <div className="max-w-[750px] self-center w-full">
              <video width="100%" height="auto" controls>
                <source src={videoUrl_1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="justify-items-center grid grid-cols-4 gap-4 ">
              {HOME_CONTENT.cards.map((card, key) => (
                <div
                  key={key}
                  className="flex flex-col border border-custom-black rounded-[10px] px-5 py-8 gap-6 text-center relative max-w-[295px]"
                >
                  <div className="absolute -top-[37px] left-[37%] w-[72px] h-[72px] flex items-center justify-center bg-primary rounded-full  mr-[35px]">
                    <div className="flex items-center justify-center m-2">
                      <Image
                        {...card.icon}
                        alt="icon"
                        style={{
                          width: card.icon.width + "px",
                          height: card.icon.height + "px",
                        }}
                        className=""
                      />
                    </div>
                  </div>
                  <span className="text-lg uppercase">{card.title}</span>
                  <p>{card.content}</p>
                </div>
              ))}
            </div>

            {/* Video element */}
            <div className="max-w-[750px] self-center w-full">
              <video width="100%" height="auto" controls>
                <source src={videoUrl_2} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="flex flex-col gap-10 p-2 text-2xl w-full font-[000] h-full ">
              <div className="w-full h-12 flex justify-center font-bold text-3xl md:text-4xl text-center">
                <span>{HOME_CONTENT.bottom}</span>
              </div>
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
