/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
import React from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";
import UserViewer from "../components/userViewer";
import Footer from "../components/footer";
import Button from "../components/button";
import AddressViewer from "../components/addressViewer";

const Home = (props) => {
  let history = useHistory();
  
  return (
    <div>
      <Header />
      <UserViewer />
      <Footer />
    </div>
  );
};

export default Home;
