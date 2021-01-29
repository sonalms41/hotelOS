import React from "react";
import RoomDetail from "./../../../../../pages/mgmt/RoomDetails";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditRoomDetail = () => {
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Room Detail" },
			]}
			sectionTitle="Staff"
			className="admin-prop-mgmt--roomdetail"
		>
			<RoomDetail />
		</PropertyEditLayout>
	);
};

export default AdminPropEditRoomDetail;
