import React, { useCallback } from "react";
import Select from "react-select";
import customStyleAdminSelect from "./customStyleAdminSelect";

// INPUT
export const AdminFormInput = React.memo((props) => {
	const {
		label,
		htmlFor,
		name,
		placeholder,
		value,
		onChange,
		onBlur,
		id,
		type,
		errors,
	} = props;

	return (
		<>
			<div className="admin-form__group">
				<label htmlFor={htmlFor} className="admin-form__label">
					{label}
				</label>
				<input
					className="admin-form__input"
					type={type}
					id={id}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
					onBlur={onBlur}
					autoComplete="off"
				/>
				{errors ? <div className="admi-form__error">{errors}</div> : ""}
			</div>
		</>
	);
});

// SELECT
export const AdminFormSelectCustom = (props) => {
	const { label, options, name, value, onChange, onBlur, id } = props;
	console.log("options:", options);
	return (
		<div className="admin-form__group">
			<label htmlFor={id} className="admin-form__label">
				{label}
			</label>
			<Select
				id={id}
				options={options}
				multi={true}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				className="select-adminmaster"
				classNamePrefix="select-adminmaster"
				styles={customStyleAdminSelect}
				name={name}
				//menuIsOpen={true}
			/>
		</div>
	);
};

// BOOTSTRAP SELECT
export const AdminFormSelectNormal = (props) => {
	const {
		options,
		label,
		name,
		value,
		onChange,
		onBlur,
		id,
		placeholder,
		errors,
	} = props;
	return (
		<div className="admin-form__group">
			<label htmlFor={id} className="admin-form__label">
				{label}
			</label>
			<select
				className="admin-form__select"
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				autoComplete="off"
			>
				<option defaultValue={placeholder}>{placeholder}</option>
				{options
					? options.map((option, i) => {
							return (
								<option key={`option-key${i}`} value={id ? id : option}>
									{option}
								</option>
							);
					  })
					: "loading"}
			</select>
			{errors ? <div className="admi-form__error">{errors}</div> : ""}
		</div>
	);
};

// TEXTARE
export const AdminFormTextarea = (props) => {
	const {
		label,
		htmlFor,
		name,
		placeholder,
		value,
		onChange,
		onBlur,
		id,
		type,
		errors,
	} = props;
	return (
		<div className="admin-form__group">
			<label className="admin-form__label" htmlFor={htmlFor}>
				{label}
			</label>
			<textarea
				className="admin-form__textarea"
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
			/>
			{errors ? <div className="admi-form__error">{errors}</div> : ""}
		</div>
	);
};
