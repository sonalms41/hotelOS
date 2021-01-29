import React, { useEffect, useState } from "react";
import CustomSpinner from "../CustomSpinner";

function StayExtend(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { checkin, checkout, guest, status } = props.guestInfo;

  useEffect(() => {
    checkin && setStartDate(checkin);
    checkout && setEndDate(checkout);
  }, [props]);

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/extend-full-guest-stay/`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
          body: JSON.stringify({
            property_id: localStorage.getItem("property-id"),
            guest_id: guest,
            checkin: startDate,
            checkout: endDate,
          }),
        }
      )
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
          <p className="font16 font-weight-bold">Extend Stay</p>
          <div className="extend_stay_body">
            <div className="d-flex justify-content-center bg-color-light1">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={status !== "Upcomming"}
              />
              <span className="ml-3 mr-3">TO</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <p className="mt-3 text-white text-center">
              {startDate !== undefined &&
                endDate !== undefined &&
                endDate.slice(8) - startDate.slice(8)}{" "}
              Night,{" "}
              {startDate !== undefined &&
                endDate !== undefined &&
                endDate.slice(8) - startDate.slice(8)}{" "}
              Day
            </p>
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

export default StayExtend;
