import React from "react";
import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/apiEndpoints";
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <SignIn
        path={LOGIN_ROUTE}
        signUpUrl={SIGNUP_ROUTE}
        fallbackRedirectUrl={HOME_ROUTE}
      />
    </div>
  );
}

export default LoginPage;
