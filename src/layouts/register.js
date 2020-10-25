import React, { useState } from 'react';
// components
import Header from '../components/header';

import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      uuid
      username
    }
  }
`;

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { data }] = useMutation(LOGIN);

        const onSubmit = (e) => {
         login({
          variables: { username, password }
         });
            alert('istek gitti');
        alert(
         login({
          variables: { username, password }
         })
        );
        };

  return (
      <div>
        <Header />
          <form>
          <div className="form-group">
              <input
                  onChange={e => setFullname(e.target.value)}
                  value={ fullname }
                  type="fullname"
                  id="inputFullname"
                  className="form-control"
                  placeholder="Ad Soyad"
              />
          </div>
          <div className="form-group">
              <input
                  onChange={e => setEmail(e.target.value)}
                  value={ email }
                  type="email"
                  id="inputEmail"
                  className="form-control"
                  placeholder="E-Posta"
              />
          </div>
          <div className="form-group">
              <input
                  onChange={e => setUsername(e.target.value)}
                  value={ username }
                  type="username"
                  id="inputUsername"
                  className="form-control"
                  aria-describedby="usernameHelp"
                  placeholder="Kullanıcı adı"
              />
          </div>
          <div className="form-group">
              <input
                  onChange={e => setPassword(e.target.value)}
                  value={ password }
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Şifre"
            />
          </div>
          <button
              type="submit"
              className="btn btn-primary"
              onClick={ onSubmit }
          >Gönder</button>
        </form>
    </div>
  );
}

export default Register;
