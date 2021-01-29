import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CardPrimary } from "../../utility";
import { UserCard } from "./userUtility";
import UserHeader from "./userUtility/UserHeader";

const User = () => {
	const [breadCrumb, setBreadCrumb] = useState(["Dashboard", "User"]);
	return (
		<section className="section section-user">
			<UserHeader title="User" breadCrumb={breadCrumb} />
			<div className="section-body">
				<div className="users-cards">
					<div className="col-wrapper">
						<UserCard userNo="20" userStatus="Verified User" />
						<UserCard userNo="20" userStatus="Verified User" />
						<UserCard userNo="20" userStatus="Verified User" />
					</div>
				</div>
			</div>
		</section>
	);
};

export default User;
