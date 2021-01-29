import React from "react";
import RoomList from "../../../../../pages/mgmt/RoomList";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditProperty = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Edit Room" },
			]}
			sectionTitle={propertyName ? propertyName : "Property Name Not Found"}
			className="admin-prop-mgmt--room"
		>
			<RoomList />
		</PropertyEditLayout>
	);
};

export default AdminPropEditProperty;
