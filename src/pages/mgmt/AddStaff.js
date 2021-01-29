import React, { useEffect, useState } from "react";
import CustomSpinner from "../../components/CustomSpinner";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom";

function AddStaff() {
  const [isLoading, setIsLoading] = useState(true);
  const [staffDetails, setStaffDetails] = useState([]);
  const [staffID, setStaffID] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCodeList, setCountryCodeList] = useState([]);
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [isOnEdit, setIsOnEdit] = useState(false);
  const [refetchData, setRefetchData] = useState(false);
  const [emailValid, setEmailValid] = useState("");
  const [phoneValid, setPhoneValid] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [loginWarning, setLoginWarning] = useState("");

  let history = useHistory();

  useEffect(() => {
    const fetchCountryCode = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/all-country-codes/`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data country code", data);
          if (data.status_code === 200) setCountryCodeList(data.result);
        })
        .catch((error) => console.error(error));
    };
    fetchCountryCode();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/staff-details/?property_id=${localStorage.getItem("property-id")}`,
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
          console.log("data staff", data.result);
          setStaffDetails(data.result);
          setIsLoading(false);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetchData]);

  const clearForm = () => {
    console.log("clear");
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setSalary("");
    setRole("");
    setAddress("");
    setRefetchData((prevState) => !prevState);
  };

  const handleBlurPhoneNumber = () =>
    !/^[+]*[(]?[0-9]{1,3}[)]?[-\s/0-9]*$/g.test(phone) &&
    setPhoneValid("Invalid phone number!");

  const handleBlurSalary = () =>
    !/^\d*(\.\d+)?$/g.test(salary) && setSalaryError("Salary must be number!");

  const handleEdit = (id) => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/specific-staff/?property_id=${localStorage.getItem(
          "property-id"
        )}&staff_id=${id}`,
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
          if (data.status === 200) {
            console.log("data edit", data.result);
            setStaffID(data.result.staff_id);
            setFirstName(data.result.staff_first_name);
            setLastName(data.result.staff_last_name);
            setPhone(data.result.staff_phone_number);
            setEmail(data.result.staff_emai);
            setSalary(data.result.staff_salary);
            setRole(data.result.staff_role);
            setAddress(data.result.staff_address);
            setIsOnEdit(true);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
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
      await fetch(
        `${
          process.env.REACT_APP_API_BASE_URL
        }/staff-details/?property_id=${localStorage.getItem(
          "property-id"
        )}&staff_id=${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            console.log("data delete", data);
            setRefetchData((prevState) => !prevState);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  };

  const handleEditSubmit = () => {
    setEmailValid("");
    setPhoneValid("");
    setSalaryError("");
    setLoginWarning("");
    if (firstName && lastName && phone && email && salary && role && address) {
      const fetchData = async () => {
        setIsLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/staff-details/`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("con-jwt")}`,
          },
          body: JSON.stringify({
            property_id: localStorage.getItem("property-id"),
            staff_id: staffID,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone,
            email: email,
            salary: salary,
            role: role,
            address: address,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 200) {
              console.log("data post", data);
              clearForm();
              setIsOnEdit(false);
              setIsLoading(false);
            }
          })
          .catch((error) => console.error(error));
      };
      fetchData();
    } else setLoginWarning("Field required!");
  };

  const handleSubmit = () => {
    setEmailValid("");
    setPhoneValid("");
    setSalaryError("");
    setLoginWarning("");
    if (firstName && lastName && phone && email && salary && role && address) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
        setEmailValid("Invalid email address!");
      else {
        const fetchData = async () => {
          setIsLoading(true);
          await fetch(`${process.env.REACT_APP_API_BASE_URL}/staff-details/`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${localStorage.getItem("con-jwt")}`,
            },
            body: JSON.stringify({
              property_id: localStorage.getItem("property-id"),
              first_name: firstName,
              last_name: lastName,
              phone_number: phone,
              email: email,
              salary: salary,
              role: role,
              address: address,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.status === 200) {
                console.log("data post", data);
                clearForm();
                setIsLoading(false);
              }
            })
            .catch((error) => console.error(error));
        };
        fetchData();
      }
    } else setLoginWarning("Field required!");
  };

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
          <span className="ml-4">Add Staff</span>
        </h4>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="dashboard_wrapper">
            <div className="sub-heading">
              <h5 className="heading">Staff Details</h5>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    className={
                      !firstName && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p
                    className={
                      !firstName && loginWarning
                        ? "text-danger"
                        : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    className={
                      !lastName && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p
                    className={
                      !lastName && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="phone">Mobile Number</label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <select className="form-control">
                        <option>+977</option>
                        {countryCodeList.length > 0 &&
                          countryCodeList.map((ccode, idx) => (
                            <option key={`countryCode-${idx}`} value={ccode}>
                              {ccode}
                            </option>
                          ))}
                      </select>
                    </div>
                    <input
                      id="phone"
                      type="text"
                      value={phone}
                      className={
                        (!phone && loginWarning) || phoneValid
                          ? "form-control error-input"
                          : "form-control"
                      }
                      placeholder="Phone Number"
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={handleBlurPhoneNumber}
                    />
                  </div>
                  <p
                    className={
                      !phone && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                  <p className={phoneValid ? "text-danger" : "display-none"}>
                    {phoneValid}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="phone">Email address</label>
                  <input
                    id="email"
                    type="text"
                    value={email}
                    className={
                      (!email && loginWarning) || emailValid
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p
                    className={
                      !email && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                  <p className={emailValid ? "text-danger" : "display-none"}>
                    {emailValid}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="phone">Salary</label>
                  <input
                    id="salary"
                    type="text"
                    value={salary}
                    className={
                      (!salary && loginWarning) || salaryError
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Salary"
                    onChange={(e) => setSalary(e.target.value)}
                    onBlur={handleBlurSalary}
                  />
                  <p
                    className={
                      !salary && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                  <p className={salaryError ? "text-danger" : "display-none"}>
                    {salaryError}
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div id="" className="field-wrapper input">
                  <label htmlFor="phone">Role</label>
                  <input
                    id="role"
                    type="text"
                    value={role}
                    className={
                      !role && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Role"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <p
                    className={
                      !role && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <div id="" className="field-wrapper input">
                  <label htmlFor="phone">Address</label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    className={
                      !address && loginWarning
                        ? "form-control error-input"
                        : "form-control"
                    }
                    placeholder="Address"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <p
                    className={
                      !address && loginWarning ? "text-danger" : "display-none"
                    }
                  >
                    {loginWarning}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {!isOnEdit && (
            <span className="btn_addo mt-3" onClick={handleSubmit}>
              Save
            </span>
          )}
          {isOnEdit && (
            <span className="btn_addo mt-3" onClick={handleEditSubmit}>
              Edit
            </span>
          )}
        </div>
        <div className="col-md-6">
          <div className="dashboard_wrapper">
            {staffDetails.length > 0 ? (
              staffDetails.map((staff, index) => (
                <div
                  key={`staff-${index}`}
                  className="room_details_datewise mb-3"
                >
                  <div className="row">
                    <div className="col">
                      <p className="text-dark font-weight-bold">
                        {staff.staff_first_name} {staff.staff_last_name}
                      </p>
                      <p>{staff.staff_role}</p>
                    </div>
                    <div className="col">
                      <p className="font-weight-bold">
                        {staff.staff_phone_number}
                      </p>
                      <p>{staff.staff_emai}</p>
                    </div>
                    <div className="col">
                      <div className="mt-2">
                        <span
                          className="cursorPointer text-primary"
                          onClick={() => handleEdit(staff.staff_id)}
                        >
                          Edit
                        </span>
                        <span
                          className="cursorPointer text-danger ml-3"
                          onClick={() => confirmSubmit(staff.staff_id)}
                        >
                          Delete
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h3 className="d-flex justify-content-center mt120 mb120">
                No staff added yet!
              </h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddStaff;
