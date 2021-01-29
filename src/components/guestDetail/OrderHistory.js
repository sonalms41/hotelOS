import React, { useEffect, useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";

function OrderHistory(props) {
  const [propertyId] = useState(PROPERTY_ID());
  const [userToken] = useState(USER_TOKEN());
  const [orderHistory, setOrderHistory] = useState([]);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/guest-orders/?property_id=${propertyId}&guest_id=${props.id}`,
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
          console.log("data order", data);
          if (data.status_code === 200) {
            setOrderHistory(data.result.orders);
            setTotalCost(data.result.total);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [props.refetchComponent]);

  return (
    <div>
      <div
        className="modal-wrapper"
        style={{
          display: props.show ? "block" : "none",
          width: "75%",
          left: "15%",
          top: "5%",
          maxHeight: "85%",
        }}
      >
        <div className="modal-header">
          <h4>Order History</h4>
          <span className="close-modal-btn" onClick={props.close}>
            ×
          </span>
        </div>
        <div className="modal-body">
          <div className="px-4 py-2">
            {orderHistory.length > 0 ? (
              orderHistory.map((order, index) => (
                <div key={`order-${index}`}>
                  <p className="font-weight-bold font20 mb-3">{order.date}</p>
                  <table className="table table-borderless table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Items</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Time</th>
                        <th scope="col" className="text-right">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.datas.length > 0 &&
                        order.datas.map((info, idx) => (
                          <tr
                            key={`order-info-${idx}`}
                            className="guest_det_card"
                          >
                            <td>{info.name}</td>
                            <td>{info.quantity}</td>
                            <td>{info.order_date}</td>
                            <td className="text-right">{info.price}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="row guest_det_card_totalPrice">
                    <div className="col-auto mr-auto">Total</div>
                    <div className="col-auto">{totalCost}</div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center">No orders!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
