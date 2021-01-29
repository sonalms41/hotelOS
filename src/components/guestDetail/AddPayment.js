import React, { useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";
import { toast } from "react-toastify";
import CustomSpinner from "../CustomSpinner";

function AddPayment(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [payment, setPayment] = useState("");
  const [paymentType, setPaymentType] = useState({
    advance: false,
    due: false,
  });

  const handlePayment = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/guest-price/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          guest_id: props.guestId,
          remaining_rate: payment,
          payment_type: paymentType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          if (data.status_code === 200) {
            props.refetch();
            setPayment("");
            setPaymentType({
              advance: false,
              due: false,
            });
            setIsLoading(false);
          } else if (data.status_code === 400) {
            toast.error(data.message);
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
        className="modal-wrapper guest_add_payment"
        style={{ display: props.show ? "block" : "none" }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-auto mt-4 mr-auto">
              <label>
                <input
                  type="checkbox"
                  checked={paymentType.advance}
                  onChange={(e) =>
                    setPaymentType({
                      ...paymentType,
                      advance: e.target.checked,
                    })
                  }
                />
                <span className="ml-2 mb-2">Advance</span>
              </label>
              <label className="ml-4">
                <input
                  type="checkbox"
                  checked={paymentType.due}
                  onChange={(e) =>
                    setPaymentType({
                      ...paymentType,
                      due: e.target.checked,
                    })
                  }
                />
                <span className="ml-2 mb-2">Due Payment</span>
              </label>
            </div>
            <div className="col-auto">
              <span className="close-modal-btn" onClick={props.close}>
                ×
              </span>
            </div>
          </div>
          <div className="row font14 font-weight-bold text-dark">
            <div className="col-auto mr-auto">Total Payable</div>
            <div className="col-auto">NRS {props.totalPayable}</div>
          </div>
          <input
            className="form-control form-control-lg text-right mt-3"
            placeholder="NRS"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
          <span className="btn_addo mt-3" onClick={handlePayment}>
            Update
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddPayment;
