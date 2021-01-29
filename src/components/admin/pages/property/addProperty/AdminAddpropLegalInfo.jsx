import React from "react";
import LegalInfo from "../../../../../pages/LegalInfo";

const AdminAddpropLegalInfo = () => {
	return (
		
			<AdminAddpropLegalInfo
			breadCrumb={[
				{ to: "/admin-dashboard", title: "Dashboard" },
				{ to: "/admin-property", title: "Property" },
				{ to: "", title: "Legal-info" },
			]
			}
			sectionTitle="Add Property-Legal-information"
			>
				<LegalInfo />
				</AdminAddpropLegalInfo>
	);
};

export default AdminAddpropLegalInfo;
