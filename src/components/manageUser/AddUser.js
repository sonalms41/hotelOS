import React, { useState } from "react";
import { PROPERTY_ID, USER_TOKEN } from "../LocalStorageInfo";
import { toast } from "react-toastify";
import CustomSpinner from "../CustomSpinner";

function AddUser(props) {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isPermissionAccess, setIsPermissionAccess] = useState(false);
  const [permissionSelected, setPermissionSelected] = useState([]);

  const handlePermissions = (id) => {
    let temp = [...permissionSelected];
    if (temp.some((t) => t.id === id)) temp = temp.filter((t) => t.id !== id);
    else {
      const obj = { id, perm_status: true };
      temp.push(obj);
    }
    setPermissionSelected(temp);
  };

  const handleFormFlip = (e) => {
    e.preventDefault();

    if (retypePassword !== password)
      toast.warn("Retyped password doesn't match the new password!");
    else setIsPermissionAccess(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addUser = async () => {
      setIsLoading(true);
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/manage-account/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: retypePassword,
          phone_number: contact,
          role: role,
          permissions: permissionSelected,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("user data post", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setFirstName("");
            setLastName("");
            setEmail("");
            setContact("");
            setRole("");
            setPassword("");
            setRetypePassword("");
            setIsPermissionAccess(false);
            props.close();
            props.refetch();
            setIsLoading(false);
          } else if (data.status_code === 400) {
            toast.error(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };

    // const addPermission = async () => {
    //   setIsLoading(true);
    //   await fetch(
    //     `${process.env.REACT_APP_API_BASE_URL}/super-admin/assign-permission/`,
    //     {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Token ${userToken}`,
    //       },
    //       body: JSON.stringify({
    //         user_id: createdId,
    //         permissions: permissionSelected,
    //       }),
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log("user data post", data);
    //       if (data.status_code === 200) {
    //         toast.success(data.message);
    //         setIsPermissionAccess(false);
    //         props.close();
    //         props.refetch();
    //         setIsLoading(false);
    //       } else if (data.status_code === 400) {
    //         toast.error(data.message);
    //         setIsLoading(false);
    //       }
    //     })
    //     .catch((error) => console.error(error));
    // };

    // if (!isPermissionAccess) {
    addUser();
    // } else addPermission();
  };

  return (
    <div>
      <CustomSpinner isLoading={isLoading} />
      <div
        className="modal-wrapper manageUser_add"
        style={{ display: props.show ? "block" : "none" }}
      >
        <div className="modal-body">
          <div className="stickyHeader">
            <div className="row">
              <div className="col-auto mt-3 mr-auto">
                <div className="font-weight-bold font16 text-dark">
                  {!isPermissionAccess ? (
                    "Add User"
                  ) : (
                    <>
                      <img
                        className="cursorPointer"
                        src={require("../../assets/img/icons/material-keyboard-backspace.svg")}
                        alt="Back"
                        onClick={() => setIsPermissionAccess(false)}
                      />
                      <span className="ml-4">Access Permission</span>
                    </>
                  )}
                </div>
                {!isPermissionAccess && (
                  <p>Enter the details of the user you want to invite</p>
                )}
              </div>
              <div className="col-auto">
                <span className="close-modal-btn" onClick={props.close}>
                  ×
                </span>
              </div>
            </div>
            {isPermissionAccess && <div className="border-bottom" />}
          </div>
          <form
            className="mt-4"
            onSubmit={!isPermissionAccess ? handleFormFlip : handleSubmit}
          >
            {!isPermissionAccess ? (
              <>
                <div className="row">
                  <div className="col-md-6">
                    <div className="field-wrapper input">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-wrapper input">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="field-wrapper input">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="field-wrapper input">
                      <label>Contact Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Mobile no."
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field-wrapper input">
                      <label>Role</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="field-wrapper input">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="field-wrapper input">
                  <label>Retype Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Retype password"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              props.permissions?.map((permission, idx) => (
                <React.Fragment key={`permission-${idx}`}>
                  <div className="manage_users_permissions">
                    <div className="permissionName">
                      <div className="font-weight-bold">{permission.name}</div>
                      <div>{permission.description}</div>
                    </div>
                    <div className="mt-4">
                      <label className="switch">
                        <input
                          type="checkbox"
                          onChange={() => handlePermissions(permission.id)}
                        />
                        <div>
                          <span />
                        </div>
                      </label>
                    </div>
                    <div className="mt-4">
                      {permissionSelected.some((p) => p.id === permission.id)
                        ? "Yes"
                        : "No"}
                    </div>
                  </div>
                  <div className="border-bottom" />
                </React.Fragment>
              ))
            )}
            <button type="submit" className="btn_addo mt-3">
              {!isPermissionAccess ? "Set access" : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
