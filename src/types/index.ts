import { ChangeHandler } from "react-hook-form";

export type Book = {
  id?: string;
  global_id: number;
  author: string;
  title: string;
  publisher: string;
  year: number;
  pages: string;
  language: string;
  size: string;
  extension: string;
  title_2: string;
  download_link: string;
  status?: "downloading" | "downloaded" | "queue" | "extracted" | "error";
  can_do_summary?: boolean;
  in_my_library?: boolean;
  progress?: string;
  cover_url?: string;
  cover_img_path?: string;
  link_a?: string;  
};

export type UserAuthType = {
  email: string;
  is_staff: boolean;
  is_superuser: boolean;
  token: string;
  is_subscribed: boolean;
};

export type SignupFormType = {
  email: string;
  password: string;
};

export type SumaryCreateParams = {
  bookId?: string;
  m1: string;
  method: string;
  length: string;
  p1: string;
};

export type FormHookType = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  name: string;
  ref: React.Ref<any>;
};

export type SelectOptionsType = {
  value: string;
  label: string;
};


export type SumaryCreateParamFormType = {
  name: string;
  type: string;
  defaultValue: string | number;
  costeable?: boolean;
  values?: {
    value: string;
    label: string;
  }[];
}

export type SummaryType = {
  book: string;
  text: string | null;
  method: string | null;
  model1: string | null;
  model2: string | null;
  created_at: string;
  updated_at: string;
  prompt1: string | null;
  prompt2: string | null;
  temperature: number | null;
  length: string | null;
  state: string | null;
  progress: number | null;
  total_tokens: number | null;
}