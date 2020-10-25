import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";

const Header = (props) => {
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
                Bize Katılın
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/giris-yap">
                  Giriş Yap
                </a>
                <a className="dropdown-item" href="/kaydol">
                  Kaydol
                </a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-0"
              style={{ paddingRight: "50px" }}
              type="search"
              placeholder="Hangi kafeye bakmıştın ?"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Ara
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
  },
});
*/
export default Header;
