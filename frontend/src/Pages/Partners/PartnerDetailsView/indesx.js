import React, { useState, useEffect } from "react";
import PartnerDetails from "../../../Components/PartnerComp/PartnerDetails";
import arrow_left_image from "../../../Assets/Icons/arrow_left_orange.svg";
import {useNavigate, useParams} from "react-router-dom";
import callAPI from "../../../Axios/callAPI";
function PartnerDetailsView() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [partner, setPartner] = useState({});
  const { partnerID } = useParams();
  const handleClickGoBack = (e) => {
    e.preventDefault();
    navigate(`/partners`);
  };


const getPartnerName = async () => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    const response = await callAPI.get(`/partners/${partnerID}/`, config);
    setName(response.data.name);
    setPartner(response.data); // set the partner state
  } catch (error) {
    console.log(error);
  }
};


  useEffect(() => {
    getPartnerName();
  }, []);

  return (
    <div className="h-screen w-screen py-6 px-8 justify-center bg-backgroundGrey">
      <div className="w-full h-full py-6 px-8 flex flex-col bg-white rounded-ifRadius overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey">
        <div className="flex flex-col h-screengap-4">
          <div className="flex justify-start">
            <div className="flex items-center w-full mb-4">
              <img
                className="cursor-pointer mx-4"
                src={arrow_left_image}
                alt={"go back"}
                onClick={handleClickGoBack}
              />
              <h1 className="text-title">{partner.name}</h1>
            </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
            <PartnerDetails />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerDetailsView;
