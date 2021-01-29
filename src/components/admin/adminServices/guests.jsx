import React from "react";
import Axios from "axios";

// Base url
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// GUEST-STATUS
const URL_GUEST_STATUS = `${BASE_URL}/super-admin/guest-list/?guest_status=`;
const URL_GUEST_DETAIL = `${BASE_URL}/super-admin/guest-analytics/?user_id=`;

export const adminGuestServices = {
	GET: {
		guestsByStatus: (guestStatus) => {
			return Axios.get(`${URL_GUEST_STATUS}${guestStatus}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
		guestDetail: (guestId) => {
			return Axios.get(`${URL_GUEST_DETAIL}${guestId}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Token ${localStorage.getItem("con-jwt")}`,
				},
			});
		},
	},
};
