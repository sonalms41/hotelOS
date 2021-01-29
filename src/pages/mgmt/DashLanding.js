import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popover from "react-tiny-popover";
import SidebarRevenue from "../../components/SidebarRevenue";
import CustomSpinner from "../../components/CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

import KhaltiLogo from "../../assets/img/icons/khalti_logo.svg";

function DashLanding() {
  const [propertyId] = useState(PROPERTY_ID());
  const [userToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [homeStatus, setHomeStatus] = useState(null);
  const [homeStatusSelect, setHomeStatusSelect] = useState("today");
  const [upcoming, setUpcoming] = useState([]);
  const [roomPrice, setRoomPrice] = useState([]);
  const [walkinPercent, setWalkinPercent] = useState(null);
  const [onlinePercent, setOnlinePercent] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Dashboard`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/home-page-status/?property_id=${propertyId}`,
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
          console.log("home status", data);
          if (data.status_code === 200) {
            setHomeStatus(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();

    const fetchDataUpcoming = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/upcomming-booking-details/?property_id=${propertyId}&page_number=1`,
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
          console.log("data upcoming", data);
          if (data.status_code === 200) {
            setUpcoming(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchDataUpcoming();

    const fetchRoomPrice = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/room-price-list/?property_id=${propertyId}`,
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
          console.log("room price", data);
          if (data.status_code === 200) {
            setRoomPrice(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchRoomPrice();

    const fetchBookingPercent = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/guests-percentage/?property_id=${propertyId}`,
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
          console.log("booking percentage", data);
          if (data.status_code === 200) {
            setWalkinPercent(data.result.walkin);
            setOnlinePercent(data.result.portal);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchBookingPercent();
  }, []);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <SidebarRevenue />

      <div className="page_contents_pright">
        <div className="row">
          <div className="col-md-12">
            <div className="main_tile">
              <h4 className="heading">Dashboard</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="item_dashboardCard report-box zoom-animation">
                  <div className="row">
                    <div className="col-auto mr-auto card_title ml-3">
                      <h5 className="ml-2">
                        {homeStatusSelect === "today"
                          ? "Today's"
                          : homeStatusSelect === "week"
                          ? "Weekly"
                          : homeStatusSelect === "month"
                          ? "Monthly"
                          : ""}{" "}
                        Status
                      </h5>
                    </div>
                    <div className="col-auto mt-2 mr-2">
                      <Popover
                        isOpen={isPopoverOpen}
                        position={"bottom"} // preferred position
                        onClickOutside={() => setIsPopoverOpen(false)}
                        content={
                          <div className="dash_status_dropdown">
                            <div
                              className="cursorPointer"
                              onClick={() => {
                                setHomeStatusSelect("today");
                                setIsPopoverOpen(false);
                              }}
                            >
                              Today's Status
                            </div>
                            <hr className="dashland_horiz_line" />
                            <div
                              className="cursorPointer"
                              onClick={() => {
                                setHomeStatusSelect("week");
                                setIsPopoverOpen(false);
                              }}
                            >
                              Weekly Status
                            </div>
                            <hr className="dashland_horiz_line" />
                            <div
                              className="cursorPointer"
                              onClick={() => {
                                setHomeStatusSelect("month");
                                setIsPopoverOpen(false);
                              }}
                            >
                              Monthly Status
                            </div>
                          </div>
                        }
                      >
                        <p
                          className="font-weight-bold mt-3 mr-2"
                          onClick={() =>
                            setIsPopoverOpen((prevState) => !prevState)
                          }
                        >
                          &#xFE19;
                        </p>
                      </Popover>
                    </div>
                  </div>
                  <hr className="dashland_horiz_line" />
                  <div className="cart_contents price_cardDashboard">
                    <div className="row-cl">
                      <div className="row">
                        <div className="col-6">
                          <div className="daily_status">Checkins</div>
                        </div>
                        <div className="col-6">
                          <div className="daily_count checkin_status">
                            {homeStatus && homeStatusSelect === "today"
                              ? homeStatus.Today.checkins
                              : homeStatusSelect === "week"
                              ? homeStatus.Week.checkins
                              : homeStatusSelect === "month"
                              ? homeStatus.Month.checkins
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row-cl">
                      <div className="row">
                        <div className="col-6">
                          <div className="daily_status">Checkouts</div>
                        </div>
                        <div className="col-6">
                          <div className="daily_count checkout_status">
                            {homeStatus && homeStatusSelect === "today"
                              ? homeStatus.Today.checkouts
                              : homeStatusSelect === "week"
                              ? homeStatus.Week.checkouts
                              : homeStatusSelect === "month"
                              ? homeStatus.Month.checkouts
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="dashland_horiz_line" />
                    <div className="row-cl">
                      <div className="row">
                        <div className="col-6">
                          <div className="daily_status">Used Rooms</div>
                        </div>
                        <div className="col-6">
                          <div className="daily_count checkin_status">
                            {homeStatus && homeStatusSelect === "today"
                              ? homeStatus.Today.used_rooms
                              : homeStatusSelect === "week"
                              ? homeStatus.Week.used_rooms
                              : homeStatusSelect === "month"
                              ? homeStatus.Month.used_rooms
                              : ""}{" "}
                            of {homeStatus && homeStatus.total_rooms}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row-cl">
                      <div className="row">
                        <div className="col-6">
                          <div className="daily_status">Total Guest</div>
                        </div>
                        <div className="col-6">
                          <div className="daily_count checkin_status">
                            {homeStatus && homeStatusSelect === "today"
                              ? homeStatus.Today.total_guest
                              : homeStatusSelect === "week"
                              ? homeStatus.Week.total_guest
                              : homeStatusSelect === "month"
                              ? homeStatus.Month.total_guest
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item_dashboardCard report-box zoom-animation">
                  <div className="card_title">
                    <h5 className="">Price</h5>
                  </div>
                  <hr className="dashland_horiz_line" />
                  <div className="cart_contents price_cardDashboard">
                    {roomPrice.length > 0 &&
                      roomPrice.map((roomPrc, idx) => (
                        <div key={`roomPrc-${idx}`} className="row-cl">
                          <div className="row">
                            <div className="col-7">
                              <div className="daily_status">
                                {roomPrc.room_name}
                              </div>
                            </div>
                            <div className="col-5">
                              <div className="daily_count">
                                NRS. {roomPrc.price}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="item_dashboardCard report-box zoom-animation">
                  <div className="card_title">
                    <h5>Report</h5>
                  </div>
                  <hr className="dashland_horiz_line" />
                  <div className="cart_contents price_cardDashboard mt-4">
                    <div className="progress" style={{ height: "2rem" }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          backgroundColor: "#84DEA1",
                          width: `${walkinPercent}%`,
                        }}
                        aria-valuenow={walkinPercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span className="text-dark font12">
                          {walkinPercent}%
                        </span>
                      </div>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          backgroundColor: "#A9ACF6",
                          width: `${onlinePercent}%`,
                        }}
                        aria-valuenow={onlinePercent}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <span className="text-dark font12">
                          {onlinePercent}%
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Walk In</p>
                      <p>Online</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mt-4">
            <div className="dashboard_bookingWrapper">
              <div className="row mt-2">
                <div className="col-auto mx-3 my-2 mr-auto">
                  <p className="font-weight-bold text-dark font14">Upcoming</p>
                </div>
                <div className="col-auto mx-3 my-2">
                  <Link to={"./bookings"}>
                    <p className="font-weight-bold text-dark">View All</p>
                  </Link>
                </div>
              </div>
              <hr className="dashland_horiz_line" />
              {upcoming.length > 0 ? (
                upcoming.map((up, index) => (
                  <div key={`up-${index}`} className="mb-4">
                    {up.bookings.length > 0 && (
                      <>
                        <div className="m-3">
                          <span className="font-weight-bold font14 mr-2">
                            {up.day}:
                          </span>
                          <span className="mt-1">
                            {up.total_bookings} Bookings
                            <span className="mx-2">|</span>
                            {up.total_rooms} Rooms
                            <span className="mx-2">|</span>
                            {up.total_guests} Guests
                          </span>
                        </div>
                        {up.bookings.map((book, idx) => (
                          <div
                            key={`up-book-${idx}`}
                            className={
                              book.delay_status !== "Delayed"
                                ? "upcoming_details_datewise mb-2"
                                : "completed_details_datewise mb-2"
                            }
                          >
                            <div className="row">
                              <div className="col-md-3">
                                <p className="font-weight-bold text-dark">
                                  {book.full_name}
                                </p>
                                <p>
                                  {book.rooms} - {book.guests} - {book.nights}
                                </p>
                              </div>
                              <div className="col-md-2 mt-3">
                                <p className="font-weight-bold">
                                  {book.phone_number}
                                </p>
                              </div>
                              <div className="col-md-3 mt-1">
                                <p className="rd_timedate_green">
                                  {book.room_type[0].room_type__name}
                                </p>
                              </div>
                              <div className="col-md-2 mt-1">
                                {book.paid_with === "Khalti" ? (
                                  <img
                                    className="khalti_logo mt-2"
                                    src={KhaltiLogo}
                                    alt="Khalti"
                                  />
                                ) : (
                                  <p className="rd_timedate_red">
                                    {book.paid_with}
                                  </p>
                                )}
                              </div>
                              <div className="col-md-2 mt-1">
                                <p className="rd_timedate">
                                  NRS. {book.paid_price}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))
              ) : (
                <h3 className="d-flex justify-content-center mt120 mb120">
                  No upcoming booking!
                </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashLanding;
