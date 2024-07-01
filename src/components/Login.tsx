import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import { SignupFormType } from "../types";

import { toast } from "react-toastify";
import Image from "next/image";

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
      // toast.success("Welcome back!");
      router.replace("/search");
    } else if (res.status == 401) {
      toast.error("User or password incorrect");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSignIn();
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
        <div className="rounded-lg overflow-hidden w-full flex flex-col items-center gap-4 z-[1] relative">
          <div className="flex flex-col px-4 gap-2 text-[20px] font-bold pt-20 m-4  items-center">
            <Image src="/images/donut.svg" alt="donut" width={26} height={20} />
            <h1 className="">LOGIN</h1>
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
                  onKeyDown={handleKeyDown}
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
                  onKeyDown={handleKeyDown}
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

            <a
              href=""
              className="text-xs text-custom-purple m-2 self-end font-bold w-fit"
            >
              Forgot your Password?
            </a>
          </div>
          <button
            onClick={() => onSignIn()}
            className="btn bg-custom-black text-white tet-xs"
          >
            Log In
          </button>
          <p className="text-x">
            New to MegaSummary?{" "}
            <a href="/signup" className="text-custom-purple font-bolds ">
              Sign up now
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
