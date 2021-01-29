import React from "react";
import Documents from "../../../../../pages/Documents";
import AdminAddPropertyLayout from "./AdminPropertyLayout";

const AdminAddpropDocuments = () => {
	return (
		<AdminAddPropertyLayout 
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Document" },
		]
		}
		sectionTitle="Add Property-Document"
		>
				<Documents />
				</AdminAddPropertyLayout>
	);
};

export default AdminAddpropDocuments;
