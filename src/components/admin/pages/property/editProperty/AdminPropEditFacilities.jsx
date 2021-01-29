import React from "react";
import Facilities from "../../../../../pages/mgmt/Facilities";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditFacilities = () => {
	const propertyName=adminLocalStorage.propertyName();
	return (
		<>
		<PropertyEditLayout
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Edit Facilities and Services" },
		]
		}
		sectionTitle={propertyName && propertyName}
		className="admin-amenities"
		>
			
		<Facilities />
			</PropertyEditLayout>
		</>
	);
};

export default AdminPropEditFacilities;
