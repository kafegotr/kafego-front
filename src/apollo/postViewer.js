import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_USERS = gql`
  query Users {
    users {
        uuid: ID!
        fullname: String!
        email: String!
        username: String!
        password: String!
        role: String!
        photo: String!
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }
  }
`;

const PostViewer = () => (
  <Query query={GET_USERS}>
    {({ loading, data }) => !loading && (
      <Table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map(users => (
            <tr key={users.uuid}>
              <td>{users.username}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </Query>
);

export default PostViewer;
