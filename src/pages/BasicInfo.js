import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import {
  PROPERTY_ID,
  USER_TOKEN,
  USER_ID,
  PROPERTY_NAME,
} from "../components/LocalStorageInfo";

function BasicInfo(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [propertyName, setPropertyName] = useState(PROPERTY_NAME());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [propertyFormerName, setPropertyFormerName] = useState("");
  const [starRating, setStarRating] = useState("1");
  const [buildYear, setBuildYear] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [nRestaurants, setNRestaurants] = useState("1");
  const [nFloor, setNFloor] = useState("1");
  const [nRooms, setNRooms] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkInTimeEnd, setCheckInTimeEnd] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [checkOutTimeEnd, setCheckOutTimeEnd] = useState("");
  const [aDayCheckIn, setADayCheckIn] = useState("Yes");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState("Kathmandu");
  const [cityList, setCityList] = useState([]);
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressLink, setAddressLink] = useState("");
  // const [latitude, setLatitude] = useState(null);
  // const [longitude, setLongitude] = useState(null);
  const [buildYearValid, setBuildYearValid] = useState("");
  const [nRoomsValid, setNRoomsValid] = useState("");
  const [postalCodeValid, setPostalCodeValid] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Basic Information";
    const sendSession = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/user-session/?user_id=${userId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("session", data);
            setPageState(data.user_page);
          }
        })
        .catch((error) => console.error(error));
    };

    const fetchCountry = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/country-save/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data country", data);
          if (data.status_code === 200) {
            setCountryList(data.result);
          }
        })
        .catch((error) => console.error(error));
    };

    const fetchProperty = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/super-admin/property-type/`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data property type", data);
          if (data.status === 200) setPropertyTypeList(data.result);
        })
        .catch((error) => console.error(error));
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/property-detail/?property_id=${propertyId}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            const {
              property_former_name,
              star_rating,
              build_year,
              property_type,
              no_of_restaurants,
              no_of_floors,
              no_of_rooms,
              checkin_time,
              checkin_time_end,
              checkout_time,
              checkout_time_end,
              twofour_hour_checkin,
              property_description,
              country: country_data,
              city: city_data,
              locality: locality_data,
              postal_code,
              street_address,
              map_url,
            } = data.result;

            property_former_name && setPropertyFormerName(property_former_name);
            star_rating && setStarRating(star_rating);
            build_year && setBuildYear(build_year);
            property_type && setPropertyType(property_type);
            no_of_restaurants && setNRestaurants(no_of_restaurants);
            no_of_floors && setNFloor(no_of_floors);
            no_of_rooms && setNRooms(no_of_rooms);
            checkin_time && setCheckInTime(checkin_time);
            checkin_time_end && setCheckInTimeEnd(checkin_time_end);
            checkout_time && setCheckOutTime(checkout_time);
            checkout_time_end && setCheckOutTimeEnd(checkout_time_end);
            twofour_hour_checkin && setADayCheckIn(twofour_hour_checkin);
            property_description && setDescription(property_description);
            country_data && setCountry(country_data);
            city_data && setCity(city_data);
            locality_data && setLocality(locality_data);
            postal_code && setPostalCode(postal_code);
            street_address && setStreetAddress(street_address);
            map_url && setAddressLink(map_url);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchCountry();
    fetchProperty();
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/country/?country=${country}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data city", data);
          if (data.status_code === 200) setCityList(data.result);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [country]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(
  //     function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //       setLatitude(position.coords.latitude);
  //       setLongitude(position.coords.longitude);
  //     },
  //     function (error) {
  //       console.error("Error Code = " + error.code + " - " + error.message);
  //     }
  //   );
  // }, []);

  const GoogleMapsURLToEmbedURL = (GoogleMapsURL) => {
    let coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(GoogleMapsURL);
    if (coords !== null) {
      let coordsArray = coords[1].split(",");
      return `https://maps.google.com/maps?q=${coordsArray[0]},${coordsArray[1]}&z=16&output=embed`;
    }
  };

  const handleSubmit = () => {
    setBuildYearValid("");
    setNRoomsValid("");
    setPostalCodeValid("");
    setLoginWarning("");
    if (
      propertyFormerName &&
      starRating &&
      buildYear &&
      propertyType &&
      nRestaurants &&
      nFloor &&
      nRooms &&
      checkInTime &&
      checkInTimeEnd &&
      checkOutTime &&
      checkOutTimeEnd &&
      description &&
      country &&
      city &&
      locality &&
      postalCode &&
      streetAddress
    ) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.basicInfo,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status_code === 200) {
              console.log("session", data);
            }
          })
          .catch((error) => console.error(error));
      };

      const fetchData = async () => {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/property-detail/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            property_former_name: propertyFormerName,
            star_rating: starRating,
            build_year: buildYear,
            property_type: propertyType,
            no_of_restaurant: nRestaurants,
            no_of_floors: nFloor,
            no_of_rooms: nRooms,
            checkin_time: checkInTime,
            checkin_time_end: checkInTimeEnd,
            checkout_time: checkOutTime,
            checkout_time_end: checkOutTimeEnd,
            twofour_hour_checkin: aDayCheckIn,
            description: description,
            country: country,
            city: city,
            locality: locality,
            postal_code: postalCode,
            street_address: streetAddress,
            map_url: addressLink,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.status_code === 200) {
              sendSession();
              setIsLoading(false);
              setNextPage(true);
            } else if (data.status_code === 400) {
              toast.error(data.message);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  const handleBlurBuildYear = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(buildYear) &&
    setBuildYearValid("Invalid build year!");

  const handleBlurNRooms = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(nRooms) &&
    setNRoomsValid("Invalid no. of rooms!");

  const handleBlurPostalCode = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(postalCode) &&
    setPostalCodeValid("Invalid postal code!");

  if (!userToken) return <Redirect to={"./"} />;
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/contact" : "./contact"}
      />
    );
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        {!props.dashboard && <HeaderMain />}
        <div className="basicinfo-wrapper sectionPB">
          <div className={!props.dashboard ? "container-fluid" : ""}>
            <div className="wrapper-wh">
              {/* Sidebar */}
              {!props.dashboard && (
                <Sidebar
                  pageState={pageState}
                  currentPage={INIT_PAGES.basicInfo}
                />
              )}
              {/* End Sidebar */}

              {/* Main-Content */}
              <div className={!props.dashboard ? "company-registerform" : ""}>
                <div className="wrapper-formregster">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Basic Info</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            {props.dashboard && (
                              <div className="col-md-12">
                                <div className="sub-heading">
                                  <h5 className="heading">Basic Info</h5>
                                </div>
                              </div>
                            )}
                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="propertyName">
                                  Property Name
                                </label>
                                <input
                                  id="propertyName"
                                  type="text"
                                  value={propertyName}
                                  className="form-control"
                                  placeholder="Property Name"
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="propertyFormerName">
                                  Property Former Name
                                </label>
                                <input
                                  id="propertyFormerName"
                                  type="text"
                                  value={propertyFormerName}
                                  className={
                                    !propertyFormerName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Property Former Name"
                                  onChange={(e) =>
                                    setPropertyFormerName(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !propertyFormerName && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="starRating">Star Rating</label>
                                <select
                                  id="starRating"
                                  value={starRating}
                                  className={
                                    !starRating && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) =>
                                    setStarRating(e.target.value)
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                </select>
                                <p
                                  className={
                                    !starRating && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="buildYear">Build Year</label>
                                <input
                                  id="buildYear"
                                  type="number"
                                  value={buildYear}
                                  className={
                                    (!buildYear && loginWarning) ||
                                    buildYearValid
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  min={1500}
                                  placeholder="Build Year"
                                  onChange={(e) => setBuildYear(e.target.value)}
                                  onBlur={handleBlurBuildYear}
                                />
                                <p
                                  className={
                                    !buildYear && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    buildYearValid
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {buildYearValid}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="propertyType">
                                  Property Type
                                </label>
                                <select
                                  id="propertyType"
                                  value={propertyType}
                                  className={
                                    !propertyType && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) =>
                                    setPropertyType(e.target.value)
                                  }
                                >
                                  <option hidden>Select property type</option>
                                  {propertyTypeList.length > 0 &&
                                    propertyTypeList.map(
                                      (pt, idx) =>
                                        pt.status && (
                                          <option key={`property-${idx}`}>
                                            {pt.name}
                                          </option>
                                        )
                                    )}
                                </select>
                                <p
                                  className={
                                    !propertyType && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="currency">Currency</label>
                                <input
                                  id="currency"
                                  type="text"
                                  className="form-control"
                                  placeholder="NPR (Rupees)"
                                  readOnly
                                />
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="field-wrapper input">
                                <label htmlFor="nRestaurants">
                                  No. of Restaurants
                                </label>
                                <select
                                  id="nRestaurants"
                                  value={nRestaurants}
                                  className={
                                    !nRestaurants && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) =>
                                    setNRestaurants(e.target.value)
                                  }
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>]<option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                </select>
                                <p
                                  className={
                                    !nRestaurants && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="field-wrapper input">
                                <label htmlFor="nFloor">No. of Floors</label>
                                <select
                                  id="nFloor"
                                  value={nFloor}
                                  className={
                                    !nFloor && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setNFloor(e.target.value)}
                                >
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                                  <option>11</option>
                                  <option>12</option>
                                  <option>13</option>
                                  <option>14</option>
                                  <option>15</option>
                                  <option>16</option>
                                  <option>17</option>
                                  <option>18</option>
                                  <option>19</option>
                                  <option>20</option>
                                </select>
                                <p
                                  className={
                                    !nFloor && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="field-wrapper input">
                                <label htmlFor="nRooms">No. of Rooms</label>
                                <input
                                  id="nRooms"
                                  type="number"
                                  value={nRooms}
                                  className={
                                    (!nRooms && loginWarning) || nRoomsValid
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  min={1}
                                  placeholder="No. of Rooms"
                                  onChange={(e) => setNRooms(e.target.value)}
                                  onBlur={handleBlurNRooms}
                                />
                                <p
                                  className={
                                    !nRooms && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    nRoomsValid ? "text-danger" : "display-none"
                                  }
                                >
                                  {nRoomsValid}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="checkInTime">
                                  Checkin Time
                                </label>
                                <div className="input-group">
                                  <input
                                    id="checkInTime"
                                    type="time"
                                    value={checkInTime}
                                    className={
                                      (!checkInTime && loginWarning) ||
                                      checkInTime > checkInTimeEnd
                                        ? "form-control error-input"
                                        : "form-control"
                                    }
                                    placeholder="Checkin Time"
                                    onChange={(e) =>
                                      setCheckInTime(e.target.value)
                                    }
                                  />
                                  <input
                                    id="checkInTimeEnd"
                                    type="time"
                                    value={checkInTimeEnd}
                                    className={
                                      (!checkInTimeEnd && loginWarning) ||
                                      checkInTime > checkInTimeEnd
                                        ? "form-control error-input"
                                        : "form-control"
                                    }
                                    placeholder="Checkin Time"
                                    onChange={(e) =>
                                      setCheckInTimeEnd(e.target.value)
                                    }
                                  />
                                </div>
                                <p
                                  className={
                                    (!checkInTime || !checkInTimeEnd) &&
                                    loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    checkInTime > checkInTimeEnd
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  Not a valid range!
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="checkOutTime">
                                  Checkout Time
                                </label>
                                <div className="input-group">
                                  <input
                                    id="checkOutTime"
                                    type="time"
                                    value={checkOutTime}
                                    className={
                                      (!checkOutTime && loginWarning) ||
                                      checkOutTime > checkOutTimeEnd
                                        ? "form-control error-input"
                                        : "form-control"
                                    }
                                    placeholder="Checkout Time"
                                    onChange={(e) =>
                                      setCheckOutTime(e.target.value)
                                    }
                                  />
                                  <input
                                    id="checkOutTimeEnd"
                                    type="time"
                                    value={checkOutTimeEnd}
                                    className={
                                      (!checkOutTimeEnd && loginWarning) ||
                                      checkOutTime > checkOutTimeEnd
                                        ? "form-control error-input"
                                        : "form-control"
                                    }
                                    placeholder="Checkout Time"
                                    onChange={(e) =>
                                      setCheckOutTimeEnd(e.target.value)
                                    }
                                  />
                                </div>
                                <p
                                  className={
                                    (!checkOutTime || !checkOutTimeEnd) &&
                                    loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    checkOutTime > checkOutTimeEnd
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  Not a valid range!
                                </p>
                              </div>
                            </div>

                            <div className="col-md-4">
                              <div className="field-wrapper input">
                                <label htmlFor="name">24 Hour Checkin</label>
                                <div className="switch-field">
                                  <input
                                    type="radio"
                                    id="radio-one-bi"
                                    name="switch-one-bi"
                                    value="Yes"
                                    checked={aDayCheckIn === "Yes"}
                                    onChange={(e) =>
                                      setADayCheckIn(e.target.value)
                                    }
                                  />
                                  <label htmlFor="radio-one-bi">Yes</label>
                                  <input
                                    type="radio"
                                    id="radio-two-bi"
                                    name="switch-one-bi"
                                    value="No"
                                    checked={aDayCheckIn === "No"}
                                    onChange={(e) =>
                                      setADayCheckIn(e.target.value)
                                    }
                                  />
                                  <label htmlFor="radio-two-bi">No</label>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="field-wrapper input">
                                <label htmlFor="description">Description</label>
                                <textarea
                                  className={
                                    !description && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  id="description"
                                  value={description}
                                  cols="20"
                                  rows="5"
                                  placeholder="A brief description of the hotel"
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !description && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Property Address</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            {props.dashboard && (
                              <div className="col-md-12">
                                <div className="sub-heading">
                                  <h5 className="heading">Property Address</h5>
                                </div>
                              </div>
                            )}
                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="country">Country</label>
                                <select
                                  id="country"
                                  value={country}
                                  className={
                                    !country && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setCountry(e.target.value)}
                                >
                                  {countryList.length > 0 &&
                                    countryList.map((country, idx) => (
                                      <option key={`country-${idx}`}>
                                        {country}
                                      </option>
                                    ))}
                                </select>
                                <p
                                  className={
                                    !country && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="city">City</label>
                                <select
                                  id="city"
                                  value={city}
                                  className={
                                    !city && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setCity(e.target.value)}
                                >
                                  {cityList.length > 0 &&
                                    cityList.map((city, idx) => (
                                      <option key={`city-${idx}`}>
                                        {city}
                                      </option>
                                    ))}
                                </select>
                                <p
                                  className={
                                    !city && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="locality">Locality</label>
                                <input
                                  id="locality"
                                  type="text"
                                  value={locality}
                                  className={
                                    !locality && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Locality"
                                  onChange={(e) => setLocality(e.target.value)}
                                />
                                <p
                                  className={
                                    !locality && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="postalCode">Postal Code</label>
                                <input
                                  id="postalCode"
                                  type="number"
                                  value={postalCode}
                                  className={
                                    (!postalCode && loginWarning) ||
                                    postalCodeValid
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  min={1}
                                  placeholder="Postal Code"
                                  onChange={(e) =>
                                    setPostalCode(e.target.value)
                                  }
                                  onBlur={handleBlurPostalCode}
                                />
                                <p
                                  className={
                                    !postalCode && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    postalCodeValid
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {postalCodeValid}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="field-wrapper input">
                                <label htmlFor="streetAddress">
                                  Street Address
                                </label>
                                <input
                                  id="streetAddress"
                                  type="text"
                                  value={streetAddress}
                                  className={
                                    !streetAddress && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Street Address"
                                  onChange={(e) =>
                                    setStreetAddress(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !streetAddress && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="addressLink">
                                  Insert Google Map Link
                                </label>
                                <input
                                  id="addressLink"
                                  type="text"
                                  value={addressLink}
                                  className={
                                    !addressLink && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Google map link here"
                                  onChange={(e) =>
                                    setAddressLink(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !addressLink && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                {addressLink && (
                                  <iframe
                                    src={GoogleMapsURLToEmbedURL(addressLink)}
                                    width="100%"
                                    height="400"
                                    frameBorder="0"
                                    style={{ border: "0" }}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex="0"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End Main-Content */}
            </div>
          </div>

          {/* Footer Nav */}
          {!props.dashboard && (
            <div className="nav-footer">
              <div className="container-fluid">
                <div className="left_num fLeft">
                  <div className="current_page">
                    <span className="crt-num">1</span>
                    <span className="whole-num">of 12</span>
                  </div>
                </div>
                <div className="left-actionbtn fRight">
                  <div className="btn-sub">
                    <span className="btn_submit" onClick={handleSubmit}>
                      Save & Next
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default BasicInfo;
