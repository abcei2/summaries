import { NextApiRequest, NextApiResponse } from "next";



async function password_validator(req: NextApiRequest, res: NextApiResponse) {
    
  switch (req.method) {
    case "POST":
    
      try {
        
        const response = await fetch(
          process.env.DJANGO_HOST +`/validate_email_and_password/`,
          {
            method: "POST",
            headers: {
              
              "Content-Type": "application/json",

            },
            body: JSON.stringify(req.body),
          }
        );

        if (response.status == 200) {
          const data = await response.json();
          
          res.status(200).json({data});
        } else {

            const data = await response.json();
            
          
            res.status(400).json({data});
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

export default password_validator;
