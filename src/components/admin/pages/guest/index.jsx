import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminSectionHeader } from "../../adminUtility";
import iconVerifiedGuest from "./../../../../assets/images/icon/icon-guest-status.svg";

import StatusCard from "../../adminUtility/StatusCard";
import { adminGuestServices } from "../../adminServices/guests";
import CustomSpinner from "../../../CustomSpinner";
const AdminGuest = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [verifiedGuests, setVerifiedGuests] = useState([]);
	const [blockedGuests, setBlockedGuests] = useState([]);
	const [reportedGuests, setReportedGuests] = useState([]);

	const breadCrumb = [
		{ to: "/admin-dashboard", title: "Dashboard" },
		{
			to: "",
			title: "Property Dashboard",
		},
	];
	// Get Verified guests
	useEffect(() => {
		setIsLoading(true);
		adminGuestServices.GET.guestsByStatus("Verified")
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					setVerifiedGuests(data.result);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				console.error(errors);
				setIsLoading(false);
			});
	}, []);

	// Get Reported-guests
	useEffect(() => {
		adminGuestServices.GET.guestsByStatus("Reported")
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					setReportedGuests(data.result);
				}
			})
			.catch((errors) => {
				console.error(errors);
			});
		setIsLoading(false);
	}, []);

	// Get Blocked-guests
	useEffect(() => {
		adminGuestServices.GET.guestsByStatus("Blocked")
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					setBlockedGuests(data.result);
				}
			})
			.catch((errors) => {
				console.error(errors);
			});
		setIsLoading(false);
	}, []);
	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<section className="admin-guest section section--guests">
				<AdminSectionHeader breadCrumb={breadCrumb} sectionTitle="Guests" />
				<div className="section-body">
					<div className="col-wrapper status-cards-wrapper">
						<StatusCard
							totalNumber={
								verifiedGuests ? verifiedGuests.length : "loading..."
							}
							statusTitle="Verified"
							icon={iconVerifiedGuest}
						/>
						<StatusCard
							totalNumber={
								reportedGuests ? reportedGuests.length : "loading..."
							}
							statusTitle="Reported"
							icon={iconVerifiedGuest}
						/>
						<StatusCard
							totalNumber={blockedGuests ? blockedGuests.length : "loading..."}
							statusTitle="Blocked"
							icon={iconVerifiedGuest}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminGuest;
