import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Popover from "react-tiny-popover";
import CustomSpinner from "../../components/CustomSpinner";
import { toast } from "react-toastify";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import { confirmAlert } from "react-confirm-alert";
import { INIT_DATES } from "../../components/InitializeDate";

function RoomDetails(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState(
    INIT_DATES(Date.now() - 5 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(INIT_DATES(Date.now()));
  const [isPopoverOpen, setIsPopoverOpen] = useState([]);
  const [roomStatus, setRoomStatus] = useState(true);
  const [roomDetails, setRoomDetails] = useState([]);

  let history = useHistory();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Room Details`;

    const fetchRoomAccess = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/room-access-mgmt/?property_id=${propertyId}&room_number=${props.match.params.id}`,
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
          console.log("get room access", data);
          if (data.status_code === 200) setRoomStatus(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchRoomAccess();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/guests-in-room/?property_id=${propertyId}&room_number=${props.match.params.id}&date_in=${startDate}&date_out=${endDate}`,
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
          console.log("room detail", data.result);
          setRoomDetails(data.result);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [startDate, endDate]);

  const confirmSubmit = (value) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRoomStatus(value),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleRoomStatus = (status) => {
    const fetchRoomAccess = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/room-access-mgmt/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          room_number: props.match.params.id,
          room_status: status,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("post room access", data);
          if (data.status_code === 200) setRoomStatus(status);
          else if (data.status_code === 400) {
            toast.error(data.message);
            setRoomStatus(true);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchRoomAccess();
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">
          <img
            className="cursorPointer"
            src={require("../../assets/img/icons/material-keyboard-backspace.svg")}
            alt="Back"
            onClick={() => history.goBack()}
          />
          <span className="ml-4">Room No. {props.match.params.id}</span>
        </h4>
      </div>

      <div className="dashboard_wrapper">
        <div className="row row--header">
          <div className="col-auto">
            <p className="font-weight-bold text-dark font16">
              Manage Room No. {props.match.params.id}
            </p>
          </div>
          <div className="col-auto">
            <label className="switchRoomStatus">
              <input
                type="checkbox"
                checked={roomStatus}
                onChange={(e) => confirmSubmit(e.target.checked)}
              />
              <span className="sliderRoomStatus" />
            </label>
          </div>
          <div className="col-auto mr-auto font14 mt-1">
            {!roomStatus ? (
              <span className="text-danger">Disabled</span>
            ) : (
              <span className="text-success">Enabled</span>
            )}
          </div>
          <div className="col-auto">
            <div className="form-inline">
              <div className="field-wrapper input">
                <input
                  type="date"
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <span className="mx-4 font14 mb-2">to</span>
              <div className="field-wrapper input">
                <input
                  type="date"
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />

        {roomDetails.length > 0 ? (
          roomDetails.map((det, index) => (
            <div key={`det-${index}`} className="mb-4">
              <p className="font-weight-bold">{det.day}</p>
              {det.guests.length > 0 &&
                det.guests.map((guestDet, idx) => (
                  <React.Fragment key={`guestDet-${idx}`}>
                    <div
                      className={
                        !guestDet.active
                          ? "room_details_datewise mb-2"
                          : "room_details_datewise_active mb-2"
                      }
                    >
                      <div className="row ">
                        <div className="col-md-2">
                          <p className="font-weight-bold text-dark">
                            {guestDet.full_name}
                          </p>
                          <p>
                            {guestDet.guest} Guests - {guestDet.nights} Nights
                          </p>
                        </div>
                        <div className="col-md-2">
                          <p className="font-weight-bold">
                            {guestDet.phone_number}
                          </p>
                          <p>{guestDet.email}</p>
                        </div>
                        <div className="col-auto mt-1">
                          <p className="rd_timedate">
                            {guestDet.checkin_time}
                            <span className="mx-2">|</span>
                            {guestDet.checkin_full_date}
                          </p>
                        </div>
                        <div className="col-auto mt-1">
                          <p className="rd_timedate_red">
                            {guestDet.checkout_time}
                            <span className="mx-2">|</span>
                            {guestDet.checkout_full_date}
                          </p>
                        </div>
                        <div className="col-auto ml-auto mt-2">
                          <span className="font-weight-bold font14 text-success mt-2 mr-3">
                            {guestDet.price}
                          </span>
                          <Popover
                            isOpen={isPopoverOpen.includes(guestDet.guest_id)}
                            position={"bottom"} // preferred position
                            onClickOutside={() => setIsPopoverOpen([])}
                            content={
                              <div className="popover_wrap">
                                <div>
                                  <Link
                                    to={`../guest-details/${guestDet.guest_id}`}
                                  >
                                    View Details
                                  </Link>
                                </div>
                                <div>
                                  <a onClick={(e) => e.preventDefault()}>
                                    Delete
                                  </a>
                                </div>
                              </div>
                            }
                          >
                            <span
                              className="cursorPointer font-weight-bold mt-2"
                              onClick={() =>
                                setIsPopoverOpen((prevState) => [
                                  ...prevState,
                                  guestDet.guest_id,
                                ])
                              }
                            >
                              &#xFE19;
                            </span>
                          </Popover>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          ))
        ) : (
          <h3 className="d-flex justify-content-center mt120 mb120">
            Not occupied by guest currently!
          </h3>
        )}
      </div>
    </>
  );
}

export default RoomDetails;
