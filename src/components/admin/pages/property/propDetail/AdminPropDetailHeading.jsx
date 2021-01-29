import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const AdminPropDetailHeading = (props) => {
	const { title, propertyId, propertyName, endPoint } = props;
	const [editProperty, setEditProperty] = useState(false);
	const handleEditProperty = () => {
		localStorage.setItem("property-id", propertyId);
		localStorage.setItem("property-name", propertyName);
		setEditProperty(true);
	};
	if (editProperty) {
		return <Redirect to={`/admin-property/mgmt/${endPoint}`} />;
	}

	return (
		<div className="detail-item__header">
			<h2 className="info-title heading-secondary">{title}</h2>
			<button
				className="admin-btn admin-btn--primary"
				onClick={() => handleEditProperty()}
			>
				Edit
			</button>
		</div>
	);
};

export default AdminPropDetailHeading;
