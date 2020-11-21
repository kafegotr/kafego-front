import React from 'react';
// components
import Header from './components/header';
import SubmitButton from './components/submitButton';
// layouts
import Master from './layouts/master';
import Home from './layouts/home';
import Login from './layouts/login';
import Register from './layouts/register';
import Me from './layouts/me';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";

const App = (props) => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/giris-yap" component={Login} />
          <Route path="/kaydol" component={Register} />
          <Route path="/me" component={Me} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
