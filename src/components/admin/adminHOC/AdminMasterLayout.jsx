import React from "react";
import { AdminSectionHeader } from "../adminUtility";
import { Link, NavLink } from "react-router-dom";

const AdminMasterLayout = (props) => {
	const breadCrumb = ["Dashboard", "Master"];
	return (
		<div className="admin-master">
			{/*<AdminSectionHeader breadCrumb={breadCrumb} title="Section Title here" />
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
					<NavLink to="/admin-master/ages-def">
						Meal Ages Different Type
					</NavLink>
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
			</ul>*/}
			<div className="section-body">{props.children}</div>
		</div>
	);
};

export default AdminMasterLayout;
