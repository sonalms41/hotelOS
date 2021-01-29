import React, { useEffect, useState } from "react";
import Select from "react-select";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";
import CustomSpinner from "../CustomSpinner";

function OrderAdd(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [foodItems, setFoodItems] = useState([
    {
      meal_name: "",
      quantity: 1,
      price: "",
    },
  ]);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/foods/?property_id=${propertyId}`,
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
          console.log("data food", data);
          if (data.status_code === 200) setFoodData(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  const handleFoodItem = (value, idx) => {
    let temp = [...foodItems];
    temp[idx].meal_name = value.food_name;
    temp[idx].price = value.food_price;
    setFoodItems(temp);
  };

  const handleFoodQtyAdd = (idx) => {
    let temp = [...foodItems];
    temp[idx].quantity += 1;
    setFoodItems(temp);
  };
  const handleFoodQtyMinus = (idx) => {
    let temp = [...foodItems];
    if (temp[idx].quantity !== 1) temp[idx].quantity -= 1;
    setFoodItems(temp);
  };

  const handleFoodDelete = () => {
    if (foodItems.length !== 1) {
      let temp = [...foodItems];
      temp.splice(temp.length - 1, 1);
      setFoodItems(temp);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/guest-orders/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          guest_id: props.id,
          orders: foodItems,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data post", data);
          if (data.status_code === 200) {
            setIsLoading(false);
            setFoodItems([
              {
                meal_name: "",
                quantity: 1,
                price: "",
              },
            ]);
            props.refetch();
            props.refetchComponent();
            props.close();
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const foodOptions = foodData.map((food) => {
    return { value: food, label: food.food_name };
  });

  return (
    <div>
      <CustomSpinner isLoading={isLoading} />
      <div
        className="modal-wrapper guest_order_add"
        style={{ display: props.show ? "block" : "none" }}
      >
        <div className="modal-body">
          <div className="px-4">
            <div className="row">
              <div className="col-auto mt-3 mr-auto">
                <span className="font-weight-bold font16 text-dark">
                  Add Order
                </span>
              </div>
              <div className="col-auto">
                <span className="close-modal-btn" onClick={props.close}>
                  ×
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {foodItems.map((foodItem, index) => (
                <div key={`foodForm-${index}`} className="mb-4">
                  <div className="form-group">
                    <label>Item</label>
                    <Select
                      styles={{
                        // Fixes the overlapping problem of the component
                        menu: (provided) => ({ ...provided, zIndex: 99 }),
                      }}
                      placeholder="Choose a food item"
                      options={foodOptions}
                      onChange={(opt) => handleFoodItem(opt.value, index)}
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-8">
                      <div className="form-group">
                        <label>Price</label>
                        <input
                          className="form-control form-control-lg"
                          placeholder="Enter Price"
                          value={foodItem.price}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Qty</label>
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-secondary font-weight-bold"
                              type="button"
                              onClick={() => handleFoodQtyMinus(index)}
                            >
                              -
                            </button>
                          </div>
                          <div className="form-control form-control-lg text-center">
                            {foodItem.quantity}
                          </div>
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-secondary font-weight-bold"
                              type="button"
                              onClick={() => handleFoodQtyAdd(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-2">
                <span
                  className="add_food_btn"
                  onClick={() =>
                    setFoodItems((prevState) => [
                      ...prevState,
                      {
                        meal_name: "",
                        quantity: 1,
                        price: "",
                      },
                    ])
                  }
                >
                  + Add Food
                </span>
                <span
                  className="ml-4 delete_food_btn"
                  onClick={handleFoodDelete}
                >
                  X Delete Food
                </span>
              </div>
              <div className="row mt-4">
                <div className="col-auto mt-3 mr-auto">
                  <span
                    className="cursorPointer text-dark font14"
                    onClick={props.close}
                  >
                    Cancel
                  </span>
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn_addo">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderAdd;
