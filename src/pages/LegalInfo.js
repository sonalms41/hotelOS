import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";

function LegalInfo(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [addressFirst, setAddressFirst] = useState("");
  const [addressSecond, setAddressSecond] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [countryList, setCountryList] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [webAddress, setWebAddress] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Legal Information";
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

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/store-legal-info/?property_id=${propertyId}`,
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
          console.log("data", data);
          if (data.status_code === 200) {
            const {
              company_name,
              phone_number,
              fax,
              address_line_one,
              address_line_two,
              country: country_data,
              zip_code,
              web_address,
              description,
            } = data.result;
            company_name && setCompanyName(company_name);
            phone_number && setPhoneNumber(phone_number);
            fax && setFaxNumber(fax);
            address_line_one && setAddressFirst(address_line_one);
            address_line_two && setAddressSecond(address_line_two);
            country_data && setCountry(country_data);
            zip_code && setZipCode(zip_code);
            web_address && setWebAddress(web_address);
            description && setCompanyDescription(description);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchCountry();
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  const handlePrevPage = () => setPrevPage(true);

  const handleSubmit = () => {
    setLoginWarning("");
    setPhoneValid("");
    if (companyName && phoneNumber && addressFirst && country && zipCode) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.legalInfo,
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
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/store-legal-info/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            company_name: companyName,
            phone_number: phoneNumber,
            fax: faxNumber,
            address_line_one: addressFirst,
            address_line_two: addressSecond,
            country: country,
            zip_code: zipCode,
            web_address: webAddress,
            description: companyDescription,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status_code === 200) {
              console.log("data", data);
              sendSession();
              setIsLoading(false);
              setNextPage(true);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  const handleBlurPhoneNumber = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(phoneNumber) &&
    setPhoneValid("Invalid phone number!");

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage)
    return (
      <Redirect
        to={
          adminStatus() ? "/admin-property/add/bank-details" : "./bank-details"
        }
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/documents" : "./documents"}
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
                  currentPage={INIT_PAGES.legalInfo}
                />
              )}
              {/* End Sidebar */}

              {/* Main-Content */}
              <div className={!props.dashboard ? "company-registerform" : ""}>
                <div className="wrapper-formregster">
                  <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Legal Info</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12">
                              <div className="sub-heading">
                                <h5 className="heading">Legal Info</h5>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="companyName">
                                  Company Name
                                </label>
                                <input
                                  id="companyName"
                                  type="text"
                                  value={companyName}
                                  className={
                                    !companyName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Company Name"
                                  onChange={(e) =>
                                    setCompanyName(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !companyName && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="phoneNumber">
                                  Phone Number
                                </label>
                                <input
                                  id="phoneNumber"
                                  type="text"
                                  value={phoneNumber}
                                  className={
                                    (!phoneNumber && loginWarning) || phoneValid
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Phone Number"
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  onBlur={handleBlurPhoneNumber}
                                />
                                <p
                                  className={
                                    !phoneNumber && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                                <p
                                  className={
                                    phoneValid ? "text-danger" : "display-none"
                                  }
                                >
                                  {phoneValid}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="faxNumber">
                                  Fax Number (Optional)
                                </label>
                                <input
                                  id="faxNumber"
                                  type="text"
                                  value={faxNumber}
                                  className="form-control"
                                  placeholder="Fax Number"
                                  onChange={(e) => setFaxNumber(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="addressFirst">
                                  Address Line 1
                                </label>
                                <input
                                  id="addressFirst"
                                  type="text"
                                  value={addressFirst}
                                  className={
                                    !addressFirst && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Address"
                                  onChange={(e) =>
                                    setAddressFirst(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !addressFirst && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="addressSecond">
                                  Address Line 2 (Optional)
                                </label>
                                <input
                                  id="addressSecond"
                                  type="text"
                                  value={addressSecond}
                                  className="form-control"
                                  placeholder="Address"
                                  onChange={(e) =>
                                    setAddressSecond(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
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
                              <div id="" className="field-wrapper input">
                                <label htmlFor="zipCode">
                                  ZIP/Postal/Pin Code
                                </label>
                                <input
                                  id="zipCode"
                                  type="text"
                                  value={zipCode}
                                  className={
                                    !zipCode && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Zip Code"
                                  onChange={(e) => setZipCode(e.target.value)}
                                />
                                <p
                                  className={
                                    !zipCode && loginWarning
                                      ? "text-danger"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="webAddress">
                                  Web Address (Optional)
                                </label>
                                <input
                                  id="webAddress"
                                  type="text"
                                  value={webAddress}
                                  className="form-control"
                                  placeholder="Web Address"
                                  onChange={(e) =>
                                    setWebAddress(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="companyDescription">
                                  Brief description of your company (Optional)
                                </label>
                                <textarea
                                  className="form-control"
                                  id="companyDescription"
                                  value={companyDescription}
                                  cols="20"
                                  rows="5"
                                  placeholder="A brief description of the company"
                                  onChange={(e) =>
                                    setCompanyDescription(e.target.value)
                                  }
                                />
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
            <Footer
              nPage={9}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default LegalInfo;
