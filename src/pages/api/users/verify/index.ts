import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
import jwt, { JwtPayload } from "jsonwebtoken";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function verifyEmail(
  req: NextApiRequest,
  res: NextApiResponse,
  userAuth: UserAuthType
) {
  
  const { token } = req.query;

  try {
    // Verify the token - this throws if the token is invalid
    const { email } = jwt.verify(
      token as string,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;

    if (email != userAuth.email) {
      throw new Error("Invalid token");
    }
    if (userAuth.email_confirmed) {
      throw new Error("Email already confirmed");
    }

    const backResponse = await fetch(
      process.env.DJANGO_HOST + "/verify-email/",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${userAuth.token}`,
        },
      }
    );

    if (backResponse.status == 200) {
      const data = await backResponse.json();
      setAuthCookie(res, {
        ...userAuth,
        email_confirmed: data.email_confirmed,
      });
    } else {
      console.log("Error verifying email");
    }

    console.log("email confirmed");

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

export default withAuth(verifyEmail);
