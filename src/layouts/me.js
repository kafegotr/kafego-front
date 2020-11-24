import React, { useState } from 'react';
// components
import Header from '../components/header';
import MeViewer from '../components/meViewer';
import UserViewer from '../components/userViewer';
import OptionalButton from '../components/optionalButton';
import { setContext } from '@apollo/client/link/context';

const Home = (props, req) => {

  return (
    <div>
      <Header />
      <MeViewer />
    </div>
  );
}

export default Home;
