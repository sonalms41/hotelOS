import React, { useContext } from "react";
import AdminNavItem from "./AdminNavItem";
import { ToggleAdminNavbarContext } from "../contextApi";
import { Scrollbars } from "react-custom-scrollbars";
const AdminNav = () => {
	const { showNavBar, toggleShowNavbar } = useContext(ToggleAdminNavbarContext);

	return (
		<>
			<Scrollbars style={{ width: "15rem", height: "100%", position: "fixed" }}>
				<aside
					className={`adminnav ${
						showNavBar ? "visible-adminnav" : "hidden-adminnav"
					}`}
				>
					<ul className="adminnav-list">
						<AdminNavItem
							to="admin-dashboard"
							title="Dashboard"
							iconName="rocket"
						/>
						<AdminNavItem to="admin-property" title="Property" />
						<AdminNavItem
							to="admin-addnewbooking"
							title="New Booking"
							iconName="rocket"
						/>
						<AdminNavItem to="admin-guest" title="Guest" iconName="rocket" />
						<AdminNavItem to="admin-master" title="Master" />

						<AdminNavItem to="admin-content" title="Reservation Web Content" />
						<AdminNavItem
							to="admin-paymentgateway"
							title="Payment Gateway"
							iconName="rocket"
						/>
					</ul>
				</aside>
			</Scrollbars>
		</>
	);
};

export default AdminNav;
