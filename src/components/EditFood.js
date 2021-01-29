import React, { useEffect, useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "./LocalStorageInfo";
import CustomSpinner from "./CustomSpinner";
import { toast } from "react-toastify";

function EditFood(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");

  useEffect(() => {
    const { type, name, price } = props.data;
    setFoodType(type);
    setFoodName(name);
    setFoodPrice(price);
  }, [props]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/foods/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          food_id: props.show,
          food_type: foodType,
          food_name: foodName,
          food_price: foodPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data edit", data);
          if (data.status_code === 200) {
            props.refetchData();
            props.close();
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
        className="modal-wrapper manageUser_add"
        style={{ display: props.show ? "block" : "none" }}
      >
        <div className="modal-body">
          <div className="row mb-4">
            <div className="col-auto mt-4 mr-auto">
              <div className="sub-heading">
                <h5 className="heading">Edit Food Category</h5>
              </div>
            </div>
            <div className="col-auto">
              <span className="close-modal-btn" onClick={props.close}>
                ×
              </span>
            </div>
          </div>
          <form onSubmit={handleEditSubmit}>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineEditRadioOptions"
                id="inlineFoodEditRadio1"
                value="Breakfast"
                checked={foodType === "Breakfast"}
                onChange={(e) => setFoodType(e.target.value)}
                required
              />
              <label
                className="form-check-label"
                htmlFor="inlineFoodEditRadio1"
              >
                Breakfast
              </label>
            </div>
            <div className="form-check form-check-inline ml-5">
              <input
                className="form-check-input"
                type="radio"
                name="inlineEditRadioOptions"
                id="inlineFoodEditRadio2"
                value="Lunch"
                checked={foodType === "Lunch"}
                onChange={(e) => setFoodType(e.target.value)}
                required
              />
              <label
                className="form-check-label"
                htmlFor="inlineFoodEditRadio2"
              >
                Lunch
              </label>
            </div>
            <div className="form-check form-check-inline ml-5">
              <input
                className="form-check-input"
                type="radio"
                name="inlineEditRadioOptions"
                id="inlineFoodEditRadio3"
                value="Dinner"
                checked={foodType === "Dinner"}
                onChange={(e) => setFoodType(e.target.value)}
                required
              />
              <label
                className="form-check-label"
                htmlFor="inlineFoodEditRadio3"
              >
                Dinner
              </label>
            </div>
            <div className="form-group mt-4">
              <label htmlFor="foodEditItem" className="bulk_edit_label">
                Food Item
              </label>
              <input
                id="foodEditItem"
                className="form-control bulk_edit_text"
                placeholder="Type food item"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mt-4">
              <label htmlFor="foodEditPrice" className="bulk_edit_label">
                Food Price(NRS)
              </label>
              <input
                id="foodEditPrice"
                className="form-control bulk_edit_text"
                placeholder="Type food price"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                required
              />
            </div>
            <div className="float-right mb-4">
              <button type="submit" className="btn_addo">
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditFood;
