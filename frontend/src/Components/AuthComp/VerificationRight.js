import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import callAPI from "../../Axios/callAPI";

function VerificationRight() {
  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  //store typed email
  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  //store typed password
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  //store typed repeat password
  const handleRepeatPasswordInput = (e) => {
    setRepeatPassword(e.target.value);
  };

  //check if passwords match
  useEffect(() => {
    checkPasswordMatch();
  }, [repeatPassword, userPassword]);

  const checkPasswordMatch = () => {
    if (repeatPassword !== "" && repeatPassword !== userPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  //store typed username
  const handleUserNameInput = (e) => {
    setUserName(e.target.value);
  };

  //store  firstname
  const handleFirstNameInput = (e) => {
    setFirstName(e.target.value);
  };

  //store  lastname
  const handleLastNameInput = (e) => {
    setLastName(e.target.value);
  };
  //store code
  const handleVerificationCodeInput = (e) => {
    setVerificationCode(e.target.value);
  };

  //validation
  const handleActivateClick = async (e) => {
    e.preventDefault();

    if (
      !userEmail ||
      !userName ||
      !verificationCode ||
      !userPassword ||
      !repeatPassword ||
      !firstName ||
      !lastName
    ) {
      setError("Every field is required.");

    } else {
      let emessage = "";

      //registration request to API
      await callAPI
        .patch(
          "registration/validate/",
          JSON.stringify({
            email: userEmail,
            username: userName,
            code: verificationCode,
            password: userPassword,
            password_repeat: repeatPassword,
            first_name: firstName,
            last_name: lastName,
          })
        )
        .catch((error) => (emessage = error.message));


      if (!emessage) {

        navigate("/signin");
      } else {
        alert(emessage);
      }
    }
  };
  return (
    <div className="flex flex-col h-screen w-1/2 bg-bgLogin">
      <div className="flex flex-col items-center mt-12 h-90 w-full">
        {error && <div className="text-red-500 text-sm mb-10">{error}</div>}
        <h2 className="text-2xl font-normal pb-4">Verification</h2>
        <div className="flex flex-col items-center w-60">
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleVerificationCodeInput}
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
          />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameInput}
              className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameInput}
              className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
            />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={handleUserNameInput}
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
          />
          <input
            type="email"
            placeholder="Email"
            value={userEmail}
            onChange={handleEmailInput}
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
          />
          <input
            type="password"
            placeholder="Password"
            value={userPassword}
            onChange={handlePasswordInput}
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
          />
          <input
            type="password"
            placeholder="Repeat Password"
            value={repeatPassword}
            onChange={handleRepeatPasswordInput}
            className="m-4 w-full leading-8 border-b-2 border-solid border-opacity-10 w-40 text-indent-3rem"
          />
          {!passwordMatch && (
            <div className="text-red-500 text-sm mb-10">Passwords do not match</div>
          )}
          <button
            type="submit"
            onClick={handleActivateClick}
            className="w-full max-w-md px-4 py-3 text-white mt-5 bg-ifOrange rounded hoverbg-orange-500 focusoutline-none"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );

          }
  export default VerificationRight;

