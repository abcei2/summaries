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
  status?: "downloading" | "downloaded" | "queue" | "extracted";
  can_do_summary?: boolean;
  in_my_library?: boolean;
  progress?: string;
};

export type UserAuthType = {
  id: string;
  email: string;
  name: string;
};

export type SignupFormType = {
  email: string;
  password: string;
};

export type SurveyCreateParams = {
  bookId?: string;
  m1: string;
  m2: string;
  method: string;
  length: string;
  p1: string;
  p2: string;
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


export type SurveyCreateParamFormType = {
  name: string;
  type: string;
  defaultValue: string | number;
  values?: {
    value: string;
    label: string;
  }[];
}