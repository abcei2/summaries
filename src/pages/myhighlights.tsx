import MyHighlights from "@/components/MyHighlights";
import MainContainer from "@/components/utils/MainContainer";

const page = () => {
  return (
    <MainContainer className="min-h-screen overflow-auto ">
      <MyHighlights />
    </MainContainer>
  );
};

export default page;
