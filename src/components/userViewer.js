import React, { useState, useEffect } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

// discount code
import discountCode from "../static/discount.json";

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
      campaigns
      createdAt
      updatedAt
      deletedAt
      address_direct
    }
  }
`;

const GET_USER = gql`
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

const GET_ALL_ADDRESS = gql`
  query {
    allAddresses {
      id
      city
      county
      users_uuid
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const GET_ADDRESS = gql`
  query {
    addresses {
      id
      city
      county
      users_uuid
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const ALL_FULLNESS_PERCENT = gql`
  query {
    all_fullness_percent {
      percent
      users_uuid
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

const ADDRESS_REGISTER = gql`
  mutation($city: String, $county: String) {
    addressRegister(city: $city, county: $county) {
      city
      county
    }
  }
`;

/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-restricted-globals */
const UserViewer = () => {
  const [linkState, setLinkState] = useState(false);
  const history = useHistory();
  const queryMultiple = () => {
    const res1 = useQuery(GET_USERS);
    const res2 = useQuery(GET_USER);
    const res3 = useQuery(GET_ALL_ADDRESS);
    const res4 = useQuery(GET_ADDRESS);
    const res5 = useQuery(ALL_FULLNESS_PERCENT);
    const res6 = useQuery(TOKEN);
    return [res1, res2, res3, res4, res5, res6];
  };
  const [addressRegister, { loading10, error10, data10 }] = useMutation(
    ADDRESS_REGISTER
  );

  const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 },
    { loading: loading3, error: error3, data: data3 },
    { loading: loading4, error: error4, data: data4 },
    { loading: loading5, error: error5, data: data5 },
    { loading: loading6, error: error6, data: data6 },
  ] = queryMultiple();

  if (loading1) return <p>Loading...</p>;
  if (error1) return alert(error1);

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>error</p>;

  if (loading3) return <p>Loading...</p>;
  if (error3) return <p>error</p>;

  if (loading4) return <p>Loading...</p>;
  if (error4) return <p>error</p>;

  if (loading5) return <p>Loading...</p>;
  if (error5) return <p>error</p>;

  if (loading6) return <p>Loading...</p>;
  if (error6) return <p>error</p>;

  const addressRegisterFunc = () => {
    let county = "Beşiktaş";
    let city = "İstanbul";
    if (data4.addresses === null) {
      addressRegister({ variables: { city, county } });
      return window.location.reload();
    }
  };
  addressRegisterFunc();

  const getDiscountCode = () => {
    let discountCodeRead = discountCode.discount.code;
    localStorage.setItem("discount", discountCodeRead);
    alert("İndirim kodu bildirimlere gönderildi.");
  };

  const CampaingsComponent = () => {
    return data3.allAddresses.map((address, ind) =>
      (address.county === data4.addresses.county) === true ? (
        data1.users.map((user, index) =>
          user.uuid === address.users_uuid && user.role === "business" ? (
            user.campaigns !== null ? (
              <div className="container mt-5 d-flex">
                <div className="card p-3">
                  <div className="d-flex align-items-center">
                    <div className="image">
                      <img src={user.photo} className="rounded" width="155" />{" "}
                    </div>
                    <div className="ml-3 w-100">
                      <h4 className="mb-0 mt-0">{user.fullname}</h4>{" "}
                      <span>{user.username}</span>
                      <div className="button mt-2 d-flex flex-row align-items-center">
                        <a>{user.campaigns}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )
          ) : (
            <div></div>
          )
        )
      ) : (
        <div></div>
      )
    );
  };

  const AllAddress = () => {
    return data3.allAddresses.map((address, ind) =>
      (address.county === data4.addresses.county) === true ? (
        data5.all_fullness_percent.map((percents, indexes) =>
          percents.users_uuid === address.users_uuid
            ? data1.users.map((user, index) =>
                user.uuid === address.users_uuid && user.role === "business" ? (
                  <div className="container mt-5 d-flex">
                    <div className="card p-3">
                      <div className="d-flex align-items-center">
                        <div className="image">
                          {" "}
                          <img
                            src={user.photo}
                            className="rounded"
                            width="155"
                          />{" "}
                        </div>
                        <div className="ml-3 w-100">
                          <h4 className="mb-0 mt-0">{user.fullname}</h4>{" "}
                          <button
                            style={{
                              borderRadius: '5px'
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(`/${user.username}`);
                              window.location.reload();
                            }}
                          >
                            <span>{user.username}</span>
                          </button>
                          <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                            <div className="d-flex flex-column">
                              {" "}
                              <span className="articles">
                                Doluluk Oranı
                              </span>{" "}
                              <div
                                style={{
                                  width: "100px",
                                  height: "1rem",
                                  background: "black",
                                  borderRadius: "5px",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${percents.percent}px`,
                                    height: "1rem",
                                    background: "red",
                                    borderRadius: "5px",
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="button mt-2 d-flex flex-row align-items-center">
                            <a href={user.address_direct}>Yol tarifi al</a>
                          </div>
                          <div className="button mt-2 d-flex flex-row align-items-center">
                            {" "}
                            <button
                              className="btn btn-sm btn-outline-dark w-100"
                              onClick={getDiscountCode}
                            >
                              İndirim Kodu Al
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )
              )
            : ""
        )
      ) : (
        <div></div>
      )
    );
  };

  return (
    <div
      className="container"
      style={{
        marginBottom: "20rem",
        height: "1000px",
      }}
    >
      <div className="overflow-auto float-left">
        <p className="float-right mt-2 mr-5">Tüm Mekanlar</p>
        <AllAddress />
      </div>
      <div className="float-right">
        <p className="float-right mt-2 mr-5">Öne Çıkanlar</p>
        <CampaingsComponent />
      </div>
    </div>
  );
};

export default UserViewer;
