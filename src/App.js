/* eslint-disable import/first */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-expressions */
import React from "react";
import { createBrowserHistory } from "history";
// layouts
import Master from "./layouts/master";
import Home from "./layouts/home";
import Login from "./layouts/login";
import Register from "./layouts/register";
import Me from "./layouts/me";
import Business from "./layouts/business";
import BusinessProfile from "./layouts/businessProfile";
import GetBusinessProfile from "./components/getBusinessProfile";
import BusinessLogin from "./layouts/businessLogin";
import NotFound from "./layouts/notFound";
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

  const routeControl = () => {
    if (data.token.refreshToken && data.token.userRole === "private") {
      return <Home />;
      // return  <Route exact path="/" component={Home} />
    } else if (data.token.userRole === "business") {
      return <BusinessProfile to={{ pathname: "/mekan/profilim" }} />;
      //return  <Route exact path="/mekan/profilim" component={BusinessProfile} />
    } else {
      return <Login />;
      // return  <Route exact path="/giris-yap" component={Login} />
    }
  };
  const cafeName = localStorage.getItem("cafe");
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

  const history = createBrowserHistory();

  return (
    <div className="App">
      <Router history={history}>
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
            path="/mekan/mekan-giris-yap"
            render={(props) =>
              !data.token.refreshToken ? (
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
              data.token.userRole === "private" ? (
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
              data.token.userRole === "business" ? (
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
            path="/:username"
            render={(props) =>
              cafeName ? <GetBusinessProfile /> : <NotFound />
            }
          />
          <Route
            exact
            path="/mekan/mekan-giris-yap"
            component={BusinessLogin}
          />
          <PrivateRoute path="/" exact component={Home} />
          <Route component={NotFound} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
