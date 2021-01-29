import React from "react";
import { NavLink } from "react-router-dom";
const AdminMasterNav = () => {
	return (
		<ul className="admin-master-nav">
			<li>
				<NavLink to="/admin-master/occupancy"> Occupancy</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/room-views"> Room Views</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/hotel-property"> Property Type</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/board-type"> Boared Type</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/ages-def">Meal Ages Different Type</NavLink>
			</li>

			<li>
				<NavLink to="/admin-master/payment"> Payment</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/language"> Language</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/bed-type"> Bed Type</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/market"> Market</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/phototags"> Photo Tags</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/foodmgmt"> Food Management</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/commission"> Commission</NavLink>
			</li>
			<li>
				<NavLink to="/admin-master/roomConfig"> Room Configuration</NavLink>
			</li>
		</ul>
	);
};

export default AdminMasterNav;
