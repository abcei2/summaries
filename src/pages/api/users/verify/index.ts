import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function verifyEmail(req: NextApiRequest, res: NextApiResponse) {
  const { token, email } = req.query;
  try {
    const backResponse = await fetch(
      process.env.DJANGO_HOST + "/verify-email/",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: token, email }),
      }
    );

    if (backResponse.status == 200) {
      const data = await backResponse.json();
    } else {
      console.log("Error verifying email");
    }

    // Redirect the user to the homepage
    res.writeHead(302, { Location: "/search" });
    res.end();
  } catch (err) {
    console.log("invalid token");
    // The token was invalid, return an error
    res.writeHead(302, { Location: "/" });
    res.end();
  }
}

export default verifyEmail;
