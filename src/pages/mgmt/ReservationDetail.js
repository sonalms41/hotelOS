import React, { useEffect, useRef, useState } from "react";
import CustomSpinner from "../../components/CustomSpinner";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import ReactToPrint from "react-to-print";

function ReservationDetail(props) {
  const reservationDetailRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [guestDetails, setGuestDetails] = useState({});
  const [reservationStatus, setReservationStatus] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Reservation`;
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/request-guest/?property_id=${propertyId}&guest_id=${props.match.params.id}`,
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
          console.log("data reservation", data);
          if (data.status_code === 200) {
            setGuestDetails(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => reservationConfirmation(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const reservationConfirmation = (bool) => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/booking-confirmation/`,
        {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            guest_id: props.match.params.id,
            booking_status: bool,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data post", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setIsLoading(false);
            setReservationStatus(true);
          }
          if (data.status_code === 203) {
            toast.error(data.message);
            setIsLoading(false);
            setReservationStatus(true);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  if (reservationStatus) return <Redirect to={"/dashboard/bookings"} />;
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        <div className="main_tile">
          <h4 className="heading">Reservation Detail</h4>
        </div>
        <div className="row">
          <div ref={reservationDetailRef} className="col-md-8">
            <div className="dashboard_wrapper">
              <div className="row">
                <div className="col-md-3">
                  <p className="font-weight-bold">Check In</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.checkin}
                  </p>
                </div>
                <div className="col-md-4">
                  <p className="font-weight-bold">Guest Name</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.full_name}
                  </p>
                  <p className="font_weight600 text-dark">
                    {guestDetails.address}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="font-weight-bold">Check Out</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.checkout}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="font-weight-bold">Length of stay</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.lengths} nights
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="font-weight-bold">Booking No.</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.booking_no}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="font-weight-bold">Commotion Percent</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.com_percent}
                  </p>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-3">
                  <p className="font-weight-bold">Total price</p>
                  <p className="font-weight-bold font14 text-dark">
                    NPR {guestDetails.total_price}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="font-weight-bold">No. of guest</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.no_of_guest}
                  </p>
                </div>
                <div className="col-md-3">
                  <p className="font-weight-bold">Commotion Amount</p>
                  <p className="font-weight-bold font14 text-dark">
                    NPR {guestDetails.com_ammount}
                  </p>
                </div>
              </div>
            </div>

            <div className="dashboard_wrapper mt-4">
              <div className="sub-heading">
                <h5 className="heading">Billing</h5>
              </div>
              <div className="row mt-3">
                <div className="col-md-3">
                  <p className="font_weight500">Included</p>
                  <p className="reservationIncluded">Breakfast Included</p>
                  <p className="reservationIncluded">Free Lunch Or Dinner</p>
                  <p className="mt-2 font_weight500">Max Guest</p>
                  <p className="font-weight-bold font14 text-dark">
                    {guestDetails.room_details?.max_guest} guests
                  </p>
                </div>
                <div className="col-md-2" />
                <div className="col-md-7 text-dark">
                  {guestDetails.guest_infos?.length > 0 &&
                    guestDetails.guest_infos.map((room, idx) => (
                      <div
                        key={`guestRoom-${idx}`}
                        className="guest_det_card_billing_border"
                      >
                        <div>
                          <div className="font-weight-bold">
                            {room.room_type}
                          </div>
                          <div className="font11">
                            {room.checkin}- {room.checkout}
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-bold">
                            NPR {room.price}
                          </div>
                          <div className="font11">Standard Rate</div>
                        </div>
                      </div>
                    ))}
                  <div className="reservationTableHeader mt-4">
                    <div>Sub Total</div>
                    <div>NPR {guestDetails.sub_total}</div>
                  </div>
                  <div className="reservationTableData">
                    <div>Vat {guestDetails.vat}</div>
                    <div>NPR {guestDetails.vat_price}</div>
                  </div>
                  <div className="reservationTableHeader">
                    <div>Total</div>
                    <div>NPR {guestDetails.total_price}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="dashboard_wrapper">
              <p className="font-weight-bold font16 text-dark mb-4">
                Update this reservation
              </p>
              <div
                className="reservationCancelBtn mb-4"
                onClick={() => confirmSubmit(false)}
              >
                Cancel
              </div>
              <ReactToPrint
                trigger={() => (
                  <div className="reservationPrintBtn mb-4">Print</div>
                )}
                content={() => reservationDetailRef.current}
              />
              <div
                className="reservationConfirmBtn mb-4"
                onClick={() => confirmSubmit(true)}
              >
                Confirm Booking
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default ReservationDetail;
