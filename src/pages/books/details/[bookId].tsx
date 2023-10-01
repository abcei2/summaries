import { useRouter } from "next/router";
import LoadingSpin from "@/components/utils/LoadingSpin";
import MainBookComponent from "@/components/book";

const page = () => {
  const router = useRouter();
  const { bookId } = router.query;
  if (!bookId) return <LoadingSpin text="Loading book details" />;
  return <MainBookComponent bookId={bookId as string} />;
};

export default page;
