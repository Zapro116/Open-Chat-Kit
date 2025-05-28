import React, { useEffect } from "react";
import { HOME_ROUTE, LOGIN_ROUTE, SIGNUP_ROUTE } from "../utils/apiEndpoints";
import { SignUp } from "@clerk/clerk-react";
import { logPageView } from "../utils/analytics";

function SignupPage() {
  useEffect(() => {
    logPageView();
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <SignUp
        path={SIGNUP_ROUTE}
        signInUrl={LOGIN_ROUTE}
        fallbackRedirectUrl={HOME_ROUTE}
      />
    </div>
  );
}

export default SignupPage;
