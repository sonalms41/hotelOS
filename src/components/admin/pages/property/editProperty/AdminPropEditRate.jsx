import React from "react";
import RateMgmt from "../../../../../pages/mgmt/RateMgmt";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditRate = () => {
	const propertyName=adminLocalStorage.propertyName();
	return (
		<PropertyEditLayout
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Edit Rate" },
		]
		}
		sectionTitle={propertyName? propertyName: "Property Name Not Found"}
		className="admin-prop-mgmt--rate"
		>
			<RateMgmt />
			</PropertyEditLayout>
		
	);
};

export default AdminPropEditRate;
