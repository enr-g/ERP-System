import React from "react";
import MerchDetails from "../../Components/MerchComp/MerchDetails";


function Merchant() {




  return (
          <div
      className="h-screen w-screen py-6 px-8 justify-center
    bg-backgroundGrey"
    >
      <div
        className="w-full h-full py-6 px-8
        flex flex-col
      bg-white rounded-ifRadius
        overflow-y-auto scrollbar-thin scrollbar-track-transparent
        scrollbar-thumb-drawGrey hover:scrollbar-thumb-buttonGrey"
      >
      <div className="flex flex-col h-screen gap-4">
          <div className="flex justify-start w-2/5">
              <div className="flex items-center justify-between w-full">
                  <h1 className="text-title">
                      Merchant
                  </h1>
              </div>
          </div>
          <div className="flex flex-col w-full gap-4 justify-between">
              <MerchDetails/>
          </div>
      </div>
    </div>
                </div>
);
}

export default Merchant;