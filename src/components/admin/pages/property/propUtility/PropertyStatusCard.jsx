import React from "react";
import iconPropPath from "./../../../../../assets/images/icon/icon-prop-path.svg"
import { Link } from "react-router-dom";
const PropertyStatusCard = (props) => {
	const {
		propertyNumber,
		propertyType,
		bgColor,
		propertyStatus,
		index,
	} = props;
	return (
		<div className="col-item col-item--lg-4" key={`property-status-${index}`}>
			<Link
				to={
					propertyStatus == "Pending"
						? "/admin-property/pending"
						: propertyStatus == "Verified"
						? "/admin-property/verified"
						: propertyStatus == "Rejected"
						? "/admin-property/rejected"
						: propertyStatus == "Blocked"
						? "/admin-property/blocked"
						: propertyStatus == "Reported"
						? "/admin-property/reported"
						: propertyStatus == "Deactivated"
						? "/admin-property/deactivated"
						: ""
				}
			>
				<div
					className="property-status-card"
					style={{
						backgroundColor: `${
							propertyStatus == "Verified"
								? "#4db95f"
								: propertyStatus == "Pending"
								? "#5664d2"
								: propertyStatus == "Rejected"
								? "#eb6060"
								: propertyStatus == "Deactivated"
								? "#d29d21"
								: propertyStatus == "Blocked"
								? "#56acd2"
								: propertyStatus == "Reported"
								? "#d29856"
								: ""
						}`,
					}}
				>
					<div className="property-status-card__col-1">
						<img src={iconPropPath} alt="Proerty" />
					</div>
					<div className="property-status-card__col-2">
						<h2 className="property-number heading-secondary">
							{propertyNumber}
						</h2>
						<p className="property-type">{`${propertyStatus} Property`}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default PropertyStatusCard;
