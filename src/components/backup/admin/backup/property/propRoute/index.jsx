import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import PropertyDashboard from "..";
import PropertyLayout from "../propHoc/PropertyLayout";

import VerifiedProperty from "../verifiedProperty";
import VerifiedPropBasicInfo from "../verifiedProperty/VerifiedPropBasicInfo";
import VerifiedPropContacts from "../verifiedProperty/VerifiedPropContacts";
import VerifiedPropAmenities from "../verifiedProperty/VerifiedPropAmenities";
import VerifiedPropRoomType from "../verifiedProperty/VerifiedPropRoomType";
import VerifiedPropPhotos from "../verifiedProperty/VerifiedPropPhotos";
import VerifiedPropPolicy from "../verifiedProperty/VerifiedPropPolicy";
import VerifiedPropBank from "../verifiedProperty/VerifiedPropBank";
import VerifiedPropLegalInfo from "../verifiedProperty/VerifiedPropLegalInfo";
import VerifiedPropDocuments from "../verifiedProperty/VerifiedPropDocuments";

import AddProperty from "../addProperty";

const PropRoute = () => {
	return (
		<PropertyLayout>
			<Switch>
				<Route path="/property" component={PropertyDashboard} exact />
				<Route
					path="/property/verified_property"
					component={VerifiedProperty}
					exact
				/>
				<Route
					path="/property/verified_property/property/basic_info"
					component={VerifiedPropBasicInfo}
					exact
				/>
				<Route
					path="/property/verified_property/property/contact"
					component={VerifiedPropContacts}
					exact
				/>
				<Route
					path="/property/verified_property/property/amenities"
					component={VerifiedPropAmenities}
					exact
				/>
				<Route
					path="/property/verified_property/property/room_type"
					component={VerifiedPropRoomType}
					exact
				/>
				<Route
					path="/property/verified_property/property/photos"
					component={VerifiedPropPhotos}
					exact
				/>
				<Route
					path="/property/verified_property/property/policy"
					component={VerifiedPropPolicy}
					exact
				/>
				<Route
					path="/property/verified_property/property/bank"
					component={VerifiedPropBank}
					exact
				/>
				<Route
					path="/property/verified_property/property/legal_info"
					component={VerifiedPropLegalInfo}
					exact
				/>
				<Route
					path="/property/verified_property/property/documents"
					component={VerifiedPropDocuments}
					exact
				/>
				<Route path="/property/add_property" component={AddProperty} exact />
			</Switch>
		</PropertyLayout>
	);
};

export default PropRoute;
