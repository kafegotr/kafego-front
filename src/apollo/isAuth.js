import React from 'react';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';
import { useQuery, gql } from "@apollo/client";

export const TOKEN = gql`
  query {
    token {
        token: String
        refreshToken: String
    }
  }
`;
const Authorization = () => {
  const { loading, error, data } = useQuery(TOKEN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  let token = data.token.refreshToken;

    return token;

};

export default Authorization;
