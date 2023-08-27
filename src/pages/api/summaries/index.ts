import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { SurveyCreateParams } from "../../../../types";

async function fn(req: NextApiRequest, res: NextApiResponse, token: string) {
  switch (req.method) {
    case "POST":
      const {
        bookId,
        m1,
        m2,
        method,
        p1,
        p2,
        length,
        temp,
      }: SurveyCreateParams = req.body;

      if (!bookId) {
        return res.status(400).send("bookId not provided");
      }
      if (!m1) {
        return res.status(400).send("m1 not provided");
      }
      if (!m2) {
        return res.status(400).send("m2 not provided");
      }
      if (!method) {
        return res.status(400).send("method not provided");
      }

      try {
        const response = await fetch(
          process.env.DJANGO_HOST +
            `/summarise-book/?book_id=${bookId}&m1=${m1}&m2=${m2}&method=${method}&p1=${p1}&p2=${p2}&length=${length}&temp=${temp}`,
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