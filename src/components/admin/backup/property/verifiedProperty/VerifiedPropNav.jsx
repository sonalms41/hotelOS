import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CardPrimary } from "../../../utility";

const PropertyDetaiNav = () => {
	const [activeNav, setActiveNav] = useState(true);
	const handleActiveNav = (e) => {
		e.preventDefault();
		setActiveNav(true);
	};
	return (
		<>
			<ul className="property-detail__nav">
				<CardPrimary>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/basic_info">
							Basic Info
						</NavLink>
					</li>
					<li className={`prop-nav-item`}>
						<NavLink to="/property/verified_property/property/contact">
							Contacts{" "}
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/amenities">
							Amenities
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/room_type">
							Room Type
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/photos">
							Photos
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/policy">
							Policy
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/bank">
							Bank Detail
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/legal_info">
							Legal Info
						</NavLink>
					</li>
					<li className="prop-nav-item">
						<NavLink to="/property/verified_property/property/documents">
							Documents
						</NavLink>
					</li>
				</CardPrimary>
			</ul>
		</>
	);
};

export default PropertyDetaiNav;
