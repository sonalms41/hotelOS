import React from "react";

import { CardPrimary, ButtonPrimary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";

const PropertyDetailContacts = (props) => {
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
						{/*<PropertyDetailBasicInfo />*/}
						<CardPrimary>
							<div className="property-detail__item">
								<div className="detail-item__header">
									<h2 className="info-title heading-secondary">Contacts</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="property-contacts">
										<ul className="property-contact__list">
											<li className="contact-item">
												<span className="contact__name">Full name</span>
												<span className="contact__value">
													98Mr. Suzam Shrestha
												</span>
											</li>
											<li className="contact-item">
												<span className="contact__name">Job Role</span>
												<span className="contact__value">Manager</span>
											</li>
											<li className="contact-item">
												<span className="contact__name">E-mail</span>
												<span className="contact__value">
													email@example.com
												</span>
											</li>
											<li className="contact-item">
												<span className="contact__name">Phone Number</span>
												<span className="contact__value">01 0123458</span>
											</li>
											<li className="contact-item">
												<span className="contact__name">Responsibility</span>
												<span className="contact__value">
													<ButtonPrimary title="Authorized signatory" />
													<ButtonPrimary title="Finance" />
													<ButtonPrimary title="Reservation" />
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

export default PropertyDetailContacts;
