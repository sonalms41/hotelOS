import React, { useEffect, useRef, useState } from "react";
import CustomSpinner from "./CustomSpinner";
import { INIT_DATES } from "./InitializeDate";
import useOnClick from "./useOnClick";
import { PROPERTY_ID, USER_TOKEN } from "./LocalStorageInfo";

const RATE_ENTRY_TYPE = {
  incrementalRates: "incRates",
  specificRates: "spRates",
};

function BulkEditRate(props) {
  const bulkEditRateRef = useRef();
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const [startDate, setStartDate] = useState(INIT_DATES(Date.now()));
  const [endDate, setEndDate] = useState(
    INIT_DATES(Date.now() + 8 * 24 * 60 * 60 * 1000)
  );
  const [dayData, setDayData] = useState(props.days);
  const [market, setMarket] = useState("");
  const [marketInfo, setMarketInfo] = useState([]);
  const [rateEntryType, setRateEntryType] = useState(
    RATE_ENTRY_TYPE.incrementalRates
  );
  const [baseRate, setBaseRate] = useState("");
  const [nOccupancy, setNOccupancy] = useState("1");
  const [addAmount, setAddAmount] = useState("");
  const [spRateData, setSpRateData] = useState([]);
  const [availability, setAvailability] = useState(true);
  const [minNight, setMinNight] = useState("");
  const [maxNight, setMaxNight] = useState("");
  const [closedArrival, setClosedArrival] = useState(true);
  const [closedDeparture, setClosedDeparture] = useState(true);

  useOnClick(bulkEditRateRef, () => props.close());

  useEffect(() => {
    const fetchDataRoom = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/specific-guest-inroom/?property_id=${propertyId}&room_type=${props.roomType}`,
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
          console.log("data room bulk", data);
          if (data.status_code === 200)
            setRoomInfo(data.result.number_of_people);
        })
        .catch((error) => console.error(error));
    };
    props.roomType && fetchDataRoom();
  }, [props.roomType]);

  useEffect(() => {
    const fetchMarketInfo = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rate-plan-market/?property_id=${propertyId}&room_type=${props.roomType}`,
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
          console.log("bulk edit market info", data.result);
          data.result.length > 0 && setMarketInfo(data.result);
        })
        .catch((error) => console.error(error));
    };
    props.market && fetchMarketInfo();
  }, [props.roomType, props.market]);

  const handlePickDays = (day) => {
    let temp = [...dayData];
    if (temp.includes(day)) temp = temp.filter((t) => t !== day);
    else temp.push(day);
    setDayData(temp);
  };

  const handleSpecificRates = (e, i) => {
    let temp = [...spRateData];
    const obj = { occupancy: i + 1, price: e.target.value };
    if (temp.some((t) => t.occupancy === i + 1))
      temp = temp.filter((t) => t.occupancy !== i + 1);
    temp.push(obj);
    setSpRateData(temp);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/rate-bulk-edit/`, {
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
          availability_status: availability,
          include_days: dayData,
          min_night: minNight,
          max_night: maxNight,
          closed_to_arrival: closedArrival,
          closed_to_departure: closedDeparture,
          rate_type_inc: rateEntryType === RATE_ENTRY_TYPE.incrementalRates,
          base_rate: baseRate,
          num_of_occupancy: nOccupancy,
          amount_per_occ: addAmount,
          rate_type_spc: rateEntryType === RATE_ENTRY_TYPE.specificRates,
          occupany_with_rates: spRateData,
          market: props.market,
          market_type: market,
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
        ref={bulkEditRateRef}
        className="modal-wrapper bulk_edit_modal"
        style={{
          transform: props.show ? "translateX(0vw)" : "translateX(100vw)",
          opacity: props.show ? "1" : "0",
        }}
      >
        <div className="modal-header">
          <h4>Bulk Edit Rate Plan</h4>
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
              <div className="col-md-12">
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
              <div className="col-md-12">
                <hr />
              </div>
              <div className="col-md-12 mb-2 font14 text-dark">
                Rate Entry Type
              </div>
              <div
                className="col-md-12 mb-2"
                onChange={(e) => setRateEntryType(e.target.value)}
              >
                <input
                  type="radio"
                  id="incRates"
                  name="rateType"
                  value={RATE_ENTRY_TYPE.incrementalRates}
                  className="mr-2"
                  defaultChecked
                />
                <label htmlFor="incRates" className="font14 mr-3">
                  Incremental Rates
                </label>
                <input
                  type="radio"
                  id="spRates"
                  name="rateType"
                  value={RATE_ENTRY_TYPE.specificRates}
                  className="mr-2"
                />
                <label htmlFor="spRates" className="font14">
                  Specific Rates
                </label>
              </div>
              {props.market && (
                <div className="col-md-12 mb-3">
                  <label htmlFor="market" className="bulk_edit_label">
                    Market
                  </label>
                  <select
                    id="market"
                    className="form-control bulk_edit_text"
                    placeholder="Market"
                    onChange={(e) => setMarket(e.target.value)}
                  >
                    <option hidden>Select Market</option>
                    {marketInfo.length > 0 &&
                      marketInfo.map((mi, idx) => (
                        <option key={`market-${idx}`}>{mi.market_name}</option>
                      ))}
                  </select>
                </div>
              )}
              {rateEntryType === RATE_ENTRY_TYPE.incrementalRates && (
                <>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="baseRate" className="bulk_edit_label">
                      Base Rate रू
                    </label>
                    <input
                      id="baseRate"
                      className="form-control bulk_edit_text"
                      placeholder="Base Rate रू"
                      onChange={(e) => setBaseRate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="nOccupancy" className="bulk_edit_label">
                      Number of Occupancy
                    </label>
                    <select
                      id="nOccupancy"
                      className="form-control bulk_edit_text"
                      placeholder="Number of Occupancy"
                      onChange={(e) => setNOccupancy(e.target.value)}
                    >
                      {roomInfo.length > 0 &&
                        roomInfo.map((ir, idx) => (
                          <option key={`incRate-${idx}`}>{ir}</option>
                        ))}
                    </select>
                  </div>
                  <div className="col-md-12 mb-2 font14 text-dark">
                    Additional per occupant
                  </div>
                  <div className="col-md-12 mb-3">
                    <label htmlFor="amtNrs" className="bulk_edit_label">
                      Amount रू
                    </label>
                    <input
                      id="amtNrs"
                      className="form-control bulk_edit_text"
                      placeholder="Amount रू"
                      onChange={(e) => setAddAmount(e.target.value)}
                    />
                  </div>
                </>
              )}
              {rateEntryType === RATE_ENTRY_TYPE.specificRates &&
                roomInfo.length > 0 &&
                roomInfo.map((sr, idx) => (
                  <div key={`spRate-${idx}`} className="col-md-12 mb-3">
                    <label
                      htmlFor={`spRate-${idx}`}
                      className="bulk_edit_label"
                    >
                      {sr} Person
                    </label>
                    <input
                      id={`spRate-${idx}`}
                      className="form-control bulk_edit_text"
                      placeholder="NRs."
                      onChange={(e) => handleSpecificRates(e, idx)}
                    />
                  </div>
                ))}

              <div className="col-md-12">
                <hr />
              </div>
              <div className="col-md-12 mt-3 mb-3">
                <label htmlFor="availability" className="bulk_edit_label">
                  Availability
                </label>
                <select
                  id="availability"
                  className="form-control bulk_edit_text"
                  placeholder="Availability"
                  onChange={(e) =>
                    e.target.value == "Closed"
                      ? setAvailability(false)
                      : e.target.value == "Open"
                      ? setAvailability(true)
                      : 0
                  }
                >
                  <option>Open</option>
                  <option>Closed</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="minNight" className="bulk_edit_label">
                  Minimum night
                </label>
                <input
                  id="minNight"
                  className="form-control bulk_edit_text"
                  placeholder="Enter a number between 1 - 28"
                  onChange={(e) => setMinNight(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="maxNight" className="bulk_edit_label">
                  Maximum night
                </label>
                <input
                  id="maxNight"
                  className="form-control bulk_edit_text"
                  placeholder="Enter a number between 1 - 28"
                  onChange={(e) => setMaxNight(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="closed2Arrived" className="bulk_edit_label">
                  Closed to Arrived
                </label>
                <select
                  id="closed2Arrived"
                  className="form-control bulk_edit_text"
                  placeholder="Closed to Arrived"
                  onChange={(e) =>
                    e.target.value == "Off"
                      ? setClosedArrival(false)
                      : e.target.value == "On"
                      ? setClosedArrival(true)
                      : 0
                  }
                >
                  <option>On</option>
                  <option>Off</option>
                </select>
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="closed2Departure" className="bulk_edit_label">
                  Closed to Departure
                </label>
                <select
                  id="closed2Departure"
                  className="form-control bulk_edit_text"
                  placeholder="Closed to Departure"
                  onChange={(e) =>
                    e.target.value == "Off"
                      ? setClosedDeparture(false)
                      : e.target.value == "On"
                      ? setClosedDeparture(true)
                      : 0
                  }
                >
                  <option>On</option>
                  <option>Off</option>
                </select>
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

export default BulkEditRate;
