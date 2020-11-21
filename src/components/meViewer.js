import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    user {
      uuid
      fullname
      email
      username
      password
      role
      photo
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

/* eslint-disable no-unused-expressions */
const MeViewer = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    <p>Error</p>;
    alert(error);
  }
  return ( 
      <div className="container mt-5 overflow-auto">
        <div className="column">
          <div className="column col-12 mb-3">
            <div className="card flex-xl-row p-1">
              <img className="card-img-top" style={{ borderRadius: "10px", width: "200px", height: "150px" }} src={ data.user.photo } alt="Card image cap" />
              <div className="card-body flex-xl-12">
                <h5 className="card-title">{ data.user.fullname }</h5>
                <h5 className="card-title">{ data.user.username }</h5>
                <p className="card-text">{ data.user.role }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default MeViewer;