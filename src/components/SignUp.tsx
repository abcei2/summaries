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
  if (!formValues.email || !formValues.password)
    return alert("Please fill all the fields");

  try {
    // Call the Django password validator endpoint
    const validatorResponse = await fetch('api/auth/email_and_password_validator', {
      method: 'POST',
      body: JSON.stringify({ password: formValues.password, email: formValues.email }),
    });

    // Check if the password is valid
    const validatorData = await validatorResponse.json();
    console.log(validatorData);
    if (validatorResponse.ok) {
      
      
        if(validatorData.data.isValid){

          if (!signUp) return alert("Error, please try again");

          const signUpResponse = await signUp(formValues);

          if (signUpResponse.status == 200) router.push("/");
        }
        else{
            
            alert(validatorData.data.errors.join('\n'));
      }
  }
  } catch (error) {
    // Handle any errors
    console.error('Error validating password:', error);
    alert('Error validating password. Please try again.');
  }
};

  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-col items-center">
          <h1 className="text-[18px] md:text-[28.5px] font-semibold pt-20 m-4 ">
            Sign Up to MegaSummary
          </h1>
          <div className="flex flex-col w-full lg:w-[50%] px-4 gap-2">
            <h4 className="text-sm font-bold">Email Address</h4>
            <input
              value={formValues.email}
              onChange={(e) =>
                onChange({ name: "email", value: e.target.value })
              }
              className="border border-1  rounded-full w-full  h-9"
            ></input>
          </div>
          <div className="flex flex-col w-full lg:w-[50%] px-4 gap-2">
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
            className="bg-primary rounded-full w-40 h-10 mt-4"
          >
            Create Account
          </button>
          <p className="my-16 text-center">
            By creating an account, you agree to the <b>Terms of Service</b> and{" "}
            <b>Privacy Policy.</b>
          </p>
          <p>
            Already have an account? <a href="/login" className="text-primary font-bold">Log in</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
