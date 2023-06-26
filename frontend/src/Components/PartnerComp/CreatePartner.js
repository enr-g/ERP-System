import React, { useState } from "react";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";
import { useNavigate, useParams } from "react-router-dom";
import callAPI from "../../Axios/callAPI";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import { useDispatch } from "react-redux";

const CreatePartner = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [partner, setPartner] = useState({});
  const [disableInput, setDisableInput] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSupplier, setIsSupplier] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const [creationDate, setCreationDate] = useState("");
  const { partnerID } = useParams();

  const handleSubmitButton = (e) => {
    e.preventDefault();
    createPartner();
    navigate(`/partners/`);
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

  const handleContactInput = (e) => {
    setContact(e.target.value);
  };

  const handlePhoneInput = (e) => {
    setPhone(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const handleIsSupplierInput = (e) => {
    setIsSupplier(e.target.checked);
  };

  const handleIsCustomerInput = (e) => {
    setIsCustomer(e.target.checked);
  };

  const createPartner = async () => {
    if (!localStorage.getItem("token")) {
      return;
    }

    const currentDate = new Date();

    try {
      const data = {
        name: name,
        address: address,
        country_code: countryCode,
        contact: contact,
        phone: phone,
        email: email,
        is_supplier: isSupplier,
        is_customer: isCustomer,
        creation_date: currentDate.toISOString(),
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      const response = await callAPI.post(`/partners/new/`, data, config);
      navigate(`/partners`);
    } catch (error) {
      const keys = Object.keys(error.response.data);
      const values = Object.values(error.response.data);
      let message = "";
      values?.forEach((errorMessage, index) => {
        message += `${errorMessage} ${keys[index]} \n`;
      });
      alert(message);
    }
  };

  return (
    <div className="flex flex-col w-full justify-between gap-4">
      <div className="flex items-center justify-between bg-backgroundGrey px-4 h-14">
        <h2 className="text-section">New Partner </h2>
        <button
          className="bg-ifOrange w-24 text-white"
          type={"submit"}
          onClick={handleSubmitButton}
        >
          Submit
        </button>
      </div>
      <div className="flex w-full justify-around gap-4">
        <div className="flex w-1/2 flex-col gap-1">
          <ItemDetailsInput
            handleInput={handleNameInput}
            description={"Name"}
            value={name}
          />
          <ItemDetailsInput
            handleInput={handleAddressInput}
            description={"Address"}
            value={address}
          />
          <ItemDetailsInput
            handleInput={handleCountryCodeInput}
            description={"Country Code"}
            value={countryCode}
          />
          <ItemDetailsInput
            type="checkbox"
            handleInput={handleIsSupplierInput}
            description={"Is Supplier: "}
            value={isSupplier}
            checked={isSupplier}
          />
        </div>
        <div className="flex w-1/2 flex-col gap-1">
          <ItemDetailsInput
            handleInput={handlePhoneInput}
            description={"Phone: "}
            value={phone}
          />
          <ItemDetailsInput
            handleInput={handleEmailInput}
            description={"Email: "}
            value={email}
          />
          <ItemDetailsInput
            value={contact}
            type="text"
            handleInput={handleContactInput}
            description={"Contact: "}
          />
          <ItemDetailsInput
            type="checkbox"
            handleInput={handleIsCustomerInput}
            description={"Is Customer: "}
            value={isCustomer}
            checked={isCustomer}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePartner;
