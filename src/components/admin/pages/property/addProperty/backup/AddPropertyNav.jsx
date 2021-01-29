import React from "react";
import { NavLink } from "react-router-dom";

const AddPropertyNav = () => {
	return (
		<div className="admin-addprop__nav-list">
			<li>
				<NavLink to="/property/admin-add-prop/">Basic Info </NavLink>
				<NavLink to="/property/admin-add-prop/contact">Contact </NavLink>
				<NavLink to="/property/admin-add-prop/amenities">
					Amenities/Facilities
				</NavLink>
				<NavLink to="/property/admin-add-prop/roomtype">Room Type </NavLink>
				<NavLink to="/property/admin-add-prop/photos">Photos</NavLink>
				<NavLink to="/property/admin-add-prop/policies">Policies</NavLink>
				<NavLink to="/property/admin-add-prop/documents">Documents</NavLink>
			</li>
		</div>
	);
};

export default AddPropertyNav;
