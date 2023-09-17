import { NextApiRequest, NextApiResponse } from "next";
import { removeAuthCookie } from "@/utils/auth-cookies";
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
        const { token , ...data } = userAuth;
        res.status(200).json(data);
      } catch (error) {
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
