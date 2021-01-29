import React from "react";

// ADMIN BUTTON-PRIMARY
export const AdminButtonPrimary = React.memo((props) => {
	const { title, id, onClick, type } = props;
	return (
		<button
			type={type}
			onClick={onClick}
			className="admin-btn admin-btn--primary"
		>
			{title}
		</button>
	);
});

// ADMIN BUTTON-SECONDARY
export const AdminButtonSecondary = (props) => {
	const { title, id, onClick, type } = props;
	return (
		<>
			<button
				type={type}
				onClick={onClick}
				className="admin-btn admin-btn--secondary"
			>
				{title}
			</button>
		</>
	);
};
