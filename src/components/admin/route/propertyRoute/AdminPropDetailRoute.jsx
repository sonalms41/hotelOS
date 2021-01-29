import React from "react";
import { Route } from "react-router-dom";

const AdminPropDetailRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				<div className="admin-prop-detail">
					<Component {...props} />
				</div>
			)}
		/>
	);
};

export default AdminPropDetailRoute;
