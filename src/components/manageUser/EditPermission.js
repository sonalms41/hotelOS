import React, { useEffect, useState } from "react";
import { USER_TOKEN } from "../LocalStorageInfo";
import { toast } from "react-toastify";
import CustomSpinner from "../CustomSpinner";

function EditPermission(props) {
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [permissionSelected, setPermissionSelected] = useState([]);

  useEffect(() => {
    setPermissionSelected(props.oldPermissions);
  }, [props]);

  const handlePermissions = (id) => {
    let temp = [...permissionSelected];
    if (temp.some((t) => t.id === id))
      temp.forEach((t) => {
        if (t.id === id) t.perm_status = false;
      });
    else {
      const obj = { id, perm_status: true };
      temp.push(obj);
    }
    setPermissionSelected(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const editPermission = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/super-admin/assign-permission/`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${userToken}`,
          },
          body: JSON.stringify({
            user_id: props.show,
            permissions: permissionSelected,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("user data post", data);
          if (data.status_code === 200) {
            toast.success(data.message);
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
    editPermission();
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
                  Access Permission
                </div>
              </div>
              <div className="col-auto">
                <span className="close-modal-btn" onClick={props.close}>
                  ×
                </span>
              </div>
            </div>
            <div className="border-bottom" />
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            {props.permissions?.map((permission, idx) => (
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
                        checked={permissionSelected.some(
                          (p) => p.id === permission.id && p.perm_status
                        )}
                        onChange={() => handlePermissions(permission.id)}
                      />
                      <div>
                        <span />
                      </div>
                    </label>
                  </div>
                  <div className="mt-4">
                    {permissionSelected.some(
                      (p) => p.id === permission.id && p.perm_status
                    )
                      ? "Yes"
                      : "No"}
                  </div>
                </div>
                <div className="border-bottom" />
              </React.Fragment>
            ))}
            <button type="submit" className="btn_addo mt-3">
              Set access
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPermission;
