import React, { useState, useRef, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-restricted-globals */
const Button = (props) => {
  var countries = Object();

  countries["İstanbul"] = "Algeria|Angola|Benin|Zimbabwe";
  countries["İzmir"] = "Algeria|Angola|Benin|Zimbabwe";
  countries["Kocaeli"] = "Algeria|Angola|Benin|Zimbabwe";
  countries["Balıkesir"] = "Algeria|Angola|Benin|Zimbabwe";
  countries["Antalya"] = "Algeria|Angola|Benin|Zimbabwe";
  countries["Ankara"] = "Amundsen-Scott";
  countries["Bursa"] = "Bangladesh|Bhutan";

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
    let ac = document.getElementById("country");
    if (countries[region]) {
      ac.disabled = false;
      ac.options[0] = new Option("İlçe Seç", "");
      countryArr = countries[region].split("|");
      for (var i = 0; i < countryArr.length; i++)
        ac.options[i + 1] = new Option(countryArr[i], countryArr[i]);
    } else ac.disabled = true;
  }

  const selectCountry = () => {
    let ac = document.getElementById("country");
    var country = ac.options[ac.selectedIndex].text;
    console.log(country);
  }

  return (
    <div>
      <div>
        <form>
          <select 
            id="region"
            onChange={selectF}
          >
            <option value="">İl Seç</option>
          </select>

          <select
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
