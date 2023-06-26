import React from "react";
import logo from "../../Assets/Logos/logo_white.svg";

const SignInLeft = () => {
  return (
    <div className="flex h-screen w-1/2">
      <div className="flex items-center justify-center w-screen p-8 bg-bgLogin">
        <div className="flex flex-col items-center">
          <img src={logo} alt="Invenflow Logo" className="w-23 mb-2" />
          <p className="font-semibold text-4xl text-white">Invenflow</p>
          <p className="opacity-60 text-title">Smart inventory solution</p>
        </div>
      </div>
    </div>
  );
};

export default SignInLeft;

