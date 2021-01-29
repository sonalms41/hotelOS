import React from "react";

export const AdminToggleSwitch = (props) => {
	const {
		id,
		inputClassName,
		labelClassName,
		checked,
		onClick,
		onPress,
		name,
		onChange,
		value,
	} = props;
	return (
		<div className="admin-toggle-switch">
			<input
				type="checkbox"
				className={`admin-toggle-switch__checkbox ${inputClassName}}`}
				id={id}
				checked={checked}
				name={name}
				onChange={onChange}
			/>
			<label
				htmlFor={id}
				className={`admin-toggle-switch__label ${labelClassName} `}
				onClick={onClick}
			></label>
		</div>
	);
};

export default AdminToggleSwitch;
