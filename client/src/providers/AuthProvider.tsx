import Loading from "@/components/shared/Loading";
import { useLazyGetMeQuery } from "@/features/auth/authSlice";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AuthProvider({ children }: { children: React.ReactNode }): JSX.Element | null {
  const [getMe, { isLoading }] = useLazyGetMeQuery();
  const navigate = useNavigate(); // Get the navigate function

  const getUserData = async () => {
    try {
      // Try to get the user data
      const userData = await getMe({}).unwrap();
      if (userData) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading className="min-h-[20vh]" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
