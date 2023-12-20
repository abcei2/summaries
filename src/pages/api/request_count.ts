import { NextApiRequest, NextApiResponse } from "next";


async function request_count(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body)
  switch (req.method) {
    case "POST":
  
      try {
        
        const response = await fetch(
          process.env.DJANGO_HOST +`/origin/${req.body.id}`,
          
        );

        if (response.status == 200) {
          //const data = await response.json();
          res.status(200).json({message: "success"});
          
        } else {
          
          res.status(401).json({ message: "Unauthorized" });
        }
      } catch (error) {
        console.log(error)
        res.status(500).json({ error });
      }
      break;
    default: //Method Not Allowed
      res.status(405).end();
      break;

      

  }
}

export default request_count;
