import React, { useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
//
import Authorization from "../apollo/isAuth";
import Button from "./button";

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

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      uuid
      username
      role
      ok
    }
  }
`;

/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
const MeViewer = () => {
  const [login, { loading, error, data }] = useMutation(LOGIN);
  const queryMultiple = () => {
    const res1 = useQuery(GET_USERS);
    const res2 = useQuery(TOKEN);
    return [res1, res2];
  };

  const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 },
  ] = queryMultiple();

  useEffect(() => {});

  if (loading1) return <p>Loading...</p>;
  if (error1) return alert(error1);

  if (loading2) return <p>Loading...</p>;
  if (error2) {
    // alert(error2);
    <p>error</p>;
  }
  // localStorage.setItem('asdsad', 'asdsadas');

  const removeDiscountCode = (e) => {
    e.preventDefault();
    localStorage.removeItem('discount');
  };

  return (
    <div className="container">
      <p
        className="text-center mt-4"
        style={{ fontWeight: "600", fontSize: "17px" }}
      >
        Profilim
      </p>
      <div className="container">
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image">
                {" "}
                <img
                  src={data1.user.photo}
                  className="rounded"
                  width="155"
                />{" "}
              </div>
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">{data1.user.fullname}</h4>{" "}
                <span>{data1.user.username}</span>
                <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div className="d-flex flex-column">
                    {" "}
                    <span className="articles"></span>{" "}
                    <span className="number1"></span>{" "}
                  </div>
                </div>
                <div className="button mt-2 d-flex flex-row align-items-center">
                </div>
                <div className="button mt-2 d-flex flex-row align-items-center">
                  {" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <Button />
          <div
            className="container"
            style={{
              background: 'gray',
              width: '500px',
              height: '100px'
            }}
          >
            <div>
              <p className="float-left">{ localStorage.getItem('discount') }</p>
              <button onClick={ removeDiscountCode } className="float-right">Sil</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeViewer;
