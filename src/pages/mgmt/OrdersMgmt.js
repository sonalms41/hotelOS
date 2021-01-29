import React, { useEffect, useRef, useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import { useHistory } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";

function OrdersMgmt() {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [orderData, setOrderData] = useState([]);

  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/orders-history/?property_id=${propertyId}`,
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
          console.log("data order history", data);
          if (data.status_code === 200) {
            setOrderData(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/search-orders-history/?property_id=${propertyId}&search_key=${searchKey}`,
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
          console.log("order search", data);
          if (data.status_code === 200) setOrderData(data.result);
          else if (data.status_code === 400) setOrderData([]);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [searchKey]);

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto">
            <h4 className="heading">
              <img
                className="cursorPointer"
                src={require("../../assets/img/icons/material-keyboard-backspace.svg")}
                alt="Back"
                onClick={() => history.goBack()}
              />
              <span className="ml-4">Order History</span>
            </h4>
          </div>
          <div className="col-auto col-auto--input">
            <div className="order_mgmt_search">
              <div className="order_mgmt_search_icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12.332"
                  height="12.335"
                  viewBox="0 0 15.332 15.335"
                >
                  <path
                    id="search"
                    d="M19.652,18.719l-4.264-4.3a6.077,6.077,0,1,0-.922.934L18.7,19.625a.656.656,0,0,0,.926.024A.661.661,0,0,0,19.652,18.719ZM10.613,15.4A4.8,4.8,0,1,1,14.006,14,4.769,4.769,0,0,1,10.613,15.4Z"
                    transform="translate(-4.5 -4.493)"
                    fill="#949494"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder="Find my order"
                onChange={(e) => setSearchKey(e.target.value)}
              />
            </div>
          </div>
          <div className="col-auto ">
            <span className="order_mgmt_filterBtn">
              <svg
                width="11"
                height="10"
                viewBox="0 0 11 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.66667 9.28571C3.66667 9.09627 3.71496 8.91459 3.80091 8.78064C3.88686 8.64668 4.00344 8.57143 4.125 8.57143H6.875C6.99656 8.57143 7.11314 8.64668 7.19909 8.78064C7.28505 8.91459 7.33333 9.09627 7.33333 9.28571C7.33333 9.47515 7.28505 9.65684 7.19909 9.79079C7.11314 9.92475 6.99656 10 6.875 10H4.125C4.00344 10 3.88686 9.92475 3.80091 9.79079C3.71496 9.65684 3.66667 9.47515 3.66667 9.28571ZM1.83333 5C1.83333 4.81056 1.88162 4.62888 1.96758 4.49492C2.05353 4.36097 2.17011 4.28571 2.29167 4.28571H8.70833C8.82989 4.28571 8.94647 4.36097 9.03242 4.49492C9.11838 4.62888 9.16667 4.81056 9.16667 5C9.16667 5.18944 9.11838 5.37112 9.03242 5.50508C8.94647 5.63903 8.82989 5.71429 8.70833 5.71429H2.29167C2.17011 5.71429 2.05353 5.63903 1.96758 5.50508C1.88162 5.37112 1.83333 5.18944 1.83333 5ZM0 0.714286C0 0.524845 0.0482886 0.343164 0.134243 0.20921C0.220197 0.075255 0.336776 0 0.458333 0H10.5417C10.6632 0 10.7798 0.075255 10.8658 0.20921C10.9517 0.343164 11 0.524845 11 0.714286C11 0.903726 10.9517 1.08541 10.8658 1.21936C10.7798 1.35332 10.6632 1.42857 10.5417 1.42857H0.458333C0.336776 1.42857 0.220197 1.35332 0.134243 1.21936C0.0482886 1.08541 0 0.903726 0 0.714286Z"
                  fill="#426ED9"
                />
              </svg>{" "}
              Filter
            </span>
          </div>
        </div>
      </div>
      <div className="dashboard_wrapper">
        <div className="custom_food_table">
          <table className="table table-borderless table-hover">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Order ID</th>
                <th scope="col">Food Item</th>
                <th scope="col">Date</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orderData.length > 0 &&
                orderData.map((order, idx) => (
                  <tr key={`orderList-${idx}`}>
                    <td>{order.guest_id}</td>
                    <td>{order.order_id}</td>
                    <td>{order.food_name}</td>
                    <td>{order.order_date}</td>
                    <td>{order.food_price}</td>
                    <td>
                      <span className="cursorPointer font16">&#8942;</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrdersMgmt;
