import React, { useEffect, useState } from "react";
import callAPI from "../../Axios/callAPI";
import { useDispatch, useSelector } from "react-redux";
import CallAPI from "../../Axios/callAPI";

const MerchDetails = () => {
  const dispatch = useDispatch();
  const [merchant, setMerchant] = useState({});
  const [editClicked, setEditClicked] = useState(false);
  const [disableInput, setDisableInput] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleEditButton = async (e) => {
    e.preventDefault();
    if (editClicked) {
      setEditClicked(!editClicked);
      setDisableInput(!disableInput);
      updateMerchant();
      console.log("hello");
    } else {
      setEditClicked(!editClicked);
      setDisableInput(!disableInput);
    }
  };
  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleAddressInput = (e) => {
    setAddress(e.target.value);
  };

  const handleCountryCodeInput = (e) => {
    setCountryCode(e.target.value);
  };

  const handlePhoneInput = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      setProfilePicture(file);
      const formData = new FormData();
      formData.append("profile_picture", event.target.files[0]);
    };
    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const getMerchantByID = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.get(`/merchants/me/`, config);
      setMerchant(response.data);
      setName(response.data.name);
      setAddress(response.data.address);
      setCountryCode(response.data.country_code);
      setPhone(response.data.phone);
      setEmail(response.data.email);
      setProfilePicture(response.data.profile_picture);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMerchantByID();
  }, []);
  const updateMerchant = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }
    try {
      const data = {
        name: name,
        address: address,
        country_code: countryCode,
        phone: phone,
        email: email,
        profile_picture: profilePicture,
      };
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      await callAPI.patch(`/merchants/me/`, data, config);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-full justify-between gap-4">
      <div className="flex items-center justify-between bg-backgroundGrey px-4 h-14">
        <h2 className="text-section">Merchant Details</h2>
        <button
          onClick={handleEditButton}
          className="bg-ifOrange text-white w-20"
        >
          {editClicked ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex w-full">
        <div
          className="w-1/4 mr-10 rounded-3xl"
          style={{
            backgroundImage: `url(${
              profilePicture
                ? URL.createObjectURL(profilePicture)
                : "data:image/png;base64,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"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: profilePicture ? "transparent" : "",
            height: "200px",
            width: "200px",
          }}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
            id="profilePictureInput"
            disabled={disableInput}
          />
          {editClicked ? (
            <label htmlFor="profilePictureInput">
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "black" }}>Upload Profile Picture</p>
              </div>
            </label>
          ) : null}
        </div>

        <div className="flex flex-col w-2/3 gap-4">
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleNameInput}
                disabled={disableInput}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={handleAddressInput}
                disabled={disableInput}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <label htmlFor="countryCode">Country Code</label>
              <input
                type="text"
                id="countryCode"
                name="countryCode"
                value={countryCode}
                onChange={handleCountryCodeInput}
                disabled={disableInput}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={handlePhoneInput}
                disabled={disableInput}
                className="w-full"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailInput}
                disabled={disableInput}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

///////THIS IS TO CHECK IF FORM IS EMPTY FOR THE SIDEBARFAKE!///////////////

/*
export async function isFormEmpty() {
  try {
      const response = await CallAPI.get('/merchants/me/');
      const merchant = response.data;
      if (!merchant.name) {
          return true
      }
  } catch (error) {
    console.log("error in isFormEmpty function");
    return false;
  }
}
*/

//////////////////////////////////////////////////////////////////////////
export default MerchDetails;
