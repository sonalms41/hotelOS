import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import ReactToPrint from "react-to-print";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { handlePayWithKhalti } from "../../components/Khalti";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import CustomSpinner from "../../components/CustomSpinner";

import { ReactComponent as RevenueIcon } from "../../assets/img/icons/revenue_icon.svg";
import { INIT_DATES } from "../../components/InitializeDate";

const TAB_NAMES = {
  overview: "overview",
  revenue: "revenue",
};

const SUB_TAB_NAMES = {
  totalSoldRooms: "totalSoldRooms",
  totalViewsRoom: "totalViewsRoom",
  totalOnlineReservation: "totalOnlineReservation",
  totalWalkInReservation: "totalWalkInReservation",
};

function Analytics() {
  const analyticsRevenueRef = useRef();
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [showTabs, setShowTabs] = useState({
    overview: true,
    revenue: false,
  });
  const [showSubTabs, setShowSubTabs] = useState({
    totalSoldRooms: true,
    totalViewsRoom: false,
    totalOnlineReservation: false,
    totalWalkInReservation: false,
  });
  const [startDate, setStartDate] = useState(
    INIT_DATES(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(INIT_DATES(Date.now()));
  const [startDateAnalytics, setStartDateAnalytics] = useState(
    INIT_DATES(Date.now() - 60 * 24 * 60 * 60 * 1000)
  );
  const [endDateAnalytics, setEndDateAnalytics] = useState(
    INIT_DATES(Date.now())
  );
  const [searchData, setSearchData] = useState(false);
  const [totalRoomSold, setTotalRoomSold] = useState(null);
  const [totalRoomView, setTotalRoomView] = useState(null);
  const [reservationOnline, setReservationOnline] = useState(null);
  const [reservationOffline, setReservationOffline] = useState(null);
  const [graphInfoX, setGraphInfoX] = useState([]);
  const [graphInfoY, setGraphInfoY] = useState([]);
  const [topGuest, setTopGuest] = useState([]);
  const [guestListing, setGuestListing] = useState([]);
  const [onlineRevenue, setOnlineRevenue] = useState(null);
  const [offlineRevenue, setOfflineRevenue] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(null);

  const handleTabs = (tab) => {
    if (tab === TAB_NAMES.overview)
      setShowTabs({
        overview: true,
        revenue: false,
      });
    if (tab === TAB_NAMES.revenue)
      setShowTabs({
        overview: false,
        revenue: true,
      });
  };

  const handleSubTabs = (tab) => {
    if (tab === SUB_TAB_NAMES.totalSoldRooms)
      setShowSubTabs({
        totalSoldRooms: true,
        totalViewsRoom: false,
        totalOnlineReservation: false,
        totalWalkInReservation: false,
      });
    if (tab === SUB_TAB_NAMES.totalViewsRoom)
      setShowSubTabs({
        totalSoldRooms: false,
        totalViewsRoom: true,
        totalOnlineReservation: false,
        totalWalkInReservation: false,
      });
    if (tab === SUB_TAB_NAMES.totalOnlineReservation)
      setShowSubTabs({
        totalSoldRooms: false,
        totalViewsRoom: false,
        totalOnlineReservation: true,
        totalWalkInReservation: false,
      });
    if (tab === SUB_TAB_NAMES.totalWalkInReservation)
      setShowSubTabs({
        totalSoldRooms: false,
        totalViewsRoom: false,
        totalOnlineReservation: false,
        totalWalkInReservation: true,
      });
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Analytics`;

    const fetchHotelRevenue = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-rev/?property_id=${propertyId}`,
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
          console.log("hotel revenue", data);
          if (data.status_code === 200) {
            setOnlineRevenue(data.result.online_revenue);
            setOfflineRevenue(data.result.offline_revenue);
            setTotalRevenue(data.result.total_rev);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchHotelRevenue();
  }, []);

  useEffect(() => {
    const fetchGuestDetails = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/guest-lists/?property_id=${propertyId}&date_in=${startDate}&date_out=${endDate}`,
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
          console.log("data guest", data);
          if (data.status_code === 200) {
            setGuestListing(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchGuestDetails();
  }, [searchData]);

  useEffect(() => {
    const fetchTopGuests = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/top-guests/?property_id=${propertyId}&date_start=${startDateAnalytics}&date_end=${endDateAnalytics}`,
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
          console.log("top guests", data);
          if (data.status_code === 200) {
            setTopGuest(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchTopGuests();
  }, [startDateAnalytics, endDateAnalytics]);

  useEffect(() => {
    const fetchGuestAnalytics = async () => {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/dashboard-analytics/?property_id=${propertyId}&types=${Object.keys(
          showSubTabs
        ).filter(
          (k) => showSubTabs[k]
        )}&date_start=${startDateAnalytics}&date_end=${endDateAnalytics}`,
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
          console.log("guest analytics", data);
          if (data.status_code === 200) {
            setTotalRoomSold(data.result.total_room_sell);
            setTotalRoomView(data.result.total_room_view);
            setReservationOnline(data.result.reservation_online);
            setReservationOffline(data.result.reservation_offline);
            data.guest_info.length > 0 && manageGraphData(data.guest_info);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchGuestAnalytics();
  }, [showSubTabs, startDateAnalytics, endDateAnalytics]);

  const manageGraphData = (arr) => {
    const temp = [];
    arr.forEach((t) => temp.push(t.date));
    setGraphInfoX(temp);

    const tempNew = [];
    arr.forEach((t) => tempNew.push(t.guests));
    setGraphInfoY(tempNew);
  };

  const data = {
    labels: graphInfoX,
    datasets: [
      {
        // label: "legend label",
        data: graphInfoY,
        fill: true,
        backgroundColor: "rgb(205,206,238)",
        borderColor: "rgb(106,111,249)",
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  const handlePay = () => {
    const amountInPaisa = totalRevenue * 100;
    handlePayWithKhalti(amountInPaisa);
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">Analytics Dashboard</h4>
      </div>
      <div className="tab text-dark">
        <div
          className={
            showTabs.overview
              ? "analytics_tab_links_active font-weight-bold"
              : "analytics_tab_links font-weight-bold"
          }
          onClick={() => handleTabs(TAB_NAMES.overview)}
        >
          Overview
        </div>
        <div
          className={
            showTabs.revenue
              ? "analytics_tab_links_active font-weight-bold"
              : "analytics_tab_links font-weight-bold"
          }
          onClick={() => handleTabs(TAB_NAMES.revenue)}
        >
          Revenue
        </div>
      </div>
      <div className="border-bottom mb-4" />
      <div className={showTabs.overview ? "" : "display-none"}>
        <div className="row">
          <div className="col-md-8">
            <div className="dashboard_wrapper">
              <div className="row">
                <div className="col-auto mr-auto">
                  <div className="sub-heading">
                    <h5 className="heading">Analytics</h5>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="d-flex justify-content-between">
                    <div className="field-wrapper input">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={startDateAnalytics}
                        onChange={(e) => setStartDateAnalytics(e.target.value)}
                      />
                    </div>
                    <span className="mx-4 mt-2">to</span>
                    <div className="field-wrapper input">
                      <input
                        type="date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={endDateAnalytics}
                        onChange={(e) => setEndDateAnalytics(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="tab text-center">
                <div
                  className={
                    showSubTabs.totalSoldRooms
                      ? "analytics_sub_tab_links_active font-weight-bold"
                      : "analytics_sub_tab_links font-weight-bold"
                  }
                  onClick={() => handleSubTabs(SUB_TAB_NAMES.totalSoldRooms)}
                >
                  <p className="bulkEditToggle font16 font-weight-bold">
                    {totalRoomSold}
                  </p>
                  <p className="text-dark">Total Rooms Sold</p>
                </div>
                <div
                  className={
                    showSubTabs.totalViewsRoom
                      ? "analytics_sub_tab_links_active font-weight-bold"
                      : "analytics_sub_tab_links font-weight-bold"
                  }
                  onClick={() => handleSubTabs(SUB_TAB_NAMES.totalViewsRoom)}
                >
                  <p className="bulkEditToggle font16 font-weight-bold">
                    {totalRoomView}
                  </p>
                  <p className="text-dark">Total Room Views</p>
                </div>
                <div
                  className={
                    showSubTabs.totalOnlineReservation
                      ? "analytics_sub_tab_links_active font-weight-bold"
                      : "analytics_sub_tab_links font-weight-bold"
                  }
                  onClick={() =>
                    handleSubTabs(SUB_TAB_NAMES.totalOnlineReservation)
                  }
                >
                  <p className="bulkEditToggle font16 font-weight-bold">
                    {reservationOnline}
                  </p>
                  <p className="text-dark">Total Online Reservation</p>
                </div>
                <div
                  className={
                    showSubTabs.totalWalkInReservation
                      ? "analytics_sub_tab_links_active font-weight-bold"
                      : "analytics_sub_tab_links font-weight-bold"
                  }
                  onClick={() =>
                    handleSubTabs(SUB_TAB_NAMES.totalWalkInReservation)
                  }
                >
                  <p className="bulkEditToggle font16 font-weight-bold">
                    {reservationOffline}
                  </p>
                  <p className="text-dark">Total Walk In Reservation</p>
                </div>
              </div>
              <Line data={data} options={options} />
            </div>
          </div>
          <div className="col-md-4">
            <div className="dashboard_wrapper">
              <div className="sub-heading">
                <h5 className="heading">Top Guests</h5>
              </div>
              <hr />
              <div className="mt-4">
                {topGuest?.map((tg, idx) => (
                  <div
                    key={`topGuest-${idx}`}
                    className="d-flex justify-content-between mb-3"
                  >
                    <div className="w-25 font-weight-bold">{tg.city}</div>
                    <div className="mt-2 progress flex-grow-1 mr-2">
                      <div
                        className="progress-bar bg-color-analytics2"
                        role="progressbar"
                        style={{ width: tg.percentage + "%" }}
                        aria-valuenow={tg.percentage}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      />
                    </div>
                    <div className="width-5p">{tg.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={showTabs.revenue ? "" : "display-none"}>
        <div className="row">
          <div className="col-md-9">
            <div className="dashboard_wrapper">
              <div className="row">
                <div className="col-auto">
                  <div className="form-inline mb-2">
                    <div className="field-wrapper input">
                      <label
                        htmlFor="analyticsStartDate"
                        className="justify-content-start font-weight-bold"
                      >
                        Start Date
                      </label>
                      <input
                        id="analyticsStartDate"
                        type="date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </div>

                    <div className="field-wrapper input ml-4">
                      <label
                        htmlFor="analyticsEndDate"
                        className="justify-content-start font-weight-bold"
                      >
                        End Date
                      </label>
                      <input
                        id="analyticsEndDate"
                        type="date"
                        className="form-control"
                        placeholder="YYYY-MM-DD"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <span
                      className="mx-4 btn_addo mt-3"
                      onClick={() => setSearchData((prevState) => !prevState)}
                    >
                      Search
                    </span>
                  </div>
                </div>
                <div className="col-auto ml-auto">
                  <ReactToPrint
                    trigger={() => (
                      <span className="reservationPrintBtn px-4 mt-3">
                        Export as PDF
                      </span>
                    )}
                    content={() => analyticsRevenueRef.current}
                  />
                </div>
                <div className="col-auto">
                  <ReactHTMLTableToExcel
                    className="reservationPrintBtn px-4 mt-3"
                    table="analyticsRevenueTable"
                    filename="analyticsRevenueTable"
                    sheet="tablexls"
                    buttonText="Export as Excel"
                  />
                </div>
              </div>
              <table
                ref={analyticsRevenueRef}
                id="analyticsRevenueTable"
                className="analytics_table"
              >
                <thead>
                  <tr>
                    <th className="width-25p">Check-in / Check-out</th>
                    <th className="width-20p">Room Type</th>
                    <th className="width-25p">Guest Name</th>
                    <th className="width-15p text-center">Total Guest</th>
                    <th className="width-15p text-right">Total Price (NPR)</th>
                  </tr>
                </thead>
                <tbody>
                  {guestListing?.map((guest, index) => (
                    <tr key={`guestAnalytics-${index}`}>
                      <td className="width-25p">
                        <div>{guest.checkin}</div>
                        <div>{guest.checkout}</div>
                      </td>
                      <td className="width-20p">
                        {guest.room_types?.map((rt, idx) => (
                          <div key={`rtAnalytics-${idx}`}>{rt}</div>
                        ))}
                      </td>
                      <td className="width-25p">{guest.guest_name}</td>
                      <td className="width-15p text-center">
                        {guest.no_of_guest}
                      </td>
                      <td className="width-15p font-weight-bold text-right">
                        {guest.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-3">
            <div className="analytics_revenue_wrapper">
              <div className="analytics_revenue_online">
                <div className="row">
                  <div className="col-auto">
                    <div className="analytics_avatar bg-color-analytics1">
                      <RevenueIcon />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="font14">Online Revenue</div>
                    <div className="font14 font-weight-bold">
                      NRS. {onlineRevenue}
                    </div>
                  </div>
                </div>
              </div>
              <div className="analytics_revenue_counter">
                <div className="row">
                  <div className="col-auto">
                    <div className="analytics_avatar bg-color-analytics2">
                      <RevenueIcon />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="font14">Cash in counter</div>
                    <div className="font14 font-weight-bold">
                      NRS. {offlineRevenue}
                    </div>
                  </div>
                </div>
              </div>
              <div className="analytics_revenue_total">
                <div className="font-weight-bold font16">
                  NRS. {totalRevenue}
                </div>
                {totalRevenue !== 0 && (
                  <span
                    className="analytics_withdraw_btn"
                    onClick={totalRevenue < 0 ? null : handlePay}
                  >
                    {totalRevenue < 0 ? "Withdraw" : "Pay"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Analytics;
