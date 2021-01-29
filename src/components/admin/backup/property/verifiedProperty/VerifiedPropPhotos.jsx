import React from "react";

import { CardPrimary, ButtonPrimary, CardSecondary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";
import IconFeatherInfo from "./../../../../assets/images/icon/icon-feather-info.svg";
import PhotoHotel1 from "./../../../../assets/images/hotel/hotel1.svg";

const PropertyDetailPhotos = (props) => {
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
									<h2 className="info-title heading-secondary">Photos</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="property-photos">
										<div className="property-photos__filter">
											<ul className="filter-nav">
												<li className="filter-nav__item active">Room(20)</li>
												<li className="filter-nav__item ">Washroom(10)</li>
												<li className="filter-nav__item ">Restaurant(4)</li>
												<li className="filter-nav__item ">Elevator(5)</li>
												<li className="filter-nav__item ">Lobby(1)</li>
												<li className="filter-nav__item ">Reception(2)</li>
												<li className="filter-nav__item ">Facade(1)</li>
											</ul>
										</div>
										<div className="property-photos__items">
											<div className="col-wrapper">
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
												<div className="col-item col-item--lg-3">
													<img src={PhotoHotel1} alt="Hotel" />
												</div>
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

export default PropertyDetailPhotos;
