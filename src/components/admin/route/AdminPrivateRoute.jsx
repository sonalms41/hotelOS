import React from "react";
import { Route, Redirect } from "react-router-dom";
import { adminStatus } from "./../../utility/localStorage";
import AdminLayout from "./../adminHOC/AdminLayout";

const AdminPrivateRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				adminStatus() == true ? (
					<AdminLayout>
						<Component {...props} />
					</AdminLayout>
				) : (
					<Redirect to="/" />
				)
			}
		/>
	);
};

export default AdminPrivateRoute;
