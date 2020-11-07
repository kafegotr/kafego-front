import React, { useState } from 'react';
// components
import Header from '../components/header';
import UserViewer from '../apollo/userViewer';

const Master = (props) => {

  return (
      <div>
        <Header />
        <UserViewer />
    </div>
  );
}

export default Master;
