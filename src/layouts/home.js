import React, { useState } from 'react';
// components
import Header from '../components/header';
import UserViewer from '../components/userViewer';
import OptionalButton from '../components/optionalButton';

const Home = (props) => {

  return (
    <div>
      <Header />
      <div className="container">
        <p className="float-right mt-2 mr-5">Tüm Mekanlar</p>
        <OptionalButton />
      </div>
      <UserViewer />
    </div>
  );
}

export default Home;
