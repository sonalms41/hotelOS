import React, { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

function EditRoom(props) {
  const hasMount = useRef(false);
  const [propertyId, setPropertyId] = useState(PROPERTY_ID);
  const [userToken, setUserToken] = useState(USER_TOKEN);
  const [isLoading, setIsLoading] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [roomName, setRoomName] = useState("");
  const [customName, setCustomName] = useState("");
  const [smokingAllowed, setSmokingAllowed] = useState("No");
  const [nRoom, setNRoom] = useState(1);
  const [maxRoomList, setMaxRoomList] = useState([]);
  const [roomCollection, setRoomCollection] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [bedList, setBedList] = useState([]);
  const [bedState, setBedState] = useState([]);
  const [roomSize, setRoomSize] = useState("");
  const [roomSizeUnit, setRoomSizeUnit] = useState("Sq. meter");
  const [nGuest, setNGuest] = useState("1");
  const [maxGuest, setMaxGuest] = useState("2");
  const [basePrice, setBasePrice] = useState([]);
  const [parkingStatus, setParkingStatus] = useState("Yes, Free");
  const [parkingPrivacy, setParkingPrivacy] = useState("Private");
  const [parkingLocation, setParkingLocation] = useState("Onside");
  const [parkingReservation, setParkingReservation] = useState(
    "Reservation needed"
  );
  const [parkingPrice, setParkingPrice] = useState("");
  const [breakfastAvailability, setBreakfastAvailability] = useState("No");
  const [breakfastPrice, setBreakfastPrice] = useState("");
  const [lunchAvailability, setLunchAvailability] = useState("No");
  const [lunchPrice, setLunchPrice] = useState("");
  const [dinnerAvailability, setDinnerAvailability] = useState("No");
  const [dinnerPrice, setDinnerPrice] = useState("");
  const [showTabs, setShowTabs] = useState({
    breakfast: true,
    lunch: false,
    dinner: false,
  });
  const [roomFacilities, setRoomFacilities] = useState([]);
  const [roomFacilitiesList, setRoomFacilitiesList] = useState([]);
  const [roomError, setRoomError] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [addRoomSuccess, setAddRoomSuccess] = useState(false);

  let history = useHistory();

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Edit Room`;
    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/rooms-under-sub/?property_id=${propertyId}&sub_room_type=${props.match.params.id}`,
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
          console.log("data sub room", data);
          if (data.status_code === 200) setRoomType(data.room_type);
        })
        .catch((error) => console.error(error));
    };
    fetchData();

    const fetchMaxGuest = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/specific-guest-inroom/?property_id=${propertyId}&room_type=${props.match.params.id}`,
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
          console.log("data max guest", data);
          if (data.status_code === 200) {
            setMaxGuest(data.result.number_of_people.length);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchMaxGuest();

    const fetchAmenities = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/store-room-aminity/?property_id=${propertyId}`,
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
          console.log("data amenities", data);
          if (data.status_code === 200) {
            setRoomFacilitiesList(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchAmenities();
  }, []);

  useEffect(() => {
    if (!hasMount.current) {
      hasMount.current = true;
      return;
    }

    const fetchBedData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/super-admin/bed-type/`,
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
          console.log("data bed", data);
          if (data.status === 200) {
            setBedList(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchBedData();

    const fetchFloorData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/all-floors/?property_id=${propertyId}`,
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
          console.log("data floor", data);
          if (data.status_code === 200) {
            setFloorList(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchFloorData();

    const fetchEditData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/create-room/?property_id=${propertyId}&room_type=${roomType}&sub_room_type=${props.match.params.id}`,
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
          console.log("data edit", data);
          if (data.status_code === 200) {
            const {
              custom_name,
              room_smoking_allowed,
              num_of_rooms,
              allowed_rooms,
              room_list,
              beds,
              room_size,
              room_unit,
              guest_number,
              prices,
              parking_available,
              parking_type,
              parking_side,
              parking_reservation_needed,
              parking_price,
              breakfast,
              lunch,
              dinner,
              aminities,
            } = data.result;
            setRoomName(props.match.params.id);
            setCustomName(custom_name);
            setSmokingAllowed(room_smoking_allowed);
            setNRoom(num_of_rooms);
            setMaxRoomList(allowed_rooms);
            setRoomCollection(room_list);
            setBedState(beds);
            setRoomSize(room_size);
            setRoomSizeUnit(room_unit);
            setNGuest(guest_number);
            setBasePrice(prices);
            setParkingStatus(parking_available);
            setParkingPrivacy(parking_type);
            setParkingLocation(parking_side);
            setParkingReservation(parking_reservation_needed);
            setParkingPrice(parking_price);
            setBreakfastAvailability(breakfast.available);
            setBreakfastPrice(breakfast.price);
            setLunchAvailability(lunch.available);
            setLunchPrice(lunch.price);
            setDinnerAvailability(dinner.available);
            setDinnerPrice(dinner.price);
            setRoomFacilities(aminities);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchEditData();
  }, [roomType]);

  const handleBedState = () => {
    if (bedState.length < 3) {
      let temp = [...bedState];
      const obj = { bed_type: "", number_of_bed: "" };
      temp.push(obj);
      setBedState(temp);
    }
  };

  const handleBedChange = (e, idx) => {
    const updatedData = [...bedState];
    updatedData[idx].bed_type = e.target.value;
    setBedState(updatedData);
  };

  const handleBedNumChange = (e, idx) => {
    const updatedData = [...bedState];
    updatedData[idx].number_of_bed = e.target.value;
    setBedState(updatedData);
  };

  const deleteBed = (index) => {
    if (bedState.length > 1) {
      const updatedData = [...bedState];
      updatedData.splice(index, 1);
      setBedState(updatedData);
    }
  };

  const handleTabs = (tab) => {
    if (tab === "breakfast")
      setShowTabs({ breakfast: true, lunch: false, dinner: false });
    if (tab === "lunch")
      setShowTabs({ breakfast: false, lunch: true, dinner: false });
    if (tab === "dinner")
      setShowTabs({ breakfast: false, lunch: false, dinner: true });
  };

  const handleRoomNumberChange = (e, i) => {
    let temp = [...roomCollection];
    let obj = { ...temp[i] };
    obj.room_number = e.target.value;
    temp[i] = obj;
    setRoomCollection(temp);
  };
  const handleFloorChange = (e, i) => {
    let temp = [...roomCollection];
    let obj = { ...temp[i] };
    obj.floor = e.target.value;
    temp[i] = obj;
    setRoomCollection(temp);
  };

  const selectAmenities = (e) => {
    let updatedData = [...roomFacilities];
    if (updatedData.includes(e.target.value))
      updatedData = updatedData.filter((t) => t !== e.target.value);
    else updatedData.push(e.target.value);
    setRoomFacilities(updatedData);
  };

  const handleRoomPrice = (e, i) => {
    let temp = [...basePrice];
    temp[i].price = e.target.value;
    setBasePrice(temp);
  };

  const confirmSubmit = () => {
    let temp = "";
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h2 className="text-dark mb-2">Please enter your password!</h2>
            <input
              type="password"
              className="form-control mb-2"
              onChange={(e) => (temp = e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <span
                className="btn_addo mr-4"
                onClick={() => {
                  handlePassword(temp);
                  onClose();
                }}
              >
                Yes
              </span>
              <span className="btn_erado" onClick={onClose}>
                No
              </span>
            </div>
          </div>
        );
      },
    });
  };

  const handlePassword = (pass) => {
    const fetchData = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/user-validate/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          password: pass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("password", data);
          if (data.status_code === 200) {
            handleSubmit();
            toast.success(data.message);
          } else toast.error(data.message);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/create-room/`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          room_type: roomType,
          sub_room_type: roomName,
          custom_name: customName,
          smoking_allowance: smokingAllowed,
          prices: basePrice,
          room_collection: roomCollection,
          room_size: roomSize,
          room_size_unit: roomSizeUnit,
          number_of_people: nGuest,
          bed_conf: bedState,
          parking_paid: parkingStatus,
          parking_situation: parkingPrivacy,
          parking_side: parkingLocation,
          parking_reservation_needed: parkingReservation,
          parking_price: parkingPrice,
          meal_brk: {
            available_to_guest: breakfastAvailability,
            price_per_person: breakfastPrice,
          },
          meal_lunch: {
            available_to_guest: lunchAvailability,
            price_per_person: lunchPrice,
          },
          meal_dinner: {
            available_to_guest: dinnerAvailability,
            price_per_person: dinnerPrice,
          },
          aminities: roomFacilities,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data post", data);
          if (data.status_code === 200) {
            setIsLoading(false);
            setAddRoomSuccess(true);
          }
          if (data.status_code === 400) {
            toast.error(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    if (roomName && nRoom && nGuest && basePrice.length > 0) {
      if (roomCollection.length > 0) fetchData();
      else {
        toast.error("Please fill at least one room number!");
        setRoomError("Please fill at least one room number!");
      }
    } else setLoginWarning("Field Required!");
  };

  if (addRoomSuccess) return <Redirect to={"/dashboard/room-mgmt"} />;
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />
        <div className="main_tile">
          <h4 className="heading">Edit Room</h4>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="dashboard_wrapper">
              <div className="sub-heading">
                <h5 className="heading">
                  {roomType} - {roomName}
                </h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="field-wrapper input">
                    <label htmlFor="customName">Custom Name (optional)</label>
                    <input
                      id="customName"
                      type="text"
                      value={customName}
                      className="form-control"
                      placeholder="Custom Name"
                      onChange={(e) => setCustomName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6" />
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <label htmlFor="name">Smoking Allowed</label>
                    <div
                      className="switch-field"
                      onChange={(e) => setSmokingAllowed(e.target.value)}
                    >
                      <input
                        type="radio"
                        id="radio-one"
                        name="switch-one"
                        value="Yes"
                        checked={smokingAllowed === "Yes"}
                      />
                      <label htmlFor="radio-one">Yes</label>
                      <input
                        type="radio"
                        id="radio-two"
                        name="switch-one"
                        value="No"
                        checked={smokingAllowed === "No"}
                      />
                      <label htmlFor="radio-two">No</label>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <label htmlFor="nRoom">Number of Room</label>
                    <select
                      id="nRoom"
                      value={nRoom}
                      className="form-control"
                      onChange={(e) => setNRoom(parseInt(e.target.value))}
                    >
                      {maxRoomList.length > 0 &&
                        maxRoomList.map((maxRoom, idx) => (
                          <option key={`maxRoom-${idx}`}>{maxRoom}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="col-md-4" />
                {[...Array(parseInt(nRoom))].map((room, idx) => (
                  <div key={`room-${idx}`} className="col-md-4">
                    <div className="field-wrapper input">
                      <label htmlFor={`nRoom-${idx}`}>Room {idx + 1}</label>
                      <div className="input-group">
                        <input
                          id={`nRoom-${idx}`}
                          type="text"
                          value={roomCollection[idx]?.room_number}
                          className="form-control"
                          placeholder="eg. 101"
                          onChange={(e) => handleRoomNumberChange(e, idx)}
                        />
                        <div className="input-group-append">
                          <select
                            value={roomCollection[idx]?.floor}
                            className="form-control"
                            onChange={(e) => handleFloorChange(e, idx)}
                          >
                            <option hidden>Floor</option>
                            {floorList.length > 0 &&
                              floorList.map((floor, idx) => (
                                <option key={`floor-${idx}`}>{floor}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {roomError && <p className="text-danger">{roomError}</p>}
            </div>
            <div className="dashboard_wrapper mt-4">
              <div className="sub-heading">
                <h5 className="heading">Bed Option</h5>
              </div>
              <p className="inputLabelText">
                What kind of beds are available in this room?
              </p>
              <div className="row">
                {bedState.map((bed, idx) => (
                  <React.Fragment key={`bed-${idx}`}>
                    <div className="col-md-6">
                      <div className="field-wrapper input">
                        <select
                          className="form-control"
                          value={bed.bed_type}
                          onChange={(e) => handleBedChange(e, idx)}
                        >
                          <option hidden>Select Bed</option>
                          {bedList.length > 0 &&
                            bedList.map((bed, idx) => (
                              <option key={`bed-${idx}`}>{bed.name}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-1 mt-2">X</div>
                    <div className="col-md-3">
                      <div className="field-wrapper input">
                        <select
                          className="form-control"
                          value={bed.number_of_bed}
                          onChange={(e) => handleBedNumChange(e, idx)}
                        >
                          <option hidden>No. of beds</option>
                          <option disabled>No. of beds</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span
                        className="btn_eradoImg"
                        onClick={() => deleteBed(idx)}
                      >
                        <img
                          src={require("../../assets/img/icons/icon-material-delete-sweep.svg")}
                          alt="delete-sweep-icon"
                        />
                      </span>
                    </div>
                  </React.Fragment>
                ))}
                <div className="col-md-12 mb-3">
                  <span className="btn_addo" onClick={handleBedState}>
                    + Add Bed
                  </span>
                </div>
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <label htmlFor="roomSize">Room Size (optional)</label>
                    <input
                      id="roomSize"
                      type="text"
                      value={roomSize}
                      className="form-control"
                      placeholder="Room Size"
                      onChange={(e) => setRoomSize(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="field-wrapper input">
                    <label
                      htmlFor="sizeMetric"
                      style={{ visibility: "hidden" }}
                    >
                      Size Metric
                    </label>
                    <select
                      id="sizeMetric"
                      value={roomSizeUnit}
                      className="form-control"
                      onChange={(e) => setRoomSizeUnit(e.target.value)}
                    >
                      <option>Sq. meter</option>
                      <option>Sq. feet</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="field-wrapper input">
                    <label htmlFor="nGuest">
                      How many guests can stay in this room?
                    </label>
                    <div className="row">
                      <div className="col-md-6">
                        <select
                          id="nGuest"
                          className="form-control"
                          value={nGuest}
                          onChange={(e) => setNGuest(parseInt(e.target.value))}
                        >
                          {[...Array(parseInt(maxGuest))].map(
                            (numGuest, idx) => (
                              <option key={`maxGuest-${idx}`}>{idx + 1}</option>
                            )
                          )}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <img
                          className="mt-3"
                          src={require("../../assets/img/icons/people-black-icon.svg")}
                          alt="People"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard_wrapper mt-4">
              <div className="sub-heading">
                <h5 className="heading">Base price per night</h5>
              </div>
              <p className="bg-color-light2 p-2 mb-4">
                This is the lowest price that we automatically apply to this
                room for all dates. Before your property goes live, you can set
                seasonal pricing on your property dashboard.
              </p>
              <div className="row">
                <div className="col-md-6">
                  {[...Array(parseInt(nGuest))].map((bp, idx) => (
                    <div
                      key={`basePrice-${idx}`}
                      className="field-wrapper input"
                    >
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text font12">
                            <img
                              className="mr-2"
                              src={require("../../assets/img/icons/flag-400.svg")}
                              alt="Flag"
                            />
                            NPR / {idx + 1} person
                          </span>
                        </div>
                        <input
                          type="text"
                          value={basePrice[idx]?.price}
                          className={
                            !basePrice.length > 0 && loginWarning
                              ? "form-control error-input"
                              : "form-control"
                          }
                          onChange={(e) => handleRoomPrice(e, idx)}
                        />
                      </div>
                      <p
                        className={
                          !basePrice.length > 0 && loginWarning
                            ? "text-danger"
                            : "display-none"
                        }
                      >
                        {loginWarning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="dashboard_wrapper">
              <div className="sub-heading">
                <h5 className="heading">Facilities</h5>
              </div>
              <p className="font-weight-bold text-dark font14 mb-2">Parking</p>
              <p className="inputLabelText">Is parking available to guests?</p>
              <div className="row">
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <select
                      id="parkingStatus"
                      value={parkingStatus}
                      className="form-control"
                      onChange={(e) => setParkingStatus(e.target.value)}
                    >
                      <option>Yes, Free</option>
                      <option>Yes, Paid</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <select
                      id="parkingPrivacy"
                      value={parkingPrivacy}
                      className="form-control"
                      onChange={(e) => setParkingPrivacy(e.target.value)}
                    >
                      <option>Private</option>
                      <option>Public</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="field-wrapper input">
                    <select
                      id="parkingLocation"
                      value={parkingLocation}
                      className="form-control"
                      onChange={(e) => setParkingLocation(e.target.value)}
                    >
                      <option>Onside</option>
                      <option>Offside</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="field-wrapper input">
                    <label htmlFor="parkingReservation">
                      Do guests need to reserve a parking space?
                    </label>
                    <select
                      id="parkingReservation"
                      value={parkingReservation}
                      className="form-control"
                      onChange={(e) => setParkingReservation(e.target.value)}
                    >
                      <option>Reservation needed</option>
                      <option>Reservation not needed</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="field-wrapper input">
                    <label htmlFor="parkingPrice">
                      Price for parking (per day)
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text font12">NPR</span>
                      </div>
                      <input
                        id="parkingPrice"
                        type="text"
                        value={parkingPrice}
                        className={
                          parkingStatus === "Yes, Paid" && !parkingPrice
                            ? "form-control error-input"
                            : "form-control"
                        }
                        onChange={(e) => setParkingPrice(e.target.value)}
                        disabled={parkingStatus !== "Yes, Paid"}
                      />
                    </div>
                    <p
                      className={
                        parkingStatus === "Yes, Paid" && !parkingPrice
                          ? "text-danger"
                          : "display-none"
                      }
                    >
                      Field required!
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-weight-bold text-dark font14 mt-4">Meal</p>
              <div className="tab">
                <div
                  className={
                    showTabs.breakfast ? "tab_links_active" : "tab_links"
                  }
                  onClick={() => handleTabs("breakfast")}
                >
                  Breakfast
                </div>
                <div
                  className={showTabs.lunch ? "tab_links_active" : "tab_links"}
                  onClick={() => handleTabs("lunch")}
                >
                  Lunch
                </div>
                <div
                  className={showTabs.dinner ? "tab_links_active" : "tab_links"}
                  onClick={() => handleTabs("dinner")}
                >
                  Dinner
                </div>
              </div>
              <div className={showTabs.breakfast ? "ml-3" : "display-none"}>
                <div className="row">
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="breakfastAvailability">
                        Is breakfast available to guests?
                      </label>
                      <select
                        id="breakfastAvailability"
                        value={breakfastAvailability}
                        className="form-control"
                        onChange={(e) =>
                          setBreakfastAvailability(e.target.value)
                        }
                      >
                        <option>No</option>
                        <option>Yes, its optional</option>
                        <option>Yes, its complimentary</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="breakfastPrice">
                        Price for breakfast (per personal)
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text font12">NPR</span>
                        </div>
                        <input
                          id="breakfastPrice"
                          type="text"
                          value={breakfastPrice}
                          className={
                            breakfastAvailability === "Yes, its optional" &&
                            !breakfastPrice
                              ? "form-control error-input"
                              : "form-control"
                          }
                          onChange={(e) => setBreakfastPrice(e.target.value)}
                          disabled={
                            breakfastAvailability !== "Yes, its optional"
                          }
                        />
                      </div>
                      <p
                        className={
                          breakfastAvailability === "Yes, its optional" &&
                          !breakfastPrice
                            ? "text-danger"
                            : "display-none"
                        }
                      >
                        Field required!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={showTabs.lunch ? "ml-3" : "display-none"}>
                <div className="row">
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="lunchAvailability">
                        Is lunch available to guests?
                      </label>
                      <select
                        id="lunchAvailability"
                        value={lunchAvailability}
                        className="form-control"
                        onChange={(e) => setLunchAvailability(e.target.value)}
                      >
                        <option>No</option>
                        <option>Yes, its optional</option>
                        <option>Yes, its complimentary</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="lunchPrice">
                        Price for lunch (per personal)
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text font12">NPR</span>
                        </div>
                        <input
                          id="lunchPrice"
                          type="text"
                          value={lunchPrice}
                          className={
                            lunchAvailability === "Yes, its optional" &&
                            !lunchPrice
                              ? "form-control error-input"
                              : "form-control"
                          }
                          onChange={(e) => setLunchPrice(e.target.value)}
                          disabled={lunchAvailability !== "Yes, its optional"}
                        />
                      </div>
                      <p
                        className={
                          lunchAvailability === "Yes, its optional" &&
                          !lunchPrice
                            ? "text-danger"
                            : "display-none"
                        }
                      >
                        Field required!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={showTabs.dinner ? "ml-3" : "display-none"}>
                <div className="row">
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="dinnerAvailability">
                        Is dinner available to guests?
                      </label>
                      <select
                        id="dinnerAvailability"
                        value={dinnerAvailability}
                        className="form-control"
                        onChange={(e) => setDinnerAvailability(e.target.value)}
                      >
                        <option>No</option>
                        <option>Yes, its optional</option>
                        <option>Yes, its complimentary</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="field-wrapper input">
                      <label htmlFor="dinnerPrice">
                        Price for dinner (per personal)
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text font12">NPR</span>
                        </div>
                        <input
                          id="dinnerPrice"
                          type="text"
                          value={dinnerPrice}
                          className={
                            dinnerAvailability === "Yes, its optional" &&
                            !dinnerPrice
                              ? "form-control error-input"
                              : "form-control"
                          }
                          onChange={(e) => setDinnerPrice(e.target.value)}
                          disabled={dinnerAvailability !== "Yes, its optional"}
                        />
                      </div>
                      <p
                        className={
                          dinnerAvailability === "Yes, its optional" &&
                          !dinnerPrice
                            ? "text-danger"
                            : "display-none"
                        }
                      >
                        Field required!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="font-weight-bold text-dark font14 mt-4 mb-2">
                Room Facilty
              </p>
              <div className="row">
                {roomFacilitiesList.length > 0 &&
                  roomFacilitiesList.map((amenity, idx) => (
                    <div key={`amenity-${idx}`} className="col-md-6">
                      <label>
                        <input
                          type="checkbox"
                          className="mr-2"
                          value={amenity}
                          checked={roomFacilities.includes(amenity)}
                          onChange={selectAmenities}
                        />
                        <span className="mb-2">{amenity}</span>
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <span
            className="btn_room_det_reset mr-4"
            onClick={() => history.goBack()}
          >
            Cancel
          </span>
          <span className="btn_addo" onClick={confirmSubmit}>
            Save
          </span>
        </div>
      </>
    );
}

export default EditRoom;
