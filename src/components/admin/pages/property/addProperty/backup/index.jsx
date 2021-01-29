import React from "react";
import Registration from "./../../../../pages/Registration";
import Login from "./../../../../pages/Login";
import { Link } from "react-router-dom";
const AddProperty = () => {
	return (
		<div className="admin-hotel-register">
			<Registration />
			<Link to="/property/entry/property_detail">Entry Property detail</Link>
		</div>
	);
};

export default AddProperty;
