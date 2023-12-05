import { NextApiRequest, NextApiResponse } from "next";
import { removeAuthCookie, setAuthCookie } from "@/utils/auth-cookies";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function validate(
  req: NextApiRequest,
  res: NextApiResponse,
  userAuth: UserAuthType
) {
  
  switch (req.method) {
    case "GET":
      try {
        const resp = await fetch(process.env.DJANGO_HOST + "/profile/", {
          headers: {
            Authorization: `token ${userAuth.token}`,
          },
        });
        if (resp.status == 403 || resp.status == 401) {
          removeAuthCookie(res);
          res.status(401).json({ isAuth: false });
        } else {
          const data = await resp.json();
          setAuthCookie(res, {
            ...userAuth,
            ...data,
          });
          res.status(200).json({
            isAuth: true,
            ...data,
            reload: JSON.stringify({
              is_staff: userAuth?.is_staff || false,
              is_superuser: userAuth?.is_superuser || false,
              is_subscribed: userAuth?.is_subscribed || false,
              email_confirmed: userAuth?.email_confirmed || false,
            }) != JSON.stringify({
              is_staff: data?.is_staff || false,
              is_superuser: data?.is_superuser || false,
              is_subscribed: data?.is_subscribed  || false,
              email_confirmed: data?.email_confirmed  || false,
            }),
          });
        }
      } catch (error) {
        console.log(error);
        res.status(500).end();
      }
      break;
    default:
      //Method Not Allowed
      res.status(405).end();
      break;
  }
}
export default withAuth(validate);
