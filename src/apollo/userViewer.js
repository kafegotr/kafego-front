import React from 'react';
import { useQuery, gql } from '@apollo/client';

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
    }
  }
`;

const UserViewer = function User() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ uuid, fullname, email, username, password }) => (
    <div key={username}>
      <p>
        {uuid}: {username}
        {email}: {password}
      </p>
    </div>
  ));
}

export default UserViewer;
