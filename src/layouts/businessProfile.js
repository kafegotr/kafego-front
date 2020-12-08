import React, { useState } from "react";
// components
import HeaderBusiness from "../components/headerBusiness";
import BusinessProfileViewer from "../components/businessProfileViewer";
import "../App.css";

const BusinessProfile = (props, req) => {
  return (
    <div>
      <HeaderBusiness />
      <BusinessProfileViewer />
    </div>
  );
};

export default BusinessProfile;
