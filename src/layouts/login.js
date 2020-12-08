/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";
import Master from "../layouts/master";
import Footer from "../components/footer";

import jwt, { sign } from "jsonwebtoken";

// Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

//colors
import colors from "../static/colors/colors";

import { gql, useMutation, useQuery } from "@apollo/client";

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

const Login = (props) => {
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textPassword, setTextPassword] = useState("password");
  const [showPasswordState, setShowPasswordState] = useState(faEyeSlash);
  const [login, { loading, error, data }] = useMutation(LOGIN);

  if (loading) return <p>Loading</p>;

  const onSubmit = (e) => {
    e.preventDefault();
    const response = login({
      variables: { username, password },
    });
    response
      .then(({}) => {
          setIsLogin(true);
          isLogin ? window.location.reload() : window.location.reload();
      })
      .catch((err) => {
        alert("Lütfen giriş bilgilerinizi kontrol ediniz");
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
      <Master />
      <div className="text-center mt-5">
        <p
          className="text-center"
          style={{ fontWeight: "600", fontSize: "17px" }}
        >
          Giriş Yap
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
      <div>
        <Footer />
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "black",
  },
};

export default Login;
