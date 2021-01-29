import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomSpinner from "../../components/CustomSpinner";
import { confirmAlert } from "react-confirm-alert";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";

function StaffMgmt() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(true);
  const [staffDetails, setStaffDetails] = useState([]);
  const [refetchData, setRefetchData] = useState(false);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Staff Mgmt`;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/staff-details/?property_id=${propertyId}`,
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
          console.log("data staff", data);
          if (data.status === 200) {
            setStaffDetails(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetchData]);

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
        `${process.env.REACT_APP_API_BASE_URL}/staff-details/?property_id=${propertyId}&staff_id=${id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
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

  return (
    <>
      <CustomSpinner isLoading={isLoading} />
      <div className="main_tile">
        <div className="row">
          <div className="col-auto mr-auto">
            <h4 className="heading">Staff Management</h4>
          </div>
          <div className="col-auto">
            <Link to={"./add-staff"}>
              <div className="btn_addo">+ Add Staff</div>
            </Link>
          </div>
        </div>
      </div>

      <div className="dashboard_wrapper">
        {staffDetails.length > 0 ? (
          staffDetails.map((staff, index) => (
            <div key={`staff-${index}`} className="room_details_datewise mb-3">
              <div className="row">
                <div className="col">
                  <p className="text-dark font-weight-bold">
                    {staff.staff_first_name} {staff.staff_last_name}
                  </p>
                  <p>{staff.staff_role}</p>
                </div>
                <div className="col">
                  <p className="font-weight-bold">{staff.staff_phone_number}</p>
                  <p>{staff.staff_emai}</p>
                </div>
                <div className="col">
                  <p className="mt-2">{staff.staff_address}</p>
                </div>
                <div className="col">
                  <p className="mt-2 font-weight-bold">
                    NRS. {staff.staff_salary}/month
                  </p>
                </div>
                <div className="col">
                  <div className="mt-2">
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
          <h3 className="d-flex justify-content-center mt200 mb200">
            No staff added yet!
          </h3>
        )}
      </div>
    </>
  );
}

export default StaffMgmt;
