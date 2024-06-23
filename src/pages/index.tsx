import { Psychology, Videocam } from "@/assets/icons";
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
  bottom: (
    <span>
      Ready to <b>Optimize</b> <br /> The Way You <b>Learn</b>?
    </span>
  ),
};

const page = () => {
  const { user } = useContext(UserContext);

  const videoUrl_1 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/1.mp4`;
  const videoUrl_2 = `${process.env.NEXT_PUBLIC_DJANGO_MEDIA}/videos/2.mp4`;

  return (
    <div className="h-full w-full bg-custom-gray">
      {!user || user?.is_superuser || user?.is_subscribed ? (
        <div className="flex flex-col w-full  items-center  gap-32 overflow-auto h-screen">
          <div className="w-full  p-2 flex justify-center relative">
            <div className="flex flex-col gap-10 w-full">
              <LandingPageMenu />
              <div className="text-3xl md:text-7xl">
                <div className="relative z-10 w-full flex flex-col items-center font-bold md:leading-[60px] ">
                  <span>Struggling with</span>
                  <span> information overload?</span>
                </div>
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
              src="/images/landing-bg-icon.svg"
              alt="banner"
              width={1154}
              height={1240}
              className="absolute z-[0] max-w-[150%] md:max-w-full md:top-[unset] top-[20%] "
            />
          </div>

          <div
            className={`before:absolute md:before:top-[-340px] before:left-0 before:w-full before:z-[0]
              before:h-full md:before:bg-landing-bg before:top-[-340px] before:bg-landing-bg-mobile before:bg-cover md:before:bg-contain lg:before:bg-cover
            flex flex-col gap-16 md:gap-10  px-8 relative py-8 bg-primary w-full`}
          >
            <div className="max-w-[750px] self-center w-full">
              <video width="100%" height="auto" controls>
                <source src={videoUrl_1} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div className="justify-items-center grid grid-cols-1 md:grid-cols-4 md:gap-4 gap-12">
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

            <div className="flex flex-col p-2 w-full h-full items-center gap-10 relative">
              <Image
                src="/icons/landing-asterisk.svg"
                alt="icon"
                width={30}
                height={30}
              />
              <div className="w-full flex justify-center items-center text-6xl  md:text-7xl text-center gap-2 text-custom-purple">
                <Image
                  src={"/icons/left-doodle.svg"}
                  alt="icon"
                  width={32}
                  height={58}
                />
                <div className="text-center">
                  <span>{HOME_CONTENT.bottom}</span>
                </div>
                <Image
                  src={"/icons/right-doodle.svg"}
                  alt="icon"
                  width={32}
                  height={58}
                />
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

const LandingPageMenu = () => {
  return (
    <div className="flex justify-between items-center w-full relative z-[1] px-3 sm:px-6 py-3">
      <MegasummaryLogo />
      <div className="flex items-center gap-4 text-base">
        <button className="btn hover:border-custom-purple hover:text-custom-purple">
          Sign up
        </button>
        <button className="btn hover:border-custom-purple hover:text-custom-purple">
          Login
        </button>
      </div>
    </div>
  );
};

const MegasummaryLogo = () => {
  return (
    <div className="flex items-center justify-center text-xl leading-3">
      <Image src="/icons/logo.svg" alt="icon" width={66} height={66} />
      <div className="flex flex-col gap-0.5 sm:block hidden">
        <span>
          <b>Mega</b>
        </span>
        <span>Summary</span>
      </div>
    </div>
  );
};
