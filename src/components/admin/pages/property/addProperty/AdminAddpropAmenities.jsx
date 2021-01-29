import React from "react";
import Amenities from "../../../../../pages/Amenities";
import AdminAddPropertyLayout from "./AdminPropertyLayout";

const AdminAddpropAmenities = () => {
	return (
		<AdminAddPropertyLayout
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Amenities" },
		]
		}
		sectionTitle="Add Property-Amenities"
		>
			<Amenities/>
			</AdminAddPropertyLayout>	);
};

export default AdminAddpropAmenities;
