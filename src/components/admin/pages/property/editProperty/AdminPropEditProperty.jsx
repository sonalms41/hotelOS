import React from "react";
import PropertyMgmt from "../../../../../pages/mgmt/PropertyMgmt";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditProperty = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<>
			<PropertyEditLayout
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Property Management" },
				]}
				sectionTitle={propertyName ? propertyName : "Property Name Not Given"}
				className="admin-prop-mgmt--property"
			>
				<PropertyMgmt />
			</PropertyEditLayout>
		</>
	);
};

export default AdminPropEditProperty;
