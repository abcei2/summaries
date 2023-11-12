import { Resend } from "resend";
import ReactDomServer from "react-dom/server";
import jwt from "jsonwebtoken";
import { NextApiRequest } from "next";

export const sendVerificationEmail = async ({
  email,
  req,
}: {
  email: string;
  req: NextApiRequest;
}) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY || "", {
    expiresIn: "15m",
  });
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const origin = `${protocol}://${req.headers.host}`;
  const redirectUrl = `${origin}/api/users/verify?token=${token}`;
  const resend = new Resend(process.env.RESEND_API_KEY);
  // welcome image here without use of component "WelcomeEmail"
  await resend.emails.send({
    from: process.env.RESEND_EMAIL as string,
    to: email,
    subject: "Your account on Mega Summary was created!",
    html: ReactDomServer.renderToString(
      <html>
        <body>
          <h1>Welcome to Mega Summary!</h1>
          <p>Hello your account on Mega Summary was created successfully.</p>
          <p>
            Please click on the link below to verify your email and activate
            your account.
          </p>
          <a href={redirectUrl}>Click here to verify your email</a>
        </body>
      </html>
    ),
  });
};
