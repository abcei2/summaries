import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";
import { sendVerificationEmail } from "@/utils/email";

async function resend(
  req: NextApiRequest,
  res: NextApiResponse,
  userAuth: UserAuthType
) {
  switch (req.method) {
    case "GET":
      console.log(req.headers.origin)
      await sendVerificationEmail({
        email: userAuth.email,
        req,
      });
      // Redirect the user to the homepage
      res.status(200).json({ success: true });
      break;
    default:
      //Method Not Allowed
      res.status(405).end();
      break;
  }
}

export default withAuth(resend);
