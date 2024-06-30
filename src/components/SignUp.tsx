import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { SignupFormType } from "../types";

import { toast } from "react-toastify";
import Image from "next/image";
import LandingPageMenu from "./landing/LandingPageMenu";

const SignUp = () => {
  const { signUp } = useContext(UserContext);
  const router = useRouter();
  const [formValues, setFormValues] = useState<SignupFormType>({
    email: "",
    password: "",
  });

  const onChange = ({
    name,
    value,
  }: {
    name: keyof typeof formValues;
    value: string;
  }) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    if (!formValues.email || !formValues.password)
      return alert("Please fill all the fields");

    try {
      // Call the Django password validator endpoint
      const validatorResponse = await fetch(
        "api/auth/email_and_password_validator",
        {
          method: "POST",
          body: JSON.stringify({
            password: formValues.password,
            email: formValues.email,
          }),
        }
      );

      // Check if the password is valid
      const validatorData = await validatorResponse.json();
      console.log(validatorData);
      if (validatorResponse.ok) {
        if (validatorData.data.isValid) {
          if (!signUp) return alert("Error, please try again");

          const signUpResponse = await signUp(formValues);

          if (signUpResponse.status == 200) router.push("/");
        } else {
          alert(validatorData.data.errors.join("\n"));
        }
      }
    } catch (error) {
      // Handle any errors
      console.error("Error validating password:", error);
      alert("Error validating password. Please try again.");
    }
  };

  return (
    <>
      <div className="w-full sm:h-screen h-[900px] relative">
        <div className="absolute w-full h-full flex justify-between overflow-hidden">
          <Image
            src="/images/whirl8.svg"
            alt="donut"
            width={761}
            height={760}
            className="relative -bottom-[200px] -left-[20px]"
          />
          <Image
            src="/images/bookmark.svg"
            alt="donut"
            width={119}
            height={153}
            className="absolute sm:relative sm:-top-[150px] bottom-[100px] right-0"
          />
        </div>
        <LandingPageMenu hiddeButtons={true} backgroundColor="bg-primary" />
        <div className="rounded-lg overflow-hidden w-full flex flex-col items-center gap-4 z-[1] relative">
          <div className="flex flex-col px-4 gap-2 text-[20px] font-bold pt-20 m-4  items-center">
            <Image src="/images/donut.svg" alt="donut" width={26} height={20} />
            <h1 className="">SIGNUP</h1>
          </div>
          <div className="flex flex-col w-full md:w-[60%] lg:w-[30%] px-4 gap-4">
            <div className="flex flex-col w-full px-4 gap-2">
              <span className="text-sm">Email Address</span>
              <div className="relative w-full flex items-center">
                <input
                  value={formValues.email}
                  type="email"
                  onChange={(e) =>
                    onChange({ name: "email", value: e.target.value })
                  }
                  className="input bg-primary w-full"
                />
                <Image
                  src="/images/arrows_more_down.svg"
                  alt="email"
                  width={18}
                  height={18}
                  className="absolute right-1.5 bottom-0.5"
                />
              </div>
            </div>
            <div className="flex flex-col w-full px-4 gap-2">
              <span className="text-sm">Password</span>
              <div className="relative w-full flex items-center">
                <input
                  value={formValues.password}
                  type="password"
                  onChange={(e) =>
                    onChange({ name: "password", value: e.target.value })
                  }
                  className="input bg-primary w-full"
                />
                <Image
                  src="/images/arrows_more_down.svg"
                  alt="email"
                  width={18}
                  height={18}
                  className="absolute right-1.5 bottom-0.5"
                />
              </div>
            </div>

            <p className="text-xs text-center w-full">
              By creating an account, you agree to the
              <a className="text-custom-purple"> Terms of Service </a>
              and
              <a className="text-custom-purple"> Privacy Policy</a>
            </p>
          </div>
          <button
            onClick={() => onSubmit()}
            className="btn bg-custom-black text-white tet-xs"
          >
            Log In
          </button>
          <p className="text-xs">
            Already have an account?{" "}
            <a href="/login" className="text-custom-purple">
              Log in
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
