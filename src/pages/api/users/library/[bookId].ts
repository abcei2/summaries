import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function fn(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  const { bookId } = req.query;
  switch (req.method) {
    case "DELETE":
      if (!bookId) {
        return res.status(400).send("bookId not provided");
      }
      try {
        const response = await fetch(
          process.env.DJANGO_HOST + `/my-library/${bookId}/`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `token ${userAuth.token}`,
            },
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          res.status(200).json(data);
        }

        if (response.status == 401) {
          res.status(401).json({ message: "Unauthorized" });
        }

        if (response.status == 404) {
          res.status(404).json({ message: "Not found" });
        }

        if (response.status == 500) {
          res.status(500).json({ message: "Internal server error" });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
      break;

    case "PUT":
      if (!bookId) {
        return res.status(400).send("bookId not provided");
      }
      const { status, progress } = req.body;
      try {
        const response = await fetch(
          process.env.DJANGO_HOST + `/book/${bookId}/`,
          {
            method: "PUT",
            body: JSON.stringify({
              status,
              progress,
            }),
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
