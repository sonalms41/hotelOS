import React from "react";
import GuestWalkin from "../../../../../pages/mgmt/GuestWalkin";
import { adminLocalStorage } from "../../../adminUtility/adminLocalStorage";
import PropertyEditLayout from "./PropertyEditLayout";

const AdminGuestWalkin = () => {
	const { propertyName } = adminLocalStorage.propertyName();
	return (
		<PropertyEditLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Guest Walkin" },
			]}
			sectionTitle={propertyName ? propertyName : "Property Name Not Found"}
			className="admin-prop-mgmt--walkin-guest"
		>
			<GuestWalkin />
		</PropertyEditLayout>
	);
};

export default AdminGuestWalkin;
