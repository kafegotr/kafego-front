import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";
import UserViewer from "../components/userViewer";
import OptionalButton from "../components/optionalButton";

import { useQuery, gql } from "@apollo/client";

const Business = (props) => {
  let history = useHistory();
  return (
    <div>
      <Header />
      <div className="container">
        Mekan
      </div>
    </div>
  );
};

export default Business;
