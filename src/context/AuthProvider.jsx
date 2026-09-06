import React from "react";
import Auths from "./Auths";

function AuthProvider({ children }) {
  return (
    <>
      <Auths>{children}</Auths>
    </>
  );
}

export default AuthProvider;
