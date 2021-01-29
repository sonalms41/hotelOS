import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AdminCardPrimary } from "../adminUtility";

const AdminPropDetailNav = () => {
	const [activeNav, setActiveNav] = useState(true);
	const handleActiveNav = (e) => {
		e.preventDefault();
		setActiveNav(true);
	};

	// Get product id from url end point
	const propertyId = window.location.href.split("/").reverse()[0];
	return (
		<>
			<ul className="property-detail__nav"> 
				<AdminCardPrimary>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/basic-info/${propertyId}`}>
							Basic Info
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/contact/${propertyId}`}>
							Contacts
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/amenities/${propertyId}`}>
							Amenities
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/room-type/${propertyId}`}>
							Room Type
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/photos/${propertyId}`}>
							Photos
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/policy/${propertyId}`}>
							Policy
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/bank/${propertyId}`}>
							Bank Detail
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/legal-info/${propertyId}`}>
							Legal Info
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to={`/admin-property/detail/documents/${propertyId}`}>
							Documents
						</NavLink>
					</li>
				</AdminCardPrimary>
			</ul>
		</>
	);
};

export default AdminPropDetailNav;
