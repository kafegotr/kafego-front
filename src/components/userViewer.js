import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query {
    users {
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
const UserViewer = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const datas = Object.assign({}, ...data.users);
  // datas.role == 'business' ? alert('true') : alert('false') ;
  let roles = datas.role;

  //data.users.map(user => alert(user.role))
  return data.users.map((user, index) =>
    user.role === "business" ? (
      <div className="container mt-5 overflow-auto">
        <div className="column">
          <div className="column col-12 mb-3">
            <div className="card flex-xl-row p-1">
              <img className="card-img-top" style={{ borderRadius: "10px", width: "200px", height: "150px" }} src={ user.photo } alt="Card image cap" />
              <div className="card-body flex-xl-12">
                <h5 className="card-title">{ user.fullname }</h5>
                <h5 className="card-title">{ user.username }</h5>
                <p className="card-text">{ user.role }</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    )
  );
};

export default UserViewer;
