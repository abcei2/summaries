import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

const fs = require('fs');

const formidable = require("formidable");
const FormData = require('form-data');
const readFile = require('util').promisify(fs.readFile);
//import File type
import { File } from 'formidable';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const SUPPORTED_FORMATS = ["epub", "pdf", "mobi", "docx", "djvu"];

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadDoc(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({ maxFileSize: MAX_FILE_SIZE });

   
    

    form.parse(req, async (err: { message: string | string[]; }, fields: any, files: { document: any[]; }) => {
      if (err) {
        if (err.message.includes("options.maxTotalFileSize")) {
          return res.status(400).json({ message: "Max 10MB allowed" });
        }
        return res.status(500).json({ err });
      }

      const documents = files.document;

      if (!documents || documents.length === 0) {
        return res.status(400).json({ status: "error", message: "No document provided" });
      }
      const document = documents[0];
      const extension = document.originalFilename.split(".").pop();

      if (!SUPPORTED_FORMATS.includes(extension)) {
        return res.status(400).json({ message: "Unsupported file format." });
      }
      
  
      const fileBuffer = await readFile(document.filepath, 'binary');


      const formData = new FormData();

      formData.append('file', fileBuffer, document.originalFilename);

      
      try {
        const headers = {
          Authorization: `token ${userAuth.token}`,
          ...formData.getHeaders(),
          'Content-Disposition': `form-data; name="file"; filename="${document.originalFilename}"`,
        };
        
        const response = await fetch(process.env.DJANGO_HOST + "/upload_doc/", {
          method: "POST",
          headers: headers,
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          res.status(response.status).json({ message: "Failed to upload" });
        }
      } catch (error) {
        res.status(500).json({ error });
      }
    });
  } else {
    res.status(405).send('Method Not Allowed');
  }
}

export default withAuth(uploadDoc);
