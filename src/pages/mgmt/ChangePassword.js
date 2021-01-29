import React, { useEffect, useState } from "react";
import {
  PROPERTY_ID,
  USER_TOKEN,
  USER_ID,
} from "../../components/LocalStorageInfo";
import { toast } from "react-toastify";
import CustomSpinner from "../../components/CustomSpinner";

function ChangePassword() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [userId, setUserId] = useState(USER_ID());
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [retypePassword, setRetypePassword] = useState("");
  const [showRetypePassword, setShowRetypePassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/manage-password/?property_id=${propertyId}`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: userId,
            old_password: oldPassword,
            new_password: retypePassword,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("password change", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setOldPassword("");
            setNewPassword("");
            setRetypePassword("");
            setIsLoading(false);
          } else if (data.status_code === 400) {
            toast.error(data.message);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    if (retypePassword !== newPassword)
      toast.warn("Retyped password doesn't match the new password!");
    else fetchData();
  };

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <h4 className="heading">Change Password</h4>
      </div>
      <div className="row">
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="dashboard_wrapper mb-4">
              <div className="field-wrapper input">
                <label htmlFor="csnOldPassword" className="text-dark">
                  Old Password
                </label>
                <input
                  id="csnOldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  className="form-control"
                  placeholder="Old Password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <img
                  className="cursorPointer eye-password"
                  src={require("../../assets/img/icons/icon-awesome-eye.svg")}
                  alt="eye-icon"
                  onClick={() => setShowOldPassword((prevState) => !prevState)}
                />
              </div>
              <div className="field-wrapper input">
                <label htmlFor="csnNewPassword" className="text-dark">
                  New Password
                </label>
                <input
                  id="csnNewPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  className="form-control"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <img
                  className="cursorPointer eye-password"
                  src={require("../../assets/img/icons/icon-awesome-eye.svg")}
                  alt="eye-icon"
                  onClick={() => setShowNewPassword((prevState) => !prevState)}
                />
              </div>
              <div className="field-wrapper input">
                <label htmlFor="csnRetypePassword" className="text-dark">
                  Retype New Password
                </label>
                <input
                  id="csnRetypePassword"
                  type={showRetypePassword ? "text" : "password"}
                  value={retypePassword}
                  className="form-control"
                  placeholder="Retype New Password"
                  onChange={(e) => setRetypePassword(e.target.value)}
                  required
                />
                <img
                  className="cursorPointer eye-password"
                  src={require("../../assets/img/icons/icon-awesome-eye.svg")}
                  alt="eye-icon"
                  onClick={() =>
                    setShowRetypePassword((prevState) => !prevState)
                  }
                />
              </div>
            </div>
            <button type="submit" className="btn_addo">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
