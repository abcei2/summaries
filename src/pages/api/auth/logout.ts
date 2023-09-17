import { getAuthCookie, removeAuthCookie } from "@/utils/auth-cookies";

import { NextApiRequest, NextApiResponse } from "next";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const userAuth = getAuthCookie(req);
      removeAuthCookie(res);
      return res.status(200).end();
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
