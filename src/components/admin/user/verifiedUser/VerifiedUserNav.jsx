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
				<CardPrimary></CardPrimary>
			</ul>
		</>
	);
};

export default PropertyDetaiNav;
