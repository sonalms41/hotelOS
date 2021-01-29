import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

function SubRoomType(props) {
  const [propertyId, setPropertyId] = useState(() => {
    return localStorage.getItem("property-id");
  });
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("con-jwt");
  });
  const [subRoomTypes, setSubRoomTypes] = useState([]);
  const [reFetch, setReFetch] = useState(false);

  let history = useHistory();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - SubRoom Type`;
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rooms-under-sub/?property_id=${propertyId}&sub_room_type=${props.match.params.id}`,
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
          console.log("data sub room", data);
          if (data.status_code === 200) setSubRoomTypes(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [reFetch]);

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      // message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteRoom(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const deleteRoom = (id) => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-room/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          room_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data delete", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setReFetch((prevState) => !prevState);
          } else if (data.status_code === 400) toast.error(data.message);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  return (
    <>
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">
              <img
                className="cursorPointer"
                src={require("../../assets/img/icons/material-keyboard-backspace.svg")}
                alt="Back"
                onClick={() => history.goBack()}
              />
              <span className="ml-4">{props.match.params.id}</span>
            </h4>
          </div>
          <div className="col-auto">
            <Link to={`/dashboard/edit-room/${props.match.params.id}`}>
              <span className="btn_addo">Edit</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        {subRoomTypes.length > 0 ? (
          subRoomTypes.map((subRoom, idx) => (
            <div key={`subRoom-${idx}`} className="col-md-6 mt-3">
              <div className="dashboard_wrapper">
                <div className="row">
                  <div className="col-auto mr-auto">
                    <div className="sub-heading">
                      <h5 className="heading">Room {idx + 1}</h5>
                    </div>
                  </div>
                  <div className="col-auto">
                    <span
                      className="cursorPointer"
                      onClick={() => confirmSubmit(subRoom.room_id)}
                    >
                      <img
                        src={require("../../assets/img/icons/icon-material-delete-sweep-red.svg")}
                        alt="delete"
                      />
                      <span className="text-danger ml-2">Delete</span>
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <p>Room No.</p>
                    <p className="text-dark font-weight-bold font14">
                      {subRoom.room_number}
                    </p>
                  </div>
                  <div className="col-md-3">
                    <p>Max Guest</p>
                    <p className="text-dark font-weight-bold font14">
                      {subRoom.max_guest} guests
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>Base Rate (per night)</p>
                    <p className="text-dark font-weight-bold font14">
                      NPR {subRoom.base_rate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="ml-4">No rooms added!</h4>
        )}
      </div>
    </>
  );
}

export default SubRoomType;
