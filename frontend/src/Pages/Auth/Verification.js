import VerificationRight from "../../Components/AuthComp/VerificationRight";
import SignInLeft from "../../Components/AuthComp/SignInLeft";
import React from "react";

function Verification() {
  return (
    <div className="flex h-screen w-screen">
      <SignInLeft />
      <VerificationRight />
    </div>
  );
}

export default Verification;

