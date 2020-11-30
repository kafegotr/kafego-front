import React from "react";
import { useQuery, gql } from "@apollo/client";
import { addressSelecty } from "../static/addressSelect/addressSelecty";

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

/* eslint-disable no-unused-expressions */
const OptionalButton = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const datas = Object.assign({}, ...data.users);
  // datas.role == 'business' ? alert('true') : alert('false') ;
  let roles = datas.role;

  //data.users.map(user => alert(user.role))
  return (
    <div className="mt-2">
      <div
        className="btn-group"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            İl Seç
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            <a className="dropdown-item" href="#">
              { addressSelecty.map(e => e.name) }
            </a>
          </div>
        </div>
      </div>
      <div
        className="btn-group ml-"
        role="group"
        aria-label="Button group with nested dropdown"
      >
        <div className="btn-group" role="group">
          <button
            id="btnGroupDrop1"
            type="button"
            className="btn btn-secondary ml-2 dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            İlçe Seç
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              { addressSelecty.map(e => 
                <a className="dropdown-item" href="#">
                  {e.counties}
                </a>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionalButton;
