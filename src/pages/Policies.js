import React, { useEffect, useRef, useState } from "react";
import { Redirect } from "react-router-dom";
import HeaderMain from "../components/HeaderMain";
import Sidebar, { INIT_PAGES } from "../components/Sidebar";
import Footer from "../components/Footer";
import Modal from "../components/AddCancellationPolicy";
import CustomSpinner from "../components/CustomSpinner";
import { adminStatus } from "../components/utility/localStorage";
import { confirmAlert } from "react-confirm-alert";
import {
  PROPERTY_ID,
  USER_ID,
  USER_TOKEN,
} from "../components/LocalStorageInfo";

function Policies(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [minAdult, setMinAdult] = useState("18 yrs");
  const [minChild, setMinChild] = useState("3-5 yrs");
  const [minInfant, setMinInfant] = useState("0-1 yrs");
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [paymentMethodData, setPaymentMethodData] = useState([
    "Visa",
    "FonePay",
    "Mastercard",
    "Union Pay",
    "Khalti",
    "eSewa",
    "IME Pay",
  ]);
  const [hotelPolicy, setHotelPolicy] = useState([]);
  const [hotelPolicyData, setHotelPolicyData] = useState([
    "Government Photo ID required for check-in",
    "Adults only",
    "Children suitable",
    "Pet Allowed",
    "Pet Not Allowed",
    "Alcohol allowed onsite",
    "Pan Card Accepted",
  ]);
  const [cancellationPolicy, setCancellationPolicy] = useState([]);
  const [addCancellationPolicy, setAddCancellationPolicy] = useState(false);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Policies";
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

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/hotel-policies/?property_id=${propertyId}`,
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
              min_adult,
              min_child,
              min_infant,
              payment,
              policies,
              cancellation_policy,
            } = data.result;
            min_adult && setMinAdult(min_adult);
            min_child && setMinChild(min_child);
            min_infant && setMinInfant(min_infant);
            payment && setPaymentMethod(payment);
            policies && setHotelPolicy(policies);
            cancellation_policy.length > 0 &&
              setCancellationPolicy(cancellation_policy);
          }
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };

    sendSession();
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

  const openModalHandler = () => setAddCancellationPolicy(true);

  const closeModalHandler = () => setAddCancellationPolicy(false);

  const handlePaymentMethodChange = (e) => {
    let updatedData = [...paymentMethod];
    if (updatedData.includes(e.target.value))
      updatedData = updatedData.filter((t) => t !== e.target.value);
    else updatedData.push(e.target.value);
    setPaymentMethod(updatedData);
  };

  const handleHotelPolicyChange = (e) => {
    let updatedData = [...hotelPolicy];
    if (updatedData.includes(e.target.value))
      updatedData = updatedData.filter((t) => t !== e.target.value);
    else updatedData.push(e.target.value);
    setHotelPolicy(updatedData);
  };

  const handleCancellationPolicy = (policy) =>
    setCancellationPolicy([...cancellationPolicy, policy]);

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteCancelPolicy(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteCancelPolicy = (index) => {
    const updatedData = [...cancellationPolicy];
    updatedData.splice(index, 1);
    setCancellationPolicy(updatedData);
  };

  const handleCancelPolicySelection = (idx) => {
    let temp = [...cancellationPolicy];
    temp[idx].checked = !temp[idx].checked;
    setCancellationPolicy(temp);
  };

  const handleSubmit = () => {
    setLoginWarning("");
    if (minAdult && minChild && minInfant && paymentMethod && hotelPolicy) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.policies,
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
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/hotel-policies/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            property_id: propertyId,
            min_adult: minAdult,
            min_child: minChild,
            min_infant: minInfant,
            payment_type: paymentMethod,
            hotel_policies: hotelPolicy,
            cancel_list: cancellationPolicy,
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

  if (!userToken) return <Redirect to={"./"} />;
  else if (prevPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/photos" : "./photos"}
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={
          adminStatus() ? "/admin-property/add/bank-details" : "./bank-details"
        }
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
                  currentPage={INIT_PAGES.policies}
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
                            <h4 className="heading">Hotel Policies</h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12 mb-2">
                              <h5 className="heading">
                                Adult, Child & Infant Minimum Age Policies
                              </h5>
                            </div>

                            <div className="col-md-3">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="minAdult">Adult</label>
                                <select
                                  id="minAdult"
                                  value={minAdult}
                                  className={
                                    !minAdult && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setMinAdult(e.target.value)}
                                >
                                  <option>18 yrs</option>
                                  <option>17 yrs</option>
                                  <option>16 yrs</option>
                                </select>
                                <p
                                  className={
                                    !minAdult && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="minChild">Child</label>
                                <select
                                  id="minChild"
                                  value={minChild}
                                  className={
                                    !minChild && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setMinChild(e.target.value)}
                                >
                                  <option>3-5 yrs</option>
                                  <option>2-5 yrs</option>
                                </select>
                                <p
                                  className={
                                    !minChild && loginWarning
                                      ? "text-danger text-center"
                                      : "display-none"
                                  }
                                >
                                  {loginWarning}
                                </p>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div id="" className="field-wrapper input">
                                <label htmlFor="minInfant">Infant</label>
                                <select
                                  id="minInfant"
                                  value={minInfant}
                                  className={
                                    !minInfant && loginWarning
                                      ? "form-control error-input"
                                      : "form-control"
                                  }
                                  onChange={(e) => setMinInfant(e.target.value)}
                                >
                                  <option>0-1 yrs</option>
                                  <option>0-2 yrs</option>
                                </select>
                                <p
                                  className={
                                    !minInfant && loginWarning
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

                      <div className="info-wrapper mt-3">
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <h5 className="heading">Payment Method Accept</h5>
                            </div>

                            <div className="col-md-12">
                              <div className="tag-check">
                                <ul className="list-inline">
                                  {paymentMethodData.map((payment, index) => (
                                    <li key={`pm-${index}`}>
                                      <label className="check-tag">
                                        <input
                                          type="checkbox"
                                          value={payment}
                                          className="check-tag__input"
                                          checked={paymentMethod.includes(
                                            payment
                                          )}
                                          onChange={handlePaymentMethodChange}
                                        />
                                        <span className="check-tag__text">
                                          {payment}
                                        </span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p
                                className={
                                  !(paymentMethod.length > 0) && loginWarning
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

                      <div className="info-wrapper mt-3">
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <h5 className="heading">Hotel Policy</h5>
                            </div>

                            <div className="col-md-12">
                              <div className="tag-check">
                                <ul className="list-inline">
                                  {hotelPolicyData.map((policy, index) => (
                                    <li key={`hp-${index}`}>
                                      <label className="check-tag">
                                        <input
                                          type="checkbox"
                                          value={policy}
                                          className="check-tag__input"
                                          checked={hotelPolicy.includes(policy)}
                                          onChange={handleHotelPolicyChange}
                                        />
                                        <span className="check-tag__text">
                                          {policy}
                                        </span>
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p
                                className={
                                  !(hotelPolicy.length > 0) && loginWarning
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

                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4
                              className="heading"
                              style={{ color: "transparent" }}
                            >
                              Cancellation
                            </h4>
                          </div>
                        )}
                        <div
                          className={
                            !props.dashboard ? "info-form" : "dashboard_wrapper"
                          }
                        >
                          <div className="row">
                            <div className="col-md-12 mb-3">
                              <h5 className="heading">Cancellation Policies</h5>
                            </div>

                            {cancellationPolicy.length > 0 &&
                              cancellationPolicy.map((cancel, index) => (
                                <div
                                  key={`cp-${index}`}
                                  className="col-md-6 mb-3"
                                >
                                  <label>
                                    {/* Input element for the checkbox */}
                                    <input
                                      type="checkbox"
                                      name={`checkboxSts-${index}`}
                                      className="check-custom"
                                      checked={
                                        cancellationPolicy[index].checked
                                      }
                                      onChange={() =>
                                        handleCancelPolicySelection(index)
                                      }
                                    />
                                    {/* Customization element for the checkbox */}
                                    <span className="check-toggle" />
                                  </label>
                                  <div className="cancellation_wrapper">
                                    <p className="font-weight-bold text-dark font16">
                                      {cancel.cancelName}
                                    </p>
                                    <p className="font-weight-bold">
                                      Policy Details
                                    </p>
                                    <p>
                                      From {cancel.cancelFrom}hr to{" "}
                                      {cancel.cancelTo}hr
                                    </p>
                                    <div className="row">
                                      <div className="col-auto mr-auto">
                                        Penalty: {cancel.penalty} (
                                        {cancel.penaltyType})
                                      </div>
                                      <div className="col-auto">
                                        <img
                                          className="cursorPointer"
                                          src={require("../assets/img/icons/icon-material-delete-sweep-red.svg")}
                                          alt="delete-icon"
                                          onClick={() => confirmSubmit(index)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}

                            <Modal
                              className="modal"
                              show={addCancellationPolicy}
                              close={closeModalHandler}
                              handleCancellationPolicy={
                                handleCancellationPolicy
                              }
                            />

                            <div className="col-md-6 mt-5">
                              <div
                                className="card add-cancel-policy"
                                onClick={openModalHandler}
                              >
                                <div className="dashed-rect-area">Add New</div>
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
              nPage={6}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default Policies;
