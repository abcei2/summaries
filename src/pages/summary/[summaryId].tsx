import SummaryComp from "@/components/summary";
import { useRouter } from "next/router";
const page = () => {
  const router = useRouter();
  const { summaryId } = router.query;

  return <SummaryComp summaryId={summaryId as string} 
  showDetails={true}
  />;
    
};

export default page;
