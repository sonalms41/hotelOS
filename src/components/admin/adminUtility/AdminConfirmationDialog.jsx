import React, { useState } from "react";

const AdminConfirmationDialog = (props) => {
	const {
		onClickYes,
		onClickNo,
		message,
		className,
		position,
		showDialog,
	} = props;
	const [closeDialog, setCloseDialog] = useState(false);

	return (
		<>
			<div
				className={`admin-confirmation-dialog ${className}`}
				style={{
					top: `${position == "bottom" ? "110%" : ""}`,
					bottom: `${position == "top" ? "110%" : ""}`,
				}}
			>
				<div className="confirmation-dialog-message">
					<p>{message}</p>
				</div>
				<div className="confirmation-action-btns">
					<button className="confirmation-action-yes" onClick={onClickYes}>
						Yes
					</button>
					<button className="confirmation-action-no" onClick={onClickNo}>
						No
					</button>
				</div>
			</div>
		</>
	);
};

export default AdminConfirmationDialog;
