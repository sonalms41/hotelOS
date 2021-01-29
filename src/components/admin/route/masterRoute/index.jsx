import React from "react";
import { Switch, Route } from "react-router-dom";
import AdminMasterLayout from "../../adminHOC/AdminMasterLayout";

// COMPONENTS
import MasterOccupancy from "../../pages/master/MasterOccupancy";
import MasterPropertyType from "../../pages/master/MasterPropertyType";
import MasterBoardType from "../../pages/master/MasterBoardType";
import MasterMealAgesDef from "../../pages/master/MasterMealAgesDef";
import MasterRoomViews from "../../pages/master/MasterRoomViews";
import MasterPayment from "../../pages/master/MasterPayment";
import MasterLanguage from "../../pages/master/MasterLanguage";
import MasterBedType from "../../pages/master/MasterBedType";
import MasterCommission from "../../pages/master/MasterCommission";
import MasterPhotoTags from "../../pages/master/MasterPhotoTags";
import MasterFoodMgmt from "../../pages/master/MasterFoodMgmt";
import MasterMarket from "../../pages/master/MasterMarket";
import MasterRoomConfig from "../../pages/master/MasterRoomConfig";

const AdminMasterRoute = () => {
	return (
		<>
			<AdminMasterLayout>
				<Switch>
					<Route path="/admin-master" component={MasterOccupancy} exact />
					<Route
						path="/admin-master/occupancy"
						component={MasterOccupancy}
						exact
					/>
					<Route
						path="/admin-master/hotel-property"
						component={MasterPropertyType}
						exact
					/>
					<Route
						path="/admin-master/board-type"
						component={MasterBoardType}
						exact
					/>
					<Route
						path="/admin-master/ages-def"
						component={MasterMealAgesDef}
						exact
					/>
					<Route
						path="/admin-master/room-views"
						component={MasterRoomViews}
						exact
					/>
					<Route path="/admin-master/payment" component={MasterPayment} exact />
					<Route
						path="/admin-master/language"
						component={MasterLanguage}
						exact
					/>
					<Route
						path="/admin-master/bed-type"
						component={MasterBedType}
						exact
					/>
					<Route
						path="/admin-master/foodmgmt"
						component={MasterFoodMgmt}
						exact
					/>
					<Route
						path="/admin-master/phototags"
						component={MasterPhotoTags}
						exact
					/>
					<Route
						path="/admin-master/commission"
						component={MasterCommission}
						exact
					/>
					<Route path="/admin-master/market" component={MasterMarket} exact />
					<Route
						path="/admin-master/roomConfig"
						component={MasterRoomConfig}
						exact
					/>
				</Switch>
			</AdminMasterLayout>
		</>
	);
};

export default AdminMasterRoute;
