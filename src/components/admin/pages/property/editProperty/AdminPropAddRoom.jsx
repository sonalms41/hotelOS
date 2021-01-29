import React from "react";
import AddRoom from "./../../../../../pages/mgmt/AddRoom";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropAddRoom = () => {
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Add Room" },
			]}
			sectionTitle="Add Room"
			className="admin-prop-mgmt--roomdetail"
		>
			<AddRoom />
		</PropertyEditLayout>
	);
};

export default AdminPropAddRoom;
