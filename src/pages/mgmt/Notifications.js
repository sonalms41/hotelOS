import React, { useEffect, useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

function Notifications() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Notifications`;
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
          if (data.status_code === 200) setNotifications(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="main_tile">
        <h4 className="heading">Notifications</h4>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard_wrapper">
            {notifications.length > 0 ? (
              notifications.map((notif, idx) => (
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
                    src={require("../../assets/img/icons/icon-feather-user.svg")}
                    alt="DP"
                  />
                  <div className="notif_dropdown_detail">
                    <p className="font-weight-bold">{notif.username}</p>
                    <p>{notif.event}</p>
                  </div>
                  <div className="notif_dropdown_time">{notif.date}</div>
                </div>
              ))
            ) : (
              <h3 className="d-flex justify-content-center mt200 mb200">
                No notification!
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notifications;
