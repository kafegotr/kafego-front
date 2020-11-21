import React, { useState } from 'react';
// components
import Header from '../components/header';
import MeViewer from '../components/meViewer';
import UserViewer from '../components/userViewer';
import OptionalButton from '../components/optionalButton';

const Home = (props) => {

  return (
    <div>
      <Header />
      <div className="container">
      </div>
      <MeViewer />
    </div>
  );
}

export default Home;
