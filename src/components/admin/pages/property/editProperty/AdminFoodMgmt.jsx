import React from "react";
import FoodMgmt from "../../../../../pages/mgmt/FoodMgmt";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminFoodMgmt = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Food Management" },
			]}
			sectionTitle={propertyName ? propertyName : "Property Name Not Found"}
			className="admin-prop-mgmt--food"
		>
			<FoodMgmt />
		</PropertyEditLayout>
	);
};

export default AdminFoodMgmt;
