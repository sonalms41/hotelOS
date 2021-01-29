import React from "react";
import BankDetails from "../../../../../pages/BankDetails";
import AdminAddPropertyLayout from "./AdminPropertyLayout";

const AdminAddpropBankinfo = () => {
	return (
		<AdminAddPropertyLayout
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Bank info" },
		]
		}
		sectionTitle="Add Property-Bank-Info"
		>				
			<BankDetails />
			</AdminAddPropertyLayout>

	);
};

export default AdminAddpropBankinfo;
