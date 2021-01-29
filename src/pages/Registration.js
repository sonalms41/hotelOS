import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "../components/Header";
import CustomSpinner from "../components/CustomSpinner";

function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [country, setCountry] = useState("Nepal");
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState("Kathmandu");
  const [cityList, setCityList] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [propertyTypeList, setPropertyTypeList] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [standAloneProperty, setStandAloneProperty] = useState("Yes");
  const [nameOfChain, setNameOfChain] = useState("");
  const [emailSubscription, setEmailSubscription] = useState(false);
  const [userTnc, setUserTnc] = useState(false);
  const [vendorTnc, setVendorTnc] = useState(false);
  const [emailValid, setEmailValid] = useState("");
  const [mobileValid, setMobileValid] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [loginWarningTnc, setLoginWarningTnc] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin-status"));
  const [emailReturn, setEmailReturn] = useState("");

  useEffect(() => {
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

    fetchCountry();
    fetchProperty();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/country/?country=${country}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data city", data);
          if (data.status_code === 200) setCityList(data.result);
        })
        .catch((error) => console.error(error));
    };
    const fetchCountryCode = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/country-code/?country=${country}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data country code", data);
          if (data.status_code === 200) setCountryCode(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
    fetchCountryCode();
  }, [country]);

  const handleSubmit = () => {
    setMobileValid("");
    setPhoneValid("");
    setLoginWarning("");
    setLoginWarningTnc("");
    if (
      firstName &&
      lastName &&
      role &&
      mobileNumber &&
      country &&
      city &&
      email &&
      password &&
      propertyName &&
      propertyType &&
      phoneNumber
    ) {
      if (userTnc && vendorTnc) {
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
          setEmailValid("Invalid email address!");
        else {
          const fetchData = async () => {
            setIsLoading(true);
            await fetch(
              `${process.env.REACT_APP_API_BASE_URL}/vendor-registration/`,
              {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  first_name: firstName,
                  last_name: lastName,
                  role: role,
                  phone_number: mobileNumber,
                  country: country,
                  city: city,
                  email: email,
                  password: password,
                  property_name: propertyName,
                  hotel_type: propertyType,
                  hotel_phone_number: phoneNumber,
                  stand_alone_property: standAloneProperty,
                  name_of_chain: nameOfChain,
                  email_subscription: emailSubscription,
                }),
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log("Register data:", data);
                if (data.status_code === 200) {
                  toast.success(data.message);
                  if (isAdmin) {
                    localStorage.setItem(
                      "user-id",
                      data.result.lists_of_properties[
                        data.result.lists_of_properties.length - 1
                      ].user_id
                    );
                    localStorage.setItem(
                      "property-id",
                      data.result.lists_of_properties[
                        data.result.lists_of_properties.length - 1
                      ].property_id
                    );
                    localStorage.setItem(
                      "property-name",
                      data.result.lists_of_properties[
                        data.result.lists_of_properties.length - 1
                      ].property_name
                    );
                  }
                  setEmailReturn(data.email);
                  setTimeout(() => setLoginSuccess(true), 1000);
                } else if (data.status_code === 400) {
                  toast.error(data.message);
                }
                setIsLoading(false);
              })
              .catch((error) => console.error(error));
          };

          fetchData();
        }
      } else setLoginWarningTnc("Please accept the terms and conditions!");
    } else setLoginWarning("Field required!");
  };

  const handleBlurMobileNumber = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(mobileNumber) &&
    setMobileValid("Invalid mobile number!");

  const handleBlurPhoneNumber = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(phoneNumber) &&
    setPhoneValid("Invalid phone number!");

  if (isAdmin && loginSuccess)
    return <Redirect to={"/admin-property/add/basic-info"} />;
  else if (loginSuccess)
    return <Redirect to={`/otp-verification/${emailReturn}`} />;
  else
    return (
      <>
        <ToastContainer />
        <CustomSpinner isLoading={isLoading} />
        <Header />
        <div className="register-wrapper sectionPB">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="main-heading">
                  <h4 className="heading">Register</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-wrapper">
                  <div className="head_form">
                    <h3>User Information</h3>
                  </div>
                  <div className="form_wrap">
                    <div className="row">
                      <div className="col-md-6">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="firstName">First Name</label>
                          <input
                            id="firstName"
                            type="text"
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
                          <label htmlFor="lastName">Last Name</label>
                          <input
                            id="lastName"
                            type="text"
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
                          <label htmlFor="role">Role in Property</label>
                          <input
                            id="role"
                            type="text"
                            className={
                              !role && loginWarning
                                ? "form-control error-input"
                                : "form-control"
                            }
                            placeholder="Role in Property"
                            onChange={(e) => setRole(e.target.value)}
                          />
                          <p
                            className={
                              !role && loginWarning
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
                          <label htmlFor="mobileNumber">Mobile Number</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <select className="form-control" disabled>
                                <option>{countryCode}</option>
                              </select>
                            </div>
                            <input
                              id="mobileNumber"
                              type="text"
                              className={
                                (!mobileNumber && loginWarning) || mobileValid
                                  ? "form-control error-input"
                                  : "form-control"
                              }
                              placeholder="Mobile Number"
                              onChange={(e) => setMobileNumber(e.target.value)}
                              onBlur={handleBlurMobileNumber}
                            />
                          </div>
                          <p
                            className={
                              !mobileNumber && loginWarning
                                ? "text-danger"
                                : "display-none"
                            }
                          >
                            {loginWarning}
                          </p>
                          <p
                            className={
                              mobileValid ? "text-danger" : "display-none"
                            }
                          >
                            {mobileValid}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="inputState">Country</label>
                          <select
                            id="inputState"
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
                          <label htmlFor="inputState2">City</label>
                          <select
                            id="inputState2"
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
                                <option key={`city-${idx}`}>{city}</option>
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

                      <div className="col-md-12">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            type="email"
                            className={
                              (!email && loginWarning) || emailValid
                                ? "form-control error-input"
                                : "form-control"
                            }
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <p
                            className={
                              !email && loginWarning
                                ? "text-danger"
                                : "display-none"
                            }
                          >
                            {loginWarning}
                          </p>
                          <p
                            className={
                              emailValid ? "text-danger" : "display-none"
                            }
                          >
                            {emailValid}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="password">Password</label>
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={
                              !password && loginWarning
                                ? "form-control error-input"
                                : "form-control"
                            }
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <img
                            className="cursorPointer eye-password"
                            src={require("../assets/img/icons/icon-awesome-eye.svg")}
                            alt="eye-icon"
                            onClick={() =>
                              setShowPassword((prevState) => !prevState)
                            }
                          />
                          <p
                            className={
                              !password && loginWarning
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

              <div className="col-md-6">
                <div className="form-wrapper">
                  <div className="head_form">
                    <h3>Property Information</h3>
                  </div>
                  <div className="form_wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="propertyName">Property Name</label>
                          <input
                            id="propertyName"
                            type="text"
                            className={
                              !propertyName && loginWarning
                                ? "form-control error-input"
                                : "form-control"
                            }
                            placeholder="Property Name"
                            onChange={(e) => setPropertyName(e.target.value)}
                          />
                          <p
                            className={
                              !propertyName && loginWarning
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
                          <label htmlFor="inputState3">Property Type</label>
                          <select
                            id="inputState"
                            className={
                              !propertyType && loginWarning
                                ? "form-control error-input"
                                : "form-control"
                            }
                            onChange={(e) => setPropertyType(e.target.value)}
                          >
                            <option selected disabled>
                              Select Property
                            </option>
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

                      <div className="col-md-12">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <select className="form-control" disabled>
                                <option>{countryCode}</option>
                              </select>
                            </div>
                            <input
                              id="phoneNumber"
                              type="text"
                              className={
                                (!phoneNumber && loginWarning) || phoneValid
                                  ? "form-control error-input"
                                  : "form-control"
                              }
                              placeholder="Phone Number"
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              onBlur={handleBlurPhoneNumber}
                            />
                          </div>
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

                      <div className="col-md-12">
                        <div id="" className="field-wrapper input">
                          <label htmlFor="name">Stand Alone Property?</label>
                          <div
                            className="switch-field"
                            onChange={(e) =>
                              setStandAloneProperty(e.target.value)
                            }
                          >
                            <input
                              type="radio"
                              id="radio-one"
                              name="switch-one"
                              value="Yes"
                              defaultChecked
                            />
                            <label htmlFor="radio-one">Yes</label>
                            <input
                              type="radio"
                              id="radio-two"
                              name="switch-one"
                              value="No"
                            />
                            <label htmlFor="radio-two">No</label>
                          </div>
                        </div>
                      </div>

                      <div
                        className={
                          standAloneProperty !== "Yes"
                            ? "col-md-12"
                            : "display-none"
                        }
                      >
                        <div id="" className="field-wrapper input">
                          <label htmlFor="nameOfChain">Name of Chain</label>
                          <input
                            id="nameOfChain"
                            type="text"
                            className={
                              !nameOfChain && loginWarning
                                ? "form-control error-input"
                                : "form-control"
                            }
                            placeholder="Name of Chain"
                            onChange={(e) => setNameOfChain(e.target.value)}
                          />
                          <p
                            className={
                              !nameOfChain && loginWarning
                                ? "text-danger"
                                : "display-none"
                            }
                          >
                            {loginWarning}
                          </p>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="md-checkbox">
                          <input
                            id="i1"
                            type="checkbox"
                            checked={emailSubscription}
                            onChange={(e) =>
                              setEmailSubscription(e.currentTarget.checked)
                            }
                          />
                          <label htmlFor="i1">
                            Yes, I want to subscribe to email
                          </label>
                        </div>

                        <div className="md-checkbox">
                          <input
                            id="i2"
                            type="checkbox"
                            checked={userTnc}
                            onChange={(e) =>
                              setUserTnc(e.currentTarget.checked)
                            }
                          />
                          <label htmlFor="i2">
                            I Agree to Terms & Conditions as a User
                            <span className="ml-4">
                              <Link to={"/terms-n-conditions"}>Learn more</Link>
                            </span>
                          </label>

                          <p
                            className={
                              !userTnc && loginWarningTnc
                                ? "text-danger"
                                : "display-none"
                            }
                          >
                            {loginWarningTnc}
                          </p>
                        </div>

                        <div className="md-checkbox">
                          <input
                            id="i3"
                            type="checkbox"
                            checked={vendorTnc}
                            onChange={(e) =>
                              setVendorTnc(e.currentTarget.checked)
                            }
                          />
                          <label htmlFor="i3">
                            I Agree to Terms & Conditions as a Vendor
                            <span className="ml-4">
                              <Link to={"/terms-n-conditions-vendor"}>
                                Terms & Conditions
                              </Link>
                            </span>
                          </label>
                          <p
                            className={
                              !vendorTnc && loginWarningTnc
                                ? "text-danger"
                                : "display-none"
                            }
                          >
                            {loginWarningTnc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-sub mt20">
                  <span className="btn_submit" onClick={handleSubmit}>
                    Submit Details
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Registration;
