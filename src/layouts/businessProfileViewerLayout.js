/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
import React from "react";
// components
import Header from "../components/header";
import GetBusinessProfile from "../components/getBusinessProfile";
import Footer from "../components/footer";

const BusinessProfileViewerLayout = (props) => {
  return (
    <div>
      <Header />
      <GetBusinessProfile />
      <Footer />
    </div>
  );
};

export default BusinessProfileViewerLayout;
