export const HOME_CONTENT: {
  title: string;
  listItems: {
    iconPath: string;
    text: string;
  }[];
  cards: {
    title: JSX.Element;
    content: string;
    icon: {
      src: string;
      width: number;
      height: number;
    };
  }[];
  bottom: JSX.Element;
} = {
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
