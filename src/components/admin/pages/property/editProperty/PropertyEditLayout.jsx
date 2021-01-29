import React from "react";
import SidebarDash from "../../../../SidebarDash";
import { AdminSectionHeader } from "../../../adminUtility";

const PropertyEditLayout = (props) => {
	const { breadCrumb, sectionTitle, className } = props;

	return (
		<div className={`admin-prop-mgmt ${className ? className : ""}`}>
			<AdminSectionHeader breadCrumb={breadCrumb} sectionTitle={sectionTitle} />
			<div className="admin-prop-dashboard__dashlanding">
				<SidebarDash showSidebar={true} />
				<div className="admin-prop-mgmt__content">{props.children}</div>
			</div>
		</div>
	);
};

export default PropertyEditLayout;
