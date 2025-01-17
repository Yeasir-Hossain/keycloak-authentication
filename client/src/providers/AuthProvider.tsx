import React, { useEffect } from "react";

export default function AuthProvider({ children }: { children: React.ReactNode }): React.ReactNode {
  useEffect(() => {

  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
