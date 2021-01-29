import React, { useRef, useState } from "react";
import CustomSpinner from "./CustomSpinner";
import { INIT_DATES } from "./InitializeDate";
import useOnClick from "./useOnClick";
import { PROPERTY_ID, USER_TOKEN } from "./LocalStorageInfo";

function BulkEditRoom(props) {
  const bulkEditRoomRef = useRef();
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(INIT_DATES(Date.now()));
  const [endDate, setEndDate] = useState(
    INIT_DATES(Date.now() + 8 * 24 * 60 * 60 * 1000)
  );
  const [dayData, setDayData] = useState(props.days);
  const [availability, setAvailability] = useState("True");
  const [inventory, setInventory] = useState("");

  useOnClick(bulkEditRoomRef, () => props.close());

  const handlePickDays = (day) => {
    let temp = [...dayData];
    if (temp.includes(day)) temp = temp.filter((t) => t !== day);
    else temp.push(day);
    setDayData(temp);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/room-bulk-edit/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          room_type: props.roomType,
          from_date: startDate,
          to_date: endDate,
          inventory: inventory,
          availability_status: availability,
          include_days: dayData,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status_code === 200) {
            console.log("data", data);
            props.refetch();
            props.close();
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  return (
    <div className={props.show ? "bulk_edit_modal_wrapper" : ""}>
      <CustomSpinner isLoading={isLoading} />
      <div
        ref={bulkEditRoomRef}
        className="modal-wrapper bulk_edit_modal"
        style={{
          transform: props.show ? "translateX(0vw)" : "translateX(100vw)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h4>Bulk Edit Rooms</h4>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <div className="mx-2 my-1">
            <p className="text-dark font20 mb-2">{props.roomType}</p>
            <p className="text-dark mb-3">
              You can make changes for dates up to 18 months from today.
            </p>
            <div className="row text-dark">
              <div className="col-md-6 mb-3">
                <label htmlFor="startDate" className="bulk_edit_label">
                  From
                </label>
                <input
                  id="startDate"
                  type="date"
                  className="form-control bulk_edit_date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="endDate" className="bulk_edit_label">
                  To
                </label>
                <input
                  id="endDate"
                  type="date"
                  className="form-control bulk_edit_date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[0])}
                        onChange={() => handlePickDays(props.days[0])}
                      />
                      <span className="bulk_edit_day">Sun</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[1])}
                        onChange={() => handlePickDays(props.days[1])}
                      />
                      <span className="bulk_edit_day">Mon</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[2])}
                        onChange={() => handlePickDays(props.days[2])}
                      />
                      <span className="bulk_edit_day">Tue</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[3])}
                        onChange={() => handlePickDays(props.days[3])}
                      />
                      <span className="bulk_edit_day">Wed</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[4])}
                        onChange={() => handlePickDays(props.days[4])}
                      />
                      <span className="bulk_edit_day">Thu</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[5])}
                        onChange={() => handlePickDays(props.days[5])}
                      />
                      <span className="bulk_edit_day">Fri</span>
                    </label>
                  </div>
                  <div className="col-md-3">
                    <label>
                      <input
                        type="checkbox"
                        className="check-custom"
                        checked={dayData.includes(props.days[6])}
                        onChange={() => handlePickDays(props.days[6])}
                      />
                      <span className="bulk_edit_day">Sat</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="availability" className="bulk_edit_label">
                  Availability
                </label>
                <select
                  id="availability"
                  className="form-control bulk_edit_text"
                  placeholder="Availability"
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option>True</option>
                  <option>False</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="inventory" className="bulk_edit_label">
                  Inventory
                </label>
                <input
                  id="inventory"
                  className="form-control bulk_edit_text"
                  placeholder="Inventory"
                  onChange={(e) => setInventory(e.target.value)}
                />
              </div>
              <div className="col-md-12">
                <div className="bulk_edit_footer">
                  <span className="btn_addo" onClick={handleSubmit}>
                    Save
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkEditRoom;
