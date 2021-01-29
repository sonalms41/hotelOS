import React, { useEffect, useState } from "react";
import CustomSpinner from "../CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";

function RoomDel(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState([]);
  const [roomRemove, setRoomRemove] = useState([]);

  useEffect(() => {
    setRoomDetails(props.guestInfo.guest_rooms);
  }, [props]);

  const handleRoomSelection = (room) => {
    let updatedData = [...roomRemove];
    if (updatedData.includes(room))
      updatedData = updatedData.filter((t) => t !== room);
    else updatedData.push(room);
    if (updatedData.length < roomDetails.length) setRoomRemove(updatedData);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/add-guest/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          guest_id: props.guestInfo.guest,
          rooms: roomRemove,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("data", data);
            props.close();
            props.refetch();
            setRoomRemove([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  return (
    <div>
      <CustomSpinner isLoading={isLoading} />
      <div
        className="modal-wrapper"
        style={{
          display: props.show ? "block" : "none",
          left: "35%",
          top: "15%",
          maxHeight: "50%",
        }}
      >
        <div className="modal-body">
          <p className="font16 font-weight-bold">Remove Room</p>
          <hr />
          {roomDetails?.length > 0 &&
            roomDetails.map((room, idx) => (
              <span
                key={`room-det-${idx}`}
                className={
                  roomRemove.includes(room.room_number)
                    ? "btn_addo mr-2 mb-2"
                    : "guest_det_room_add mr-2 mb-2"
                }
                onClick={() => handleRoomSelection(room.room_number)}
              >
                {room.room_number}
              </span>
            ))}
          <div className="my-4">
            <span
              className="btn_addo float-right ml-3 mb-3"
              onClick={handleSubmit}
            >
              SAVE
            </span>
            <span
              className="guest_det_room_add float-right mb-3"
              onClick={props.close}
            >
              CANCEL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomDel;
