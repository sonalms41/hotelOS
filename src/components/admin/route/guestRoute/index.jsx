import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminGuestListVerified from "../../pages/guest/AdminGuestListVerified";
import AdminGuestListReported from "../../pages/guest/AdminGuestListReported";
import AdminGuestListBlocked from "../../pages/guest/AdminGuestListBlocked";
import AdminGuest from "../../pages/guest";
import AdminGuestDashboard from "../../pages/guest/AdminGuestDashboard";
import AdminGuestBookingAnalytics from "../../pages/guest/bookingAnalytics";
import AdminGuestCancellationAnalytics from "../../pages/guest/cancellationAnalytics";
import AdminGuestBookingHistory from "../../pages/guest/guestProfile/AdminGuestBookingHistory";
import AdminGuestCancelledHistory from "../../pages/guest/guestProfile/AdminGuestCancelledHistory";
import AdminGuestPropertyView from "../../pages/guest/guestProfile/AdminGuestPropertyView";
const AdminGuestRoute = () => {
	return (
		<Switch>
			<Route path="/admin-guest" component={AdminGuest} exact />
			<Route
				path="/admin-guest/verified"
				component={AdminGuestListVerified}
				exact
			/>
			<Route
				path="/admin-guest/reported"
				component={AdminGuestListReported}
				exact
			/>
			<Route
				path="/admin-guest/blocked"
				component={AdminGuestListBlocked}
				exact
			/>
			<Route
				path="/admin-guest/dashboard/:id"
				component={AdminGuestDashboard}
				exact
			/>

			{/*GUEST ANALYTICS*/}
			<Route
				path="/admin-guest/booking-analytics"
				component={AdminGuestBookingAnalytics}
				exact
			/>
			<Route
				path="/admin-guest/cancellation-analytics"
				component={AdminGuestCancellationAnalytics}
				exact
			/>

			{/*GUEST-PROFILE */}
			<Route
				path="/admin-guest/booking-history"
				component={AdminGuestBookingHistory}
				exact
			/>
			<Route
				path="/admin-guest/property-viewed"
				component={AdminGuestPropertyView}
				exact
			/>
			<Route
				path="/admin-guest/cancelled-history"
				component={AdminGuestCancelledHistory}
				exact
			/>
		</Switch>
	);
};

export default AdminGuestRoute;
