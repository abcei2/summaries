import SummaryComp from "@/components/summary";
import { useRouter } from "next/router";
const page = () => {
  const router = useRouter();
  const { summaryId } = router.query;

  console.log('router.query', router.query);
  console.log('summaryId_r', summaryId);

  return <SummaryComp summaryId={summaryId as string} 
  showDetails={true}
  />;
    
};

export default page;
