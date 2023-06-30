const SignUp = () => {
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
              <img className="lg:-ml-20 h-full max-w-fit" src="/img-sing-up.svg"></img>
            </div>
          </div>
        </div>
        <form className="w-[60%] ">
          <div className="flex flex col absolute justify-center items-center  w-full h-screen lg:relative top-0">
            <div className="rounded-lg overflow-hidden bg-white lg:w-full w-[90%] h-[50%] lg:h-screen flex flex-col items-center border sm:border-1 md:border-none lg:border-none">
              <h1 className="text-[18px] lg:text-[28.5px] font-semibold lg:pt-20 m-4 ">
                Sign Up to Shortform
              </h1>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Email Address</h4>
                <input className="border border-1  rounded-full w-full  h-9"></input>
              </div>
              <div className="flex flex-col w-full lg:w-[70%] px-4 gap-2">
                <h4 className="text-sm font-bold">Password</h4>
                <input className="border border-1 rounded-full h-9"></input>
              </div>
              <button className="bg-bgc rounded-full w-40 h-10 mt-4">
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
        </form>
      </div>
    </>
  );
};

export default SignUp;
