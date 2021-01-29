import React from "react";

const AdminCardPrimary = (props) => {
	const { key } = props;
	return (
		<div key={key} className="card-primary">
			{props.children}
		</div>
	);
};

export default AdminCardPrimary;
