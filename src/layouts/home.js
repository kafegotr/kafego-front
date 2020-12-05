import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";
import UserViewer from "../components/userViewer";
import Footer from "../components/footer";
import OptionalButton from "../components/optionalButton";
import AddressViewer from "../components/addressViewer";

import { useQuery, gql } from "@apollo/client";

const TOKEN = gql`
  query {
    token {
      token
      refreshToken
      ok
    }
  }
`;

const Home = (props) => {
  let history = useHistory();
  const { loading, error, data } = useQuery(TOKEN);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div key={data.token.refreshToken}>
      <Header />
      <div className="container" key={data.token.refreshToken}>
        <p className="float-right mt-2 mr-5">Tüm Mekanlar</p>
        <OptionalButton />
      </div >
      <UserViewer />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
