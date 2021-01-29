import React from "react";

import { CardPrimary, ButtonPrimary, CardSecondary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";

const PropertyDetailLegalInfo = (props) => {
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
									<h2 className="info-title heading-secondary">Legal Info</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="prop-legalinfo">
										<ul className="prop-legalinfo__list">
											<li className="list-primary">
												<span className="list-primary__left">Company Name</span>
												<span className="list-primary__right">
													Eye view LTD{" "}
												</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Phone No</span>
												<span className="list-primary__right">021 4567898</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Fax</span>
												<span className="list-primary__right">21 4567898 </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Address 1</span>
												<span className="list-primary__right">
													Samakhusi, Kathmandu, Nepal
												</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Address 2</span>
												<span className="list-primary__right">
													Koteshwor, Kathmandu, Nepal
												</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Country </span>
												<span className="list-primary__right">Nepal </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">
													Zip code/ Postal Code/ Pin Code
												</span>
												<span className="list-primary__right">44600</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Website</span>
												<span className="list-primary__right">dribble.com</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Description</span>
												<span className="list-primary__right">
													This is a Description
												</span>
											</li>
										</ul>
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

export default PropertyDetailLegalInfo;
