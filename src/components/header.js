import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { BrowserRouter as Router, useHistory } from "react-router-dom";

const LOGOUT = gql`
  mutation {
    logout
  }
`;

const TOKEN = gql`
  query {
    token {
      token
      refreshToken
      ok
    }
  }
`;

const Header = (props, req) => {
  const [isLogin, setIsLogin] = useState(true);
  const [search, setSearch] = useState('');
  const { loading, error, data } = useQuery(TOKEN);
  const [logout, { loading1, data1 }] = useMutation(LOGOUT);
  const history = useHistory();
  const cookies = new Cookies();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  if (loading1) return <p>Loading1</p>;

  const logoutButton = (e) => {
    e.preventDefault();
    const response = logout({});
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-yellow"
        style={{ backgroundColor: "yellow" }}
      >
        <a className="navbar-brand" href="/">
          <img
            alt=""
            style={{ width: "70%", height: "auto" }}
            src="https://i.imgyukle.com/2020/10/17/5d7acj.png"
            className="img-fluid"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Anasayfa <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {data.token.refreshToken ? "Profilim" : "Bize Katılın"}
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  className="dropdown-item"
                  href={data.token.refreshToken ? "/profilim" : "/giris-yap"}
                >
                  {data.token.refreshToken ? "Profile git" : "Giriş Yap"}
                </a>
                <a
                  className="dropdown-item"
                  onClick={logoutButton}
                  href={data.token.refreshToken ? "/" : "/kaydol"}
                >
                  {data.token.refreshToken ? "Çıkıp Yap" : "Kaydol"}
                </a>
              </div>
            </li>
          </ul>
          <div
            style={{
              borderRadius: "5px",
              height: "2rem",
              width: "15rem",
              background: "white",
              display: data.token.refreshToken ? 'block' : 'none',
            }}
            className=""
          >
            <input
              style={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Hangi kafeye bakmıştın ?"
              aria-label="Search"
            ></input>
            <button
              type="submit"
              style={styles.searchButton}
              onClick={() => {
                  history.push(`/${search}`);
                  window.location.reload();
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
const styles = {
  inputWithButton: {
    borderRadius: "5px",
    height: "2rem",
    width: "15rem",
    background: "white",
  },
  searchButton: {
    background: "white",
    border: "none",
  },
  searchInput: {
    outline: "none",
    border: "none",
    width: "13rem",
    borderRadius: "5px",
    paddingLeft: "10px",
    paddingTop: "2px",
  },
};
export default Header;
