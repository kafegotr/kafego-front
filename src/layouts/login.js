import React, { useState } from 'react';
// components
import Header from '../components/header';
import Master from '../layouts/master';

import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      uuid
      username
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);

        const onSubmit = (e) => {
         login({
          variables: { username, password }
         });
        };

  return (
      <div>
        <Master />
        <div className="container mt-5">
          <form>
           <div>
              <div className="form-group">
                  <input
                      onChange={e => setUsername(e.target.value)}
                      value={ username }
                      className="form-control col-md-3"
                      type="username"
                      id="inputUsername"
                      aria-describedby="usernameHelp"
                      placeholder="Kullanıcı adı"
                  />
              </div>
              <div className="form-group">
                  <input
                      onChange={e => setPassword(e.target.value)}
                      value={ password }
                      type="password"
                      className="form-control col-md-3"
                      id="inputPassword"
                      placeholder="Şifre"
                />
              </div>
              <div className="text-center">
                  <button
                      type="submit"
                      className="center btn btn-warning"
                      style={{ color: 'white', width: '10rem' }}
                      onClick={ onSubmit }
                  >Gönder</button>
              </div>
          </div>
        </form>
     </div>
    </div>
  );
}

const styles = {
    container: {
        backgroundColor: 'black',
    }
}

export default Login;
