import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
//
import Authorization from "../apollo/isAuth";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPen } from "@fortawesome/free-solid-svg-icons";

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
      createdAt
      updatedAt
      deletedAt
      menu
      campaigns
      address_direct
    }
  }
`;

/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
const GetBusinessProfile = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  if (loading) return <p>Loading...</p>;
  if (error) return alert(error);

  const cafeName = localStorage.getItem('cafe');

  const BusinessProfile = () => {
    return data.users.map((user, index) =>
      user.username === cafeName ? (
        <div>
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image">
                {" "}
                <img src={user.photo} className="rounded" width="155" />{" "}
              </div>
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">{user.fullname}</h4>{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem(`${user.username}`, user.username);
                //    history.push(`/${user.username}`);
                  }}
                >
                  <span>{user.username}</span>
                </button>
                <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div className="d-flex flex-column">
                    {" "}
                    <span className="articles">Doluluk Oranı</span>{" "}
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
                          //width: `${percents.percent}px`,
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
                    //onClick={getDiscountCode}
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
    );
  };

  return (
    <div className="container">
      <BusinessProfile />
    </div>
  );
};

export default GetBusinessProfile;
