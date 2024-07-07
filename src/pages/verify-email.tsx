import { useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useContext } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import MainContainer from "@/components/utils/MainContainer";

const page = () => {
  // Please verify your email to continue, or click here to resend the email.
  const [emailSent, setEmailSent] = useState(false);
  const { user, signOut, loadUserProfile } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const userInfoPollingCallback = async () => {
      loadUserProfile && (await loadUserProfile({ silent: true }));
      if (user?.email_confirmed) {
        router.push("/search");
      } else {
        timeoutId = setTimeout(userInfoPollingCallback, 5000);
      }
    };
    timeoutId = setTimeout(userInfoPollingCallback, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

  const resendEmail = async () => {
    // Call your API to resend the email
    fetch("/api/users/verify/resend").then((res) => {
      if (res.status == 200) {
        setEmailSent(true);
      }
    });
  };

  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center gap-[60px] font-pt-sans">
        <span className=" text-4xl font-bold text-center">
          Please Verify Your Email
        </span>
        <div className="w-1/2 text-center flex flex-col gap-10 items-center">
          <div className="flex flex-col gap-2 items-center">
            <p>Check your inbox for a verification email.</p>
            We sent an email to:{" "}
            <span className="font-bold">{user?.email}</span>
            {emailSent && (
              <p>A new verification email has been sent to your inbox.</p>
            )}
          </div>
          <div className="flex flex-col  gap-2 items-center">
            <button
              className={`${
                emailSent ? "bg-gray-300" : "bg-primary"
              } btn bg-primary min-w-[120px]`}
              onClick={resendEmail}
              disabled={emailSent}
            >
              {emailSent ? "Email Sent" : "Resend Email"}
            </button>
            <button
              className="btn bg-primary min-w-[120px]"
              onClick={() => {
                signOut && signOut().then(() => router.reload());
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default page;
