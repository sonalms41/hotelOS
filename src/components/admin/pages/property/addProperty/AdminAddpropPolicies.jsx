import React from "react";
import Policies from "../../../../../pages/Policies";
import AdminAddPropertyLayout from "./AdminPropertyLayout";

const AdminAddpropPolicies = () => {
	return (
		<AdminAddPropertyLayout
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Policies" },
		]
		}
		sectionTitle="Add Property-Policies"
		>
				<Policies />
				</AdminAddPropertyLayout>
	);
};

export default AdminAddpropPolicies;
