import React from "react";
import { AdminSectionHeader } from "../adminUtility";
import { Link } from "react-router-dom";
import AdminGuestProfileNav from "../nav/AdminGuestProfileNav";
import IconId from "./../../../assets/images/icon/icon-id.svg";

const AdminGuestProfileLayout = (props) => {
	const { userStatus } = props;
	return (
		<div className="admin-guest admin-guest--profile">
			<AdminSectionHeader
				sectionTitle="Guest Profile"
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
						to: `/admin-guest/${userStatus}`,
						title: `${userStatus} Guests`,
					},
					{
						to: "/admin-guest/analytics",
						title: "User Analytics",
					},
					{
						to: "/admin-guest/profile",
						title: "User Profile",
					},
				]}
			/>
			<div className="section-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3 ">
						<div className="card-primary basic-info">
							<div className="col-wrapper row-1">
								<div className="col-item col-item--lg-3 ">
									<div className="profile-photo"></div>
								</div>
								<div className="col-item col-item--lg-9 profile-info ">
									<h3>Anuradh Gupta</h3>
									<p>
										<span>Kathmandu, 02356</span>
										<span> +977 123456789 | abcd@gmail.com</span>
									</p>
									<p>
										#01 <img src={IconId} alt="id" />
									</p>
								</div>
							</div>
							<div className="col-wrapper row-2">
								<div className="col-item col-item--lg-4 flex-v-ac-jc">
									<span>2</span>
									<span>Total Booking</span>
								</div>
								<div className="col-item col-item--lg-4 flex-v-ac-jc">
									<span>7</span>
									<span>Total Cancelled</span>
								</div>
								<div className="col-item col-item--lg-4 flex-v-ac-jc">
									<span>125</span>
									<span>Total Views</span>
								</div>
							</div>
							<div className="col-wrapper row-3 text-center">
								<strong>NRS 5,250</strong>
								<p>Total Billing</p>
							</div>
						</div>
					</div>
					<div className="col-item col-item--lg-9 c admin-guest-profile__detail">
						<AdminGuestProfileNav />

						<div className="guest-details">{props.children}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminGuestProfileLayout;
