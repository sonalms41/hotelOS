import React from "react";
import { NavLink } from "react-router-dom";
import IconAdminNav1 from "./../../../assets/images/icon/icon-admin-nav1.svg";
import IconAdminNav2 from "./../../../assets/images/icon/icon-admin-nav2.svg";
import IconAdminNav3 from "./../../../assets/images/icon/icon-admin-nav3.svg";
import IconAdminNav4 from "./../../../assets/images/icon/icon-admin-nav4.svg";
import IconAdminNav5 from "./../../../assets/images/icon/icon-admin-nav5.svg";

const AdminNavItem = (props) => {
  const { title, to } = props;
  return (
    <li className="adminnav-list__item">
      <NavLink to={`/${to}`}>
        <span className="adminnav-icon">
          {title == "Dashboard" ? (
            <img src={IconAdminNav1} />
          ) : title == "Property" ? (
            <img src={IconAdminNav2} />
          ) : title == "New Booking" ? (
            <img src={IconAdminNav3} />
          ) : title == "User" ? (
            <img src={IconAdminNav4} />
          ) : title == "Master" ? (
            <img src={IconAdminNav5} />
          ) : (
            <img src={IconAdminNav1} />
          )}
        </span>
        <span className="adminnav-title">{title}</span>
      </NavLink>
    </li>
  );
};

export default AdminNavItem;
