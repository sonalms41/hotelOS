import React from "react";
import { Link } from "react-router-dom";
import FontAwesome from "react-fontawesome";
import AdminNavItem from "./AdminNavItem";
const AdminNav = () => {
	return (
		<aside className="adminnav">
			<ul className="adminnav-list">
				<AdminNavItem
					to="admin-dashboard"
					title="Dashboard"
					iconName="rocket"
				/>
				<AdminNavItem
					to="property"
					title="Property"
					iconName="rocket"
					status="active"
				/>
				<AdminNavItem to="new_booking" title="New Booking" iconName="rocket" />
				<AdminNavItem to="user" title="User" iconName="rocket" />
				<AdminNavItem to="master" title="Master" iconName="rocket" />
				<AdminNavItem
					to="channel_manager "
					title="Channel Manager"
					iconName="rocket"
				/>
				<AdminNavItem
					to="payment_gateway"
					title="Payment Gateway"
					iconName="rocket"
				/>
			</ul>
		</aside>
	);
};

export default AdminNav;
