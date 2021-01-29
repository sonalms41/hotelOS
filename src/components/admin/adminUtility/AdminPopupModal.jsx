import React from "react";

const AdminPopupModal = (props) => {
	const { closeModal, showModal, className, closeBtnText } = props;
	return (
		<>
			{showModal && (
				<div className={`admin-modal ${className ? className : ""}`}>
					<div className="admin-modal__wrapper">
						<div className="close-modal" onClick={closeModal}>
							{closeBtnText ? closeBtnText : "X"}
						</div>
						{props.children}
					</div>
				</div>
			)}
		</>
	);
};

export default AdminPopupModal;
