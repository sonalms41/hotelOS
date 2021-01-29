import React from "react";

import { CardPrimary, ButtonPrimary, CardSecondary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";
import IconFeatherInfo from "./../../../../assets/images/icon/icon-feather-info.svg";

const PropertyDetailRoomType = (props) => {
	return (
		<section className="section section-property property-detail">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">
						Hotel Sangirla Hotel Pvt. Ltd.
					</h2>
					<ul className="section__navigate">
						<li>Dashboard</li>
						<li>Property</li>
						<li>Verified Property</li>
						<li className="active">Hotel Sangirla Hotel Pvt. Ltd.</li>
					</ul>
				</div>
			</div>
			<div className="section-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<VerifiedPropNav />
					</div>
					<div className="col-item col-item--lg-9">
						<CardPrimary>
							<div className="property-detail__item">
								<div className="detail-item__header">
									<h2 className="info-title heading-secondary">Room Type</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="room-type">
										<div className="col-wrapper">
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-3">
												<CardSecondary>
													<div className="room-type__title">
														<p>Double</p>
														<img src={IconFeatherInfo} alt="Room type" />
													</div>
													<div className="room-type__info">
														<p>No of staty people</p>
														<span>1</span>
													</div>
												</CardSecondary>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardPrimary>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PropertyDetailRoomType;
