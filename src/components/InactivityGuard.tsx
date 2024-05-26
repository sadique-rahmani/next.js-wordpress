import React, { useEffect } from "react";

import { useAppDispatch } from "@/redux-store/reduxhooks";
import { setUser } from "@/redux-store/userReducer";
import { useRouter } from "next/navigation";

interface InactivityGuardProps {
  children: React.ReactNode;
}

const InactivityGuard = (props: InactivityGuardProps) => {
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  let activityTimeout: any = null;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      startInactivityTimer();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startInactivityTimer = () => {
    if (activityTimeout) {
      clearTimeout(activityTimeout);
    }

    activityTimeout = setTimeout(() => {
      localStorage.removeItem("token");

      dispatch(
        setUser({
          isAuthenticated: false,
          userData: null,
        })
      );
      router.push("/login");
    }, 5 * 60 * 1000);
  };

  const resetInactivityTimer = () => {
    startInactivityTimer();
  };

  useEffect(() => {
    window.addEventListener("mousemove", resetInactivityTimer);

    window.addEventListener("keydown", resetInactivityTimer);

    return () => {
      window.removeEventListener("mousemove", resetInactivityTimer);
      window.removeEventListener("keydown", resetInactivityTimer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};

export default InactivityGuard;
