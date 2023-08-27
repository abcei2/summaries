import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";

async function fn(req: NextApiRequest, res: NextApiResponse, token: string) {
  const { id } = req.query;
  switch (req.method) {
    case "POST":
      const { global_id } = req.body;
      if (!global_id) {
        return res.status(400).send("global_id not provided");
      }
      try {
        const response = await fetch(
          process.env.DJANGO_HOST + `/my-library/`,
          {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
              "Content-Type": "application/json",
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
