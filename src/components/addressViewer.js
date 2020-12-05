import React from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ADDRESS = gql`
  query {
    city_county {
      id
      city
      county
      plate
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

/* eslint-disable no-unused-expressions */
const AddressViewer = () => {
  const { loading, error, data } = useQuery(GET_ADDRESS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return data.city_county.map((address, index) =>
      <div className="container mt-5 overflow-auto" key={ address.id }>
        <div className="column">
          <div className="column col-12 mb-3">
            <div className="card flex-xl-row p-1">
              <div className="card-body flex-xl-12" key={ address.city }>
                <h5 className="card-title">{ address.county }</h5>
                <h5 className="card-title">{ address.plate }</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default AddressViewer;
