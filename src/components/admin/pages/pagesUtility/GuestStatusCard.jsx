import React from "react";
import IconGuestStatus from "./../../../../assets/images/icon/icon-guest-status.svg";
import { Link } from "react-router-dom";
const AdminGuestStatusCard = (props) => {
	const { noOfGuest, guestStatus, index } = props;
	return (
		<div className="col-item col-item--lg-4" key={`property-status-${index}`}>
			<Link
				to={
					guestStatus === "Pending"
						? "/admin-guest/pending"
						: guestStatus === "Verified"
						? "/admin-guest/verified"
						: guestStatus === "Rejected"
						? "/admin-guest/rejected"
						: guestStatus === "Blocked"
						? "/admin-guest/blocked"
						: guestStatus === "Reported"
						? "/admin-guest/reported"
						: guestStatus === "Deactivated"
						? "/admin-guest/deactivated"
						: ""
				}
			>
				<div
					className="status-card"
					style={{
						backgroundColor: `${
							guestStatus === "Verified"
								? "#4db95f"
								: guestStatus === "Pending"
								? "#5664d2"
								: guestStatus === "Rejected"
								? "#eb6060"
								: guestStatus === "Deactivated"
								? "#d29d21"
								: guestStatus === "Blocked"
								? "#EB6060"
								: guestStatus === "Reported"
								? "#d29856"
								: ""
						}`,
					}}
				>
					<div className="status-card__col-1">
						<img src={IconGuestStatus} alt="Proerty" />
					</div>
					<div className="status-card__col-2">
						<h2 className="status-number heading-secondary">{noOfGuest}</h2>
						<p className="status-title">{`${guestStatus} Guests`}</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default AdminGuestStatusCard;
