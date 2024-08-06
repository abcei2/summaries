import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/utils/validator";
import { UserAuthType } from "@/types";

import formidable from "formidable";
import { parseForm } from "@/utils/formidable";
import fs from "fs";

const MAX_FILE_SIZE = 40 * 1024 * 1024; 
const SUPPORTED_FORMATS = ["epub", "pdf", "mobi", "docx", "djvu"];

export const config = {
  api: {
    bodyParser: false,
  },
};

const form = formidable({
  multiples: true,
  maxFileSize: MAX_FILE_SIZE,
});

async function uploadDoc(
  req: NextApiRequest,
  res: NextApiResponse,
  userAuth: UserAuthType
) {
  switch (req.method) {
    case "POST":
      try {
        const { files, error } = await parseForm(form, req);

        if (error) {
          if (error.message.includes("options.maxTotalFileSize")) {
            return res.status(400).json({ message: "Max 20MB allowed" });
          }
          return res.status(500).json({ error });
        }

        const { document: documents } = files;

        if (!documents || documents.length === 0) {
          return res
            .status(400)
            .json({ status: "error", message: "No document provided" });
        }
        const document = documents[0];

        let buffer = fs.readFileSync(document.filepath);
        let blob = new Blob([buffer]);

        const fileName = document?.originalFilename ?? "noname.noext";
        const safeFileName = fileName.replace(/–/g, '-');

        const extension = safeFileName.split(".")?.pop();

        if (!SUPPORTED_FORMATS.includes(extension ?? "")) {
          return res.status(400).json({ message: "Unsupported file format." });
        }

        const formData = new FormData();

        formData.append("file", blob, safeFileName);

        try {
          const headers = {
            Authorization: `token ${userAuth.token}`,
            "Content-Type": document.mimetype as any,
            "Content-Disposition": `form-data; name="file"; filename="${safeFileName}"`,
          };

          const response = await fetch(
            process.env.DJANGO_HOST + "/upload_doc/",
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            res.status(200).json(data);
          } else {
            const data = await response.json();
            console.log(data);
            res.status(response.status).json({ message: data.message });
          }
          res.status(500).end();
        } catch (error) {
          console.log(error);
          res.status(500).json({ error });
        }
        return;
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
        return;
      }
    default:
      res.status(405).send("Method Not Allowed");
      break;
  }
}

export default withAuth(uploadDoc);
