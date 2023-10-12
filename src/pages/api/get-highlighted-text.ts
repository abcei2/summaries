import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function getHighlightedText(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "GET":
      try {
        const summaryId = req.query.summary_id as string;

        if (!summaryId) {
          res.status(400).json({ message: "Missing summary_id" });
          return;
        }

        const response = await fetch(
          `${process.env.DJANGO_HOST}/get-summary-highlighted-text/?summary_id=${summaryId}`,
          {
            method: "GET",
            headers: {
              Authorization: `token ${userAuth.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          res.status(response.status).json({ message: "Failed to get highlighted text" });
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

export default withAuth(getHighlightedText);
