import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { sendVerificationEmail } from "@/utils/email";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  switch (req.method) {
    case "POST":
      if (!email || !password) {
        return res.status(400).send("Email and Password not provided");
      }
      try {
        const data = await fetch(process.env.DJANGO_HOST + "/signup/", {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (resAuth) => {
          if (resAuth.status == 200) {
            const data = await resAuth.json();
            setAuthCookie(res, data);
            sendVerificationEmail({
              email: data.email,
              req             
            });
            return {
              success: true,
              message: "Login success",
            };
          } else {
            alert("Sign up failed");
          }
        });

        res.status(data?.success ? 200 : 401).json(data);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}
