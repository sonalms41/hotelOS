import React, { useState, useEffect } from "react";
import { AdminSectionHeader } from "./../../adminUtility";
import { useParams } from "react-router-dom";
import IconId from "./../../../../assets/images/icon/icon-id.svg";
import { Link } from "react-router-dom";
import { adminGuestServices } from "../../adminServices/guests";
import CustomSpinner from "../../../CustomSpinner";
const AdminGuestDashboard = () => {
	const GUEST_ID = useParams().id;
	const [isLoading, setIsLoading] = useState(false);

	const [guestDetail, setGuestDetail] = useState(null);
	useEffect(() => {
		setIsLoading(true);
		adminGuestServices.GET.guestDetail(GUEST_ID)
			.then((response) => {
				console.log("guest-detail:", response.data.result);
				const { data } = response;
				if (data.status_code === 200) {
					setGuestDetail(data.result);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				console.error(errors);
				setIsLoading(false);
			});
	}, []);

	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<div className="admin-guest admin-guest-dashboard">
				<AdminSectionHeader
					sectionTitle="Gust Analytics"
					breadCrumb={[
						{
							to: "/admin-dashboard",
							title: "Dashboard",
						},
						{
							to: "/admin-guest",
							title: "Guest",
						},
						{
							to: "/admin-guest/",
							title: "Guest status",
						},
						{
							to: "#",
							title: "Guest Analytics",
						},
					]}
				/>
				<div className="section-body">
					{guestDetail ? (
						<div className="col-wrapper">
							<div className="col-item col-item--lg-3">
								<div className=" info-card-primary">
									<div className="info-card__photo"></div>

									<div className="info-card__detail">
										<h3>
											{guestDetail.user.first_name} {guestDetail.user.last_name}
										</h3>
										<p>
											<span>
												{guestDetail.user.city}, {guestDetail.user.address}
											</span>
											<span> +977 123456789 | abcd@gmail.com (#static)</span>
										</p>
										<p>
											#01 <img src={IconId} alt="id" /> (#static)
										</p>
										<div className="anchor">
											<Link to="/admin-guest/booking-history">
												View Profile
											</Link>
										</div>
									</div>
								</div>
							</div>
							<div className="col-item col-item--lg-3">
								<div className="info-card-secondary">
									<ul className="info-card-lists">
										<li className="info-card-list__item">
											<span>Total Booking</span>
											<span> {guestDetail.booking.user_booking}</span>
										</li>
										<li className="info-card-list__item">
											<span>Views</span>
											<span> {guestDetail.booking.views}</span>
										</li>
									</ul>

									<div className="anchor">
										<Link to="/admin-guest/booking-analytics">
											Go To Analytics
										</Link>
									</div>
								</div>
							</div>
							<div className="col-item col-item--lg-3">
								<div className="info-card-secondary">
									<ul className="info-card-lists">
										<li className="info-card-list__item">
											<span>Total Cancellation</span>
											<span> {guestDetail.cancel_dict.total_cancel}</span>
										</li>
										<li className="info-card-list__item">
											<span>Reason</span>
											<span> {guestDetail.cancel_dict.reason}</span>
										</li>
									</ul>

									<div className="anchor">
										<Link to="/admin-guest/cancellation-analytics">
											Go To Analytics
										</Link>
									</div>
								</div>
							</div>
							<div className="col-item col-item--lg-3">
								<div className="info-card-secondary">
									<ul className="info-card-lists">
										<li className="info-card-list__item">
											<span>Total Views</span>
											<span> {guestDetail.views.total_views}</span>
										</li>
										<li className="info-card-list__item">
											<span>Property Views</span>
											<span> #static</span>
										</li>
									</ul>
									<div className="anchor">
										<Link to="/admin-guest/propertyview">Go To Analytics</Link>
									</div>
								</div>
							</div>
						</div>
					) : (
						"loading..."
					)}
				</div>
			</div>
		</>
	);
};

export default AdminGuestDashboard;
