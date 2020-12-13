import React, { useState } from 'react';
// components
import Header from '../components/header';
import MeViewer from '../components/meViewer';
import UserViewer from '../components/userViewer';
import Footer from "../components/footer";
import { setContext } from '@apollo/client/link/context';

const Me = (props, req) => {

  return (
    <div>
      <Header />
      <MeViewer />
      <Footer />
    </div>
  );
}

export default Me;
