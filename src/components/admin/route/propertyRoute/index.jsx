import React from "react";
import {
	Switch,
	Route,
	BrowserRouter,
	Link,
	useRouteMatch,
} from "react-router-dom";

import PropertyStatus from "./../../pages/property";
// PROPERTY ROUTE
import AdminPropDetailRoute from "./AdminPropDetailRoute";

// FOR ADD-PROPERTY
import AdminRegisterProp from "./../../pages/property/addProperty/AdminRegisterProp";
import AdminAddpropContact from "./../../pages/property/addProperty/AdminAddpropContact";
import AdminAddpropBasicInfo from "./../../pages/property/addProperty/AdminAddpropBasicInfo";
import AdminAddpropAmenities from "./../../pages/property/addProperty/AdminAddpropAmenities";
import AdminAddpropRoomtype from "./../../pages/property/addProperty/AdminAddpropRoomtype";
import AdminAddpropPolicies from "./../../pages/property/addProperty/AdminAddpropPolicies";
import AdminAddpropDocuments from "./../../pages/property/addProperty/AdminAddpropDocuments";
import AdminAddpropBankinfo from "./../../pages/property/addProperty/AdminAddpropBankinfo";
import AdminAddpropLegalInfo from "./../../pages/property/addProperty/AdminAddpropLegalInfo";
import AdminAddpropPhotos from "./../../pages/property/addProperty/AdminAddpropPhotos";

// PROPERTY MANAGEMENT IN ADMIN
import AdminPropEditCalendar from "../../pages/property/editProperty/AdminPropEditCalendar";
import AdminPropEditDashLanding from "../../pages/property/editProperty/AdminPropEditDashLanding";
import AdminPropEdittFacilities from "../../pages/property/editProperty/AdminPropEditFacilities";
import AdminPropEdittPhotos from "../../pages/property/editProperty/AdminPropEditPhotos";
import AdminPropMgmtPromotion from "../../pages/property/editProperty/AdminPropEditPromotion";
import AdminPropEditProperty from "../../pages/property/editProperty/AdminPropEditProperty";
import AdminPropEditRate from "../../pages/property/editProperty/AdminPropEditRate";
import AdminPropEditRoomList from "../../pages/property/editProperty/AdminPropEditRoomList";
import AdminPropEditStaff from "../../pages/property/editProperty/AdminPropEditStaff";
import AdmiPropEditBooking from "../../pages/property/editProperty/AdminPropEditBooking";
import AdminPropEditRoomDetail from "../../pages/property/editProperty/AdminPropEditRoomDetail";

// ADMIN PROPERTY STATUS
import AdminPropPending from "./../../pages/property/propertyTypes/Pending";
import AdminPropRejected from "./../../pages/property/propertyTypes/Rejected";
import AdminPropVerified from "./../../pages/property/propertyTypes/Verified";
import AdminPropBlocked from "../../pages/property/propertyTypes/Blocked";
import AdminPropDeactivated from "../../pages/property/propertyTypes/Deactivated";
import AdminPropReported from "../../pages/property/propertyTypes/Reported";

// ADMIN PROPERTY DETAIL
import AdminPropDashboard from "./../../pages/property/propDetail/AdminPropDashboard";
import AdminPropDetailBasicInfo from "./../../pages/property/propDetail/AdminPropDetailBasicInfo";
import AdminPropDetailBank from "./../../pages/property/propDetail/AdminPropDetailBank";
import AdminPropDetailContact from "./../../pages/property/propDetail/AdminPropDetailContact";
import AdminPropDetailDocuments from "./../../pages/property/propDetail/AdminPropDetailDocuments";
import AdminPropDetailLegalInfo from "./../../pages/property/propDetail/AdminPropDetailLegalInfo";
import AdminPropDetailPhotos from "./../../pages/property/propDetail/AdminPropDetailPhotos";
import AdminPropDetailPolicy from "./../../pages/property/propDetail/AdminPropDetailPolicy";
import AdminPropDetailRoomType from "./../../pages/property/propDetail/AdminPropDetailRoomType";
import AdminPropDetailAmenities from "./../../pages/property/propDetail/AdminPropDetailAmenities";
import AdminPropReconcilation from "../../pages/property/reconcilation";
import AdminCommission from "../../pages/property/commission";
import AdminGuestWalkin from "../../pages/property/editProperty/AdminGuestWalkin";
import AdminFoodMgmt from "../../pages/property/editProperty/AdminFoodMgmt";
import AdminFinanceMgmt from "../../pages/property/editProperty/AdminFinanceMgmt";
import AdminPropRoomMgmt from "../../pages/property/editProperty/AdminPropRoomMgmt";
import AddRoom from "../../../../pages/mgmt/AddRoom";
import OrdersMgmt from "../../../../pages/mgmt/OrdersMgmt";
import RoutePropMgmt from "./RoutePropMgmt";
import SubRoomType from "../../../../pages/mgmt/SubRoomType";
import EditRoom from "../../../../pages/mgmt/EditRoom";
import RoomDetails from "../../../../pages/mgmt/RoomDetails";
import StaffMgmt from "../../../../pages/mgmt/StaffMgmt";
import AddStaff from "../../../../pages/mgmt/AddStaff";

