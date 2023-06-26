import React from "react";
import SignInRight from "../../Components/AuthComp/SignInRight";
import SignInLeft from "../../Components/AuthComp/SignInLeft";

function SignIn() {
  return (
    <div className="flex h-screen w-screen">
      <SignInLeft />
      <SignInRight />
    </div>
  );
}

export default SignIn;
