import React from "react";
import IconUser from "./../../../../assets/images/icon/icon-user.svg";
import { CardPrimary } from "../../../utility";
import { Link } from "react-router-dom";

const UserCard = (props) => {
	const { userNo, userStatus } = props;
	return (
		<div className="col-item col-item--lg-3">
			<Link to="/user/verified_user">
				<CardPrimary>
					<div className="user-icon">
						<img src={IconUser} alt="User" />
					</div>
					<div className="user-info">
						<h3 className="user-info__no">{userNo}</h3>
						<p className="user-info__status">{userStatus}</p>
					</div>
				</CardPrimary>
			</Link>
		</div>
	);
};

export default UserCard;
