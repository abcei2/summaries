import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function highlight(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "POST":
  
      try {
        
        const response = await fetch(
          process.env.DJANGO_HOST +`/highlight-text/`,
          {
            method: "POST",
            headers: {
              Authorization: `token ${userAuth.token}`,
              "Content-Type": "application/json",

            },
            body: JSON.stringify(req.body),
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          res.status(401).json({ message: "Unauthorized" });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;

      

  }
}

export default withAuth(highlight);
