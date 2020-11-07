import React, { useState } from 'react';
// components
import Header from '../components/header';

import { gql, useMutation, useQuery } from '@apollo/client';

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
  mutation($fullname: String!, $email: String!, $username: String!, $password: String!) {
    register(fullname: $fullname, email: $email, username: $username, password: $password) {
      fullname
      email
      username
    }
  }
`;

const Register = (props) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
            variables: { fullname, email, username, password }
          });
          if(true) {
            alert('Kayıt başarılı');
          } else if (!true){
            alert('Kayıt başarısız');
          }
          props.history.push("/giris-yap");
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
