import React from "react";
import Bookings from "../../../../../pages/mgmt/Bookings";
import SidebarDash from "../../../../SidebarDash";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditBooking = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<>
			<PropertyEditLayout
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Booking" },
				]}
				sectionTitle={propertyName && propertyName}
				className="admin-prop-mgmt--booking"
			>
				<Bookings />
			</PropertyEditLayout>
		</>
	);
};

export default AdminPropEditBooking;
