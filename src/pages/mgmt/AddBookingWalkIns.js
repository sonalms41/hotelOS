import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import { INIT_DATES } from "../../components/InitializeDate";
import { toast } from "react-toastify";

function AddBookingWalkIns() {
  const [isLoading, setIsLoading] = useState(true);
  const [guestName, setGuestName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("Nepal");
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState("Kathmandu");
  const [cityList, setCityList] = useState([]);
  const [street, setStreet] = useState("");
  const [tole, setTole] = useState("");
  const [checkin, setCheckin] = useState(INIT_DATES(Date.now()));
  const [checkout, setCheckout] = useState(
    INIT_DATES(Date.now() + 1 * 24 * 60 * 60 * 1000)
  );
  const [guests, setGuests] = useState("1");
  const [child, setChild] = useState("0");
  const [roomTypeInfo, setRoomTypeInfo] = useState([]);
  const [roomNumberInfo, setRoomNumberInfo] = useState([]);
  const [roomType, setRoomType] = useState(null);
  const [roomDetails, setRoomDetails] = useState([]);
  const [imageName, setImageName] = useState([]);
  const [baseImage, setBaseImage] = useState([]);
  const [roomRate, setRoomRate] = useState("");
  const [roomAdvanceStatus, setRoomAdvanceStatus] = useState(false);
  const [roomAdvance, setRoomAdvance] = useState("");
  const [loginWarning, setLoginWarning] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Add Booking`;
    const fetchRoomTypeData = async () => {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/add-room-type/?property_id=${localStorage.getItem("property-id")}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("room type data", data.result.room_type);
          setRoomTypeInfo(data.result.room_type);
          setRoomType(data.result.room_type[0].room_type_name);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchRoomTypeData();

    const fetchCountry = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/country-save/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data country", data);
          if (data.status_code === 200) {
            setCountryList(data.result);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchCityData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/country/?country=${country}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("data country", data);
          if (data.status_code === 200) setCityList(data.result);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchCityData();
  }, [country]);

  useEffect(() => {
    const fetchRoomNumberData = async () => {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/available-rooms/?property_id=${localStorage.getItem(
          "property-id"
        )}&room_type=${roomType}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("room number data", data.result.lists_of_available_rooms);
          setRoomNumberInfo(data.result.lists_of_available_rooms);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchRoomNumberData();
  }, [roomType]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/walkin-price/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("con-jwt")}`,
        },
        body: JSON.stringify({
          property_id: localStorage.getItem("property-id"),
          room_number: roomDetails,
          no_of_adults: guests,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data cost", data);
          if (data.status_code === 200) {
            setRoomRate(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [roomDetails, guests]);

  const handleRoomSelection = (room, room_type) => {
    let updatedData = [...roomDetails];
    if (updatedData.some((t) => t.room === room))
      updatedData = updatedData.filter((t) => t.room !== room);
    else updatedData.push({ room, room_type });
    setRoomDetails(updatedData);
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      cb(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleUpload = (e) => {
    let imageDisp = [];
    let imageStr = [];
    console.log("upload", e.target.files);
    for (let i = 0; i < e.target.files.length; i++) {
      console.log("-->", e.target.files[i]);
      if (
        e.target.files[i].type === "image/png" ||
        e.target.files[i].type === "image/jpeg" ||
        e.target.files[i].type === "application/pdf" ||
        e.target.files[i].type === "application/msword" ||
        e.target.files[i].type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        if (e.target.files[i].size < 2000000) {
          imageDisp.push(e.target.files[i].name);
          getBase64(e.target.files[i], (res) => imageStr.push(res));
        } else toast.error("Please upload document of size less than 2MB!");
      } else toast.error("Unsupported Type!");
    }
    imageDisp.length && setImageName(imageDisp);
    imageDisp.length && setBaseImage(imageStr);
  };

  const handleSubmit = () => {
    setLoginWarning("");
    if (
      guestName &&
      phone &&
      city &&
      street &&
      checkin &&
      checkout &&
      guests &&
      child
    ) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/add-guest/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
          body: JSON.stringify({
            property_id: localStorage.getItem("property-id"),
            first_name: guestName,
            last_name: guestLastName,
            gender: gender,
            phone_number: phone,
            country: country,
            street: street,
            city: city,
            tole: tole,
            proof_image: baseImage,
            checkin: checkin,
            checkout: checkout,
            guestno: guests,
            childno: child,
            room_details: roomDetails,
            room_rate: roomRate,
            advance_status: roomAdvanceStatus,
            advance_rate: roomAdvance,
            remaining_rate: roomRate - roomAdvance,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data", data);
            if (data.status_code === 200) {
              setBookingSuccess(true);
              setIsLoading(false);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  if (bookingSuccess) return <Redirect to={"/dashboard/guest-walkin"} />;
  else
    return (
      <>
        <CustomSpinner isLoading={isLoading} />

        <div className="main_tile">
          <h4 className="heading">Add Booking</h4>
        </div>

        <div className="dashboard_wrapper mb-3">
          <div className="sub-heading">
            <h5 className="heading">Personal Details</h5>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="guestFirstName">First Name</label>
                <input
                  id="guestFirstName"
                  type="text"
                  className={
                    !guestName && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  placeholder="First Name"
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <p
                  className={
                    !guestName && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="guestLastName">Last Name</label>
                <input
                  id="guestLastName"
                  type="text"
                  className={
                    !guestLastName && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  placeholder="Last Name"
                  onChange={(e) => setGuestLastName(e.target.value)}
                />
                <p
                  className={
                    !guestLastName && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  className={
                    !phone && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  placeholder="Phone Number"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p
                  className={
                    !phone && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="gender">Gender</label>
                <div
                  className="switch-field"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <input
                    type="radio"
                    id="radio-one"
                    name="switch-one"
                    value="Male"
                    defaultChecked
                  />
                  <label htmlFor="radio-one">Male</label>
                  <input
                    type="radio"
                    id="radio-two"
                    name="switch-one"
                    value="Female"
                  />
                  <label htmlFor="radio-two">Female</label>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  value={country}
                  className={
                    !country && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  onChange={(e) => setCountry(e.target.value)}
                >
                  {countryList.length > 0 &&
                    countryList.map((country, idx) => (
                      <option key={`country-${idx}`}>{country}</option>
                    ))}
                </select>
                <p
                  className={
                    !country && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  value={city}
                  className={
                    !city && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  onChange={(e) => setCity(e.target.value)}
                >
                  {cityList.length > 0 &&
                    cityList.map((city, idx) => (
                      <option key={`city-${idx}`}>{city}</option>
                    ))}
                </select>
                <p
                  className={
                    !city && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="street">Street</label>
                <input
                  id="street"
                  type="text"
                  className={
                    !street && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  placeholder="Street"
                  onChange={(e) => setStreet(e.target.value)}
                />
                <p
                  className={
                    !street && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="tole">Tole</label>
                <input
                  id="tole"
                  type="text"
                  className="form-control"
                  placeholder="Tole"
                  onChange={(e) => setTole(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_wrapper mb-3">
          <div className="sub-heading">
            <h5 className="heading">Check-in Details</h5>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="checkin">Check In</label>
                <input
                  id="checkin"
                  type="date"
                  className={
                    !checkin && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                />
                <p
                  className={
                    !checkin && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div id="" className="field-wrapper input">
                <label htmlFor="checkout">Check Out</label>
                <input
                  id="checkout"
                  type="date"
                  className={
                    !checkout && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  value={checkout}
                  onChange={(e) => setCheckout(e.target.value)}
                />
                <p
                  className={
                    !checkout && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-1point5">
              <div id="" className="field-wrapper input">
                <label htmlFor="guests">Guests</label>
                <input
                  id="guests"
                  type="number"
                  className={
                    !guests && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  defaultValue={1}
                  min={1}
                  placeholder="0"
                  onChange={(e) => setGuests(e.target.value)}
                />
                <p
                  className={
                    !guests && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
            <div className="col-md-1point5">
              <div id="" className="field-wrapper input">
                <label htmlFor="child">Children</label>
                <input
                  id="child"
                  type="number"
                  className={
                    !child && loginWarning
                      ? "form-control error-input"
                      : "form-control"
                  }
                  defaultValue={0}
                  min={1}
                  placeholder="0"
                  onChange={(e) => setChild(e.target.value)}
                />
                <p
                  className={
                    !child && loginWarning
                      ? "text-danger text-center"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_wrapper mb-3">
          <div className="sub-heading">
            <h5 className="heading">Proof ID</h5>
          </div>
          <div className="info-form">
            <div className="row">
              <div className="col-md-12 mb-3">
                <div className="drag-drop-area">
                  <input type="file" multiple onChange={handleUpload} />
                </div>
                <div className="text-center my-5">
                  <img
                    src={require("../../assets/img/icons/icon_camera.svg")}
                    alt="camera-icon"
                  />
                </div>
              </div>
              <div className="col-md-12">
                {imageName.length > 0 &&
                  imageName.map((img, index) => <div key={index}>{img}</div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard_booking_wrapper mb-3">
          <div className="booking_add_header">
            <div className="text-white mr-auto font16">Room Details</div>
          </div>

          <div className="booking_add_body">
            <p className="text-dark mb-2">Room Type</p>
            <div className="row mb-4">
              {roomTypeInfo.length > 0 &&
                roomTypeInfo.map((rt, index) => (
                  <div key={`rt-${index}`} className="col-md-2">
                    <p
                      className={
                        roomType == rt.room_type_name
                          ? "booking_add_room_selected"
                          : "booking_add_room"
                      }
                      onClick={() => setRoomType(rt.room_type_name)}
                    >
                      {rt.room_type_name}
                    </p>
                  </div>
                ))}
            </div>

            {roomNumberInfo.length > 0 &&
              roomNumberInfo.map((floor, idx) => (
                <div key={`floor-${idx}`}>
                  <p className="font-weight-bold text-dark mb-2">
                    {floor.floor_name}
                  </p>
                  <div className="row mb-5">
                    {floor.rooms.map((rn, index) => (
                      <div key={`rn-${index}`} className="col-md-2">
                        <label>
                          {/* Input element for the checkbox */}
                          <input
                            type="checkbox"
                            name={`checkbox-${rn.property_room__room_number}`}
                            className="check-custom"
                            checked={roomDetails.some(
                              (t) => t.room == rn.property_room__room_number
                            )}
                            onChange={() =>
                              handleRoomSelection(
                                rn.property_room__room_number,
                                rn.property_type__name
                              )
                            }
                          />

                          {/* Customization element for the checkbox */}
                          <span className="check-toggle" />
                        </label>
                        <div className="room_avail_wrap">
                          <div className="font-weight-bold font16 text-dark text-center mt-3">
                            {rn.property_room__room_number}
                          </div>
                          <div className="text-dark text-center mb-2">
                            {rn.property_type__name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="dashboard_wrapper mb-3">
          <div className="row">
            <div className="col-md-4">
              <div className="field-wrapper input">
                <label htmlFor="roomRate">Room Rate</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text font12">NPR</span>
                  </div>
                  <input
                    id="roomRate"
                    type="text"
                    value={roomRate}
                    className={
                      !roomRate && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    onChange={(e) => setRoomRate(e.target.value)}
                  />
                </div>
                <p
                  className={
                    !roomRate && loginWarning ? "text-danger" : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label className="mt-2">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() =>
                    setRoomAdvanceStatus((prevState) => !prevState)
                  }
                />
                Advance
              </label>
              <div className="field-wrapper input">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text font12">NPR</span>
                  </div>
                  <input
                    type="text"
                    className={
                      !roomAdvance && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    onChange={(e) => setRoomAdvance(e.target.value)}
                    disabled={!roomAdvanceStatus}
                  />
                </div>
                <p
                  className={
                    !roomAdvance && loginWarning
                      ? "text-danger"
                      : "display-none"
                  }
                >
                  {loginWarning}
                </p>
              </div>
            </div>
          </div>
          <p className="font-weight-bold text-dark">
            Remaining Amount: NRS {roomRate - roomAdvance}
          </p>
        </div>
        <div className="mt-4 mb-3">
          <span className="btn_room_det_reset">Reset</span>
          <span className="btn_room_det_save" onClick={handleSubmit}>
            Save
          </span>
        </div>
      </>
    );
}

export default AddBookingWalkIns;
