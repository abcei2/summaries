import { NextApiRequest, NextApiResponse } from "next";

import { getAuthCookie, removeAuthCookie } from "@/utils/auth-cookies";
import { UserAuthType } from "@/types";

export const withAuth = (
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
    userAuth: UserAuthType
  ) => Promise<void>,
  redirect?: string
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const userAuth = getAuthCookie(req);
    if (!userAuth) {
      if (redirect) res.redirect(redirect);
      return res.status(401).send("Auth cookie not found");
    }
    return handler(req, res, userAuth);
  };
};
