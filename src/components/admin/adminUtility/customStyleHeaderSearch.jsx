const customStyleHeaderSearch = {
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
	}),
	control: (styles) => ({
		...styles,
		backgroundColor: "#1d222e",
		height: "4.5rem",
		borderRadius: 0,
		borderColor: "#1d222e !important",
		boxShadow: "none !important",
		"&:visited": {
			borderColor: "#5664d2 !important",
		},
		"&:focus-within": {
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
				backgroundColor: !isDisabled && (isSelected ? "#252B3B" : "#252B3B"),
			},
			":lastChild": {
				borderBottomWidth: 0,
			},
		};
	},
	input: (styles) => ({
		...styles,
		backgroundColor: "#1d222e",
		borderRadius: 0,
		content: '" "',
		display: "block",
		marginRight: 0,
		color: "#8D8D8D",
		border: "none",
		paddingTop: 0,
		paddingBottom: 0,
		margin: 0,
	}),
	placeholder: (styles) => ({
		...styles,
		backgroundColor: "#1d222e",
		borderRadius: 0,
		content: '" "',
		display: "block",
		marginRight: 0,
		color: "#8D8D8D",
		border: "none",
	}),
	singleValue: (styles, { data }) => ({
		backgroundColor: "#1d222e",
		border: "none",
	}),
};
export default customStyleHeaderSearch;
