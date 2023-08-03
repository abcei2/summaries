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