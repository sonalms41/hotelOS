import React from "react";
import { Link } from "react-router-dom";
import { CardPrimary } from "../../../utility";

const VerifiedPropDetaiNav = () => {
	return (
		<>
			<ul className="property-detail__nav">
				<CardPrimary>
					<li className="prop-nav-item active">
						<Link to="/property_detail">Basic Info</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_contacts">Contacts </Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_amenities">Amenities</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_roomtype">Room Type</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_photos">Photos</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_policy">Policy</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_bank">Bank Detail</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_legalinfo">Legal Info</Link>
					</li>
					<li className="prop-nav-item">
						<Link to="/property_detail_documents">Documents</Link>
					</li>
				</CardPrimary>
			</ul>
		</>
	);
};

export default VerifiedPropDetaiNav;
