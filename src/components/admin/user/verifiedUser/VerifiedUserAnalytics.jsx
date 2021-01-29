import React, { useState } from "react";

// ICON
import IconSearch from "./../../../../assets/images/icon/icon-search.svg";
import IconId from "./../../../../assets/images/icon/icon-id.svg";
import { CardPrimary } from "../../../utility";
import { Link } from "react-router-dom";

const VerifiedUserAnalytics = () => {
	return (
		<section className="section section-users verified-users">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">Verified User</h2>
					<ul className="section__navigate">
						<li>Dashboard</li>
						<li>Users</li>
						<li>Verified Users</li>
						<li className="active">User Analytics</li>
					</ul>
				</div>
			</div>
			<div className="section-body">
				<div className="user-analytics">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-4">
							<CardPrimary>
								<div className="user-img"></div>
								<div className="user-info">
									<h3 className="user-info__name">Puspa gurung</h3>
									<p className="user-info__address">
										Koteshwor, Kathmandu Nepal
									</p>
									<p className="user-info__pe">
										<span>023 456</span>
										<span> useremail@gmail.com</span>
									</p>
									<p className="user-info__id">
										#12354 <img src={IconId} alt="User id" />
									</p>
									<div className="user-info__view-prof">
										<Link> View Profile</Link>
									</div>
								</div>
							</CardPrimary>
						</div>

						<div className="col-item col-item--lg-4"></div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VerifiedUserAnalytics;
