import React from "react";
import StaffMgmt from "../../../../../pages/mgmt/StaffMgmt";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditStaff = () => {
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Staff" },
			]}
			sectionTitle="Staff"
			className="admin-prop-mgmt--staff"
		>
			<StaffMgmt />
		</PropertyEditLayout>
	);
};

export default AdminPropEditStaff;
