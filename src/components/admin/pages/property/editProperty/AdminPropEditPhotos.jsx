import React from "react";
import DashPhotos from "../../../../../pages/mgmt/DashPhotos";
import adminPropServices from "../../../adminServices/property";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditPhotos = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<>
			<PropertyEditLayout
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Edit-Photos" },
				]}
				sectionTitle={propertyName ? propertyName : "Property Name Not Found"}
				className="admin-prop-mgmt--photos "
			>
				<DashPhotos />
			</PropertyEditLayout>
		</>
	);
};
export default AdminPropEditPhotos;
