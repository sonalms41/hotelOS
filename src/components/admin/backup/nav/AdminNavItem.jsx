import React from "react";
import { Link, NavLink } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import IconAdminNav1 from "./../../../assets/images/icon/icon-admin-nav1.svg";
const AdminNavItem = (props) => {
	const { title, iconName, status, to } = props;
	return (
		<li className="adminnav-list__item">
			<NavLink to={`/${to}`}>
				<span className="adminnav-icon">
					{/*<FontAwesome name="rocket" />*/}
					<img src={IconAdminNav1} alt="Admin nav" />
				</span>
				<span className="adminnav-title">{title}</span>
			</NavLink>
		</li>
	);
};

export default AdminNavItem;
