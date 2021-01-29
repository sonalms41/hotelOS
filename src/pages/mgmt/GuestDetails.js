import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import OrderHistory from "../../components/guestDetail/OrderHistory";
import StayExtend from "../../components/guestDetail/StayExtend";
import GuestIncrease from "../../components/guestDetail/GuestIncrease";
import RoomAdd from "../../components/guestDetail/RoomAdd";
import RoomDel from "../../components/guestDetail/RoomDel";
import OrderAdd from "../../components/guestDetail/OrderAdd";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

const MODALS = {
  ORDER: "order",
  ORDER_ADD: "orderAdd",
  STAY: "stay",
  GUEST: "guest",
  ROOM: "roomAdd",
  ROOM_DEL: "roomDel",
};

const GUEST_STATUS = {
  upcoming: "Upcomming",
  inhouse: "Inhouse",
  completed: "Checked",
};

function GuestDetails(props) {
  const [propertyId] = useState(PROPERTY_ID());
  const [userToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [guestDetails, setGuestDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState([]);
  const [isRefetch, setIsRefetch] = useState(false);
  const [isRefetchComponent, setIsRefetchComponent] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Guest Details`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/add-guest/?property_id=${propertyId}&guest_id=${props.match.params.id}`,
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
            setGuestDetails(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [props.match.params.id, isRefetch]);

  const copyGuestCode = () => {
    document.getElementById("guestCodeForCopy").select();
    document.execCommand("copy");
  };

  const closeModalHandler = (modal) => {
    let temp = isModalOpen;
    temp = temp.filter((t) => t !== modal);
    setIsModalOpen(temp);
  };

  const confirmSubmit = () => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleStatus(),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleStatus = () => {
    let guestStatus = "";
    if (guestDetails.status === GUEST_STATUS.upcoming)
      guestStatus = GUEST_STATUS.inhouse;
    else if (guestDetails.status === GUEST_STATUS.inhouse)
      guestStatus = GUEST_STATUS.completed;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/change-status/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          guest_id: props.match.params.id,
          booking_status: guestStatus,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data status", data);
          if (data.status_code === 200) refetchData();
          else if (data.status_code === 400) {
            toast.error(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const refetchData = () => setIsRefetch((prevState) => !prevState);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">{guestDetails.full_name}</h4>
          </div>
          <div className="col-auto">
            {guestDetails.status === GUEST_STATUS.upcoming && (
              <span className="btn_addo" onClick={confirmSubmit}>
                Send to INHOUSE
              </span>
            )}
            {guestDetails.status === GUEST_STATUS.inhouse && (
              <span className="btn_addo" onClick={confirmSubmit}>
                Send to CHECKED
              </span>
            )}
          </div>
          {/*<div className="col-auto">*/}
          {/*  <Popover*/}
          {/*    isOpen={isPopoverOpen}*/}
          {/*    position={"bottom"} // preferred position*/}
          {/*    onClickOutside={() => setIsPopoverOpen(false)}*/}
          {/*    content={*/}
          {/*      <div className="popover_wrap font12">*/}
          {/*        <div>*/}
          {/*          <span className="cursorPointer">Report</span>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    }*/}
          {/*  >*/}
          {/*    <div*/}
          {/*      className="font20 font-weight-bold cursorPointer"*/}
          {/*      onClick={() => setIsPopoverOpen((prevState) => !prevState)}*/}
          {/*    >*/}
          {/*      &#xFE19;*/}
          {/*    </div>*/}
          {/*  </Popover>*/}
          {/*</div>*/}
        </div>
      </div>

      <div className="dashboard_wrapper">
        <div className="row">
          <div className="col-md-4">
            <div className="guest_det_card">
              <div className="row">
                <div className="col-md-3">
                  <img
                    className="bg-color-light1 rounded-circle w-100"
                    src={require("../../assets/img/icons/icon-feather-user.svg")}
                    alt="DP"
                  />
                  {guestDetails.status === GUEST_STATUS.upcoming && (
                    <div className="guest_det_status0">COMING</div>
                  )}
                  {guestDetails.status === GUEST_STATUS.inhouse && (
                    <div className="guest_det_status">INHOUSE</div>
                  )}
                  {guestDetails.status === GUEST_STATUS.completed && (
                    <div className="guest_det_status2">CHECKED</div>
                  )}
                </div>
                <div className="col-md-9">
                  <p className="text-dark font16 font-weight-bold">
                    {guestDetails.full_name}
                  </p>
                  <p>
                    <img
                      src={require("../../assets/img/icons/ionic-ios-call.svg")}
                      alt="Phone"
                    />
                    <span className="ml-2 text-success">
                      {guestDetails.phone_number}
                    </span>
                  </p>
                  <p>
                    <img
                      className="cursorPointer mr-2"
                      src={require("../../assets/img/icons/icon-feather-copy.svg")}
                      alt="Copy"
                      onClick={copyGuestCode}
                    />
                    <input
                      id="guestCodeForCopy"
                      className="inputWithNoStyle text-dark font12 font_weight600"
                      value={guestDetails.guest_code}
                    />
                  </p>
                  {guestDetails.guest_rooms !== undefined &&
                    guestDetails.guest_rooms.length > 0 &&
                    guestDetails.guest_rooms.map((room, index) => (
                      <span key={`groom-${index}`} className="guest_det_room">
                        Room {room.room_number}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="guest_det_card">
                  <div>
                    <img
                      src={require("../../assets/img/icons/icon-feather-calendar.svg")}
                      alt="Calendar"
                    />
                    <span className="ml-3 font-weight-bold">
                      {guestDetails.checkin_old} - {guestDetails.checkout_old}
                    </span>
                  </div>
                  <p className="ml-5">
                    <span className="ml-1">
                      {guestDetails.nights} Night, {guestDetails.nights} Day
                    </span>
                  </p>
                  {guestDetails.status !== GUEST_STATUS.completed && (
                    <span
                      className="ml-5 guestDetailBtn"
                      onClick={() =>
                        setIsModalOpen((prevState) => [
                          ...prevState,
                          MODALS.STAY,
                        ])
                      }
                    >
                      EXTEND STAY
                    </span>
                  )}
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="guest_det_card">
                  <div>
                    <img
                      src={require("../../assets/img/icons/icon-bed.svg")}
                      alt="Bedroom"
                    />
                    <span className="ml-3 font-weight-bold">
                      {guestDetails.guest_rooms !== undefined &&
                        guestDetails.guest_rooms.length}{" "}
                      Room {guestDetails.guests + guestDetails.child} Guest
                    </span>
                  </div>
                  <div className="ml-5">
                    {guestDetails.guest_rooms !== undefined &&
                      guestDetails.guest_rooms.length > 0 &&
                      guestDetails.guest_rooms.map((room, index) => (
                        <span key={`grtype-${index}`} className="mr-3">
                          {room.room_type}
                        </span>
                      ))}
                  </div>
                  {guestDetails.status !== GUEST_STATUS.completed && (
                    <>
                      {/*<span*/}
                      {/*  className="ml-5 guestDetailBtn"*/}
                      {/*  onClick={() =>*/}
                      {/*    setIsModalOpen((prevState) => [*/}
                      {/*      ...prevState,*/}
                      {/*      MODALS.GUEST,*/}
                      {/*    ])*/}
                      {/*  }*/}
                      {/*>*/}
                      {/*  INCREASE GUEST*/}
                      {/*</span>*/}
                      <span
                        className="ml-5 guestDetailBtn"
                        onClick={() =>
                          setIsModalOpen((prevState) => [
                            ...prevState,
                            MODALS.ROOM,
                          ])
                        }
                      >
                        ADD ROOM
                      </span>
                      <span
                        className="ml-5 guestDetailBtn"
                        onClick={() =>
                          setIsModalOpen((prevState) => [
                            ...prevState,
                            MODALS.ROOM_DEL,
                          ])
                        }
                      >
                        REMOVE ROOM
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="guest_det_card">
                  <div>
                    <img
                      src={require("../../assets/img/icons/icon-material-room-service.svg")}
                      alt="Meal"
                    />
                    <span className="ml-3 font-weight-bold">
                      Breakfast & Meal
                    </span>
                  </div>
                  <p className="ml-5 text-danger font20">
                    NRS {guestDetails.breakfast_and_meals}
                  </p>
                  {guestDetails.status === GUEST_STATUS.inhouse && (
                    <span
                      className="ml-5 guestDetailBtn"
                      onClick={() =>
                        setIsModalOpen((prevState) => [
                          ...prevState,
                          MODALS.ORDER_ADD,
                        ])
                      }
                    >
                      + ADD ORDER
                    </span>
                  )}
                  <span
                    className="ml-5 guestDetailBtn"
                    onClick={() =>
                      setIsModalOpen((prevState) => [
                        ...prevState,
                        MODALS.ORDER,
                      ])
                    }
                  >
                    VIEW ORDER
                  </span>
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="row">
                  <div className="col-md-8">
                    <div className="guest_det_card_booking_amt">
                      <div>
                        <img
                          src={require("../../assets/img/icons/icon-awesome-money-bill.svg")}
                          alt="Amount"
                        />
                        <span className="ml-3 font-weight-bold">
                          Booking Amount
                        </span>
                      </div>
                      <div className="my-3">
                        <span className="mr-4">TOTAL</span>
                        <span className="font20">
                          NRS. {guestDetails.total_amount}
                        </span>
                      </div>
                    </div>
                  </div>
                  {guestDetails.status === GUEST_STATUS.inhouse && (
                    <div className="col-md-4">
                      <div className="guest_det_card_billingBtn">
                        <Link
                          to={`/dashboard/guest-billing/${props.match.params.id}`}
                          style={{ color: "#fff" }}
                        >
                          +Billing
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderAdd
        className="modal"
        show={isModalOpen.includes(MODALS.ORDER_ADD)}
        close={() => closeModalHandler(MODALS.ORDER_ADD)}
        id={props.match.params.id}
        refetch={refetchData}
        refetchComponent={() =>
          setIsRefetchComponent((prevState) => !prevState)
        }
      />
      <OrderHistory
        className="modal"
        show={isModalOpen.includes(MODALS.ORDER)}
        close={() => closeModalHandler(MODALS.ORDER)}
        id={props.match.params.id}
        refetchComponent={isRefetchComponent}
      />
      <StayExtend
        className="modal"
        show={isModalOpen.includes(MODALS.STAY)}
        close={() => closeModalHandler(MODALS.STAY)}
        guestInfo={guestDetails}
        refetch={refetchData}
      />
      <GuestIncrease
        className="modal"
        show={isModalOpen.includes(MODALS.GUEST)}
        close={() => closeModalHandler(MODALS.GUEST)}
        guestInfo={guestDetails}
        refetch={refetchData}
      />
      <RoomAdd
        className="modal"
        show={isModalOpen.includes(MODALS.ROOM)}
        close={() => closeModalHandler(MODALS.ROOM)}
        guestInfo={guestDetails}
        refetch={refetchData}
      />
      <RoomDel
        className="modal"
        show={isModalOpen.includes(MODALS.ROOM_DEL)}
        close={() => closeModalHandler(MODALS.ROOM_DEL)}
        guestInfo={guestDetails}
        refetch={refetchData}
      />
    </>
  );
}

export default GuestDetails;
