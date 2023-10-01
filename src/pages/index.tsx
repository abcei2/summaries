import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const page = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="flex h-full w-full justify-center items-center">
      {!user ? (
        <span> Loading...</span>
      ) : user?.is_superuser || user?.is_subscribed ? (
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            Welcome to MegaSummary 
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">
            You are not allowed to access this page
          </div>
          <div className="text-xl font-bold">
            Please contact the administrator
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
