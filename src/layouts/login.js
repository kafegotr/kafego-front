import React, { useState } from "react";
// components
import Header from "../components/header";
import Master from "../layouts/master";

import jwt, { sign } from 'jsonwebtoken';

// Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

//colors
import colors from "../static/colors/colors";

import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      uuid
      username
      role
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textPassword, setTextPassword] = useState("password");
  const [login, { data }] = useMutation(LOGIN);

  const onSubmit = (e) => {
    e.preventDefault();
      const response = login({
        variables: { username, password },
      });
      setUsername("");
      setPassword("");
      props.history.push("/me");
  };


  const showPassword = (e) => {
    e.preventDefault();
    textPassword == "password"
      ? setTextPassword("text")
      : setTextPassword("password");
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
          <div className="container mr-4">
            <div className="form-group text-center!important">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                className="form-control col-md-4"
                type="username"
                id="inputUsername"
                aria-describedby="usernameHelp"
                placeholder="Kullanıcı adı"
              />
            </div>
            <div
              className="form-group input-group flex-row"
              id="show_hide_password"
            >
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control col-md-4"
                placeholder="Şifre"
                type={textPassword}
                aria-describedby="passwordHelp"
                id="inputPassword"
              />
              <div className="input-group-addon">
                <div className="mt-0 ml-2">
                  <button onClick={showPassword} className="btn btn-light">
                    <a href="">
                      <FontAwesomeIcon icon={faEyeSlash} />
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

export default Login;
