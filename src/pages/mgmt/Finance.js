import React, { useEffect, useRef, useState } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import CustomSpinner from "../../components/CustomSpinner";
import { INIT_DATES } from "../../components/InitializeDate";
import ReactToPrint from "react-to-print";

const TAB_NAMES = {
  overview: "overview",
  dailyReport: "dailyReport",
  areaReport: "areaReport",
  dailySales: "dailySales",
};

function Finance() {
  const financeOverviewRef = useRef();
  const financeDailyReportRef = useRef();
  const financeAreaReportRef = useRef();
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [showTabs, setShowTabs] = useState({
    overview: true,
    dailyReport: false,
    areaReport: false,
    dailySales: false,
  });
  const [startDate, setStartDate] = useState(
    INIT_DATES(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(INIT_DATES(Date.now()));
  const [roomType, setRoomType] = useState("All");
  const [roomTypeOption, setRoomTypeOption] = useState([]);
  const [searchData, setSearchData] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [totalSales, setTotalSales] = useState(null);
  const [dailyReport, setDailyReport] = useState([]);
  const [areaReport, setAreaReport] = useState([]);
  const [dailyCancelledBooking, setDailyCancelledBooking] = useState(null);
  const [dailyTotalCommission, setDailyTotalCommission] = useState(null);
  const [dailyTotalSales, setDailyTotalSales] = useState(null);

  const handleTabs = (tab) => {
    if (tab === TAB_NAMES.overview)
      setShowTabs({
        overview: true,
        dailyReport: false,
        areaReport: false,
        dailySales: false,
      });
    if (tab === TAB_NAMES.dailyReport)
      setShowTabs({
        overview: false,
        dailyReport: true,
        areaReport: false,
        dailySales: false,
      });
    if (tab === TAB_NAMES.areaReport)
      setShowTabs({
        overview: false,
        dailyReport: false,
        areaReport: true,
        dailySales: false,
      });
    if (tab === TAB_NAMES.dailySales)
      setShowTabs({
        overview: false,
        dailyReport: false,
        areaReport: false,
        dailySales: true,
      });
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Finance`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/property-subs/?property_id=${propertyId}`,
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
          console.log("data room type", data);
          if (data.status_code === 200) {
            setRoomTypeOption(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchReportOverview = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/room-report/?property_id=${propertyId}&date_in=${startDate}&date_out=${endDate}&room_type=${roomType}`,
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
            setReportData(data.guests);
            setTotalSales(data.total_sales);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setReportData([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchReportOverview();

    const fetchDailyReport = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/daily-booking-report/?property_id=${propertyId}&date=${endDate}`,
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
          console.log("daily report", data);
          if (data.status_code === 200) {
            setDailyReport(data.result);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setDailyReport([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchDailyReport();

    const fetchAreaReport = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/area-booking-report/?property_id=${propertyId}&date_in=${startDate}&date_out=${endDate}`,
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
          console.log("area report", data);
          if (data.status_code === 200) {
            setAreaReport(data.result);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setAreaReport([]);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchAreaReport();

    const fetchDailySales = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/daily-sales/?property_id=${propertyId}&date=${endDate}`,
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
          console.log("daily sales", data);
          if (data.status_code === 200) {
            setDailyCancelledBooking(data.cancelled);
            setDailyTotalCommission(data.total_commision);
            setDailyTotalSales(data.total_sales);
            setIsLoading(false);
          } else if (data.status_code === 400) {
            setDailyCancelledBooking(null);
            setDailyTotalCommission(null);
            setDailyTotalSales(null);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchDailySales();
  }, [searchData]);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">Finance</h4>
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
            showTabs.dailyReport
              ? "analytics_tab_links_active font-weight-bold"
              : "analytics_tab_links font-weight-bold"
          }
          onClick={() => handleTabs(TAB_NAMES.dailyReport)}
        >
          Daily Report
        </div>
        <div
          className={
            showTabs.areaReport
              ? "analytics_tab_links_active font-weight-bold"
              : "analytics_tab_links font-weight-bold"
          }
          onClick={() => handleTabs(TAB_NAMES.areaReport)}
        >
          Area Report
        </div>
        <div
          className={
            showTabs.dailySales
              ? "analytics_tab_links_active font-weight-bold"
              : "analytics_tab_links font-weight-bold"
          }
          onClick={() => handleTabs(TAB_NAMES.dailySales)}
        >
          Daily Sales
        </div>
      </div>
      <div className="border-bottom mb-4" />
      <div className="dashboard_wrapper">
        <div className="row">
          <div className="col-auto col-auto--filter">
            <div className="form-inline mb-4">
              {!(showTabs.dailyReport || showTabs.dailySales) && (
                <div className="field-wrapper input mr-4">
                  <label
                    htmlFor="financeStartDate"
                    className="justify-content-start font-weight-bold"
                  >
                    Start Date
                  </label>
                  <input
                    id="financeStartDate"
                    type="date"
                    className="form-control"
                    placeholder="YYYY-MM-DD"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              )}
              <div className="field-wrapper input">
                <label
                  htmlFor="financeEndDate"
                  className="justify-content-start font-weight-bold"
                >
                  {!(showTabs.dailyReport || showTabs.dailySales)
                    ? "End Date"
                    : "Date"}
                </label>
                <input
                  id="financeEndDate"
                  type="date"
                  className="form-control"
                  placeholder="YYYY-MM-DD"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              {!(
                showTabs.dailyReport ||
                showTabs.areaReport ||
                showTabs.dailySales
              ) && (
                <div className="field-wrapper input ml-4">
                  <label
                    htmlFor="financeRoomType"
                    className="justify-content-start font-weight-bold"
                  >
                    Room Type
                  </label>
                  <select
                    id="financeRoomType"
                    className="form-control"
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option value={"All"}>All</option>
                    {roomTypeOption?.map((rt, idx) => (
                      <option key={`frop-${idx}`} value={rt}>
                        {rt}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <span
                className="mx-4 btn_addo mt-3"
                onClick={() => setSearchData((prevState) => !prevState)}
              >
                Search
              </span>
            </div>
          </div>
          {!showTabs.dailySales && (
            <>
              <div className="col-auto col-auto--pdf ml-auto">
                <ReactToPrint
                  trigger={() => (
                    <span className="reservationPrintBtn px-4 mt-3">
                      Export as PDF
                    </span>
                  )}
                  content={() =>
                    showTabs.overview
                      ? financeOverviewRef.current
                      : showTabs.dailyReport
                      ? financeDailyReportRef.current
                      : showTabs.areaReport
                      ? financeAreaReportRef.current
                      : null
                  }
                />
              </div>
              <div className="col-auto col-auto--excel">
                <ReactHTMLTableToExcel
                  className="reservationPrintBtn px-4 mt-3"
                  table={
                    showTabs.overview
                      ? "financeOverviewTable"
                      : showTabs.dailyReport
                      ? "financeDailyReportTable"
                      : showTabs.areaReport
                      ? "financeAreaReportTable"
                      : ""
                  }
                  filename={
                    showTabs.overview
                      ? "financeOverviewTable"
                      : showTabs.dailyReport
                      ? "financeDailyReportTable"
                      : showTabs.areaReport
                      ? "financeAreaReportTable"
                      : ""
                  }
                  sheet="tablexls"
                  buttonText="Export as Excel"
                />
              </div>
            </>
          )}
        </div>
        <div className={showTabs.overview ? "" : "display-none"}>
          <table
            ref={financeOverviewRef}
            id="financeOverviewTable"
            className="analytics_table"
          >
            <thead>
              <tr>
                <th className="width-10p">S.no.</th>
                <th className="width-20p">Reservation date</th>
                <th className="width-15p">Online sale</th>
                <th className="width-15p">Counter sale</th>
                <th className="width-15p text-center">Vacant room</th>
                <th className="width-15p text-center">Total room on sale</th>
                <th className="width-20p text-center">Online revenue</th>
                <th className="width-20p text-right">Counter revenue</th>
              </tr>
            </thead>
            <tbody>
              {reportData?.map((report, index) => (
                <tr key={`guestReportFinance-${index}`}>
                  <td className="width-10p">{index + 1}</td>
                  <td className="width-20p">{report.reserv}</td>
                  <td className="width-15p">{report.online_sale}</td>
                  <td className="width-15p">{report.counter_sale}</td>
                  <td className="width-15p text-center">
                    {report.vacant_room}
                  </td>
                  <td className="width-15p text-center">
                    {report.total_room_sell}
                  </td>
                  <td className="width-20p font-weight-bold text-center">
                    {report.online_revenue}
                  </td>
                  <td className="width-20p font-weight-bold text-right">
                    {report.counter_revenue}
                  </td>
                </tr>
              ))}
              {reportData.length > 0 && (
                <tr className="text-dark mb-2">
                  <td className="width-10p" />
                  <td className="width-20p" />
                  <td className="width-15p" />
                  <td className="width-15p" />
                  <td className="width-15p" />
                  <td className="width-15p" />
                  <td className="width-20p font-weight-bold text-center font14">
                    Total sales
                  </td>
                  <td className="width-20p font-weight-bold text-right font14">
                    NRS. {totalSales}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className={showTabs.dailyReport ? "" : "display-none"}>
          <table
            ref={financeDailyReportRef}
            id="financeDailyReportTable"
            className="analytics_table"
          >
            <thead>
              <tr>
                <th className="width-30p">S.no.</th>
                <th className="width-40p text-center">Booking ID</th>
                <th className="width-40p text-right">No. of rooms</th>
              </tr>
            </thead>
            <tbody>
              {dailyReport?.map((report, index) => (
                <tr key={`guestReportFinance-${index}`}>
                  <td className="width-30p">{index + 1}</td>
                  <td className="width-40p text-center">{report.booking_id}</td>
                  <td className="width-40p text-right">{report.no_of_rooms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={showTabs.areaReport ? "" : "display-none"}>
          <table
            ref={financeAreaReportRef}
            id="financeAreaReportTable"
            className="analytics_table"
          >
            <thead>
              <tr>
                <th className="width-10p">S.no.</th>
                <th className="width-15p text-center">Booking ID</th>
                <th className="width-20p text-center">Area</th>
                <th className="width-20p text-center">Online sale</th>
                <th className="width-20p text-center">Counter sale</th>
                <th className="width-20p text-right">Total amount</th>
              </tr>
            </thead>
            <tbody>
              {areaReport?.map((report, index) => (
                <tr key={`guestReportFinance-${index}`}>
                  <td className="width-10p">{index + 1}</td>
                  <td className="width-15p text-center">{report.booking_id}</td>
                  <td className="width-20p text-center">{report.area}</td>
                  <td className="width-20p text-center">{report.online}</td>
                  <td className="width-20p text-center">{report.counter}</td>
                  <td className="width-20p font-weight-bold text-right">
                    {report.total_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={showTabs.dailySales ? "" : "display-none"}>
          <div className="text-dark font16">
            <span className="font-weight-bold ">Bookings Cancelled:</span>
            <span className="ml-4">{dailyCancelledBooking}</span>
          </div>
          <div className="text-dark font16">
            <span className="font-weight-bold ">Total Commission:</span>
            <span className="ml-4">NRS. {dailyTotalCommission}</span>
          </div>
          <div className="text-dark font16">
            <span className="font-weight-bold ">Total Sales:</span>
            <span className="ml-4">{dailyTotalSales}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Finance;
