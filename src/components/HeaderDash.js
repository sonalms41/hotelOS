import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Popover from "react-tiny-popover";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { INIT_DATES } from "./InitializeDate";
import useOnClick from "./useOnClick";
import { PROPERTY_ID, PROPERTY_NAME, USER_TOKEN } from "./LocalStorageInfo";

import DefaultPropertyPicture from "../assets/default_property_picture.svg";

function HeaderDash({ toggleSidebar }) {
  const hasMount = useRef(false);
  const avatarDropdownRef = useRef();
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [propertyName, setPropertyName] = useState(PROPERTY_NAME());
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isPopoverNotifOpen, setIsPopoverNotifOpen] = useState(false);
  const [searchPopover, setSearchPopover] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [notification, setNotification] = useState([]);
  const [notificationBadge, setNotificationBadge] = useState(0);
  const [hotelLocation, setHotelLocation] = useState("");
  const [isPropertyPicture, setIsPropertyPicture] = useState(false);
  const [propertyPicture, setPropertyPicture] = useState("");

  useOnClick(avatarDropdownRef, () => setIsPopoverOpen(false));

  useEffect(() => {
    const client = new W3CWebSocket(
      `wss://backend.hamrohotel.com/cons/${propertyId}/`
    );
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      console.log("Portal Booking", message);
      setNotification((prevState) => [JSON.parse(message.data), ...prevState]);
      setNotificationBadge((prevState) => prevState + 1);
    };
    client.onerror = () => {
      console.log("Connection Error");
    };
    client.onclose = () => {
      console.log("WebSocket Client Closed");
    };

    return () => {
      client.close();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-messages/?property_id=${propertyId}&page=1`,
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
          console.log("data notification", data);
          if (data.status_code === 200) setNotification(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchData();

    const fetchPicture = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/soft/?property_id=${propertyId}`,
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
          console.log("property picture", data);
          if (data.status_code === 200) {
            setHotelLocation(data.city);
            setIsPropertyPicture(true);
            setPropertyPicture(data.result);
          } else if (data.status_code === 200) setIsPropertyPicture(false);
        })
        .catch((error) => console.error(error));
    };
    fetchPicture();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/search-guests/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          prop_id: propertyId,
          search_key: searchKey,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data search", data);
          if (data.status_code === 200) setSearchResult(data.result);
          else if (data.status_code === 400) setSearchResult([]);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [searchKey]);

  return (
    <nav className="header_wrapper head_nav clearfix">
      <div className="container-fluid">
        <div className="header_contain ">
          <div className="left-tg fLeft">
            <div className="slide_toogle fLeft">
              <img
                className="cursorPointer"
                src={require("../assets/images/icon/toggle-icon.svg")}
                alt="Toggle"
                onClick={toggleSidebar}
              />
            </div>
            <div className="dash__logo fLeft">
              <Link to={"/"}>
                <img src={require("../assets/img/logo.svg")} alt="Logo" />
              </Link>
            </div>
            <div className="dash__logo__small fLeft">
              <Link to={"/"}>
                <img
                  src={require("../assets/img/cn_logo_small.svg")}
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="header_search fLeft">
              <Popover
                isOpen={searchPopover}
                position={"bottom"}
                onClickOutside={() => setSearchPopover(false)}
                content={
                  <div className="header_searchBox">
                    {searchResult.length > 0 ? (
                      searchResult.map((res, idx) => (
                        <Link
                          key={`search-${idx}`}
                          to={`/dashboard/guest-details/${res.guest_id}`}
                        >
                          <div>{res.full_name}</div>
                          <div>{res.guest_code}</div>
                        </Link>
                      ))
                    ) : (
                      <p>No result found!</p>
                    )}
                  </div>
                }
              >
                <div>
                  <div className="iconst search-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15.332"
                      height="15.335"
                      viewBox="0 0 15.332 15.335"
                    >
                      <path
                        id="search"
                        d="M19.652,18.719l-4.264-4.3a6.077,6.077,0,1,0-.922.934L18.7,19.625a.656.656,0,0,0,.926.024A.661.661,0,0,0,19.652,18.719ZM10.613,15.4A4.8,4.8,0,1,1,14.006,14,4.769,4.769,0,0,1,10.613,15.4Z"
                        transform="translate(-4.5 -4.493)"
                        fill="#949494"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    value={searchKey}
                    placeholder="Search with Name or ID"
                    onChange={(e) => setSearchKey(e.target.value)}
                    onFocus={() => setSearchPopover(true)}
                    onBlur={() => setSearchPopover(false)}
                  />
                </div>
              </Popover>
            </div>
          </div>

          <div className="right_menu fRight">
            <ul>
              <li className="fLeft">
                <Link
                  to={"/dashboard/add-booking-walk"}
                  className="nav_newBooking btn-all"
                >
                  + New Booking
                </Link>
              </li>
              <li className="fLeft">
                <div
                  className="today_date btn-all"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-2">
                    Today:{" "}
                    {new Date().toString().split(" ").splice(1, 2).join(" ")}
                  </span>
                  <img
                    src={require("../assets/img/icons/icon-metro-calendar.svg")}
                    alt="cal"
                  />
                </div>
              </li>
              <li className="fLeft">
                <Popover
                  isOpen={isPopoverNotifOpen}
                  position={"bottom"} // preferred position
                  onClickOutside={() => setIsPopoverNotifOpen(false)}
                  content={
                    <div className="notif_dropdown font12">
                      <div className="row font-weight-bold mb-3">
                        <div className="col-auto font14 mr-auto">
                          Notifications
                        </div>
                        <div className="col-auto">
                          <Link
                            className="text-primary"
                            to={`/dashboard/notifications`}
                          >
                            View all
                          </Link>
                        </div>
                      </div>
                      {notification.length > 0 ? (
                        notification.map((notif, idx) => (
                          <div
                            key={`notification-${idx}`}
                            className="d-flex justify-content-between mb-3"
                          >
                            <img
                              className={
                                notif.status_code !== 200
                                  ? "notif_dropdown_image_cancel"
                                  : "notif_dropdown_image_booking"
                              }
                              src={require("../assets/img/icons/icon-feather-user.svg")}
                              alt="DP"
                            />
                            <div className="notif_dropdown_detail">
                              <p className="font-weight-bold">
                                {notif.username}
                              </p>
                              <p>{notif.event}</p>
                            </div>
                            <div className="notif_dropdown_time">
                              {notif.date}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p>No notification!</p>
                      )}
                    </div>
                  }
                >
                  <div
                    className="cursorPointer nav_notification btn-all"
                    onClick={() =>
                      setIsPopoverNotifOpen((prevState) => !prevState)
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17.823"
                      height="23.48"
                      viewBox="0 0 17.823 23.48"
                    >
                      <g
                        id="Group_947"
                        data-name="Group 947"
                        transform="translate(-1701.177 -26)"
                      >
                        <path
                          id="Path_221"
                          data-name="Path 221"
                          d="M18.895,28.336a.674.674,0,0,0-.661.531,1.3,1.3,0,0,1-.26.567.983.983,0,0,1-.838.307,1,1,0,0,1-.838-.307,1.3,1.3,0,0,1-.26-.567.674.674,0,0,0-.661-.531h0a.678.678,0,0,0-.661.827,2.324,2.324,0,0,0,2.419,1.93,2.32,2.32,0,0,0,2.419-1.93.681.681,0,0,0-.661-.827Z"
                          transform="translate(1692.34 18.387)"
                          fill="#707070"
                        />
                        <path
                          id="Path_222"
                          data-name="Path 222"
                          d="M23.195,19.344c-.8-1.056-2.377-1.675-2.377-6.4,0-4.853-2.143-6.8-4.141-7.272-.187-.047-.323-.109-.323-.307V5.21a1.276,1.276,0,0,0-1.248-1.28h-.031a1.276,1.276,0,0,0-1.248,1.28v.151c0,.192-.135.26-.323.307-2,.473-4.141,2.419-4.141,7.272,0,4.729-1.576,5.342-2.377,6.4A1.033,1.033,0,0,0,7.812,21H22.383A1.033,1.033,0,0,0,23.195,19.344Zm-2.029.3H9.035a.228.228,0,0,1-.172-.38,6.3,6.3,0,0,0,1.092-1.737A11.789,11.789,0,0,0,10.7,12.94a7.978,7.978,0,0,1,1.087-4.515A3.338,3.338,0,0,1,13.8,6.989a1.823,1.823,0,0,0,.968-.546.411.411,0,0,1,.619-.01,1.885,1.885,0,0,0,.978.557,3.338,3.338,0,0,1,2.013,1.436,7.978,7.978,0,0,1,1.087,4.515,11.789,11.789,0,0,0,.744,4.588,6.374,6.374,0,0,0,1.118,1.763A.215.215,0,0,1,21.166,19.646Z"
                          transform="translate(1694.402 24.737)"
                          fill="#707070"
                        />
                        {notificationBadge > 0 && (
                          <>
                            <circle
                              id="Ellipse_73"
                              data-name="Ellipse 73"
                              cx="6"
                              cy="6"
                              r="6"
                              transform="translate(1706 26)"
                              fill="#f56a6a"
                            />
                            <text
                              fill="white"
                              x="6"
                              y="6"
                              fontSize="9px"
                              textAnchor="middle"
                              transform="translate(1706 29)"
                            >
                              {notificationBadge}
                            </text>
                          </>
                        )}
                      </g>
                    </svg>
                  </div>
                </Popover>
              </li>
              <li ref={avatarDropdownRef} className="fLeft">
                <Popover
                  isOpen={isPopoverOpen}
                  position={"bottom"} // preferred position
                  onClickOutside={() => setIsPopoverOpen(false)}
                  content={
                    <div className="avatar_dropdown">
                      <div className="d-flex justify-content-between">
                        {!isPropertyPicture ? (
                          <img
                            width={"38px"}
                            height={"38px"}
                            src={DefaultPropertyPicture}
                            alt="Hotel-profile-default"
                          />
                        ) : (
                          <img
                            className="avatar_dropdown_profile"
                            src={`${process.env.REACT_APP_API_BASE_URL}${propertyPicture}`}
                            alt="Hotel-profile"
                          />
                        )}
                        <div>
                          <div className="font12 font-weight-bold text-dark">
                            {propertyName}
                          </div>
                          <div>Property ID: {propertyId}</div>
                          <a
                            className="avatar_dropdown_viewProfile"
                            href={`http://103.198.9.71:9007/roomDetails/${hotelLocation},${INIT_DATES(
                              Date.now()
                            )},${INIT_DATES(
                              Date.now() + 1 * 24 * 60 * 60 * 1000
                            )},1,1,0,${propertyId}`}
                            target="_blank"
                          >
                            <u>View your Property</u>
                          </a>
                        </div>
                      </div>
                      <hr />
                      <Link to={"/dashboard/analytics"}>Analytics</Link>
                      <Link to={"/dashboard/manage-users"}>Manage Users</Link>
                      <Link to={"/dashboard/change-password"}>
                        Change Password
                      </Link>
                      <Link to={"/dashboard/reviews"}>Reviews</Link>
                      <a href="" onClick={() => localStorage.clear()}>
                        Logout
                      </a>
                    </div>
                  }
                >
                  <div
                    className="hotel_profileAvatar cursorPointer"
                    onClick={() => setIsPopoverOpen((prevState) => !prevState)}
                  >
                    <img
                      src={require("../assets/img/icons/build.svg")}
                      alt="Profile Dropdown"
                    />
                    <span className="ml-2">
                      {propertyName.length < 12
                        ? propertyName
                        : propertyName.slice(0, 12) + "..."}
                    </span>
                  </div>
                </Popover>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
export default HeaderDash;
