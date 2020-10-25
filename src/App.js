import React from 'react';
// components
import Header from './components/header';
import SubmitButton from './components/submitButton';
// layouts
import Master from './layouts/master';
import Login from './layouts/login';
import Register from './layouts/register';

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
          <Route exact path="/" component={Master} />
          <Route path="/giris-yap" component={Login} />
          <Route path="/kaydol" component={Register} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
