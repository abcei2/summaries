export type Book = {
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
  bookId?:string;
  m1: string;
  m2: string;
  method: string;
  temp: string;
  length: string;
  p1: string;
  p2: string;
};
