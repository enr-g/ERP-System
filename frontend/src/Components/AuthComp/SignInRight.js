import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../Axios/callAPI";
import ProfileIcon from "../../Assets/Icons/profile.svg";
import PasswordIcon from "../../Assets/Icons/password.svg";
import { setCurrentUser } from "../../Redux/Slices/currentUser";
import { useDispatch } from "react-redux";

function SignInRight() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState("");

  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //store typed password
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  //login
const handleLoginClick = async (e) => {
  e.preventDefault();

  if (!userEmail || !userPassword) {
    setError("Please enter both email and password.");
  } else {
    let emessage = "";
    const response = await callAPI
      .post("/auth/token/", JSON.stringify({ email: userEmail, password: userPassword }))
      .catch((error) => (emessage = error.message));

    if (!emessage) {
      localStorage.setItem("token", response.data.access);
      console.log("token :" + response.data.access);
      dispatch(setCurrentUser(response.data.access));

      // Check if the user already has a merchant account
      const merchantResponse = await callAPI.get("/merchants/me/").catch(() => {});
      if (merchantResponse && merchantResponse.data) {
        // User has a merchant account, redirect to /merchants/me
        navigate("/merchants/me");
      } else {
        // User does not have a merchant account, redirect to /merchants/new
        navigate("/merchants/me");
      }
    } else {
      alert("Please check your username and password!");
    }
  }
};


  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <section className="flex flex-col h-screen w-1/2 bg-bgLogin">
      <div className="flex justify-end items-center h-10 min-h-40px w-full mt-3">
        <p className="text-sm font-normal">Don't have an account?</p>
        <button
          className="bg-white px-6 py-2 rounded-full border border-black border-opacity-20 text-sm font-normal font-roboto font-normal mr-4 hover:cursor-pointer"
          onClick={handleSignUpClick}
        >
          SIGN UP
        </button>
      </div>
      <form className="flex flex-col items-center mt-40 h-90 w-full">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <h2 className="text-2xl font-normal pb-4">Sign In</h2>
        <div className="flex items-center w-1/2">
          <img
              className="w-6 h-6 mr-2"
              src={ProfileIcon}
              alt="Profile icon"
          />
          <input
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
            type="email"
            placeholder="Email"
            required
            value={userEmail}
            onChange={handleEmailInput}
          />
        </div>
        <div className="flex items-center w-1/2">
          <img
              className="w-6 h-6 mr-2"
              src={PasswordIcon}
              alt="Password icon"

          />
          <input
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
            type="password"
            placeholder="Password"
            required
            value={userPassword}
            onChange={handlePasswordInput}
          />
        </div>
        <button
          className="w-full max-w-md px-4 py-3 text-white mt-5 bg-ifOrange rounded hoverbg-orange-500 focusoutline-none"
          onClick={handleLoginClick}
        >
          SIGN IN
        </button>
      </form>
    </section>
  );
}

export default SignInRight;
