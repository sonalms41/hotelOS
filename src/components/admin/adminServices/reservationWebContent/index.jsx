import React from "react";
import Axios from "axios";

// Base url
const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Wrb-static-content
const urlWebStaticContent = `${baseUrl}/super-admin/static-page/`;

const urlBasicInfo = `${baseUrl}/property-detail/?property_id=`;

const adminReservationWebServices = {
	get: {
		webStaticContent: () => {
			return Axios.get(urlWebStaticContent, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},

	post: {
		webStaticContent: (values) => {
			return Axios.post(urlWebStaticContent, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	delete: {},

	patch: {
		webStaticContent: (values) => {
			return Axios.patch(urlWebStaticContent, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},

	put: {
		//propertyStatusChange: (values) => {
		//	return Axios.put(urlPropStatusChange, values, {
		//		headers: {
		//			"Content-Type": "application/json",
		//			Authorization: `Token ${localStorage.getItem("con-jwt")}`,
		//		},
		//	});
		//},
	},
};

export default adminReservationWebServices;
