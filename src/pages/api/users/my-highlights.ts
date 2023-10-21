import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function fn(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "GET":
      try {
        const response = await fetch(
          process.env.DJANGO_HOST + `/my-highligths/`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${userAuth.token}`,
            },
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
   

      case "PUT":
        console.log(req.body.comment)
        try {
          const response = await fetch(
            `${process.env.DJANGO_HOST}/highlight-text/`,
            {
              method: "PUT",
              headers: {
                Authorization: `token ${userAuth.token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ comment: req.body.comment, id: req.body.id }),
            }
          );
      
          if (response.status === 200) {
            const data = await response.json();
            res.status(200).json(data);
          } else {
            res.status(401).json({ message: "Unauthorized" });
          }
        } catch (error) {
          res.status(500).json({ error });
        }
        default: //Method Not Allowed
      res.status(405).end();

  }
}

export default withAuth(fn);
