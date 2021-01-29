import React, { useEffect, useState } from "react";
import Popover from "react-tiny-popover";
import AddUser from "../../components/manageUser/AddUser";
import EditPermission from "../../components/manageUser/EditPermission";
import { PROPERTY_ID, USER_TOKEN } from "../../components/LocalStorageInfo";
import CustomSpinner from "../../components/CustomSpinner";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

function ManageUsers() {
  const [propertyId, setPropertyId] = useState(PROPERTY_ID());
  const [userToken, setUserToken] = useState(USER_TOKEN());
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldPermissions, setOldPermissions] = useState([]);
  const [editPermission, setEditPermission] = useState(null);

  useEffect(() => {
    document.title = `${process.env.REACT_APP_TITLE} - Manage User`;

    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/super-admin/list-permission/`,
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
          console.log("data permissions", data);
          if (data.status_code === 200)
            setPermissionList(data.list_of_permission);
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/manage-account/?property_id=${propertyId}`,
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
          console.log("manage account", data);
          if (data.status_code === 200) {
            setUserList(data.result);
            setIsLoading(false);
          }
        })
        .catch((error) => console.error(error));
    };
    fetchData();
  }, [refetch]);

  const handleColor = (id) => {
    const calc = (a, id) => {
      let num = 0;
      const s = a[a.length - 1];
      const gap = id - s;
      if (id % s === 0) {
        return s;
      } else if (gap < s) {
        num = gap;
        return num;
      } else if (gap > s) {
        return calc(a, gap);
      }
    };
    const color = Math.abs(calc([1, 2, 3, 4, 5], parseInt(id)));
    return `avatar_dropdown_profile font-weight-bold text-dark text-center bg-color-color${color}`;
  };

  const handleEditPermission = (id) => {
    let temp = [...userList];
    temp = temp.filter((t) => t.id === id);
    setOldPermissions(temp[0].permission);
    setEditPermission(id);
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
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/manage-account/`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${userToken}`,
        },
        body: JSON.stringify({
          property_id: propertyId,
          user_id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("delete account", data);
          if (data.status_code === 200) {
            toast.success(data.message);
            setRefetch((prevState) => !prevState);
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

  const handleSearch = () => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/search-user/?property_id=${propertyId}&search_key=${searchTerm}`,
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
          console.log("search user", data);
          if (data.status_code === 200) {
            setUserList(data.result);
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
            <h4 className="heading">Manage User Account</h4>
          </div>
          <div className="col-auto">
            <span className="btn_addo" onClick={() => setIsModalOpen(true)}>
              + Invite a new user
            </span>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="manage_users_search">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or email"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              className="manage_users_search_icon cursorPointer"
              onClick={handleSearch}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12.332"
                height="12.335"
                viewBox="0 0 15.332 15.335"
              >
                <path
                  id="search"
                  d="M19.652,18.719l-4.264-4.3a6.077,6.077,0,1,0-.922.934L18.7,19.625a.656.656,0,0,0,.926.024A.661.661,0,0,0,19.652,18.719ZM10.613,15.4A4.8,4.8,0,1,1,14.006,14,4.769,4.769,0,0,1,10.613,15.4Z"
                  transform="translate(-4.5 -4.493)"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="text-dark">
        {userList.length} user account have access to your property
      </p>
      <div className="dashboard_wrapper mt-4">
        <div className="custom_manage_users_table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User</th>
                <th scope="col">Role</th>
                <th scope="col" className="width-30p">
                  Access
                </th>
                <th scope="col">Last login</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((user, idx) => (
                <tr key={`users-${idx}`}>
                  <td>
                    <div className="d-flex justify-content-start">
                      <div className={handleColor(user.id)}>
                        {user.full_name[0]}
                        {user.full_name[user.full_name.indexOf(" ") + 1]}
                      </div>
                      <div className="ml-4">
                        <div className="font14 font-weight-bold">
                          {user.full_name}
                        </div>
                        <div>{user.username}</div>
                        <div>{user.phone_number}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.role}</td>
                  <td className="width-30p">
                    {user.permission?.map((perm, i) => (
                      <span key={`accessPerm-${i}`} className="mr-2">
                        {perm.permission},
                      </span>
                    ))}
                  </td>
                  <td>{user.last_login}</td>
                  <td>
                    <Popover
                      isOpen={isPopoverOpen.includes(user.id)}
                      position={"bottom"}
                      onClickOutside={() => setIsPopoverOpen([])}
                      content={
                        <div className="manage_users_popover">
                          <p>
                            <span
                              className="cursorPointer"
                              onClick={() => handleEditPermission(user.id)}
                            >
                              Edit access
                            </span>
                          </p>
                          <p className="text-danger">
                            <span
                              className="cursorPointer"
                              onClick={() => confirmSubmit(user.id)}
                            >
                              Remove user
                            </span>
                          </p>
                        </div>
                      }
                    >
                      <u
                        className="cursorPointer avatar_dropdown_viewProfile"
                        onClick={() =>
                          setIsPopoverOpen((prevState) => [
                            ...prevState,
                            user.id,
                          ])
                        }
                      >
                        Manage
                      </u>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddUser
        show={isModalOpen}
        close={() => setIsModalOpen(false)}
        permissions={permissionList}
        refetch={() => setRefetch((prevState) => !prevState)}
      />
      <EditPermission
        show={editPermission}
        close={() => setEditPermission(null)}
        permissions={permissionList}
        oldPermissions={oldPermissions}
        refetch={() => setRefetch((prevState) => !prevState)}
      />
    </>
  );
}

export default ManageUsers;
