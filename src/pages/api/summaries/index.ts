import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { SumaryCreateParams, UserAuthType } from "../../../types";

async function fn(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "POST":
      const {
        bookId,
        model,
        method,
        prompt,
        length,
      }: SumaryCreateParams = req.body;

      if (!bookId) {
        return res.status(400).send("bookId not provided");
      }

      try {
        
        const response = await fetch(
          process.env.DJANGO_HOST +
            `/summarise-book/?book_id=${bookId}&m1=${model}&m2=${model}&method=${method}&p1=${prompt}&p2=${prompt}&length=${length}&temp=${0.8}`,
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
          const data = await response.json();
          
          
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
