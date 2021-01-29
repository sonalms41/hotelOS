import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import UserDashboard from "..";

import VerifiedUser from "../verifiedUser";

import UserLayout from "../userHoc/UserLayout";
import VerifiedUserAnalytics from "../verifiedUser/VerifiedUserAnalytics";

const PropRoute = () => {
	return (
		<UserLayout>
			<Switch>
				<Route path="/user" component={UserDashboard} exact />
				<Route path="/user/verified_user" component={VerifiedUser} exact />
				<Route
					path="/user/verified_user/user_analytics"
					component={VerifiedUserAnalytics}
					exact
				/>
			</Switch>
		</UserLayout>
	);
};

export default PropRoute;
