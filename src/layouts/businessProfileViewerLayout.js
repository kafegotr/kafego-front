/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
import React from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";
import GetBusinessProfile from "../components/getBusinessProfile";
import Footer from "../components/footer";

const BusinessProfileViewerLayout = (props) => {
  let history = useHistory();
  
  return (
    <div>
      <Header />
      <GetBusinessProfile />
      <Footer />
    </div>
  );
};

export default BusinessProfileViewerLayout;
