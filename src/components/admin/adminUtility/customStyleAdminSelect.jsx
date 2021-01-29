const customStyleAdminSelect = {
	menu: (provided, state) => ({
		...provided,
		color: state.selectProps.menuColor,
		backgroundColor: "#252b3b",
		borderRadius: 0,
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: "#31394E",
		padding: 0,
		marginTop: "1rem",
		zIndex: 60000,
		position: "absolute",
		zIndex: "80000 !important",
	}),
	control: (styles) => ({
		...styles,
		backgroundColor: "#1d222e",
		height: "4.5rem",
		borderRadius: 0,
		borderColor: "#1d222e !important",
		boxShadow: "none !important",
		borderColor: "#31394e",
		backgroundColor: "#2b3244",
		"&:visited": {
			borderColor: "#5664d2 !important",
		},
		"&:focus-within": {
			borderColor: "#5664d2 !important",
		},
		"&:hover": {
			borderColor: "#5664d2 !important",
		},
	}),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		return {
			...styles,
			backgroundColor: isDisabled ? null : "#252b3b",
			color: isDisabled ? "#dc3545" : isSelected ? "#eeeeee" : "#eeeeee",
			cursor: isDisabled ? "not-allowed" : "pointer",

			":active": {
				...styles[":active"],
				backgroundColor: !isDisabled && (isSelected ? "#5664d2" : "#5664d2"),
			},
			":hover": {
				...styles[":hover"],
				backgroundColor: !isDisabled && (isSelected ? "#5664d2" : "#5664d2"),
			},
			":lastChild": {
				borderBottomWidth: 0,
			},
		};
	},
	input: (styles) => ({
		...styles,
		backgroundColor: "#2b3244",
		borderRadius: 0,
		content: '" "',
		display: "block",
		marginRight: 0,
		color: "#8D8D8D",
		border: "none",
		paddingTop: 0,
		paddingBottom: 0,
		margin: 0,
		height: "2rem",
		marginTop: "2rem",
		borderColor: "#31394e",
		backgroundColor: "#2b3244",
	}),
	placeholder: (styles) => ({
		...styles,
		backgroundColor: "#2b3244",
		borderRadius: 0,
		content: '" "',
		display: "block",
		marginRight: 0,
		color: "#919ba3",
		border: "none",
		height: "2rem",
		marginTop: "1rem",
		opacity: 0.3,
	}),
	singleValue: (styles, { data }) => ({
		backgroundColor: "#2b3244",
		border: "none",
	}),
};
export default customStyleAdminSelect;
