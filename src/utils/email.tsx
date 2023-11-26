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
  try {
    const tokenRequest = await fetch(
      `${process.env.DJANGO_HOST}/verify-email/?email=${email}`
    );
    if (tokenRequest.status !== 200) {
      return false;
    }
    const { token } = await tokenRequest.json();
    const protocol = req.headers["x-forwarded-proto"] || "http";
    const origin = `${protocol}://${req.headers.host}`;
    const redirectUrl = `${origin}/api/users/verify?token=${token}&email=${email}`;
    const resend = new Resend(process.env.RESEND_API_KEY);
    // welcome image here without use of component "WelcomeEmail"
    const resp = await resend.emails.send({
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
    return !resp?.error;
  } catch (err) {
    console.log(err);
    return false;
  }
};
