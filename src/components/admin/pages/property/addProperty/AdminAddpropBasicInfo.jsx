import React from "react";
import BasicInfo from "../../../../../pages/BasicInfo";
import AdminAddPropertyLayout from "./AdminPropertyLayout";
const AdminAddpropBasicInfo = () => {
	return (
		<>
		
			<AdminAddPropertyLayout
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Basic Info" },
			]
			}
			sectionTitle="Add Property-Basic-Info"
			>
			<BasicInfo />
			</AdminAddPropertyLayout>		</>
	);
};

export default AdminAddpropBasicInfo;
