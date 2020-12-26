/* eslint-disable import/first */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
import React from "react";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";
// layouts
import Home from "./layouts/home";
import Login from "./layouts/login";
import Register from "./layouts/register";
import Me from "./layouts/me";
import Business from "./layouts/business";
import BusinessProfile from "./layouts/businessProfile";
import BusinessLogin from "./layouts/businessLogin";
import NotFound from "./layouts/notFound";
import BusinessProfileViewerLayout from "./layouts/businessProfileViewerLayout";
import GetBusinessProfile from "./components/getBusinessProfile";
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
import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";

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
      address_direct
    }
  }
`;

const App = (props) => {
  const history = useHistory();
  const match = useRouteMatch("/:username");
  const queryMultiple = () => {
    const res1 = useQuery(GET_USERS);
    const res2 = useQuery(TOKEN);
    return [res1, res2];
  };

  const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 },
  ] = queryMultiple();

  if (loading1) return <p>Loading</p>;
  if (error1) return <p>Error</p>;

  if (loading2) return <p>Loading</p>;
  if (error2) return <p>Error</p>;

  let urlInputControl;
  const urlInputControltFunc = () => {
    if (match === null) {
      return null;
    } else {
      urlInputControl = match.params.username;
      console.log(urlInputControl);
    }
  };
  urlInputControltFunc();

  const getProfileControl = (props) => {
    data1.users.map((user, index) => {
      if (user.username === urlInputControl && user.role === "business") {
        localStorage.setItem("cafe", user.username);
          // history.push(`/${user.username}`)
      } else {
        return null;
      }
    });
  };
  getProfileControl();

  let getLocal = localStorage.getItem("cafe");

  const routeControl = () => {
    if (data2.token.refreshToken && data2.token.userRole === "private") {
      return <Home />;
      // return  <Route exact path="/" component={Home} />
    } else if (data2.token.userRole === "business") {
      return <BusinessProfile to={{ pathname: "/mekan/profilim" }} />;
      //return  <Route exact path="/mekan/profilim" component={BusinessProfile} />
    } else {
      return <Login />;
      // return  <Route exact path="/giris-yap" component={Login} />
    }
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    let pathDouble = "/giris-yap" || "/kaydol";
    return (
      <Route
        {...rest}
        render={(props) =>
          /*
          data.token.refreshToken ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: pathDouble,
              }}
            />
          )
          */
          routeControl()
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
              !data2.token.refreshToken ? (
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
            path="/mekan/mekan-giris-yap"
            render={(props) =>
              !data2.token.refreshToken ? (
                <BusinessLogin />
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
              !data2.token.refreshToken ? (
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
              data2.token.userRole === "private" ? (
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
          <Route
            exact
            path="/mekan/profilim"
            render={(props) =>
              data2.token.userRole === "business" ? (
                <BusinessProfile />
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
            path="/mekan/mekan-giris-yap"
            component={BusinessLogin}
          />
          <Route
            exact
            path="/:username"
            render={(props) =>
              getLocal === urlInputControl && data2.token.refreshToken ? (
                <BusinessProfileViewerLayout />
              ) : (
                <NotFound />
              )
            }
          />
          <PrivateRoute path="/" exact component={Home} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
