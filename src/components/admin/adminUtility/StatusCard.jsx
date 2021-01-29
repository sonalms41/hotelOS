import React from "react";
import IconGuestStatus from "./../../../assets/images/icon/icon-guest-status.svg";
import { Link } from "react-router-dom";
const StatusCard = (props) => {
	const { totalNumber, statusTitle, index, icon } = props;

	return (
		<div className="col-item col-item--lg-4" key={`property-status-${index}`}>
			<div
				className="status-card"
				style={{
					backgroundColor: `${
						statusTitle === "Verified"
							? "#4db95f"
							: statusTitle === "Pending"
							? "#5664d2"
							: statusTitle === "Rejected"
							? "#eb6060"
							: statusTitle === "Deactivated"
							? "#d29d21"
							: statusTitle === "Blocked"
							? "#EB6060"
							: statusTitle === "Reported"
							? "#d29856"
							: ""
					}`,
				}}
			>
				<div className="status-card__col-1">
					{icon ? <img src={icon} alt="Proerty" /> : ""}
				</div>
				<div className="status-card__col-2">
					<h2 className="status-number heading-secondary">{totalNumber}</h2>
					<p className="status-title">{`${statusTitle} Guests`}</p>
				</div>
			</div>
			<Link
				className="anchor-overlay"
				to={
					statusTitle === "Pending"
						? "/admin-guest/pending"
						: statusTitle === "Verified"
						? "/admin-guest/verified"
						: statusTitle === "Rejected"
						? "/admin-guest/rejected"
						: statusTitle === "Blocked"
						? "/admin-guest/blocked"
						: statusTitle === "Reported"
						? "/admin-guest/reported"
						: statusTitle === "Deactivated"
						? "/admin-guest/deactivated"
						: ""
				}
			></Link>
		</div>
	);
};

export default StatusCard;
