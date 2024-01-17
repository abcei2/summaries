import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function getHighlightedText(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "POST":
      try {
        const book_id = req.body.book_id;
        const input_text = req.body.input_text;
        console.log(book_id, input_text);

        

        const response = await fetch(
          `${process.env.DJANGO_HOST}/search_references/?book_id=${book_id}&input_text=${input_text}`,
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
          res.status(response.status).json({ message: "Error" });
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
