import React from "react";
import Calendar from "../../../../../pages/mgmt/Calendar";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminPropEditCalendar = () => {
	return (
		<>
			<PropertyEditLayout
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Calendar" },
				]}
				sectionTitle="Edit-Calendar"
				className="admin-prop-mgmt--calendar"
			>
				<Calendar />
			</PropertyEditLayout>
		</>
	);
};

export default AdminPropEditCalendar;
