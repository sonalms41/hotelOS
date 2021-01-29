import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Popover from "react-tiny-popover";
import CustomSpinner from "../../components/CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

function RoomMgmt() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [roomType, setRoomType] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);

  let history = useHistory();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Room Mgmt`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/add-room-type/?property_id=${propertyId}`,
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
          data.result.room_type.length > 0 &&
            setRoomType(data.result.room_type);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

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
          <span className="ml-4">Room Management</span>
        </h4>
      </div>
      <section className="container_scroll">
        {roomType.length > 0 ? (
          roomType.map((rt, index) => (
            <div key={`rt-${index}`} className="scroll__content">
              <div className="scroll__col">
                <div className="font-weight-bold text-dark font14">
                  {rt.room_type_name}
                </div>
              </div>
              <div className="rm_add_room">
                <Link
                  to={`./add-room/${rt.room_type_name}`}
                  style={{ width: "100%" }}
                >
                  <div className="rm_dashed_area">+ Add Room</div>
                </Link>
              </div>
              <div className="dnd_flexbox">
                <div id={`drop-${rt.room_type_id}`} className="drop_board">
                  {rt.room_type_rooms.map((rn, idx) => (
                    <div
                      key={`drag-${idx}`}
                      id={`drag-${idx}`}
                      draggable="false"
                      className="drag_card"
                    >
                      <div className="rm_rn_wrapper">
                        <Popover
                          isOpen={
                            isPopoverOpen === rn.property_room__room_number
                          }
                          position={"bottom"}
                          onClickOutside={() => setIsPopoverOpen(null)}
                          content={
                            <div className="ml220 px-4 py-2 borderRadius4 bg-color-light1 text-dark font12">
                              <Link
                                to={`/dashboard/edit-room/${rn.property_room__room_number}`}
                              >
                                Edit
                              </Link>
                            </div>
                          }
                        >
                          <div className="text-right mr-2">
                            <span
                              className="cursorPointer font16"
                              onClick={() =>
                                setIsPopoverOpen(rn.property_room__room_number)
                              }
                            >
                              &#8230;
                            </span>
                          </div>
                        </Popover>
                        <Link
                          to={`./subroom-type/${rn.property_room__room_number}`}
                        >
                          <strong className="text-dark">
                            {rn.property_room__room_number}
                          </strong>
                          <p className="text-white">
                            {rn.property_room__floor}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="d-flex justify-content-center w-100 mt200">
            <h4>No available room!</h4>
          </div>
        )}
      </section>
    </>
  );
}

export default RoomMgmt;
