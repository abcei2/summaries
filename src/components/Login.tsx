import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { SignupFormType } from "../types";

import { toast } from "react-toastify";

const Login = () => {
  const { signIn } = useContext(UserContext);
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
  const onSignIn = async () => {
    if (!formValues.email || !formValues.password)
      return alert("Please fill all the fields");
    if (!signIn) return alert("Error, please try again");
    const res = await signIn(formValues);
    if (res.status == 200) {
      toast.success("Welcome back!");
      router.push("/");
    } else if (res.status == 401) {
      toast.error("User or password incorrect");
    }
    else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        <div className="bg-primary h-[250px] lg:h-screen">
          <img className=" h-16 w-16" src="/logo-sign-up.png"></img>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center absolute h-screen w-full lg:relative top-0 ">
            <div className="rounded-lg overflow-hidden bg-white lg:w-full w-[90%] h-[60%] flex flex-col items-center border sm:border-1 md:border-none lg:border-none">
              <h1 className="text-[18px] lg:text-[28.5px] font-semibold lg:pt-20 m-4 ">
                Log In
              </h1>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Email Address</h4>
                <input
                  value={formValues.email}
                  type="email"
                  onChange={(e) =>
                    onChange({ name: "email", value: e.target.value })
                  }
                  className="border border-1  rounded-full w-full  h-9 px-2"
                ></input>
              </div>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Password</h4>
                <input
                  value={formValues.password}
                  type="password"
                  onChange={(e) =>
                    onChange({ name: "password", value: e.target.value })
                  }
                  className="border border-1 rounded-full h-9 px-2"
                ></input>
              </div>
              <a
                href=""
                className="text-xs text-link m-2 pl-40 lg:pl-60 font-bold"
              >
                Forgot your Password?
              </a>
              <button
                onClick={() => onSignIn()}
                className="bg-bgc rounded-full w-28 h-10 mt-4"
              >
                Log In
              </button>
              <p className="my-16">
                New to Shortform?{" "}
                <a href="/signup" className="text-link font-bold ">
                  Sing up now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
