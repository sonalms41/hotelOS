import React from "react";
import Contact from "../../../../../pages/Contact";
import AdminAddPropertyLayout from "./AdminPropertyLayout";
const AdminAddpropContact = () => {
	return (
		<AdminAddPropertyLayout 
		breadCrumb={[
			{ to: "/admin-dashboard", title: "Dashboard" },
			{ to: "/admin-property", title: "Property" },
			{ to: "", title: "Contact" },
		]
		}
		sectionTitle="Add Property-Contact"
		>			
			<Contact />
</AdminAddPropertyLayout>
		
	);
};

export default AdminAddpropContact;
