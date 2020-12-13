import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";

//
import Authorization from "../apollo/isAuth";
import "../App.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faPen } from "@fortawesome/free-solid-svg-icons";

// discount code
import discountCode from "../static/discount.json";

const GET_USERS = gql`
  query {
    user {
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
      menu
      campaigns
      address_direct
    }
  }
`;

const TOKEN = gql`
  query {
    token {
      refreshToken
      ok
    }
  }
`;

const FULLNESS_PERCENT = gql`
  query {
    fullness_percent {
        percent
    }
  }
`;

const MENU_REGISTER = gql`
  mutation($menu: String, $campaigns: String) {
    menuRegister(menu: $menu, campaigns: $campaigns) {
        users_uuid
    }
  }
`;

const FULLNESS_PERCENT_UPDATE = gql`
  mutation($percent: String) {
    fullnessPercentUpdate(percent: $percent) {
        percent
    }
  }
`;

/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
const BusinessProfileViewer = () => {
  const [menu, setMenu] = useState();
  const [campaigns, setCampaigns] = useState();
  const [percent, setPercent] = useState();
  const [inputDiscount, setInputDiscount] = useState();
  const [menuRegister, { loading, error, data }] = useMutation(MENU_REGISTER);
  const [fullnessPercentUpdate, { loading5, error5, data5 }] = useMutation(FULLNESS_PERCENT_UPDATE);
  const [textAreaView, setTextAreaView] = useState(true);
  const [textAreaViewCampaign, setTextAreaViewCampaign] = useState(true);
  const [textAreaViewPercent, setTextAreaViewPercent] = useState(true);
  const [saveMenuButtonVisible, setSaveMenuButtonVisible] = useState('none');
  const [editMenuButtonVisible, setEditMenuButtonVisible] = useState('block');
  const [saveCampaignButtonVisible, setSaveCampaignButtonVisible] = useState('none');
  const [editCampaignButtonVisible, setEditCampaignButtonVisible] = useState('block');
  const [savePercentButtonVisible, setSavePercentButtonVisible] = useState('none');
  const [editPercentButtonVisible, setEditPercentButtonVisible] = useState('block');
  const queryMultiple = () => {
    const res1 = useQuery(GET_USERS);
    const res2 = useQuery(TOKEN);
    const res3 = useQuery(FULLNESS_PERCENT);
    return [res1, res2, res3];
  };

  const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 },
    { loading: loading3, error: error3, data: data3 },
  ] = queryMultiple();

    useEffect(() => {
    });

  if (loading1) return <p>Loading...</p>;
  if (error1) return alert(error1);

  if (loading2) return <p>Loading...</p>;
  if (error2) return <p>error</p>;

  if (loading3) return <p>Loading...</p>;
  if (error3) return <p>error</p>;

  const editMenu = (e) => {
    e.preventDefault();
    textAreaView === true ? setTextAreaView(false) : setTextAreaView(true);
    textAreaView === false ? setSaveMenuButtonVisible('none') : setSaveMenuButtonVisible('block');
  }

  const saveMenu = (e) => {
    e.preventDefault();
      //saveMenuButtonVisible === 'block' ? setSaveMenuButtonVisible('none') : setSaveMenuButtonVisible('block');
      //editMenuButtonVisible === 'none' ? setEditMenuButtonVisible('block') : setEditMenuButtonVisible('none');
    const response = menuRegister({
        variables: { menu, campaigns },
    });
      response
        .then(({}) => {
            alert('Menü yenilendi');
        })
        .catch((err) => {
            console.log(err);
        });
  };

  const editCampaign = (e) => {
    e.preventDefault();
    textAreaViewCampaign === true ? setTextAreaViewCampaign(false) : setTextAreaViewCampaign(true);
    textAreaViewCampaign === false ? setSaveCampaignButtonVisible('none') : setSaveCampaignButtonVisible('block');
  }

  const saveCampaign = (e) => {
    e.preventDefault();
      //saveCampaignButtonVisible === 'block' ? setSaveCampaignButtonVisible('none') : setSaveCampaignButtonVisible('block');
      //editMenuButtonVisible === 'none' ? setEditMenuButtonVisible('block') : setEditMenuButtonVisible('none');
    const response = menuRegister({
        variables: { menu, campaigns },
    });
      response
        .then(({}) => {
            alert('Kampanyalar yenilendi');
        })
        .catch((err) => {
            console.log(err);
        });
  };

  const editPercent = (e) => {
    e.preventDefault();
    textAreaViewPercent === true ? setTextAreaViewPercent(false) : setTextAreaViewPercent(true);
    textAreaViewPercent === false ? setSavePercentButtonVisible('none') : setSavePercentButtonVisible('block');
  }

  const savePercent = (e) => {
    e.preventDefault();
      //saveCampaignButtonVisible === 'block' ? setSaveCampaignButtonVisible('none') : setSaveCampaignButtonVisible('block');
      //editMenuButtonVisible === 'none' ? setEditMenuButtonVisible('block') : setEditMenuButtonVisible('none');
    const response = fullnessPercentUpdate({
        variables: { percent },
    });
      response
        .then(({}) => {
            alert('Doluluk oranı yenilendi');
        })
        .catch((err) => {
            console.log(err);
        });
  };

  const controlDiscountCode = (e) => {
    e.preventDefault();
    let discountCodeRead = discountCode.discount.code;
    discountCodeRead === inputDiscount ? alert('Kod doğrulandı') : alert('Kod doğrulanamadı');
    setInputDiscount('');
  };

  return (
    <div className="container mt-5 overflow-auto">
      <p
        className="text-center mt-4"
        style={{ fontWeight: "600", fontSize: "17px" }}
      >
        Mekan Profili
      </p>
      <div className="container">
        <div className="container mt-5 d-flex justify-content-center">
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image">
                {" "}
                <img
                  src={data1.user.photo}
                  className="rounded"
                  width="155"
                />{" "}
              </div>
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">{data1.user.fullname}</h4>{" "}
                <span>{data1.user.username}</span>
                <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div className="d-flex flex-column">
                    {" "}
                    <span className="articles">Doluluk Oranı</span>{" "}
                    <div
                        style={{
                            width: '100px',
                            height: '1rem',
                            background: 'black',
                            borderRadius: '5px',
                        }}
                    >
                     <div
                        style={{
                            width: `${data3.fullness_percent.percent}px`,
                            height: '1rem',
                            background: 'red',
                            borderRadius: '5px',
                        }}
                        ></div>
                    </div>
                  </div>
                </div>
                <div className="button mt-2 d-flex flex-row align-items-center">
                  {" "}
                  <input
                    placeholder="Kodu Girin"
                    value={inputDiscount}
                    onChange={(e) => setInputDiscount(e.target.value)}
                    style={{
                      width: '90px',
                      height: '30px',
                    }}
                  />
                  <button 
                    onClick={ controlDiscountCode }
                    className="btn btn-sm btn-outline-dark w-50"
                  >
                    Kontrol Et
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{
            background: "#f0f0f0",
            borderRadius: '10px',
          }}
        >
          <div>
            <p
              className="float-left"
              style={{
                fontWeight: "600",
              }}
            >
              Doluluk Oranı(Yüzde)
            </p>
          </div>
          <div className="float-right">
            <button
              onClick={ editPercent }
              className="float-right"
              style={{
                  display: editPercentButtonVisible,
                  background: 'transparent',
                  border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faPen} />
          </button>
            <button
              onClick={ savePercent }
              className="float-right"
              style={{
                display: savePercentButtonVisible,
                background: 'transparent',
                border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faSave} />
          </button>
          </div>
          <div className="mt-4">
            <textarea
              onChange={(e) => setPercent(e.target.value)}
              value={percent}
              disabled={textAreaViewPercent}
              style={{ resize: 'none' }}
              className="form-control float-left mt-2"
              aria-label="With textarea">
              { data3.fullness_percent.percent}
            </textarea>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{
            background: "#f0f0f0",
            borderRadius: '10px',
          }}
        >
          <div>
            <p
              className="float-left"
              style={{
                fontWeight: "600",
              }}
            >
              Kampanyalar
            </p>
          </div>
          <div className="float-right">
            <button
              onClick={ editCampaign }
              className="float-right"
              style={{
                  display: editCampaignButtonVisible,
                  background: 'transparent',
                  border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faPen} />
          </button>
            <button
              onClick={ saveCampaign }
              className="float-right"
              style={{
                display: saveCampaignButtonVisible,
                background: 'transparent',
                border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faSave} />
          </button>
          </div>
          <div className="mt-4">
            <textarea
              onChange={(e) => setCampaigns(e.target.value)}
              value={campaigns}
              disabled={textAreaViewCampaign}
              style={{ resize: 'none' }}
              className="form-control float-left mt-2"
              aria-label="With textarea">
              { data1.user.campaigns }
            </textarea>
          </div>
        </div>
        <div
          className="container mt-4"
          style={{
            background: "#f0f0f0",
            borderRadius: '10px',
          }}
        >
          <div>
            <p
              className="float-left"
              style={{
                fontWeight: "600",
              }}
            >
              Menü
            </p>
          </div>
          <div className="float-right">
            <button
              onClick={ editMenu }
              className="float-right"
              style={{
                  display: editMenuButtonVisible,
                  background: 'transparent',
                  border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faPen} />
          </button>
            <button
              onClick={ saveMenu }
              className="float-right"
              style={{
                display: saveMenuButtonVisible,
                background: 'transparent',
                border: 'none'
              }}
          >
              <FontAwesomeIcon icon={faSave} />
          </button>
          </div>
          <div className="mt-4">
            <textarea
              onChange={(e) => setMenu(e.target.value)}
              value={menu}
              disabled={textAreaView}
              style={{ resize: 'none', height: 'auto' }}
              className="form-control float-left mt-2"
              aria-label="With textarea">
              { data1.user.menu }
            </textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfileViewer;
