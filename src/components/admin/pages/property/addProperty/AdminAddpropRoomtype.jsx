import React from "react";
import RoomType from "../../../../../pages/RoomType";
import AdminAddPropertyLayout from "./AdminPropertyLayout";

const AdminAddpropRoomtype = () => {
	return (
		<>
		
			<AdminAddPropertyLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Room-types" },
			]
			}
			sectionTitle="Add Property-Room-Types"
			>
				<RoomType />
				</AdminAddPropertyLayout>
		</>
	);
};

export default AdminAddpropRoomtype;
