import React, { PureComponent } from 'react';
import CountryRegionData from './data.json';
import { filterRegions } from './helpers';
import C from './constants';

export default class RegionDropdown extends PureComponent {
	constructor (props) {
		super(props);
		this.state = {
			regions: this.getRegions(props.country)
		};
		this.getRegions = this.getRegions.bind(this);
	}

	componentDidUpdate (prevProps) {
		const { country } = this.props;
		if (country === prevProps.country) {
			return;
		}

		const defaultRegions = this.getRegions(country);

		this.setState({
			regions: [
				...defaultRegions,
				...this.getCustomOptions(defaultRegions)
			]
		});
	}

	getCustomOptions (regions) {
		const { customOptions } = this.props;

		const duplicateRegions = this.getDuplicates(regions);

		if (duplicateRegions.length) {
			console.error('Error: Duplicate regions present: ' + duplicateRegions.toString() + '.\nThe above item(s) is/are already getting added to the region dropdown by the library.');
			return [];
		}

		return customOptions.map((option) => {
			if (option) {
				return { regionName: option, regionShortCode: option };
			}
		});
	}

	getDuplicates (regions) {
		const { customOptions, valueType } = this.props;
		const regionKey = valueType === C.DISPLAY_TYPE_FULL ? 'regionName' : 'regionShortCode';

		return regions.filter((region) => customOptions.indexOf(region[regionKey]) !== -1).map(region => region[regionKey]);
	}

	getRegions (country) {
		if (!country) {
			return [];
		}

		const { countryValueType, whitelist, blacklist } = this.props;
		const searchIndex = (countryValueType === C.DISPLAY_TYPE_FULL) ? 0 : 1;
		let regions = [];
		CountryRegionData.forEach((i) => {
			if (i[searchIndex] === country) {
				regions = i;
			}
		});

		// this could happen if the user is managing the state of the region/country themselves and screws up passing
		// in a valid country
		if (!regions || regions.length === 0) {
			console.error('Error. Unknown country passed: ' + country + '. If you\'re passing a country shortcode, be sure to include countryValueType="short" on the RegionDropdown');
			return [];
		}

		const filteredRegions = filterRegions(regions, whitelist, blacklist);

		return filteredRegions[2].split(C.REGION_LIST_DELIMITER).map((regionPair) => {
			let [regionName, regionShortCode = null] = regionPair.split(C.SINGLE_REGION_DELIMITER);
			return { regionName, regionShortCode };
		});
	}

	getRegionList () {
		const { labelType, valueType } = this.props;
		return this.state.regions.map(({ regionName, regionShortCode }) => {
			const label = (labelType === C.DISPLAY_TYPE_FULL) ? regionName : regionShortCode;
			const value = (valueType === C.DISPLAY_TYPE_FULL) ? regionName : regionShortCode;
			return <option value={value} key={regionName}>{label}</option>;
		});
	}

	// there are two default options. The "blank" option which shows up when the user hasn't selected a country yet, and
	// a "default" option which shows
	getDefaultOption () {
		const { blankOptionLabel, showDefaultOption, defaultOptionLabel, country } = this.props;
		if (!country) {
			return <option value="">{blankOptionLabel}</option>;
		}
		if (showDefaultOption) {
			return <option value="">{defaultOptionLabel}</option>;
		}
		return null;
	}

	render () {
		const {
			value, country, onChange, onBlur, id, name, classes, disabled, blankOptionLabel, showDefaultOption,
			defaultOptionLabel, labelType, valueType, countryValueType, disableWhenEmpty, customOptions,
			...arbitraryProps
		} = this.props;

		const isDisabled = disabled || (disableWhenEmpty && country === '');
		const attrs = {
			...arbitraryProps,
			name,
			value,
			onChange: (e) => onChange(e.target.value, e),
			onBlur: (e) => onBlur(e.target.value, e),
			disabled: isDisabled
		};
		if (id) {
			attrs.id = id;
		}
		if (classes) {
			attrs.className = classes;
		}

		return (
			<select {...attrs}>
				{this.getDefaultOption()}
				{this.getRegionList()}
			</select>
		);
	}
}

/*
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { addressSelecty } from "../static/addressSelect/addressSelecty";
import AddressViewer from "./addressViewer";

const GET_USERS = gql`
  query {
    addresses {
      id
      city
      county
      users_uuid
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

const GET_ADDRESS_SELECT = gql`
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
/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/*
const OptionalButton = () => {
  const queryMultiple = () => {
    const res1 = useQuery(GET_USERS);
    const res2 = useQuery(GET_ADDRESS_SELECT);
    return [res1, res2];
  };

  const [
    { loading: loading1, error: error1, data: data1 },
    { loading: loading2, error: error2, data: data2 },
  ] = queryMultiple();

  if (loading1) return <p>Loading1...</p>;
  if (error1) return <p>Error1</p>;
  if (loading2) return <p>Loading2...</p>;
  if (error2) return <p>Error2</p>;
  let countyChange;

return (
  <form>
    <select onChange={set_country(countries,city_states)} id="region">
      <option value="" selected="selected">SELECT REGION</option>
    </select>
    <select name="country" disabled="disabled" onChange={set_city_state(city_states)}></select>
    <select name="city_state" disabled="disabled" onChange={print_city_state(countries)}></select>
  </form>
)

/*
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
            {data1.addresses.city}
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {
              data2.city_county.map((address, index) => (
                <a
                  onClick={() => {
                    localStorage.setItem('plate', address.plate)
                  }}
                  className="dropdown-item"
                >
                  {address.city}
                </a>
              ))
            }
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
            {data1.addresses.county}
          </button>
          <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
            {
              data2.city_county.map((address, index) => (
                <a
                  onClick={() => {
                    let plateState = localStorage.getItem('plate');
                  }}
                  className="dropdown-item"
                >
                  {
                  }
                </a>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default OptionalButton;
*/