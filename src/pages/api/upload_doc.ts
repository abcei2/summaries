import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";
const formidable = require("formidable");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes
const SUPPORTED_FORMATS = ["epub", "pdf", "mobi", "docx", "djvu"];

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadDoc(req: NextApiRequest, res: NextApiResponse, userAuth: UserAuthType) {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.maxFileSize = MAX_FILE_SIZE;

    form.parse(req, async (err: { message: string | string[]; }, fields: any, files: { document: any[]; }) => {
      if (err) {
        if (err.message.includes("maxFileSize exceeded")) {
          return res.status(400).json({ message: "Max 10MB allowed" });
        }
        return res.status(500).json({ err });
      }

      const documents = files.document;

      if (!documents || documents.length === 0) {
        return res.status(400).json({ status: "error", message: "No document provided" });
      }
      const document = documents[0];
      console.log('Document:', document);
      console.log('Original Filename:', document.originalFilename);

      const extension = document.originalFilename.split(".").pop();

      if (!SUPPORTED_FORMATS.includes(extension)) {
        return res.status(400).json({ message: "Unsupported file format." });
      }

      const formData = new FormData();
      formData.append("document", document);
      formData.append("file_name", document.originalFilename);
      formData.append("file_extension", extension);

      try {
        const response = await fetch(process.env.DJANGO_HOST + "/upload_doc/", {
          method: "POST",
          headers: {
            Authorization: `token ${userAuth.token}`,
          },
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
    res.status(405).end();
  }
}

export default withAuth(uploadDoc);
