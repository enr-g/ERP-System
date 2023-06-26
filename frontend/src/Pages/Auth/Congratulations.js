import CongratsRight from "../../Components/AuthComp/CongratsRight";
import SignInLeft from "../../Components/AuthComp/SignInLeft";
import React from "react";

function Congratulations() {
  return (
    <div className="flex h-screen w-screen">
      <SignInLeft />
      <CongratsRight />
    </div>
  );
}

export default Congratulations;
