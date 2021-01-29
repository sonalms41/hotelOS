import React from "react";
import IconUser from "./../../../../assets/images/icon/icon-user.svg";
import { CardPrimary } from "../../../utility";

const UserCard = (props) => {
	const { userNo, userStatus } = props;
	return (
		<div className="col-item col-item--lg-3">
			<CardPrimary>
				<div className="user-icon">
					<img src={IconUser} alt="User" />
				</div>
				<div className="user-info">
					<h3 className="user-info__no">{userNo}</h3>
					<p className="user-info__status">{userStatus}</p>
				</div>
			</CardPrimary>
		</div>
	);
};

export default UserCard;
