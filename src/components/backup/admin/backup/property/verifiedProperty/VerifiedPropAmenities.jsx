import React, { useState } from "react";

import { CardPrimary, CardSecondary, ButtonPrimary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";
import IconNoSmoking from "./../../../../assets/images/icon/icon-nosmoking.svg";
import SectionHeader from "../../adminUtility/SectionHeader";

const PropertyDetailAmenities = (props) => {
	const [breadCrumb, setBreadCrumb] = useState(["path one", "path two"]);
	return (
		<section className="section section-property property-detail">
			<SectionHeader
				title="Hotel Sangirla Hotel Pvt. Ltd."
				breadCrumb={breadCrumb}
			/>
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
									<h2 className="info-title heading-secondary">Amenities</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="property-amenities">
										<div className="col-wrapper">
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
													</div>
												</CardSecondary>
											</div>
											<div className="col-item col-item--lg-2">
												<CardSecondary>
													<div className="amenitie">
														<div className="amenitie__img">
															<img src={IconNoSmoking} alt="Amenities" />
														</div>
														<p className="amenitie__title">100% no-smoking</p>
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

export default PropertyDetailAmenities;
