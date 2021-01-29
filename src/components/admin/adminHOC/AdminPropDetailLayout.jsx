import React from "react";
import AdminNav from "../nav";
import Header from "../header";

const AdminLayout = (props) => {
	return (
		<>
			<Header />
			<main id="page-main">
				<div className="main-content-wrapper">
					<div className="main-content__left">
						<AdminNav />
					</div>

					<div className="main-content__right">{props.children}</div>
				</div>
			</main>
		</>
	);
};

export default AdminLayout;
