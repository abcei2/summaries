import {
  ArticleIcon,
  BillingIcon,
  BookIcon,
  DiscoverIcon,
  HighlightsIcon,
  LibraryIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  SupportIcon,
  UserIcon,
} from "@/icons/Index";

export const USER_TABS = [
  {
    pathname: "/mylibrary",
    label: "My library",
    icon: LibraryIcon,
  },
  {
    pathname: "/search",
    label: "Search",
    icon: SearchIcon,
  },
];

export const MENU_SETTINGS = [
  // {
  //     label:"Billing",
  //     icon:BillingIcon
  // },
  // {
  //     label:"Highlights",
  //     icon:HighlightsIcon
  // },
  {
    label: "Settings",
    icon: SettingsIcon,
  },
  // {
  //     label:"Suport",
  //     icon:SupportIcon
  // }
];
// Used to manage the book's status comming from the backend
export const BOOK_BACKEND_STATUS = {
  DOWNLOADING: "downloading",
  DOWNLOADED: "downloaded",
  QUEUE: "queue",
  EXTRACTED: "extracted",
  ERROR: "error",
};

export const SUMMARY_BACKEND_STATUS = {
  DONE: "done",
  RUNNING: "running",
  QUEUE: "queue",
  ERROR: "error",
};

