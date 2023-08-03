import { getAuthCookie, removeAuthCookie } from "@/utils/auth-cookies";

import { NextApiRequest, NextApiResponse } from "next";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
      const userAuth = getAuthCookie(req);
      if (!userAuth) return res.status(200).end();

      try {
        //TODO: Logout from all devices
        removeAuthCookie(res);
        res.status(200).end();
      } catch (error) {
        removeAuthCookie(res);
        console.error(error);
        res.status(500).json({ error });
      }
      break;
    default:
      res.status(405).end(); //Method Not Allowed
      break;
  }
}
