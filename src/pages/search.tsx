import BookSearch from "@/components/search/BookSearch";
import MainContainer from "@/components/utils/MainContainer";

export default function SearchPage() {
  return (
    <MainContainer className="sm:min-h-screen min-h-max ">
      <BookSearch />
    </MainContainer>
  );
}
