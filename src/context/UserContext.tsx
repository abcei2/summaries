import { useState, useEffect, ReactNode, createContext } from "react";
import { SignupFormType, UserAuthType } from "../types";
import { useRouter } from "next/router";


export const UserContext = createContext<{
  user?: UserAuthType;
  signIn?: (formValues: {
    email: string;
    password: string;
  }) => Promise<Response>;
  signUp?: (formValues: SignupFormType) => Promise<Response>;
  signOut?: () => Promise<void>;
  showModalSignout?: (show?: boolean) => void;
  modalSignout?: boolean;
  loading?: boolean;
}>({});

const UserContextProvider = ({ children }: { children: ReactNode }) => {

  const router = useRouter();
  const [user, setUser] = useState<UserAuthType>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modalSignout, setModalSignout] = useState<boolean>(false);
  useEffect(() => {
    const boostrapAsync = async () => {
      console.log("boostrapAsync");
      const res = await fetch("/api/auth/profile");
      setLoading(false);
      if (res.status == 200) {
        const {
          reload,
          ...user
        } = await res.json();
        if (reload) {
          router.reload();
        }
        setUser(user);
      } else {
        setUser(undefined);
      }
    };
    boostrapAsync();
  }, []);

  const signIn = async (formValues: { email: string; password: string }) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status == 200) {
      const data = await res.json();
      setUser(data.user);
    };
    return res;
  };

  const signUp = async (formValues: SignupFormType) => {
    const res = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status==200) router.replace("/");
    return res;
  };

  const signOut = async () => {
    const res = await fetch("/api/auth/logout");
    if (res.ok) {
      setUser(undefined);
      setModalSignout(false);
    }
  };

  const showModalSignout = async (show?: boolean) => {
    setModalSignout(show || false);
  };

  const authContext = {
    user,
    signIn,
    signUp,
    signOut,
    showModalSignout,
    modalSignout,
    loading,
  };

  return (
    <UserContext.Provider value={authContext}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
