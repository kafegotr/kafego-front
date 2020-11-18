import React, { useState } from "react";
// components
import Header from "../components/header";

import { gql, useMutation, useQuery } from "@apollo/client";
// Font Awasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [textPassword, setTextPassword] = useState("password");
  const { loading, error, datas } = useQuery(GET_USERS);
  const [register, { data }] = useMutation(REGISTER);

  const onSubmit = (e) => {
    e.preventDefault();
    /*
          datas.users.map(({ username }) => {
            alert(username);
          });
          */
    register({
      variables: { fullname, email, username, password },
    });
    if (true) {
      alert("Kayıt başarılı");
    } else if (!true) {
      alert("Kayıt başarısız");
    }
    props.history.push("/giris-yap");
  };

  const showPassword = (e) => {
    e.preventDefault();
    textPassword == "password"
      ? setTextPassword("text")
      : setTextPassword("password");
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
        <form className="pt-0"></form>
        <form>
          <div className="container mr-4">
            <div className="form-group text-center!important">
              <input
                onChange={(e) => setFullname(e.target.value)}
                value={fullname}
                type="fullname"
                id="inputFullname"
                className="form-control col-md-4"
                placeholder="Ad Soyad"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="inputEmail"
                className="form-control col-md-4"
                placeholder="E-Posta"
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="username"
                id="inputUsername"
                className="form-control col-md-4"
                aria-describedby="usernameHelp"
                placeholder="Kullanıcı adı"
              />
            </div>
            <div
              className="form-group input-group flex-row"
              id="show_hide_password"
            >
              <input
                className="form-control col-md-4"
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
