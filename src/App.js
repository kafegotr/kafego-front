/* eslint-disable import/first */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
// layouts
import Master from "./layouts/master";
import Home from "./layouts/home";
import Login from "./layouts/login";
import Register from "./layouts/register";
import Me from "./layouts/me";
import Business from "./layouts/business";
import BusinessProfile from "./layouts/businessProfile";
import BusinessLogin from "./layouts/businessLogin";
import Authorization from "./apollo/isAuth";

import { useQuery, gql } from "@apollo/client";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";

const TOKEN = gql`
  query {
    token {
      token
      refreshToken
      ok
      userRole
    }
  }
`;

const App = (props) => {
  const { loading, error, data } = useQuery(TOKEN);
  if (loading) return <p>Loading</p>;
  if (error) return alert(error);
  
  const PrivateRoute = ({ component: Component, ...rest }) => {
    let pathDouble = "/giris-yap" || "/kaydol";
    return (
      <Route
        {...rest}
        render={(props) =>
          data.token.refreshToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: pathDouble,
              }}
            />
          )
        }
      />
    );
  };

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route
            exact
            path="/kaydol"
            render={(props) =>
              !data.token.refreshToken ? (
                <Register />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/giris-yap"
            render={(props) =>
              !data.token.refreshToken ? (
                <Login />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )
            }
          />
          <Route
            exact
            path="/profilim"
            render={(props) =>
              data.token.userRole === 'private' ? (
                <Me />
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              )
            }
          />
          <Route exact path="/mekan" component={Business} />
          <Route exact path="/mekan/mekan-giris-yap" component={BusinessLogin} />
          <PrivateRoute path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
