import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import { toast } from "react-toastify";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";

function Contact(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [prefix, setPrefix] = useState("Mr");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobRole, setJobRole] = useState("Manager");
  const [emailState, setEmailState] = useState([""]);
  const [phoneState, setPhoneState] = useState([""]);
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [responsibilities, setResponsibilities] = useState([]);
  const [responsibilitiesData, setResponsibilitiesData] = useState([
    "Authorized Signatory",
    "General Question",
    "Price Parity",
    "Finance",
    "In House Customer Messages",
    "Rates, Allotment, Promotion",
    "Reservations",
    "Content Management",
  ]);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Contact";
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

    const fetchCountryCode = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/all-country-codes/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data country code", data);
          if (data.status_code === 200) setCountryCodeList(data.result);
        })
        .catch((error) => console.error(error));
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/add-contact/?property_id=${propertyId}`,
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
          console.log("data", data.result);
          if (data.result.dictionary) {
            const {
              prefix: prefix_data,
              first_name,
              last_name,
              job_role,
              email,
              phone_number,
              responsiblities,
            } = data.result.dictionary;
            prefix_data && setPrefix(prefix_data);
            first_name && setFirstName(first_name);
            last_name && setLastName(last_name);
            job_role && setJobRole(job_role);
            email && setEmailState(email);
            phone_number && setPhoneState(phone_number);
            responsiblities && setResponsibilities(responsiblities);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchCountryCode();
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    handleSubmit();
  }, [props.submit]);

  const addEmail = () => {
    setEmailState([...emailState, ""]);
  };
  const addPhone = () => {
    setPhoneState([...phoneState, ""]);
  };

  const deleteEmail = (index) => {
    if (emailState.length > 1) {
      const updatedEmail = [...emailState];
      updatedEmail.splice(index, 1);
      setEmailState(updatedEmail);
    }
  };
  const deletePhone = (index) => {
    if (phoneState.length > 1) {
      const updatedPhone = [...phoneState];
      updatedPhone.splice(index, 1);
      setPhoneState(updatedPhone);
    }
  };

  const handleEmailChange = (e, index) => {
    const updatedEmail = [...emailState];
    updatedEmail[index] = e.target.value;
    setEmailState(updatedEmail);
  };
  const handlePhoneChange = (e, index) => {
    const updatedPhone = [...phoneState];
    updatedPhone[index] = e.target.value;
    setPhoneState(updatedPhone);
  };

  const handleResponsibilitiesChange = (e) => {
    let updatedData = [...responsibilities];
    if (updatedData.includes(e.target.value))
      updatedData = updatedData.filter((t) => t !== e.target.value);
    else updatedData.push(e.target.value);
    setResponsibilities(updatedData);
  };

  const handlePrevPage = () => setPrevPage(true);

  const handleSubmit = () => {
    setLoginWarning("");
    if (
      firstName &&
      lastName &&
      jobRole &&
      emailState.length &&
      phoneState.length &&
      responsibilities
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
            page_name: INIT_PAGES.contact,
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
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/add-contact/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            prefix: prefix,
            first_name: firstName,
            last_name: lastName,
            job_role: jobRole,
            email: emailState,
            phone_number: phoneState,
            responsibilites: responsibilities,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.status_code === 200) {
              sendSession();
              setNextPage(true);
            } else if (data.status_code === 400) {
              toast.error(data.message);
              setIsLoading(false);
            }
          })
          .catch((error) => console.error(error));
          console.log('post-value:',{
            property_id: propertyId,
            prefix: prefix,
            first_name: firstName,
            last_name: lastName,
            job_role: jobRole,
            email: emailState,
            phone_number: phoneState,
            responsibilites: responsibilities,
          })
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage) return <Redirect to={"./basic-info"} />;
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/amenities" : "./amenities"}
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
                  currentPage={INIT_PAGES.contact}
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
                            <h4 className="heading">Contact</h4>
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
                                  <h5 className="heading">Contact Details</h5>
                                </div>
                              </div>
                            )}
                            <div className="col-md-12">
                              <div className="field-wrapper input">
                                <label htmlFor="name">Prefix</label>
                                <div className="switch-field">
                                  <input
                                    type="radio"
                                    id="radio-one"
                                    name="switch-one"
                                    value="Mr"
                                    checked={prefix === "Mr"}
                                    onChange={(e) => setPrefix(e.target.value)}
                                  />
                                  <label htmlFor="radio-one">Mr</label>
                                  <input
                                    type="radio"
                                    id="radio-two"
                                    name="switch-one"
                                    value="Mrs"
                                    checked={prefix === "Mrs"}
                                    onChange={(e) => setPrefix(e.target.value)}
                                  />
                                  <label htmlFor="radio-two">Mrs</label>
                                  <input
                                    type="radio"
                                    id="radio-three"
                                    name="switch-one"
                                    value="Ms"
                                    checked={prefix === "Ms"}
                                    onChange={(e) => setPrefix(e.target.value)}
                                  />
                                  <label htmlFor="radio-three">Ms</label>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                  id="firstName"
                                  type="text"
                                  value={firstName}
                                  className={
                                    !firstName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="First Name"
                                  onChange={(e) => setFirstName(e.target.value)}
                                />
                                <p
                                  className={
                                    !firstName && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="field-wrapper input">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                  id="lastName"
                                  type="text"
                                  value={lastName}
                                  className={
                                    !lastName && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  placeholder="Last Name"
                                  onChange={(e) => setLastName(e.target.value)}
                                />
                                <p
                                  className={
                                    !lastName && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="field-wrapper input">
                                <label htmlFor="inputState">Job Role</label>
                                <select
                                  id="inputState"
                                  value={jobRole}
                                  className={
                                    !jobRole && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setJobRole(e.target.value)}
                                >
                                  <option>Manager</option>
                                  <option>Avalibility Manager</option>
                                  <option>E- commerce Manager</option>
                                  <option>Revenue Manager</option>
                                  <option>Operations</option>
                                </select>
                                <p
                                  className={
                                    !jobRole && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="field-wrapper input">
                                <label htmlFor="email">Email</label>
                                {emailState.map((email, index) => (
                                  <div key={index} className="row mb-2">
                                    <div className="col-md-10">
                                      <input
                                        id={`email-${index}`}
                                        type="text"
                                        name="email"
                                        value={email}
                                        className={
                                          !email && loginWarning
                                            ? "form-control error-input"
                                            : "form-control"
                                        }
                                        placeholder="Email"
                                        onChange={(e) =>
                                          handleEmailChange(e, index)
                                        }
                                      />
                                      <p
                                        className={
                                          !email && loginWarning
                                            ? "text-danger text-center"
                                            : "display-none"
                                        }
                                      >
                                        {loginWarning}
                                      </p>
                                    </div>
                                    <div className="col-md-2">
                                      <span
                                        className="btn_eradoImg"
                                        onClick={() => deleteEmail(index)}
                                      >
                                        <img
                                          src={require("../assets/img/icons/icon-material-delete-sweep.svg")}
                                          alt="delete-sweep-icon"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <span className="btn_addo" onClick={addEmail}>
                                <strong>+</strong> Add Email
                              </span>
                            </div>

                            <div className="col-md-12 mt-3">
                              <div className="field-wrapper input">
                                <label htmlFor="phoneNumber">
                                  Phone Number
                                </label>
                                {phoneState.map((phone, index) => (
                                  <div key={index} className="row mb-2">
                                    <div className="col-md-10">
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <select className="form-control">
                                            <option>+977</option>
                                            {countryCodeList.length > 0 &&
                                              countryCodeList.map(
                                                (ccode, idx) => (
                                                  <option
                                                    key={`countryCode-${idx}`}
                                                    value={ccode}
                                                  >
                                                    {ccode}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                        </div>
                                        <input
                                          id={`phone-${index}`}
                                          type="text"
                                          name="phone"
                                          value={phone}
                                          className={
                                            !phone && loginWarning
                                              ? "form-control error-input"
                                              : "form-control"
                                          }
                                          placeholder="Phone Number"
                                          onChange={(e) =>
                                            handlePhoneChange(e, index)
                                          }
                                        />
                                      </div>
                                      <p
                                        className={
                                          !phone && loginWarning
                                            ? "text-danger text-center"
                                            : "display-none"
                                        }
                                      >
                                        {loginWarning}
                                      </p>
                                    </div>
                                    <div className="col-md-2">
                                      <span
                                        className="btn_eradoImg"
                                        onClick={() => deletePhone(index)}
                                      >
                                        <img
                                          src={require("../assets/img/icons/icon-material-delete-sweep.svg")}
                                          alt="delete-sweep-icon"
                                        />
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <span className="btn_addo" onClick={addPhone}>
                                <strong>+</strong> Add Phone Number
                              </span>
                            </div>

                            <div className="col-md-12 mt-3">
                              <div className="field-wrapper input">
                                <label htmlFor="responsibilities">
                                  Select Responsibilities
                                </label>
                                <div className="tag-check">
                                  <ul className="list-inline">
                                    {responsibilitiesData.map((res, index) => (
                                      <li key={index}>
                                        <label className="check-tag">
                                          <input
                                            type="checkbox"
                                            value={res}
                                            className="check-tag__input"
                                            checked={responsibilities.includes(
                                              res
                                            )}
                                            onChange={
                                              handleResponsibilitiesChange
                                            }
                                          />
                                          <span className="check-tag__text">
                                            {res}
                                          </span>
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
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
              nPage={2}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default Contact;
