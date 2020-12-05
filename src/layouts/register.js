import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// components
import Header from "../components/header";

import { gql, useMutation, useQuery } from "@apollo/client";
// Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

//colors
import colors from "../static/colors/colors";

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
    }
  }
`;

const REGISTER = gql`
  mutation(
    $fullname: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      fullname: $fullname
      email: $email
      username: $username
      password: $password
    ) {
      fullname
      email
      username
    }
  }
`;

const Register = (props) => {
  const history = useHistory();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textPassword, setTextPassword] = useState("password");
  const [showPasswordState, setShowPasswordState] = useState(faEyeSlash);
  const { loading, error, datas } = useQuery(GET_USERS);
  const [register, { data }] = useMutation(REGISTER);

  const onSubmit = (e) => {
    e.preventDefault();
    /*
          datas.users.map(({ username }) => {
            alert(username);
          });
          */
    const registerQuery = register({
      variables: { fullname, email, username, password },
    });
    registerQuery
      .then(({}) => {
        alert('Kayıt tamamlandı.');
        history.push('/giris-yap');
      })
      .catch((err) => {
        alert(err);
      });
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
          Kaydol
        </p>
        <form className="pt-0">
          <div 
            className="container"
            style={{ width: '26rem' }}
          >
            <div className="form-group text-center!important">
              <input
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type="fullname"
                id="inputFullname"
                className="form-control"
                placeholder="Ad Soyad"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="E-Posta"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="username"
                id="inputUsername"
                className="form-control"
                aria-describedby="usernameHelp"
                placeholder="Kullanıcı adı"
              />
            </div>
            <div
              className="form-group input-group flex-row"
              id="show_hide_password"
            >
              <input
                className="form-control"
                placeholder="Şifre"
                type={textPassword}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="inputPassword"
                placeholder="Şifre"
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
                color: colors.white,
                width: "400px",
                backgroundColor: colors.yellow,
                border: "none",
              }}
              onClick={onSubmit}
            >
              Gönder
            </button>
            <p className="mt-3">
              Hesabın varsa <a href="/giris-yap">giriş yap</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
