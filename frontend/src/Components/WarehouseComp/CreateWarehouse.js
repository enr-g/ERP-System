import React, {useState} from "react";
import arrow_left_image from "../../Assets/Icons/arrow_left_orange.svg";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../Axios/callAPI";
import ItemDetailsInput from "../../Pages/Items/Item/PrimaryDetails/ItemDetailsInput";
import { useDispatch } from "react-redux";

const CreateWarehouse = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [warehouse, setWarehouse] = useState({});
  const [disableInput, setDisableInput] = useState(true);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isStandard, setIsStandard] = useState(false);
  const [status, setStatus] = useState("Active");
  const [creationDate, setCreationDate] = useState("");
  const { warehouseID } = useParams();


  const handleSubmitButton = (e) => {
    e.preventDefault()
    createWarehouse()
    navigate(`/warehouses/`)
    }
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

  const handleIsStandardInput = (e) => {
    setIsStandard(e.target.checked);
  };

  const handleStatusInput = (e) => {
    setStatus(e.target.value);
  };



 const createWarehouse = async () => {
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
      is_standard: isStandard,
      status: status,
      creation_date: currentDate.toISOString(),
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const response = await callAPI.post(`/warehouses/new/`, data, config);
    navigate(`/warehouses`)
  } catch (error) {
    const keys = Object.keys(error.response.data)
    const values = Object.values(error.response.data)
    let message = ""
    values?.forEach((errorMessage, index)=>{
      message += `${errorMessage} ${keys[index]} \n`
    })
    alert(message)
  }
}



return (
  <div className="flex flex-col w-full justify-between gap-4">
    <div className="flex items-center justify-between bg-backgroundGrey px-4 h-14">
      <h2 className="text-section">New Warehouse </h2>
      <button className="bg-ifOrange w-24 text-white" type={"submit"} onClick={handleSubmitButton}>
        Submit
      </button>
    </div>
    <div className="flex w-full justify-around gap-4">
      <div className="flex w-1/2 flex-col gap-1 content-start">
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

          handleInput={handleIsStandardInput}
          description={"Is Standard: "}
          value={isStandard}
          checked={isStandard}
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
          value={status}

          handleInput={handleStatusInput}
          description={"Status: "}
          choicesEnabeled={true}
          choices={["Active", "No restock"]}
        />
        <ItemDetailsInput
          value={contact}
          type="text"
          handleInput={handleContactInput}
          description={"Contact: "}
        />
      </div>
    </div>
  </div>
);

}

export default CreateWarehouse;
