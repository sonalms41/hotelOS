import React, { useState, useEffect, Fragment } from "react";
import CustomSpinner from "../../../../CustomSpinner";
import adminPropServices from "../../../adminServices/property";
import { toastNotification } from "../../../adminUtility";

const AdminReconcilationReport = (props) => {
  const { propertyId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reconcData, setReconcData] = useState(null);

  const hanldleDateChange = (e, date) => {
    const recDate = e.target.value;
    if (date === "start_date") {
      setStartDate(recDate);
    } else if (date === "end_date") {
      setEndDate(recDate);
    }
  };

  const handleReconcilationReport = (propId, startDate, endDate) => {
    setIsLoading(true);
    if (startDate === undefined || endDate === undefined) {
      toastNotification.warn("Please select date!");
    }
    adminPropServices.get
      .reconcilationReport(propId, startDate, endDate)
      .then((resposne) => {
        const data = resposne.data;
        if (data.status_code === 200) {
          setReconcData(data.result);
        }
        setReconcData(data.result);
        setIsLoading(false);
      })
      .catch((errors) => {
        toastNotification.error(errors);
        setIsLoading(false);
      });
  };
  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="reconc-report ">
        <div className="reconc-report__filter card-primary flex-aFE-jSB">
          <div className="field-wrapper flex-ffC width-40p">
            <label htmlFor="start_date">Please select Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              placeholder="select start date"
              onChange={(e) => hanldleDateChange(e, "start_date")}
            />
          </div>
          
          <div className="field-wrapper flex-ffC width-40p">
            <label htmlFor="end_date">Please select End Date</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              placeholder="select end date"
              onChange={(e) => hanldleDateChange(e, "end_date")}
            />
          </div>
          <button
            className="admin-btn admin-btn--primary"
            onClick={() =>
              handleReconcilationReport(propertyId, startDate, endDate)
            }
          >
            Get Reconcilation Report
          </button>
        </div>
        <div className="reconc-report__data">
          <div className="card-primary">
            <table className="admin-table admin-table--masteroccupancy">
              <thead>
                <tr>
                  <th className="width-7p">Client ID</th>
                  <th className="width-13p">Client Name</th>
                  <th className="width-13p">City</th>
                  <th className="width-7p">Booking ID</th>
                  <th className="width-10p">Booking Date</th>
                  <th className="width-5p">N Guests</th>
                  <th className="width-5p">N Rooms</th>
                  <th className="width-10p">Pay Method</th>
                  <th className="width-10p">Status</th>
                  <th className="width-10p text-right">Tot Amount</th>
                  <th className="width-10p text-right">Commission</th>
                </tr>
              </thead>
              <tbody>
                {reconcData && (
                  <Fragment>
                    {reconcData.length >= 1 &&
                      reconcData.map((data, i) => {
                        return (
                          <tr key={`{rec-history-key-${i}}`}>
                            <td className="width-7p">{data.client_id}</td>
                            <td className="width-13p">{data.client_name}</td>
                            <td className="width-13p">{data.city}</td>
                            <td className="width-7p">{data.booking_id}</td>
                            <td className="width-10p">{data.date}</td>
                            <td className="width-5p">{data.num_of_guest}</td>
                            <td className="width-5p">{data.num_of_rooms}</td>
                            <td className="width-10p">{data.payment_method}</td>
                            <td className="width-10p">{data.status}</td>
                            <td className="width-10p text-right">
                              {data.total_amt}
                            </td>
                            <td className="width-10p text-right">
                              {data.commission}
                            </td>
                          </tr>
                        );
                      })}
                  </Fragment>
                )}
                {reconcData && reconcData.length === 0 && (
                  <h3>Report Not Available</h3>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReconcilationReport;
