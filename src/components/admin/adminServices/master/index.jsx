import React, { useEffect } from "react";
import Axios from "axios";

// Url
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const urlOccupancy = `${baseUrl}/super-admin/room-type/`;
const urlRoomView = `${baseUrl}/super-admin/room-views/`;
const urlPropertyType = `${baseUrl}/super-admin/property-type/`;
const urlBoardType = `${baseUrl}/super-admin/board-type/`;
const urlMealAgesDef = `${baseUrl}/super-admin/meal-age/`;
const urlPaymentMethod = `${baseUrl}/super-admin/payment-method/`;
const urlBedType = `${baseUrl}/super-admin/bed-type/`;
const urlLanguages = `${baseUrl}/super-admin/languages/`;
const urlMealType = `${baseUrl}/super-admin/meal-type/`;
const urlMasterCommission = `${baseUrl}/super-admin/master-commission/`;
const urlMasterBaseCommission = `${baseUrl}/super-admin/base-commission/`;
const urlMasterAddSubRooms = `${baseUrl}/super-admin/subroom-type-add/`;
const urlMasterSubRoomConfig = `${baseUrl}/super-admin/room-types-conf/`;
// Headers
const header = {
	"Content-Type": "application/json",
	Authorization: `Token ${localStorage.getItem("con-jwt")}`,
};

const adminServices = {
	get: {
		mealType: () => {
			return Axios.get(urlMealType, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyType: () => {
			return Axios.get(urlPropertyType, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		bedType: () => {
			return Axios.get(urlBedType, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		roomView: () => {
			return Axios.get(urlRoomView, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		mealAgesDef: () => {
			return Axios.get(urlMealAgesDef, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		occupancy: () => {
			return Axios.get(urlOccupancy, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		boardType: () => {
			return Axios.get(urlBoardType, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		paymentMethod: () => {
			return Axios.get(urlPaymentMethod, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		languages: () => {
			return Axios.get(urlLanguages, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterCommission: () => {
			return Axios.get(urlMasterCommission, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterBaseCommission: () => {
			return Axios.get(urlMasterBaseCommission, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		subRoomsConfig: () => {
			return Axios.get(urlMasterSubRoomConfig, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	post: {
		mealAgesDef: (values) => {
			return Axios.post(urlMealAgesDef, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		roomView: (values) => {
			return Axios.post(urlRoomView, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		paymentMethod: (values) => {
			return Axios.post(urlPaymentMethod, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		languages: (values) => {
			return Axios.post(urlLanguages, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		boardType: (values) => {
			return Axios.post(urlBoardType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		bedType: (values) => {
			return Axios.post(urlBedType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyType: (values) => {
			return Axios.post(urlPropertyType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		occupancy: (values) => {
			return Axios.post(urlOccupancy, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterCommission: (values) => {
			return Axios.post(urlMasterCommission, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterBaseCommission: (values) => {
			return Axios.post(urlMasterBaseCommission, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		subRoomsConfig: (values) => {
			return Axios.post(urlMasterAddSubRooms, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	delete: {
		roomView: (id) => {
			return Axios.delete(urlRoomView, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		mealAgesDef: (id) => {
			return Axios.delete(urlMealAgesDef, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		occupancy: (id) => {
			return Axios.delete(urlOccupancy, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		paymentMethod: (id) => {
			return Axios.delete(urlPaymentMethod, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		languages: (id) => {
			return Axios.delete(urlLanguages, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		boardType: (id) => {
			return Axios.delete(urlBoardType, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		bedType: (id) => {
			return Axios.delete(urlBedType, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},
		propertyType: (id) => {
			return Axios.delete(urlPropertyType, {
				data: { id: id },
				"Content-Type": "application/json",
				Authorization: `Token ${localStorage.getItem("con-jwt")}`,
			});
		},

		//masterCommission: (value) => {
		//	return Axios.delete(urlMasterCommission, value, {
		//		headers: {
		//			"Content-Type": "application/json",
		//			Authorization: `Token ${localStorage.getItem("con-jwt")}`,
		//		},
		//	});
		//},

		masterCommission: (value) => {
			return Axios.delete(urlPropertyType, value, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		masterBaseCommission: (id) => {
			return Axios.delete(urlMasterBaseCommission, {
				data: { id: id },
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		subRoomsConfig: (value) => {
			console.log("val-wer:", value);
			return Axios.delete(urlMasterSubRoomConfig, {
				data: value,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	put: {
		occupancy: (values) => {
			return Axios.put(urlOccupancy, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		roomView: (values) => {
			return Axios.put(urlRoomView, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		paymentMethod: (values) => {
			return Axios.put(urlPaymentMethod, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		mealAgesDef: (values) => {
			return Axios.put(urlMealAgesDef, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		boardType: (values) => {
			return Axios.put(urlMealAgesDef, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		subRoomsConfig: (values) => {
			return Axios.put(urlMasterSubRoomConfig, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},

	patch: {
		propertyType: (values) => {
			return Axios.patch(urlPropertyType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		roomView: (values) => {
			return Axios.patch(urlRoomView, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		paymentMethod: (values) => {
			return Axios.patch(urlPaymentMethod, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		languages: (values) => {
			return Axios.patch(urlLanguages, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		mealAgesDef: (values) => {
			return Axios.patch(urlMealAgesDef, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		boardType: (values) => {
			return Axios.patch(urlBoardType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		bedType: (values) => {
			return Axios.patch(urlBedType, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterCommission: (values) => {
			return Axios.patch(urlMasterCommission, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		masterBaseCommission: (values) => {
			return Axios.patch(urlMasterBaseCommission, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
};

export default adminServices;
