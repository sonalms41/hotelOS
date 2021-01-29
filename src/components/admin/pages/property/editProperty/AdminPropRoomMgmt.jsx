import React from "react";
import RoomManagement from "../../../../../pages/mgmt/RoomMgmt";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropRoomMgmt = (props) => {
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Room Management" },
			]}
			sectionTitle="Room Management"
			className="admin-prop-mgmt--roommgmt"
		>
			<RoomManagement />
		</PropertyEditLayout>
	);
};

export default AdminPropRoomMgmt;
