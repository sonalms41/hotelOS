import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminLocalStorage } from "./admin/adminUtility/adminLocalStorage";
import { PROPERTY_ID, USER_TOKEN } from "./LocalStorageInfo";

function SidebarRevenue() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [revenue, setRevenue] = useState("");
  const [guestReqListing, setGuestReqListing] = useState([]);
  const [roomList, setRoomList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-rev/?property_id=${propertyId}`,
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
          console.log("data revenue", data);
          if (data.status_code === 200) setRevenue(data.result.total_rev);
        })
        .catch((error) => console.error(error));
    };
    fetchData();

    const fetchDataListing = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/request-listings/?property_id=${propertyId}`,
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
          console.log("data listing", data);
          if (data.status_code === 200) setGuestReqListing(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchDataListing();

    const fetchDataRoomList = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-rooms/?property_id=${propertyId}`,
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
          console.log("data room list", data);
          if (data.status_code === 200)
            setRoomList(data.result.lists_of_available_rooms);
        })
        .catch((error) => console.error(error));
    };
    fetchDataRoomList();
  }, []);

  return (
    <div className="right_panel">
      <div className="revenue-panel">
        {/*<div className="hotel_revenue">*/}
        {/*  <div className="rev_title">Revenue</div>*/}
        {/*  <div className="currency_revenue">*/}
        {/*    <span className="currency_format">NPR. </span>*/}
        {/*    <span className="num-curr">{0 - revenue}</span>*/}
        {/*    {revenue < 0 && <div>Total Earn</div>}*/}
        {/*  </div>*/}
        {/*  <div className="icon_revinew">*/}
        {/*    <img src={require("../assets/img/icons/revenue.svg")} alt="" />*/}
        {/*  </div>*/}
        {/*</div>*/}
        
        <div className="right_panelContent" style={{ marginTop: "60px" }}>
          <div className="panel_checkout">
            <div className="panel_checkoutHeader">
              <div className="heading fnt_cl fLeft">
                <h5>Guest Request</h5>
              </div>
              <div className="fRight">
                <Link to={"./bookings"}>
                  <span className="text-primary font-weight-bold">
                    View More
                  </span>
                </Link>
              </div>
            </div>
            <div className="panel_chdash">
              <div className="intro-x">
                {guestReqListing.length > 0 ? (
                  guestReqListing.map((guestReq, idx) => (
                    <div
                      key={`checkingIn-${idx}`}
                      className="box_upcommingcheckout flex-cpl alignItemsCenter zoom-animation"
                    >
                      <div className="revenue_numWidth">
                        <div className="font_weight600 font12 text-xs">
                          Room No.
                        </div>
                        <Link to={`./room-details/${guestReq.room_number}`}>
                          <div className="font_weight500 revenue_roomNum font12">
                            {guestReq.room_number}
                          </div>
                        </Link>
                      </div>
                      <div className="overflow-hidden revenue_nameWidth">
                        <div className="font_weight600 font12 text-xs">
                          Name
                        </div>
                        <Link
                          to={`/dashboard/reservation/${guestReq.guest_id}`}
                        >
                          <div className="font_weight500 revenue_name font12">
                            {guestReq.guest_name}
                          </div>
                        </Link>
                      </div>
                      <div className="revenue_numWidth">
                        <div className="font_weight600 font12 text-xs">
                          Checkin
                        </div>
                        <div className="font12">
                          <span className="mr-1">&#x1F550;</span>
                          {guestReq.checkin_in}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4 className="d-flex justify-content-center">
                    No guest request!
                  </h4>
                )}
              </div>
            </div>
          </div>
          <div className="panel_roomAavailable mt-3">
            <div className="panel_checkoutHeader">
              <div className="heading fnt_cl fLeft">
                <h5>Rooms</h5>
              </div>
              <div className="fRight">
                <Link to={"./room-list"}>
                  <span className="text-primary font-weight-bold">
                    View More
                  </span>
                </Link>
              </div>
              <div className="revenue_roomWrapper">
                {roomList.length > 0 &&
                  roomList.map((floor, index) => (
                    <div key={`floor-${index}`} className="mt-3">
                      <div className="font-weight-bold mb-2">
                        {floor.floor_name}
                      </div>
                      <div className="row">
                        {floor.rooms.length > 0 &&
                          floor.rooms.map((room, idx) => (
                            <div key={`room-${idx}`} className="col-md-4 mt-2">
                              <Link
                                style={{ width: "100%" }}
                                to={`./room-details/${room.property_room__room_number}`}
                              >
                                <div className="room_avail_wrap">
                                  <p className="room_num_avail_dash">
                                    {room.property_room__room_number}
                                  </p>
                                  <p className="text-center my-2">
                                    {room.property_type__room_type__name}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          ))}
                      </div>
                      <hr className="my-2" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}

export default SidebarRevenue;
