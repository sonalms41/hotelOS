import React from "react";
import Axios from "axios";

// Base url
const baseUrl = process.env.REACT_APP_API_BASE_URL;
// "Content-Type": "application/json",
const header = {
  "Content-Type": "application/json",
  Authorization: `Token ${localStorage.getItem("con-jwt")}`,
};

// ALL-PROPERTY
const urlAllProperty = `${baseUrl}/client/all-properties/`;

// PROPERTY BASED ON STATUS
const urlPropStatusChange = `${baseUrl}/super-admin/property-status-change/`;
const urlPropVerified = `${baseUrl}/super-admin/property-verified/`;
const urlPropRejected = `${baseUrl}/super-admin/property-rejected/`;
const urlPropReported = `${baseUrl}/super-admin/property-reported/`;
const urlPropDeactivated = `${baseUrl}/super-admin/property-deactivated/`;
const urlPropBlocked = `${baseUrl}/super-admin/property-blocked/`;

// PROPERTY DETAILS
const urlBasicInfo = `${baseUrl}/property-detail/?property_id=`;
const urlContact = `${baseUrl}/add-contact/?property_id=`;
const urlAmenities = `${baseUrl}/store-hotel-aminities/?property_id=`;
const urlRoomType = `${baseUrl}/save-all-roomtype/?property_id=`;
const urlPhotos = `${baseUrl}/image-adder/?property_id=`;
const urlPolicies = `${baseUrl}/hotel-policies/?property_id=`;
const urlBankDetail = `${baseUrl}/store-bank-details/?property_id=`;
const urlLegalInfo = `${baseUrl}/store-legal-info/?property_id=`;
const urlUploadDocument = `${baseUrl}/upload-document/?property_id=`;
const urlPropDashboardBookingRating = `${baseUrl}/property-booking-rating/?property_id=`;

// RECONCILATION
const urlReconcile = `${baseUrl}/reconcile/`;
const urlReconcilations = `${baseUrl}/reconcilations/?property_id=`;
const urlReconcilationHistory = `${baseUrl}/reconcilation-history/?property_id=`;
const urlReconcHistoryDetail = `${baseUrl}/reconcilation-history/`;

const adminPropServices = {
	get: {
		reconcilations: (propertyId) => {
			return Axios.get(`${urlReconcilations}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		reconcilationReport: (propertyId, startDate, endDate) => {
			return Axios.get(
				`${baseUrl}/reconcilation-report/?property_id=${propertyId}&starting_date=${startDate}&ending_date=${endDate}`,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token ${localStorage.getItem("con-jwt")}`,
					},
				},
			);
		},

		reconcilationHistory: (propertyId) => {
			return Axios.get(`${urlReconcilationHistory}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propDashboardBookingRating: (propertyId) => {
			return Axios.get(`${urlPropDashboardBookingRating}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		allProperty: () => {
			return Axios.get(urlAllProperty, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		basicInfo: (propertyId) => {
			return Axios.get(`${urlBasicInfo}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		contact: (propertyId) => {
			return Axios.get(`${urlContact}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		amenities: (propertyId) => {
			return Axios.get(`${urlAmenities}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		roomType: (propertyId) => {
			return Axios.get(`${urlRoomType}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		photos: (propertyId) => {
			return Axios.get(`${urlPhotos}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		bankDetail: (propertyId) => {
			return Axios.get(`${urlBankDetail}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		policies: (propertyId) => {
			return Axios.get(`${urlPolicies}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		legalInfo: (propertyId) => {
			return Axios.get(`${urlLegalInfo}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		documents: (propertyId) => {
			return Axios.get(`${urlUploadDocument}${propertyId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		// Property status
		propertyBlocked: () => {
			return Axios.get(urlPropBlocked, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyDeactivated: () => {
			return Axios.get(urlPropDeactivated, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyReported: () => {
			return Axios.get(urlPropReported, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyRejected: () => {
			return Axios.get(urlPropRejected, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		propertyVerified: () => {
			return Axios.get(urlPropVerified, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	post: {
		reconsile: (values) => {
			return Axios.post(urlReconcile, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},

		reconcHistoryDetail: (values) => {
			return Axios.post(urlReconcHistoryDetail, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
	delete: {},
	patch: {},
	put: {
		propertyStatusChange: (values) => {
			return Axios.put(urlPropStatusChange, values, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
};

export default adminPropServices;
