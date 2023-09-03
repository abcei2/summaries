import SummaryComp from "@/components/summary";
import LoadingSpin from "@/components/utils/LoadingSpin";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const page = () => {
  const router = useRouter();
  const { summaryId } = router.query;

  return <SummaryComp summaryId={summaryId as string} />;
    
};

export default page;
