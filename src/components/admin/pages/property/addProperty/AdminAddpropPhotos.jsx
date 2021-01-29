import React from "react";
import Photos from "../../../../../pages/Photos";
import AdminAddPropertyLayout from "./AdminPropertyLayout";
const AdminAddpropPhotos = () => {
	return (
		
		
			<AdminAddPropertyLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Photos" },
			]
			}
			sectionTitle="Add Property-Photos"
			>
				<Photos />
				</AdminAddPropertyLayout>
	);
};

export default AdminAddpropPhotos;
