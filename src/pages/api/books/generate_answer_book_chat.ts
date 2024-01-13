
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function fn(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  switch (req.method) {
    case "POST":
      //console.log(req.body);
      
      const  bookId  = req.body.bookId;
      const question = req.body.question;

      if (!bookId) {
        return res.status(400).send("bookId not provided");
      }
      try {
        const response = await fetch(
          
          process.env.DJANGO_HOST + `/generate-answer/?book_id=`+bookId+`&question=`+question,
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
    default: //Method Not Allowed
      res.status(405).end();
      break;
  }
}

export default withAuth(fn);
