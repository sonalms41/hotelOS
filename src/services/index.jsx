import React from "react";
import baseUrl from "./baseUrl";
import Axios from "axios";

//const services = {
//	get: {
//		adminLogin: Axios.get(baseUrl.adminLogin),
//	},
//};

//export default services;

export default function AdminLogin(userData) {
	//const { userData } = props;
	return new Promise((resolve, reject) => {
		fetch("http://2.tcp.ngrok.io:11576/super-admin/api-token-auth/", {
			method: "POST",
			body: JSON.stringify(userData),
		})
			.then((response) => {
				return response.json();
			})
			.then((responseJson) => {
				resolve(responseJson);
			})
			.catch((error) => {
				reject(error);
			});
	});
}
