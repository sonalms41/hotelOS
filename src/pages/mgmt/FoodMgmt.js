import React, { useEffect, useState } from "react";
import CustomSpinner from "../../components/CustomSpinner";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import { Link } from "react-router-dom";
import Popover from "react-tiny-popover";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import EditFood from "../../components/EditFood";

function FoodMgmt() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [foodType, setFoodType] = useState("");
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodData, setFoodData] = useState([]);
  const [isPopoverOpen, setIsPopoverOpen] = useState(null);
  const [isOnEdit, setIsOnEdit] = useState(null);
  const [foodEditData, setFoodEditData] = useState({});
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Food Mgmt`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
          if (data.status_code === 200) {
            setFoodData(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetchData]);

  const handleEdit = (id) => {
    let temp = [...foodData];
    temp = temp.filter((t) => t.food_id === id);
    setFoodEditData({
      type: temp[0].food_type,
      name: temp[0].food_name,
      price: temp[0].food_price,
    });
    setIsOnEdit(id);
  };

  const confirmSubmit = (id) => {
    confirmAlert({
      title: "Are you sure to do this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleDelete = (id) => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/foods/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          food_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data post", data);
          if (data.status_code === 200) {
            setRefetchData((prevState) => !prevState);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/foods/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          food_type: foodType,
          food_name: foodName,
          food_price: foodPrice,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data post", data);
          if (data.status_code === 200) {
            setRefetchData((prevState) => !prevState);
            setFoodType("");
            setFoodName("");
            setFoodPrice("");
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
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">Food Management</h4>
          </div>
          <div className="col-auto">
            <Link to={"./order-history"}>
              <span className="btn_addo">Order History</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="dashboard_wrapper">
            <div className="sub-heading">
              <h5 className="heading">Add Food Category</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineFoodRadio1"
                  value="Breakfast"
                  checked={foodType === "Breakfast"}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="inlineFoodRadio1">
                  Breakfast
                </label>
              </div>
              <div className="form-check form-check-inline ml-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineFoodRadio2"
                  value="Lunch"
                  checked={foodType === "Lunch"}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="inlineFoodRadio2">
                  Lunch
                </label>
              </div>
              <div className="form-check form-check-inline ml-5">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineFoodRadio3"
                  value="Dinner"
                  checked={foodType === "Dinner"}
                  onChange={(e) => setFoodType(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="inlineFoodRadio3">
                  Dinner
                </label>
              </div>
              <div className="form-group mt-4">
                <label htmlFor="foodItem" className="bulk_edit_label">
                  Food Item
                </label>
                <input
                  id="foodItem"
                  className="form-control bulk_edit_text"
                  placeholder="Type food item"
                  onChange={(e) => setFoodName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-4">
                <label htmlFor="foodPrice" className="bulk_edit_label">
                  Food Price(NRS)
                </label>
                <input
                  id="foodPrice"
                  className="form-control bulk_edit_text"
                  placeholder="Type food price"
                  onChange={(e) => setFoodPrice(e.target.value)}
                  required
                />
              </div>
              <div className="row">
                <div className="col-auto mt-3 mr-auto">
                  <input
                    type="reset"
                    value={"Cancel"}
                    className="inputWithNoStyle"
                  />
                </div>
                <div className="col-auto">
                  <button type="submit" className="btn_addo">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <div className="dashboard_wrapper">
            <div className="sub-heading">
              <h5 className="heading">Food Category List</h5>
            </div>
            <div className="custom_food_table">
              <table className="table table-borderless table-hover">
                <thead>
                  <tr>
                    <th scope="col">Food Item</th>
                    <th scope="col">Meal Type</th>
                    <th scope="col">Price(NRS)</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {foodData.length > 0 ? (
                    foodData.map((food, idx) => (
                      <tr key={`foodList-${idx}`}>
                        <td>{food.food_name}</td>
                        <td>{food.food_type}</td>
                        <td>{food.food_price}</td>
                        <td>
                          <Popover
                            isOpen={isPopoverOpen === food.food_id}
                            position={"bottom"}
                            onClickOutside={() => setIsPopoverOpen(null)}
                            content={
                              <div className="px-4 py-2 borderRadius4 bg-color-light2 text-dark font12">
                                <div>
                                  <span
                                    className="cursorPointer"
                                    onClick={() => handleEdit(food.food_id)}
                                  >
                                    Edit
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className="cursorPointer"
                                    onClick={() => confirmSubmit(food.food_id)}
                                  >
                                    Delete
                                  </span>
                                </div>
                              </div>
                            }
                          >
                            <span
                              className="cursorPointer font16"
                              onClick={() => setIsPopoverOpen(food.food_id)}
                            >
                              &#8942;
                            </span>
                          </Popover>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="font16 text-danger">No foods added!</td>
                      <td />
                      <td />
                      <td />
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <EditFood
        show={isOnEdit}
        close={() => setIsOnEdit(null)}
        data={foodEditData}
        refetchData={() => setRefetchData((prevState) => !prevState)}
      />
    </>
  );
}

export default FoodMgmt;
