import { NextApiRequest } from "next";
import formidable from "formidable";
import IncomingForm from "formidable/Formidable";

export const parseForm = async (
  form:IncomingForm,
  req: NextApiRequest,
): Promise<{ fields: formidable.Fields; files: formidable.Files, 
  error: any
}> => {
  return await new Promise(async (resolve) => {
    form.parse(req, function (error, fields, files) {
      resolve({ fields, files, error });
    });
  });
};