const AdminPropRoute = () => {
	let { path } = useRouteMatch();
	const PROPERTY_NAME = localStorage.getItem("property-name");

	return (
		<Switch>
			{/*ADMIN-PROPERTY INDEX*/}
			<Route path="/admin-property" component={PropertyStatus} exact />

			{/*ADMIN-PROPERTY PROPERTY-STATUS AND ADD-NEW PROPERTY LINK*/}
			<Route
				path="/admin-property/pending"
				component={AdminPropPending}
				exact
			/>
			<Route
				path="/admin-property/pending"
				component={AdminPropPending}
				exact
			/>
			<Route
				path="/admin-property/rejected"
				component={AdminPropRejected}
				exact
			/>
			<Route
				path="/admin-property/verified"
				component={AdminPropVerified}
				exact
			/>
			<Route
				path="/admin-property/blocked"
				component={AdminPropBlocked}
				exact
			/>
			<Route
				path="/admin-property/deactivated"
				component={AdminPropDeactivated}
				exact
			/>
			<Route
				path="/admin-property/reported"
				component={AdminPropReported}
				exact
			/>
			<Route
				path="/admin-property/commission"
				component={AdminCommission}
				exact
			/>

			{/*ADMIN-PROPERTY REGISTER NEW PROPERTY*/}
			<Route
				path="/admin-property/register"
				component={AdminRegisterProp}
				exact
			/>

			{/*ADMIN-PROPERTY ADD NEW PROPERTY DETAIL*/}
			<Route
				path="/admin-property/add/contact"
				component={AdminAddpropContact}
				exact
			/>

			<Route
				path="/admin-property/add/basic-info"
				component={AdminAddpropBasicInfo}
				exact={true}
			/>

			<Route
				path="/admin-property/add/amenities"
				component={AdminAddpropAmenities}
				exact={true}
			/>
			<Route
				path="/admin-property/add/photos"
				component={AdminAddpropPhotos}
				exact={true}
			/>
			<Route
				path="/admin-property/add/roomtype"
				component={AdminAddpropRoomtype}
				exact={true}
			/>
			<Route
				path="/admin-property/add/policies"
				component={AdminAddpropPolicies}
				exact={true}
			/>
			<Route
				path="/admin-property/add/documents"
				component={AdminAddpropDocuments}
				exact={true}
			/>
			<Route
				path="/admin-property/add/bank-details"
				component={AdminAddpropBankinfo}
				exact={true}
			/>
			<Route
				path="/admin-property/add/legal-info"
				component={AdminAddpropLegalInfo}
				exact={true}
			/>

			{/*ADMIN-PROPERTY DASHBOARD*/}
			<Route
				path="/admin-property/mgmt/landing"
				component={AdminPropEditDashLanding}
			/>
			<Route
				path="/admin-property/mgmt/bookings"
				component={AdmiPropEditBooking}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/room-list"
				component={AdminPropEditRoomList}
				exact={true}
			/>

			<Route
				path="/admin-property/mgmt/room-mgmt"
				component={AdminPropRoomMgmt}
			/>

			<RoutePropMgmt
				path="/admin-property/mgmt/room-details/:id"
				component={RoomDetails}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Room Detail" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--roomdetail"
			/>
			<RoutePropMgmt
				path="/admin-property/mgmt/add-room/:id"
				component={AddRoom}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Add Room" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--addroom"
			/>
			<RoutePropMgmt
				path="/admin-property/mgmt/subroom-type/:id"
				component={SubRoomType}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Sub Room Type" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--subroomtype"
			/>
			<RoutePropMgmt
				path="/admin-property/mgmt/edit-room/:id"
				component={EditRoom}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Edit Room" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--subroomtype"
			/>

			<RoutePropMgmt
				path="/admin-property/mgmt/add-staff"
				component={AddStaff}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Add Staff" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--addstaff"
			/>
			<RoutePropMgmt
				path="/admin-property/mgmt/order-history"
				component={OrdersMgmt}
				exact={true}
				breadCrumb={[
					{ to: "/admin-dashboard", title: "Dashboard" },
					{ to: "/admin-property", title: "Property" },
					{ to: "", title: "Food Order History" },
				]}
				sectionTitle={PROPERTY_NAME}
				className="admin-prop-mgmt--foodorderhistory"
			/>
			<Route
				path="/admin-property/mgmt/propmgmt"
				component={AdminPropEditProperty}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/photos"
				component={AdminPropEdittPhotos}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/rage-management"
				component={AdminPropEditRate}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/calendar"
				component={AdminPropEditCalendar}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/facilities"
				component={AdminPropEdittFacilities}
				exact={true}
			/>

			<Route
				path="/admin-property/mgmt/staff-management"
				component={AdminPropEditStaff}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/guest-walkin"
				component={AdminGuestWalkin}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/food"
				component={AdminFoodMgmt}
				exact={true}
			/>
			<Route
				path="/admin-property/mgmt/finance"
				component={AdminFinanceMgmt}
				exact={true}
			/>

			{/*ADMIN-PROPERTY DETAIL*/}
			<AdminPropDetailRoute
				path="/admin-property/dashboard/:id"
				component={AdminPropDashboard}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/basic-info/:id"
				component={AdminPropDetailBasicInfo}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/contact/:id"
				component={AdminPropDetailContact}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/amenities/:id"
				component={AdminPropDetailAmenities}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/room-type/:id"
				component={AdminPropDetailRoomType}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/photos/:id"
				component={AdminPropDetailPhotos}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/policy/:id"
				component={AdminPropDetailPolicy}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/bank/:id"
				component={AdminPropDetailBank}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/legal-info/:id"
				component={AdminPropDetailLegalInfo}
			/>
			<AdminPropDetailRoute
				path="/admin-property/detail/documents/:id"
				component={AdminPropDetailDocuments}
			/>

			<AdminPropDetailRoute
				path="/admin-property/reconcilation/:propertyName/:id"
				component={AdminPropReconcilation}
			/>
		</Switch>
	);
};

export default AdminPropRoute;
