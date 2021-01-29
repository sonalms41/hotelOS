import React, { useState, useEffect } from "react";
import { AdminGetDataContext } from "../../contextApi";

export const adminPropDetailBreadcrumb = [
	{ to: "/admin-dashboard", title: "Dashboard" },
	{ to: "/admin-property", title: "Property" },
	{
		to: `/admin-property/dashboard/${propertyId}`,
		title: "Property Dashboard",
	},
	{
		to: `/admin-property/${
			basicInfo.data.property_status === "Verified"
				? "verified"
				: basicInfo.data.property_status === "Rejected"
				? "rejected"
				: basicInfo.data.property_status === "Blocked"
				? "blocked"
				: basicInfo.data.property_status === "Deactivated"
				? "deactivated"
				: basicInfo.data.property_status === "Reported"
				? "resported"
				: ""
		}`,

		title: basicInfo.data.property_status,
	},
	{
		to: "",
		title: basicInfo.data.property_name,
	},
];
