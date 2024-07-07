import MyLibrary from "@/components/mylibrary";
import MainContainer from "@/components/utils/MainContainer";

const page = () => {
  return (
    <MainContainer className="sm:min-h-screen min-h-max ">
      <MyLibrary />
    </MainContainer>
  );
};

export default page;
