import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

const SORT_BY = {
  Floor: "floor",
  RoomType: "roomType",
  Available: "available",
  Unavailable: "unavailable",
};

function RoomList(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const [sortBy, setSortBy] = useState(SORT_BY.Floor);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Room Mgmt`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/property-floors/?property_id=${propertyId}`,
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
          console.log("data floor", data);
          if (data.status_code === 200) {
            setRoomList(data.result.floors_list);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setRoomList([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    sortBy === SORT_BY.Floor && fetchData();

    const fetchDataRT = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/room-type-sort/?property_id=${propertyId}`,
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
            setRoomList(data.result.room_details);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setRoomList([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    sortBy === SORT_BY.RoomType && fetchDataRT();

    const fetchDataAvailable = async () => {
      setIsLoading(true);
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
          console.log("data available", data);
          if (data.status_code === 200) {
            setRoomList(data.result.lists_of_available_rooms);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setRoomList([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    sortBy === SORT_BY.Available && fetchDataAvailable();

    const fetchDataUnavailable = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-rooms-utilized/?property_id=${propertyId}`,
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
          console.log("data unavailable", data);
          if (data.status_code === 200) {
            setRoomList(data.result.lists_of_available_rooms);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setRoomList([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    sortBy === SORT_BY.Unavailable && fetchDataUnavailable();
  }, [sortBy]);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">Room Management</h4>
          </div>
          <div className="col-auto">
            <Link to={"./room-mgmt"}>
              <div className="btn_addo">Create</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-start mb-4">
        <div className="font-weight-bold font14 mt-1 title-secondary">
          Sort by
        </div>
        <div className="ml-4">
          <select
            className="custom-select font12"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={SORT_BY.Floor} defaultValue>
              Floor
            </option>
            <option value={SORT_BY.RoomType}>Room Type</option>
            <option value={SORT_BY.Available}>Available</option>
            <option value={SORT_BY.Unavailable}>Unavailable</option>
          </select>
        </div>
      </div>

      <div className="dashboard_wrapper">
        {roomList.length > 0 ? (
          roomList.map((floor, index) => (
            <div key={`floor-${index}`}>
              <div className="sub-heading">
                <h5 className="heading">{floor.floor_name}</h5>
              </div>
              <div className="row">
                {floor.rooms.length > 0 &&
                  floor.rooms.map((room, idx) => (
                    <div key={`room-${idx}`} className="col-md-1point5 mt-3">
                      <Link
                        style={{ width: "100%" }}
                        to={`./room-details/${room.property_room__room_number}`}
                      >
                        <div
                          className={`${
                            room.status === "Available" ? "room_avail_wrap" : ""
                          } ${
                            room.status === "Not Available"
                              ? "room_unavail_wrap"
                              : ""
                          } ${
                            room.status === "Under Maintenance"
                              ? "room_mainte_wrap"
                              : ""
                          }`}
                        >
                          {room.status !== "Not Available" && (
                            <div className="people_icon_replace" />
                          )}
                          {room.status === "Not Available" && (
                            <>
                              <img
                                className="ml-1"
                                src={require("../../assets/img/icons/people-icon.svg")}
                                alt="People"
                              />
                              <span className="small ml-1">
                                {room.number_of_peoples}
                              </span>
                            </>
                          )}
                          <p
                            className={`${
                              room.status === "Available"
                                ? "room_num_avail"
                                : ""
                            } ${
                              room.status === "Not Available"
                                ? "room_num_unavail"
                                : ""
                            } ${
                              room.status === "Under Maintenance"
                                ? "room_num_mainte"
                                : ""
                            }`}
                          >
                            {room.property_room__room_number}
                          </p>
                          <p className="text-center my-2">
                            {room.property_type__name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <div className="text-center mt200 mb200">
            <h4>No rooms!</h4>
          </div>
        )}
      </div>
    </>
  );
}

export default RoomList;
