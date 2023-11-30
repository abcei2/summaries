import { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";


const page = () => {
  // Please verify your email to continue, or click here to resend the email.
  const [emailSent, setEmailSent] = useState(false);
  const { user, signOut } = useContext(UserContext);
  const router = useRouter();

  const resendEmail = async () => {
    // Call your API to resend the email
    fetch("/api/users/verify/resend").then((res) => {
      if (res.status == 200) {
        setEmailSent(true);
      }
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <span className=" text-4xl font-bold">Please Verify Your Email</span>
      <div className="w-1/2 text-center flex flex-col gap-2 items-center">
        <p>Check your inbox for a verification email.</p>
        {emailSent && (
          <p>A new verification email has been sent to your inbox.</p>
        )}

        <button
          className={`${
            emailSent ? "bg-gray-300" : "bg-primary hover:bg-primary-dark"
          } primary-btn w-fit`}
          onClick={resendEmail}
          disabled={emailSent}
        >
          {emailSent ? "Email Sent" : "Resend Email"}
        </button>
        

        <button
          className="primary-btn w-fit"
          onClick={() => {
            signOut && signOut().then(() => router.reload());
          }}
          
        >
          Sign Out
        </button>

        

        
      </div>
      
    </div>
  );
};

export default page;
