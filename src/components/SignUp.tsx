import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SignupFormType } from "../types";
import { useRouter } from "next/router";

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
    if(!formValues.email || !formValues.password) return alert("Please fill all the fields")
    if(!signUp) return alert("Error, please try again")
    const res = await signUp(formValues);
    if (res.status==200) router.push("/");
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row w-full relative">
        <div className="lg:h-screen h-[300px] lg:w-[450px] bg-primary">
          <div className="grid grid-cols-2 lg:grid-cols-1 h-full">
            <div>
              <img className="pt-10 pl-5" src="/logo-sign-up.svg"></img>
              <span className="font-bold lg:text-[38px] m-2">
                The world's best book summaries.
              </span>
              <p className="lg:text-[22px]">
                Get access to the world's best book summaries, and so much more.
              </p>
            </div>
            <div className="h-full overflow-hidden ">
              <img
                className="lg:-ml-20 h-full max-w-fit"
                src="/img-sing-up.svg"
              ></img>
            </div>
          </div>
        </div>
        <div className="w-[60%] ">
          <div className="flex flex col absolute justify-center items-center  w-full h-screen lg:relative top-0">
            <div className="rounded-lg overflow-hidden bg-white lg:w-full w-[90%] h-[50%] lg:h-screen flex flex-col items-center border sm:border-1 md:border-none lg:border-none">
              <h1 className="text-[18px] lg:text-[28.5px] font-semibold lg:pt-20 m-4 ">
                Sign Up to Shortform
              </h1>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Email Address</h4>
                <input
                  value={formValues.email}
                  onChange={(e) =>
                    onChange({ name: "email", value: e.target.value })
                  }
                  className="border border-1  rounded-full w-full  h-9"
                ></input>
              </div>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Password</h4>
                <input
                  value={formValues.password}
                  onChange={(e) =>
                    onChange({ name: "password", value: e.target.value })
                  }
                  type="password"
                  className="border border-1 rounded-full h-9"
                ></input>
              </div>
              <button
                onClick={() => onSubmit()}
                className="bg-bgc rounded-full w-40 h-10 mt-4"
              >
                Create Account
              </button>
              <p className="my-16">
                By creating an account, you agree to the <b>Terms of Service</b>{" "}
                and <b>Privacy Policy.</b>
              </p>
              <p>
                Already have an account? <a className="text-link">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
