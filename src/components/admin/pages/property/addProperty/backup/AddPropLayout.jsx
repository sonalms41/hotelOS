import React from "react";
import AddPropertyNav from "./AddPropertyNav";

const AddPropLayout = (props) => {
	return (
		<div className="admin-add-prop">
			<div className="admin-add-prop__nav">
				<AddPropertyNav />
			</div>
			<div className="admin-add-prop__content">
				add property layout{props.children}
			</div>
		</div>
	);
};

export default AddPropLayout;
