"use client";

import { useAppSelector } from "@/redux-store/reduxhooks";
import { useRouter } from "next/navigation";
// ** React Imports
import { ReactNode, useEffect, useState } from "react";

// ** Next Imports

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children } = props;
  // const [authenticated, setAuthenticated] = useState(false);

  const { isAuthenticated } = useAppSelector((state) => state.user);
  console.log("🚀 ~ AuthGuard ~ isAuthenticated:", isAuthenticated);

  const router = useRouter();

  useEffect(() => {
    // const token = localStorage.getItem("token");

    // if (!token) {
    //   router.push("/login");
    // } else {
    //   setAuthenticated(true);
    // }

    if (!isAuthenticated) {
      router.push("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default AuthGuard;
