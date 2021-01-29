import React from "react";
import Finance from "../../../../../pages/mgmt/Finance";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminFinanceMgmt = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Finance Management" },
			]}
			sectionTitle={propertyName ? propertyName : "Property Name Not Found"}
			className="admin-prop-mgmt--finance"
		>
			<Finance />
		</PropertyEditLayout>
	);
};

export default AdminFinanceMgmt;
