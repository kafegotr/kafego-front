import React, { useEffect } from "react";
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

const TOKEN = gql`
  query {
    token {
      refreshToken
      ok
    }
  }
`;

/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
const MeViewer = () => {
const queryMultiple = () => {
  const res1 = useQuery(GET_USERS);
  const res2 = useQuery(TOKEN);
  return [res1, res2];
}

const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 }
] = queryMultiple();

  useEffect(() => {
  });

  if (loading1) return <p>Loading...</p>;
  if (error1) return alert(error1);

  if (loading2) return <p>Loading...</p>;
  if (error2) {
    // alert(error2);
    <p>error</p>;
  } 
 // localStorage.setItem('asdsad', 'asdsadas');

  return ( 
      <div className="container mt-5 overflow-auto">
        <div className="column">
          <div className="column col-12 mb-3">
            <div className="card flex-xl-row p-1">
              <img className="card-img-top" style={{ borderRadius: "10px", width: "200px", height: "150px" }} src={ data1.user.photo } alt="Card image cap" />
              <div className="card-body flex-xl-12">
                <h5 className="card-title">{ data1.user.fullname }</h5>
                <h5 className="card-title">{ data1.user.username }</h5>
                <p className="card-text">{ data1.user.role }</p>
                <div>
                  { data2.token.refreshToken }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default MeViewer;
