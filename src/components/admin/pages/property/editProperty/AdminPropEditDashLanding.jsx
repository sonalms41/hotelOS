import React from "react";
import DashLanding from "../../../../../pages/mgmt/DashLanding";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditDashLanding = () => {
	const propertyName = adminLocalStorage.propertyName();
	return (
		<>
			<PropertyEditLayout
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Dash-landing" },
				]}
				sectionTitle={propertyName && propertyName}
				className="admin-prop-mgmt--dashLanding"
			>
				<DashLanding />
			</PropertyEditLayout>
		</>
	);
};

export default AdminPropEditDashLanding;
