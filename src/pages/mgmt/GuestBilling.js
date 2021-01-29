import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import CustomSpinner from "../../components/CustomSpinner";
import AddPayment from "../../components/guestDetail/AddPayment";
import StayExtend from "../../components/guestDetail/StayExtend";

function GuestBilling(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [billingDetails, setBillingDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRefetch, setIsRefetch] = useState(false);

  let history = useHistory();

  const copyGuestCode = () => {
    document.getElementById("guestCodeBillingForCopy").select();
    document.execCommand("copy");
  };

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Billings`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/billings/?property_id=${propertyId}&guest_id=${props.match.params.id}`,
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
          console.log("data biling", data);
          if (data.status_code === 200) {
            setBillingDetails(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [isRefetch]);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">
          <img
            className="cursorPointer"
            src={require("../../assets/img/icons/material-keyboard-backspace.svg")}
            alt="Back"
            onClick={() => history.goBack()}
          />
          <span className="ml-4">{billingDetails.full_name}</span>
          <span className="ml-5">
            <img
              className="cursorPointer mr-2"
              src={require("../../assets/img/icons/icon-feather-copy.svg")}
              alt="Copy"
              onClick={copyGuestCode}
            />
            <input
              id="guestCodeBillingForCopy"
              className="inputWithNoStyle text-dark font12 font_weight500"
              value={billingDetails.guest_code}
            />
          </span>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="dashboard_wrapper text-dark">
            {billingDetails.guest_infos?.length > 0 &&
              billingDetails.guest_infos.map((room, idx) => (
                <div
                  key={`guestRoom-${idx}`}
                  className="guest_det_card_billing_border"
                >
                  <div>
                    <div className="font-weight-bold">{room.room_type}</div>
                    <div className="font11">
                      {room.checkin}- {room.checkout}
                    </div>
                  </div>
                  <div>
                    <div className="font-weight-bold">NPR {room.price}</div>
                    <div className="font11">Standard Rate</div>
                  </div>
                </div>
              ))}
            <div className="guest_det_card_billing">
              <div className="font-weight-bold">Sub Total</div>
              <div className="font-weight-bold">
                NPR {billingDetails.actual_amount}
              </div>
            </div>
            <div className="guest_det_card_billing">
              <div>Vat 13%</div>
              <div>NPR {billingDetails.vat}</div>
            </div>
            <div className="guest_det_card_billing">
              <div className="font-weight-bold font16">Total</div>
              <div className="font-weight-bold font16">
                NRS. {billingDetails.total_amount}
              </div>
            </div>
          </div>

          <div className="dashboard_wrapper text-dark mt-2">
            <div className="guest_det_card_billing">
              <div>Advance</div>
              <div>NPR {billingDetails.advance}</div>
            </div>
            {billingDetails.debit !== null && (
              <div className="guest_det_card_billing">
                <div className="font14">Debit</div>
                <div className="font14">NPR {billingDetails.debit}</div>
              </div>
            )}
            {billingDetails.credit !== null && (
              <div className="guest_det_card_billing">
                <div className="font14">Credit</div>
                <div className="font14">NPR {billingDetails.credit}</div>
              </div>
            )}
            <div className="guest_det_card_billing">
              <div className="font14">Food & Breakfast</div>
              <div className="font14">NPR {billingDetails.orders_total}</div>
            </div>
            <div className="border-bottom mb-3" />
            <div className="guest_det_card_billing">
              <div className="font-weight-bold font14">Total</div>
              <div className="font-weight-bold font14">
                NRS. {billingDetails.second_total}
              </div>
            </div>
            {billingDetails.paid_on?.length > 0 &&
              billingDetails.paid_on.map((paidOn, idx) => (
                <div key={`paidOn-${idx}`} className="guest_det_card_billing">
                  <div>
                    <span className="font14">Paid on</span>
                    <span className="ml-2 small">({paidOn.paid_on})</span>
                  </div>
                  <div className="font14">NRS {paidOn.amount}</div>
                </div>
              ))}
            <div className="border-bottom mb-3" />
            <div className="guest_det_card_billing">
              <div className="font-weight-bold font14">Total Payable</div>
              <div className="font-weight-bold font14">
                NRS. {billingDetails.total_payable}
              </div>
            </div>
            <div className="guest_det_card_billing_border">
              <div />
              <div
                className="cursorPointer text-danger"
                onClick={() => setIsModalOpen(true)}
              >
                + Add payment
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
      <AddPayment
        className="modal"
        show={isModalOpen}
        close={() => setIsModalOpen(false)}
        guestId={props.match.params.id}
        totalPayable={billingDetails.total_payable}
        refetch={() => setIsRefetch((prevState) => !prevState)}
      />
    </>
  );
}

export default GuestBilling;
