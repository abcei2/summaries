import { useRouter } from "next/router";
import LoadingSpin from "@/components/utils/LoadingSpin";
import MainBookComponent from "@/components/book";
import MainContainer from "@/components/utils/MainContainer";

const page = () => {
  const router = useRouter();
  const { bookId } = router.query;
  if (!bookId) return <LoadingSpin text="Loading book details" />;
  return (
    <MainContainer className="min-h-max">
      <MainBookComponent bookId={bookId as string} />
    </MainContainer>
  );
};

export default page;
