import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import callAPI from "../../Axios/callAPI";
import LetterIcon from "../../Assets/Icons/letter.svg";
import { setSignUpEmail } from "../../Redux/Slices/signUpEmailAddress";

function SignUpRight() {
  const [userEmail, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //sign up - create a new user
  const handleSignUpClick = async (e) => {
    e.preventDefault();

    if (!userEmail) {
      setError("Please enter email");

    } else {
      let emessage = "";
      dispatch(setSignUpEmail(userEmail));






      await callAPI
        .post(
          "/registration/",
          JSON.stringify({
            email: userEmail,
          })
        )
        .catch((error) => {
          emessage = error.message;
        });

      if (!emessage) {
        navigate("/congratulations");

      } else {
        alert("Please check your email");
      }
    }
  };

  //navigate to sign in page
  const handleSignInClick = () => {
    navigate("/signin");
  };

  return (
    <section className="flex flex-col h-screen w-1/2 bg-bgLogin">
      <div className="flex justify-end items-center h-10 min-h-40px w-full mt-3">
        <p className="text-sm font-normal">Already have an account?</p>
        <button
          className="bg-white px-6 py-2 rounded-full border border-black border-opacity-20 text-sm font-roboto font-normal mr-4 hover:cursor-pointer"
          onClick={handleSignInClick}
        >
          SIGN IN
        </button>
      </div>
      <form className="flex flex-col items-center mt-40 h-90 w-full ">
        {error && <div className="text-red-500 text-sm mb-10">{error}</div>}
        <h2 className="text-2xl font-normal pb-4">Sign Up</h2>
        <div className="flex items-center w-1/2">
          <img
            className="w-6 h-6 mr-2"
            src={LetterIcon}
            alt="Form Icon"
          />
          <input
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={handleEmailInput}
          />
        </div>
        <button
          className="w-full max-w-md px-4 py-3  mt-5 text-white bg-ifOrange rounded hover:bg-orange-500 focus:outline-none"
          onClick={handleSignUpClick}
        >
          SIGN UP
        </button>
      </form>
    </section>
  );
}

export default SignUpRight;

