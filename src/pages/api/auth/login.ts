import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { NextApiRequest, NextApiResponse } from "next";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  switch (req.method) {
    case "POST":
      if (!email || !password) {
        return res.status(400).send("Email and Password not provided");
      }

      try {
        const data = await fetch(process.env.DJANGO_HOST + "/login/", {
          method: "POST",
          body: JSON.stringify({ username: email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(async (resAuth) => {
          if (resAuth.status == 200) {
            const data = await resAuth.json();
            try {
              const resp = await fetch(process.env.DJANGO_HOST + "/profile/", {
                headers: {
                  Authorization: `token ${data.token}`,
                },
              });
              if (resp.status == 403 || resp.status == 401) {
                return {
                  success: false,
                  message: "Login success",
                };
              } else {
                const userInfo = await resp.json();
                setAuthCookie(res, { ...userInfo, token: data.token });
                return {
                  success: true,
                  message: "Login success",
                };
              }
            } catch (error) {
              return {
                success: false,
                message: "Profile error",
              };
            }
          } else {
            removeAuthCookie(res);
            return {
              success: false,
              message: "Email or Password incorrect",
            };
          }
        });

        res.status(data.success ? 200 : 401).json(data);
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}
