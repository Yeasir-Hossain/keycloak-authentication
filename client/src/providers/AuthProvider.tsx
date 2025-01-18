import Loading from "@/components/shared/Loading";
import { useLazyGetMeQuery } from "@/features/auth/authSlice";
import React, { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  const [getMe, { isLoading }] = useLazyGetMeQuery();

  const getUserData = async () => {
    await getMe();
  }

  useEffect(() => {
    getUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading className="min-h-[20vh]" />;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
