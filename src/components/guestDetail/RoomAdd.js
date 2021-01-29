import React, { useEffect, useState } from "react";
import CustomSpinner from "../CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";

function RoomAdd(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [availableRoom, setAvailableRoom] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
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
          console.log("data room", data.result);
          setAvailableRoom(data.result.lists_of_available_rooms);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetchData]);

  const handleRoomSelection = (room) => {
    let updatedData = [...roomDetails];
    if (updatedData.includes(room))
      updatedData = updatedData.filter((t) => t !== room);
    else updatedData.push(room);
    setRoomDetails(updatedData);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/extend-guest-room/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          guest_id: props.guestInfo.guest,
          rooms: roomDetails,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("data", data);
            props.close();
            props.refetch();
            setRefetchData((prevState) => !prevState);
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
          maxHeight: "75%",
        }}
      >
        <div className="modal-body">
          <p className="font16 font-weight-bold">Add Room</p>
          <hr />
          {availableRoom.length > 0 &&
            availableRoom.map((floor, index) => (
              <div key={`fl-${index}`} className="mb-2">
                <p className="mb-2">{floor.floor_name}</p>
                {floor.rooms.length > 0 &&
                  floor.rooms.map((room, idx) => (
                    <span
                      key={`avroom-${idx}`}
                      className={
                        roomDetails.includes(room.property_room__room_number)
                          ? "btn_addo mr-2 mb-2"
                          : "guest_det_room_add mr-2 mb-2"
                      }
                      onClick={() =>
                        handleRoomSelection(room.property_room__room_number)
                      }
                    >
                      {room.property_room__room_number}
                    </span>
                  ))}
              </div>
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

export default RoomAdd;
