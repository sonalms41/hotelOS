import React from "react";

import { CardPrimary, ButtonPrimary, CardSecondary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";

const PropertyDetailBank = (props) => {
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
									<h2 className="info-title heading-secondary">Bank Detail</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="bank-detail">
										<div className="bank-detail__head">
											<h3>NIC ASIA BANK</h3>
											<p>Lazimpat, Kathmandu</p>
										</div>
										<ul className="bank-detail__list">
											<li className="list-primary">
												<span className="list-primary__left">
													Bank Location
												</span>
												<span className="list-primary__right">Nepal </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Currency</span>
												<span className="list-primary__right">NPR </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">
													A/C Holder Name
												</span>
												<span className="list-primary__right">Puspa grg </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">A/CNumber</span>
												<span className="list-primary__right">
													12345678979 979878798
												</span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">Type</span>
												<span className="list-primary__right">Saving </span>
											</li>
											<li className="list-primary">
												<span className="list-primary__left">SWIFT Code</span>
												<span className="list-primary__right">NPR 123 545</span>
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

export default PropertyDetailBank;
