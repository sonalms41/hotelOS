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

function RoomType(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(true);
  const [roomType, setRoomType] = useState([]);
  const [roomTypeSelection, setRoomTypeSelection] = useState([]);
  const [loginWarning, setLoginWarning] = useState("");
  const [pageState, setPageState] = useState(null);
  const [prevPage, setPrevPage] = useState(false);
  const [nextPage, setNextPage] = useState(false);

  useEffect(() => {
    document.title = "Room Type";
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

    const fetchRoomStatus = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/property-room-type/?property_id=${propertyId}`,
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
          console.log("data status", data);
          if (data.status_code === 200) {
            setRoomTypeSelection(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/save-all-roomtype/?property_id=${propertyId}`,
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
            setRoomType(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    sendSession();
    fetchRoomStatus();
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

  const handleRoomTypeSelection = (id) => {
    let updatedData = [...roomTypeSelection];
    if (updatedData.includes(id))
      updatedData = updatedData.filter((t) => t != id);
    else updatedData.push(id);
    setRoomTypeSelection(updatedData);
  };

  const handleSubmit = () => {
    setLoginWarning("");
    if (roomTypeSelection.length > 0) {
      const sendSession = async () => {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-session/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            page_name: INIT_PAGES.roomType,
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
          `${process.env.REACT_APP_API_BASE_URL}/property-room-type/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${userToken}`,
            },
            body: JSON.stringify({
              property_id: propertyId,
              room_type_ids: roomTypeSelection,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("data post", data);
            if (data.status_code === 200) {
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
        to={adminStatus() ? "/admin-property/add/amenities" : "./amenities"}
      />
    );
  else if (!props.dashboard && nextPage)
    return (
      <Redirect
        to={adminStatus() ? "/admin-property/add/photos" : "./photos"}
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
                  currentPage={INIT_PAGES.roomType}
                />
              )}
              {/* End Sidebar */}

              {/* Main-Content */}
              <div
                className={!props.dashboard ? "company-registerform" : "w-100"}
              >
                <div className="wrapper-formregster">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="info-wrapper">
                        {!props.dashboard && (
                          <div className="main-heading">
                            <h4 className="heading">Room Type</h4>
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
                                <h5 className="heading">Room Type</h5>
                              </div>
                            </div>

                            {roomType.length > 0 &&
                              roomType.map((rtype, idx) => (
                                <div
                                  key={`rtype-${idx}`}
                                  className="col-md-3 mb-3"
                                >
                                  <label>
                                    {/* Input element for the checkbox */}
                                    <input
                                      type="checkbox"
                                      name={`checkbox-${rtype.id}`}
                                      className="check-custom"
                                      checked={roomTypeSelection.includes(
                                        rtype.id
                                      )}
                                      onChange={() =>
                                        handleRoomTypeSelection(rtype.id)
                                      }
                                    />
                                    {/* Customization element for the checkbox */}
                                    <span className="check-toggle" />
                                  </label>
                                  <div className="cancellation_wrapper">
                                    <p>
                                      <span className="text-dark font16 font-weight-bold mr-2">
                                        {rtype.name}
                                      </span>
                                      <img
                                        src={require("../assets/img/icons/icon-feather-info.svg")}
                                        alt="Info"
                                      />
                                    </p>
                                    <p>No. of staying people</p>
                                    <p className="text-dark font-weight-bold">
                                      Max: {rtype.max}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            <div className="col-md-12">
                              <p
                                className={
                                  !(roomTypeSelection.length > 0) &&
                                  loginWarning
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
                </div>
              </div>
              {/* End Main-Content */}
            </div>
          </div>

          {/* Footer Nav */}
          {!props.dashboard && (
            <Footer
              nPage={4}
              handlePrevPage={handlePrevPage}
              handleSubmit={handleSubmit}
            />
          )}
          {/* End Footer Nav */}
        </div>
      </>
    );
}

export default RoomType;
