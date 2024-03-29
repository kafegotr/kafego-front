/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";

import jwt, { sign } from "jsonwebtoken";

// Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

//colors
import colors from "../static/colors/colors";

import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    loginBusiness(username: $username, password: $password) {
      uuid
      username
      role
      ok
    }
    }
`;

const FULLNESS_PERCENT_UPDATE = gql`
  mutation($percent: String!) {
    fullnessPercentUpdate(percent: $percent) {
      percent
    }
  }
`;

const BusinessLogin = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textPassword, setTextPassword] = useState("password");
  const [showPasswordState, setShowPasswordState] = useState(faEyeSlash);
  const [loginBusiness, { loading, error, data }] = useMutation(LOGIN);
  const [fullnessPercentUpdate, { loading1, error1, data1 }] = useMutation(FULLNESS_PERCENT_UPDATE);

  if (loading) return <p>Loading</p>;

  let percent =  '10';
  const onSubmit = (e) => {
    e.preventDefault();
    const response = loginBusiness({
      variables: { username, password },
    });
    response
      .then(({}) => {
        window.location.reload();
        history.push("/mekan/profilim");
        fullnessPercentUpdate({variables: { percent },})
      })
      .catch((err) => {
        alert("Lütfen giriş bilgilerinizi kontrol ediniz");
        alert(err);
      });
    setUsername("");
    setPassword("");
  };

  const showPassword = (e) => {
    e.preventDefault();
    textPassword == "password"
      ? setTextPassword("text")
      : setTextPassword("password");
    showPasswordState == faEyeSlash
      ? setShowPasswordState(faEye)
      : setShowPasswordState(faEyeSlash);
  };

  return (
    <div>
      <Header />
      <div className="text-center mt-5">
        <p
          className="text-center"
          style={{ fontWeight: "600", fontSize: "17px" }}
        >
          Mekan Hesabına Giriş Yap
        </p>
        <form className="pt-0">
          <div 
            className="container"
            style={{ width: '26rem' }}
          >
            <div className="form-group text-center!important">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="form-control"
                type="username"
                id="inputUsername"
                aria-describedby="usernameHelp"
                placeholder="Kullanıcı adı"
                required="required"
              />
            </div>
            <div
              className="form-group input-group flex-row"
              id="show_hide_password"
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
                placeholder="Şifre"
                type={textPassword}
                aria-describedby="passwordHelp"
                id="inputPassword"
                required="required"
              />
              <div className="input-group-addon">
                <div className="mt-0 ml-2">
                  <button onClick={showPassword} className="btn btn-light">
                    <a href="">
                      <FontAwesomeIcon icon={showPasswordState} />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="center btn btn-warning mt-3 btn-lg w-30"
              style={{
                backgroundColor: colors.yellow,
                border: "none",
                color: colors.white,
                width: "400px",
              }}
              onClick={onSubmit}
            >
              Gönder
            </button>
            <p className="mt-3">
              Hesabın yoksa <a href="/kaydol">kaydol</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "black",
  },
};

export default BusinessLogin;
