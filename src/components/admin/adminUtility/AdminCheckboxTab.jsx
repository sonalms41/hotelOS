import React from "react";

const AdminCheckboxTab = (props) => {
	const {
		id,
		title,
		name,
		labelClassName,
		inputClassName,
		onClick,
		checked,
	} = props;
	return (
		<div className="admin-checkbox-tab">
			<input
				type="checkbox"
				id={id}
				name={name}
				className={`admin-checkbox-tab__checkbox ${inputClassName}`}
				checked={checked}
				//defaultChecked={checked}
			/>
			<label
				htmlFor={id}
				onClick={onclick}
				className={`admin-checkbox-tab__label ${labelClassName}`}
			>
				{title}
			</label>
		</div>
	);
};

export default AdminCheckboxTab;
