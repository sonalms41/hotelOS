import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
const AdminGuestProfileNav = () => {
	return (
		<ul className="admin-gues-profile-nav">
			<li>
				<NavLink to="/admin-guest/booking-history">Booking History</NavLink>
			</li>
			<li>
				<NavLink to="/admin-guest/cancelled-history">Cancelled History</NavLink>
			</li>
			<li>
				<NavLink to="/admin-guest/property-viewed">Property Viewed</NavLink>
			</li>
		</ul>
	);
};

export default AdminGuestProfileNav;
