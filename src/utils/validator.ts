import { NextApiRequest, NextApiResponse } from "next";

import { getAuthCookie, removeAuthCookie } from "@/utils/auth-cookies";


export const withAuth = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    token: string
  ) => Promise<void>,
  redirect?: string
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const userAuth = getAuthCookie(req);
    if (!userAuth) {
      if (redirect) res.redirect(redirect);
      return res.status(401).send("Auth cookie not found");
    }
    try {
      const resp = await fetch(process.env.DJANGO_HOST + "/profile/", {
        headers: {
          Authorization: `token ${userAuth.token}`,
        },
      });
      if (resp.status != 200) {
        removeAuthCookie(res);
      } else {
        const data = await resp.json();
      }
      return handler(req, res, userAuth.token);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).send((error as Error).message);
    }
  };
};
