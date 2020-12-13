import React, { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const ADDRESS_REGISTER = gql`
  mutation($city: String, $county: String) {
    addressRegister(city: $city, county: $county) {
      city
      county
    }
  }
`;
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
const Button = (props) => {
  var countries = Object();

  countries["İstanbul"] = "Beşiktaş|Taksim|Kadıköy|Kartal";
  countries["İzmir"] = "Çeşme|Urla|Bornova|Alsancak";
  countries["Kocaeli"] = "Gebze|İzmit|Gölcük|Derince";
  countries["Balıkesir"] = "Ayvalık|Akçay|Merkez";
  countries["Antalya"] = "Kaş|Angola|Benin|Zimbabwe";
  countries["Ankara"] = "Kızılay|Akyurt|Çankaya";
  countries["Bursa"] = "Mudurnu|Gemlik";

  const [addressRegister, { loading, error, data }] = useMutation(
    ADDRESS_REGISTER
  );
  const history = useHistory();

  useEffect(() => {
    let html = "";
    for (let region in countries) {
      html = '<option value="' + region + '">' + region + "</option>";
      document.getElementById("region").innerHTML =
        document.getElementById("region").innerHTML + html;
    }
  });

  let countryArr;
  const selectF = () => {
    let a = document.getElementById("region");
    var region = a[a.selectedIndex].text;
    localStorage.setItem("il", region);
    let ac = document.getElementById("country");
    if (countries[region]) {
      ac.disabled = false;
      ac.options[0] = new Option("İlçe Seç", "");
      countryArr = countries[region].split("|");
      for (var i = 0; i < countryArr.length; i++)
        ac.options[i + 1] = new Option(countryArr[i], countryArr[i]);
    } else ac.disabled = true;
  };

  const selectCountry = (props) => {
    let ac = document.getElementById("country");
    var county = ac.options[ac.selectedIndex].text;
    let city = localStorage.getItem("il");
    const response = addressRegister({
      variables: { city, county },
    });
    response
      .then(({}) => {
        alert("Adres yenilendi");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <form>
          <select
            style={{
              width: "5rem",
              height: "1.5rem",
              borderRadius: "5px",
              background: "yellow",
              border: "none",
              fontWeight: "600",
              color: "white",
            }}
            id="region"
            onChange={selectF}
          >
            <option value="">İl Seç</option>
          </select>

          <select
            style={{
              width: "5rem",
              height: "1.5rem",
              borderRadius: "5px",
              background: "yellow",
              border: "none",
              fontWeight: "600",
              color: "white",
            }}
            id="country"
            disabled="disabled"
            onChange={selectCountry}
          ></select>
        </form>
      </div>
    </div>
  );
};

export default Button;
