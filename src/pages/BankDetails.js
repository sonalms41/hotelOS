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

function BankDetails(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [bankLocation, setBankLocation] = useState("Nepal");
  const [countryList, setCountryList] = useState([]);
  const [bankACType, setBankACType] = useState("Savings");
  const [bankName, setBankName] = useState("");
  const [currency, setCurrency] = useState("Nepali Rupee (NPR)");
  const [acHolderName, setACHolderName] = useState("");
  const [acNumber, setACNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [swiftBIC, setSwiftBIC] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Bank Details";
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
        `${process.env.REACT_APP_API_BASE_URL}/store-bank-details/?property_id=${propertyId}`,
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
              bank_location,
              bank_account_type,
              bank_name,
              currency: currency_data,
              account_holder_name,
              account_number,
              branch_name,
              bic_code,
            } = data.result;
            bank_location && setBankLocation(bank_location);
            bank_account_type && setBankACType(bank_account_type);
            bank_name && setBankName(bank_name);
            currency_data && setCurrency(currency_data);
            account_holder_name && setACHolderName(account_holder_name);
            account_number && setACNumber(account_number);
            branch_name && setBranchName(branch_name);
            bic_code && setSwiftBIC(bic_code);
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
    if (
      bankLocation &&
      bankACType &&
      bankName &&
      currency &&
      acHolderName &&
      acNumber &&
      branchName &&
      swiftBIC
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
            page_name: INIT_PAGES.bankDetails,
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
        await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/store-bank-details/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify({
              property_id: propertyId,
              bank_location: bankLocation,
              bank_account_type: bankACType,
              bank_name: bankName,
              currency: currency,
              account_holder_name: acHolderName,
              account_number: acNumber,
              branch_name: branchName,
              bic_code: swiftBIC,
            }),
          }
        )
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

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/policies" : "./policies"}
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/legal-info" : "./legal-info"}
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
                  currentPage={INIT_PAGES.bankDetails}
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
                            <h4 className="heading">Bank Details</h4>
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
                                <h5 className="heading">Bank Details</h5>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="bankLocation">
                                  Bank Location
                                </label>
                                <select
                                  id="bankLocation"
                                  value={bankLocation}
                                  className={
                                    !bankLocation && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) =>
                                    setBankLocation(e.target.value)
                                  }
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
                                    !bankLocation && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="bankACType">
                                  Bank Account Type
                                </label>
                                <select
                                  id="bankACType"
                                  className={
                                    !bankACType && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) =>
                                    setBankACType(e.target.value)
                                  }
                                >
                                  <option>Savings</option>
                                  <option>Current</option>
                                  <option>Recurring Deposit</option>
                                  <option>Fixed Deposit</option>
                                </select>
                                <p
                                  className={
                                    !bankACType && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="bankName">Bank Name</label>
                                <input
                                  id="bankName"
                                  type="text"
                                  className={
                                    !bankName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Bank Name"
                                  onChange={(e) => setBankName(e.target.value)}
                                />
                                <p
                                  className={
                                    !bankName && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="currency">Currency</label>
                                <select
                                  id="currency"
                                  className={
                                    !currency && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setCurrency(e.target.value)}
                                >
                                  <option>Nepali Rupee (NPR)</option>
                                  <option>Indian Rupee (IC)</option>
                                </select>
                                <p
                                  className={
                                    !currency && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="acHolderName">
                                  Account Holder Name
                                </label>
                                <input
                                  id="acHolderName"
                                  type="text"
                                  className={
                                    !acHolderName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Account Holder Name"
                                  onChange={(e) =>
                                    setACHolderName(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !acHolderName && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="acNumber">Account Number</label>
                                <input
                                  id="acNumber"
                                  type="text"
                                  className={
                                    !acNumber && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Account Number"
                                  onChange={(e) => setACNumber(e.target.value)}
                                />
                                <p
                                  className={
                                    !acNumber && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="branchName">Branch Name</label>
                                <input
                                  id="branchName"
                                  type="text"
                                  className={
                                    !branchName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Branch Name"
                                  onChange={(e) =>
                                    setBranchName(e.target.value)
                                  }
                                />
                                <p
                                  className={
                                    !branchName && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="swiftBIC">SWIFT/BIC Code</label>
                                <input
                                  id="swiftBIC"
                                  type="text"
                                  className={
                                    !swiftBIC && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="SWIFT/BIC Code"
                                  onChange={(e) => setSwiftBIC(e.target.value)}
                                />
                                <p
                                  className={
                                    !swiftBIC && loginWarning
                                      ? "text-danger text-center"
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

                    <div className="col-lg-5 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4
                              className="heading"
                              style={{ color: "transparent" }}
                            >
                              Confirmation
                            </h4>
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
                                <h5 className="heading">Confirmation</h5>
                              </div>
                            </div>
                            <div className="col-md-12 text-success font24">
                              {bankName}
                            </div>
                            <div className="col-md-12">{branchName}</div>
                            <div className="col-md-12">
                              <hr />
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="row">
                                <span className="col-auto mr-auto">
                                  Bank Location
                                </span>
                                <span className="col-auto">{bankLocation}</span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="row">
                                <span className="col-auto mr-auto">
                                  Currency
                                </span>
                                <span className="col-auto">{currency}</span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="row">
                                <span className="col-auto mr-auto">
                                  A/C Holder Name
                                </span>
                                <span className="col-auto">{acHolderName}</span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="row">
                                <span className="col-auto mr-auto">
                                  A/C Number
                                </span>
                                <span className="col-auto">{acNumber}</span>
                              </div>
                            </div>
                            <div className="col-md-12 mb-2">
                              <div className="row">
                                <span className="col-auto mr-auto">Type</span>
                                <span className="col-auto">{bankACType}</span>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="row">
                                <span className="col-auto mr-auto">
                                  SWIFT/BIC Code
                                </span>
                                <span className="col-auto">{swiftBIC}</span>
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
              nPage={8}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default BankDetails;
