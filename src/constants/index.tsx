import { ArticleIcon, BillingIcon, BookIcon, DiscoverIcon, HighlightsIcon, LibraryIcon, LogOutIcon, SearchIcon, SettingsIcon, SupportIcon, UserIcon } from "@/icons/Index";

export const USER_TABS = [
    {
        pathname:"/mylibrary",
        label:"My library",
        icon:LibraryIcon
    },
    {
        pathname:"/search",
        label:"Search",
        icon:SearchIcon
    },
]

export const MENU_SETTINGS = [
    {
        label:"Billing",
        icon:BillingIcon
    },
    {
        label:"Highlights",
        icon:HighlightsIcon
    },
    {
        label:"Settings",
        icon:SettingsIcon
    },
    {
        label:"Suport",
        icon:SupportIcon
    }
]