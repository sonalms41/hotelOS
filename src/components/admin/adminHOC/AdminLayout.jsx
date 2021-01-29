import React, { useContext } from "react";
import AdminNav from "./../nav/AdminNav";
import Header from "./../header";
import { ToggleAdminNavbarContext } from "./../contextApi";

const AdminLayout = (props) => {
	const { showNavBar, toggleShowNavbar } = useContext(ToggleAdminNavbarContext);

	return (
		<>
			<Header />
			<main id="admin-page-main">
				<div className="admin-page-main-wrapper">
					<div
						className={`admin-page-main__left ${
							showNavBar ? "visible-adminnav" : "hidden-adminnav"
						} `}
					>
						<AdminNav />
					</div>

					<div
						className={`admin-page-main__right ${
							showNavBar ? "visible-adminnav" : "hidden-adminnav"
						} `}
					>
						{props.children}
					</div>
				</div>
			</main>
		</>
	);
};

export default AdminLayout;
