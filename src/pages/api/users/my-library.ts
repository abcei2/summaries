import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";

async function fn(req: NextApiRequest, res: NextApiResponse, token: string) {
  switch (req.method) {
    case "GET":
      const { word } = req.query;
      if (!word) {
        return res.status(400).send("Word not provided");
      }
      try {
        const response = await fetch(
          process.env.DJANGO_HOST + `/my-library/`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${token}`,
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
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}

export default withAuth(fn);
