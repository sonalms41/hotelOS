import React from "react";
import { Link } from "react-router-dom";
import { CardPrimary } from "../../../utility";

// ICON
import IconId from "./../../../../assets/images/icon/icon-id.svg";
const PropertyCard = (props) => {
	const { title, floor, room, address, type } = props;
	return (
		<div className="col-item col-item--lg-3">
			<div className="verified-propery-card">
				<CardPrimary>
					<div className="card-row">
						<h3 className="verified-property__title heading-tertiary ">
							<Link to="/property/verified_property/property/basic_info">
								{title}
							</Link>
						</h3>
						<p className="verified-property__address">{address}</p>
						<p className="verified-property__id">
							#HT649LT <img src={IconId} alt="Id" />
						</p>
					</div>
					<div className="card-row">
						<div className="col-wrapper">
							<div className="col-item">
								<span className="info-item">{room}</span>
								<p>Room</p>
							</div>
							<div className="col-item">
								<span className="info-item">{floor}</span>
								<p>Floor</p>
							</div>
							<div className="col-item">
								<span className="info-item">{type}</span>
								<p>Type</p>
							</div>
						</div>
					</div>
				</CardPrimary>
			</div>
		</div>
	);
};

export default PropertyCard;
