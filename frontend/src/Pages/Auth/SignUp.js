import SignUpRight from "../../Components/AuthComp/SignUpRight";
import SignInLeft from "../../Components/AuthComp/SignInLeft";
import React from "react";

function SignUp() {
  return (
    <div className="flex h-screen w-screen">
      <SignInLeft />
      <SignUpRight />
    </div>
  );
}

export default SignUp;

