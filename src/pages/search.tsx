import BookSearch from "@/components/search/BookSearch";
import MainContainer from "@/components/utils/MainContainer";

export default function SearchPage() {
  return (
    <MainContainer className="min-h-screen max-h-[1400px] pb-6 overflow-auto ">
      <BookSearch />
    </MainContainer>
  );
}
