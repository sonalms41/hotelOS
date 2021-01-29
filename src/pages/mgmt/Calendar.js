import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INIT_DATES } from "../../components/InitializeDate";
import Popover from "react-tiny-popover";
import CustomSpinner from "../../components/CustomSpinner";

const SORT_BY = { floor: "Floor", roomType: "Room Type" };
const GUEST_STATUS = { inhouse: "Inhouse", upcoming: "Upcomming" };

function Calendar() {
  const [propertyId, setPropertyId] = useState(() => {
    return localStorage.getItem("property-id");
  });
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("con-jwt");
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState([]);
  const [isPopoverRTOpen, setIsPopoverRTOpen] = useState([]);
  const [startDate, setStartDate] = useState(INIT_DATES(Date.now()));
  const [endDate, setEndDate] = useState(
    INIT_DATES(Date.now() + 12 * 24 * 60 * 60 * 1000)
  );
  const [sortBy, setSortBy] = useState(SORT_BY.floor);
  const [dateData, setDateData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [calendarRTData, setCalendarRTData] = useState([]);
  const [dropdownStatus, setDropdownStatus] = useState([]);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Calendar`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/specific-details/?property_id=${propertyId}&starting_date=${startDate}&ending_date=${endDate}`,
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
          setCalendarData(data.result.guest_details);
          setDateData(data.result.all_dates);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
    const fetchRTData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/room-type-details/?property_id=${propertyId}&starting_date=${startDate}&ending_date=${endDate}`,
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
          console.log("data room type", data.result);
          setCalendarRTData(data.result.guest_details);
          setDateData(data.result.all_dates);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchRTData();
  }, [startDate, endDate]);

  useEffect(() => {
    calendarData.forEach((cal) =>
      setDropdownStatus((prevState) => [...prevState, cal.floor_name])
    );
    calendarRTData.forEach((cal) =>
      setDropdownStatus((prevState) => [...prevState, cal.room_type_name])
    );
  }, [calendarData, calendarRTData]);

  const handlePopoverOpen = (id) => {
    let temp = [...isPopoverOpen];
    if (temp.includes(id)) temp = temp.filter((t) => t !== id);
    else temp.push(id);
    setIsPopoverOpen(temp);
  };
  const handlePopoverRTOpen = (id) => {
    let temp = [...isPopoverRTOpen];
    if (temp.includes(id)) temp = temp.filter((t) => t !== id);
    else temp.push(id);
    setIsPopoverRTOpen(temp);
  };

  const handleDropdown = (x) => {
    let temp = [...dropdownStatus];
    if (temp.includes(x)) temp = temp.filter((t) => t !== x);
    else temp.push(x);
    setDropdownStatus(temp);
  };

  const emptyTableStartData = (from) => {
    let temp = [];
    for (
      let i = 0;
      i <
      Math.ceil(
        (Date.parse(from) - Date.parse(startDate)) / (1000 * 60 * 60 * 24)
      );
      i++
    )
      temp.push(<td key={i} />);
    return temp;
  };
  const emptyTableEndData = (to) => {
    let temp = [];
    for (
      let i = 0;
      i <
      Math.ceil(
        (Date.parse(endDate) - Date.parse(to)) / (1000 * 60 * 60 * 24)
      ) -
        1;
      i++
    )
      temp.push(<td key={i} />);
    return temp;
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">Calendar</h4>
          </div>
          <div className="col-auto mt-2">
            {(Date.parse(endDate) - Date.parse(startDate)) /
              (1000 * 60 * 60 * 24)}{" "}
            Days
          </div>
          <div className="col-auto">
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
          <div className="col-auto">
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
        </div>
      </div>

      <div className="dashboard_wrapper">
        <div className="custom_calendar_table">
          <table className="table table-responsive table-bordered table-hover">
            <tbody>
              <tr>
                <th>
                  <select
                    id="sort_by"
                    className="rate_type_selection"
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Floor</option>
                    <option>Room Type</option>
                  </select>
                </th>
                {dateData.length > 0 &&
                  dateData.map((date, idx) => (
                    <th key={`date-${idx}`} className="text-center">
                      {date.split(" ")[0]}
                      <br />
                      {date.split(" ")[1]}
                    </th>
                  ))}
              </tr>
              {sortBy === SORT_BY.floor && (
                <>
                  {calendarData.length > 0 &&
                    calendarData.map((cal, idx) => (
                      <React.Fragment key={`calendar-${idx}`}>
                        <tr>
                          <th>
                            <span
                              className="cursorPointer"
                              onClick={() => handleDropdown(cal.floor_name)}
                            >
                              <span className="mr-4">{cal.floor_name}</span>
                              &#x25BC;
                            </span>
                          </th>
                        </tr>

                        {dropdownStatus.includes(cal.floor_name) &&
                          cal.guest_in_rooms.length > 0 &&
                          cal.guest_in_rooms.map((gir, index) => (
                            <tr key={`guest-${index}`}>
                              <td>Room {gir.room_number}</td>
                              {emptyTableStartData(gir.from_date)}
                              <td
                                colSpan={
                                  Math.ceil(
                                    (Date.parse(gir.to_date) -
                                      Date.parse(gir.from_date)) /
                                      (1000 * 60 * 60 * 24)
                                  ) + 1
                                }
                              >
                                <Popover
                                  isOpen={isPopoverOpen.includes(gir.unique)}
                                  position={"right"} // preferred position
                                  onClickOutside={() =>
                                    handlePopoverOpen(gir.unique)
                                  }
                                  content={
                                    <div className="calendar_popover">
                                      <div className="row">
                                        <div className="col-auto mr-auto mt-2">
                                          <p className="text-dark font-weight-bold font20">
                                            {gir.guest_full_name}
                                          </p>
                                          <p>{gir.guest_code}</p>
                                        </div>
                                        <div className="col-auto">
                                          <p
                                            className="cursorPointer"
                                            onClick={() =>
                                              handlePopoverOpen(gir.unique)
                                            }
                                          >
                                            X
                                          </p>
                                        </div>
                                      </div>
                                      {gir.guest_status ===
                                        GUEST_STATUS.upcoming && (
                                        <div className="checking_status_wrap_upcoming">
                                          <span className="checking_status_light_upcoming" />
                                          <span className="text-dark ml-3">
                                            Upcoming
                                          </span>
                                        </div>
                                      )}
                                      {gir.guest_status ===
                                        GUEST_STATUS.inhouse && (
                                        <div className="checking_status_wrap">
                                          <span className="checking_status_light" />
                                          <span className="text-dark ml-3">
                                            Inhouse
                                          </span>
                                        </div>
                                      )}
                                      <div className="row mb-3">
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-calendar.svg")}
                                            alt="Calendar"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_checkin}
                                          </span>
                                          <p>Checking in</p>
                                        </div>
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-calendar.svg")}
                                            alt="Calendar"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_checkout}
                                          </span>
                                          <p>Checking out</p>
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-user.svg")}
                                            alt="Adult"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_adults}
                                          </span>
                                          <p>Adults</p>
                                        </div>
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-awesome-baby.svg")}
                                            alt="Child"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_childs}
                                          </span>
                                          <p>Child</p>
                                        </div>
                                      </div>
                                      <div className="cursorPointer d-flex justify-content-center btn btn-primary mb-3">
                                        <Link
                                          to={`./guest-details/${gir.guest}`}
                                        >
                                          <span className="text-white">
                                            Booking Details
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div
                                    className={
                                      gir.guest_status === GUEST_STATUS.inhouse
                                        ? "calendar_checkin_disp"
                                        : gir.guest_status ===
                                          GUEST_STATUS.upcoming
                                        ? "calendar_checkin_disp_upcoming"
                                        : 0
                                    }
                                    onClick={() =>
                                      handlePopoverOpen(gir.unique)
                                    }
                                  >
                                    {gir.guest_full_name}
                                  </div>
                                </Popover>
                              </td>
                              {emptyTableEndData(gir.to_date)}
                            </tr>
                          ))}
                      </React.Fragment>
                    ))}
                </>
              )}

              {sortBy === SORT_BY.roomType && (
                <>
                  {calendarRTData.length > 0 &&
                    calendarRTData.map((cal, idx) => (
                      <React.Fragment key={`calendarRT-${idx}`}>
                        <tr>
                          <th>
                            <span
                              className="cursorPointer"
                              onClick={() => handleDropdown(cal.room_type_name)}
                            >
                              <span className="mr-4">{cal.room_type_name}</span>
                              &#x25BC;
                            </span>
                          </th>
                        </tr>

                        {dropdownStatus.includes(cal.room_type_name) &&
                          cal.guest_in_rooms.length > 0 &&
                          cal.guest_in_rooms.map((gir, index) => (
                            <tr key={`guestRT-${index}`}>
                              <td>Room {gir.room_number}</td>
                              {emptyTableStartData(gir.from_date)}
                              <td
                                colSpan={
                                  Math.ceil(
                                    (Date.parse(gir.to_date) -
                                      Date.parse(gir.from_date)) /
                                      (1000 * 60 * 60 * 24)
                                  ) + 1
                                }
                              >
                                <Popover
                                  isOpen={isPopoverRTOpen.includes(gir.unique)}
                                  position={"right"} // preferred position
                                  onClickOutside={() =>
                                    handlePopoverRTOpen(gir.unique)
                                  }
                                  content={
                                    <div className="calendar_popover">
                                      <div className="row">
                                        <div className="col-auto mr-auto mt-2">
                                          <p className="text-dark font-weight-bold font20">
                                            {gir.guest_full_name}
                                          </p>
                                          <p>{gir.guest_code}</p>
                                        </div>
                                        <div className="col-auto">
                                          <p
                                            className="cursorPointer"
                                            onClick={() =>
                                              handlePopoverRTOpen(gir.unique)
                                            }
                                          >
                                            X
                                          </p>
                                        </div>
                                      </div>
                                      {gir.guest_status ===
                                        GUEST_STATUS.upcoming && (
                                        <div className="checking_status_wrap_upcoming">
                                          <span className="checking_status_light_upcoming" />
                                          <span className="text-dark ml-3">
                                            Upcoming
                                          </span>
                                        </div>
                                      )}
                                      {gir.guest_status ===
                                        GUEST_STATUS.inhouse && (
                                        <div className="checking_status_wrap">
                                          <span className="checking_status_light" />
                                          <span className="text-dark ml-3">
                                            Inhouse
                                          </span>
                                        </div>
                                      )}
                                      <div className="row mb-3">
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-calendar.svg")}
                                            alt="Calendar"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_checkin}
                                          </span>
                                          <p>Checking in</p>
                                        </div>
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-calendar.svg")}
                                            alt="Calendar"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_checkout}
                                          </span>
                                          <p>Checking out</p>
                                        </div>
                                      </div>
                                      <div className="row mb-4">
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-feather-user.svg")}
                                            alt="Adult"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_adults}
                                          </span>
                                          <p>Adults</p>
                                        </div>
                                        <div className="col">
                                          <img
                                            src={require("../../assets/img/icons/icon-awesome-baby.svg")}
                                            alt="Child"
                                          />
                                          <span className="ml-3 text-dark font-weight-bold">
                                            {gir.guest_childs}
                                          </span>
                                          <p>Child</p>
                                        </div>
                                      </div>
                                      <div className="cursorPointer d-flex justify-content-center btn btn-primary mb-3">
                                        <Link
                                          to={`./guest-details/${gir.guest}`}
                                        >
                                          <span className="text-white">
                                            Booking Details
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  }
                                >
                                  <div
                                    className={
                                      gir.guest_status === GUEST_STATUS.inhouse
                                        ? "calendar_checkin_disp"
                                        : gir.guest_status ===
                                          GUEST_STATUS.upcoming
                                        ? "calendar_checkin_disp_upcoming"
                                        : 0
                                    }
                                    onClick={() =>
                                      handlePopoverRTOpen(gir.unique)
                                    }
                                  >
                                    {gir.guest_full_name}
                                  </div>
                                </Popover>
                              </td>
                              {emptyTableEndData(gir.to_date)}
                            </tr>
                          ))}
                      </React.Fragment>
                    ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Calendar;
