import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

async function fetch_url(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {

  console.log("URL: ", process.env.DJANGO_HOST + `/fetch_url/`);
console.log("Headers: ", {
  Authorization: `token ${userAuth.token}`,
  "Content-Type": "application/json",
});
console.log("Body: ", JSON.stringify(req.body));


  switch (req.method) {
    case "POST":
  
      try {
        
        const response = await fetch(
          process.env.DJANGO_HOST +`/fetch_url/`,
          {
            method: "POST",
            headers: {
              Authorization: `token ${userAuth.token}`,
              "Content-Type": "application/json",

            },
            body: JSON.stringify(req.body),
          }
        );
        console.log("Response: ", response);

        if (response.status == 200) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const data = await response.json();
          res.status(401).json({ message: data.message });
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

export default withAuth(fetch_url);
