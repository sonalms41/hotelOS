import React from "react";
import { CardPrimary, ButtonPrimary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";

const PropertyDetailBasicInfo = (props) => {
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
						<div className="property-detail__item">
							<CardPrimary>
								<div className="detail-item__header">
									<h2 className="info-title heading-secondary">Basic Info</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="detail-info">
										<div className="detail-info__row detail-info__row--1">
											<div className="col-wrapper ">
												<div className="col-item col-item--lg-2">
													<div className="detail-info__img"></div>
												</div>
												<div className="col-item col-item--lg-4">
													<div className="detail-info__txt">
														<h3 className="property-title heading-tertiary">
															Sangrila Hotel Pvt. Ltd
														</h3>
														<p className="property-address">
															Lazimpat, Kathmandu, Nepal 44600
														</p>
													</div>
												</div>
											</div>
										</div>
										<div className="detail-info__row detail-info__row--2">
											<ul className="detail-info__list col-wrapper">
												<li className="list-primary">
													<span className="list-primary__left">Hotel Type</span>
													<span className="list-primary__right">3 Star</span>
												</li>
												<li className="list-primary">
													<span className="list-primary__left">Hotel Type</span>
													<span className="list-primary__right">3 Star</span>
												</li>
												<li className="list-primary">
													<span className="list-primary__left">Hotel Type</span>
													<span className="list-primary__right">3 Star</span>
												</li>
												<li className="list-primary">
													<span className="list-primary__left">Hotel Type</span>
													<span className="list-primary__right">3 Star</span>
												</li>
												<li className="list-primary">
													<span className="list-primary__left">Hotel Type</span>
													<span className="list-primary__right">3 Star</span>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</CardPrimary>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default PropertyDetailBasicInfo;
