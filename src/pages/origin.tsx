import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const OriginPage: React.FC = () => {
    
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  useEffect(() => {
    
    if (!id) return; // Exit if id is not present

    fetch("/api/request_count", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
          })
    
    
    //fetch(`http://127.0.0.1:8000/origin/${id}`)
      //.then(response => response.json())
      .then(data => {
        //console.log("Request counted", data);
        
        router.replace ('/');
      })
      .catch(error => {
        console.error("Error counting the request:", error);
        router.replace('/');
      });
  }, [id, router]);

  return <div>Redirecting...</div>;
};

export default OriginPage;
