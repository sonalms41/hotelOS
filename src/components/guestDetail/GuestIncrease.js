import React, { useState } from "react";
import CustomSpinner from "../CustomSpinner";

function GuestIncrease(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [guest, setGuest] = useState("0");
  const [nChild, setNChild] = useState("0");
  const {
    full_name,
    gender,
    phone_number,
    country,
    street,
    city,
    tole,
    checkin,
    checkout,
    guest_rooms,
    guests,
    child,
  } = props.guestInfo;

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/add-guest/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("con-jwt")}`,
        },
        body: JSON.stringify({
          property_id: localStorage.getItem("property-id"),
          full_name,
          gender,
          phone_number,
          country,
          street,
          city,
          tole,
          proof_image: [],
          checkin: checkin,
          checkout: checkout,
          guestno: parseInt(guests) + parseInt(guest),
          childno: parseInt(child) + parseInt(nChild),
          room_details: guest_rooms,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("data", data);
            props.close();
            props.refetch();
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
          top: "30%",
        }}
      >
        <div className="modal-body">
          <p className="font16 font-weight-bold">Increase Guest</p>
          <hr />
          <div className="row">
            <div className="col">
              <div id="" className="field-wrapper input">
                <label htmlFor="guests">Guests</label>
                <input
                  id="guests"
                  type="number"
                  className="form-control"
                  min={1}
                  placeholder="0"
                  onChange={(e) => setGuest(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div id="" className="field-wrapper input">
                <label htmlFor="child">Children</label>
                <input
                  id="child"
                  type="number"
                  className="form-control"
                  min={1}
                  placeholder="0"
                  onChange={(e) => setNChild(e.target.value)}
                />
              </div>
            </div>
          </div>
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

export default GuestIncrease;
