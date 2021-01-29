import React from "react";
import IconPropPath from "./../../../../assets/images/icon/icon-prop-path.svg";
import { Link } from "react-router-dom";
const PropertyCard = (props) => {
	const { propertyNumber, propertyType, bgColor } = props;
	return (
		<div className="col-item col-item--lg-4">
			<Link to="/property/verified_property">
				<div className="property-card" style={{ backgroundColor: "#4DB95F" }}>
					<div className="property-card__col-1">
						<img src={IconPropPath} alt="Proerty" />
					</div>
					<div className="property-card__col-2">
						<h2 className="property-number heading-secondary">
							{propertyNumber}
						</h2>
						<p className="property-type">{propertyType}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default PropertyCard;
