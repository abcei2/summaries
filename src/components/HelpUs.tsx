const HelpUs = () => {
  return (
    <div className="w-full flex justify-center px-5 py-3 bg-transparent">
      <div className="flex flex-col gap-2 w-full max-w-[700px] rounded-md bg-[#b7dfeb] px-2 py-1 sm:px-8 sm:py-4 text-justify ">
        <p>Hey there! We need your help. Your insights are crucial to help us
        fine tune the user experience on MegaSummary. It would mean a lot to
        us if you take a moment to complete two quick surveys. As a thank you,
        you’ll get early feature access! 🚀 📚. </p>
        <a href="/surveys" className="underline text-blue-700 self-center">
          Take the Surveys Now!
        </a>
      </div>
    </div>
  );
};

export default HelpUs;
