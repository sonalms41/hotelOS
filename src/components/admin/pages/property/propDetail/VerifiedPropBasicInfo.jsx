import React, { useEffect, useContext, useState } from "react";
import { CardPrimary, ButtonPrimary } from "../../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";

import AdminPropDetailSectionHeader from "../../../adminUtility/AdminPropDetailSectionHeader";

const PropertyDetailBasicInfo = (props) => {
	const { getPropertyDetail, propertyDetail } = useContext(AdminGetDataContext);
	const { basicInfo } = propertyDetail;

	useEffect(() => {
		const propertyId = window.location.href.split("/").reverse()[0];
		getPropertyDetail.basicInfo(propertyId);
	}, []);

	return (
		<>
			<section className="section section-property property-detail">
				<AdminPropDetailSectionHeader
					propertyId={window.location.href.split("/").reverse()[0]}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<VerifiedPropNav />
						</div>
						{!basicInfo ? (
							<CustomSpinner isLoading={true} />
						) : basicInfo.error ? (
							<div className="admin-getdata-error">{basicInfo.error}</div>
						) : basicInfo.data ? (
							<div className="col-item col-item--lg-9">
								<div className="property-detail__item">
									<CardPrimary>
										<div className="detail-item__header">
											<h2 className="info-title heading-secondary">
												Basic Info
											</h2>
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
																	{basicInfo.data.property_name}
																</h3>
																<p className="property-address">
																	{basicInfo.data.locality
																		? `${basicInfo.data.locality},`
																		: ""}
																	{basicInfo.data.street_address
																		? `${basicInfo.data.street_address},`
																		: ""}
																	{basicInfo.data.city
																		? `${basicInfo.data.city},`
																		: ""}
																	{basicInfo.data.country
																		? `${basicInfo.data.country},`
																		: ""}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="detail-info__row detail-info__row--2">
													<ul className="detail-info__list col-wrapper">
														<li className="list-primary">
															<span className="list-primary__left">
																Hotel Type
															</span>
															<span className="list-primary__right">
																{basicInfo.data.star_rating} Star
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																No. of Room
															</span>
															<span className="list-primary__right">
																{basicInfo.data.no_of_rooms}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																Build Year
															</span>
															<span className="list-primary__right">
																{basicInfo.data.build_year}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																No. of Floor
															</span>
															<span className="list-primary__right">
																{basicInfo.data.no_of_floors}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																Property Type
															</span>
															<span className="list-primary__right">
																{basicInfo.data.property_type}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																Check IN
															</span>
															<span className="list-primary__right">
																{basicInfo.data.checkin_time_hour}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																No. of Restaurant
															</span>
															<span className="list-primary__right">
																{basicInfo.data.no_of_restaurants}
															</span>
														</li>
														<li className="list-primary">
															<span className="list-primary__left">
																Check Out
															</span>
															<span className="list-primary__right">
																{basicInfo.data.checkout_time_hour}
															</span>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</CardPrimary>
								</div>
							</div>
						) : (
							<CustomSpinner isLoading={true} />
						)}
					</div>
				</div>
			</section>

			{/*{editBasicInfo ? (
				<div className="admin-popup-modal admin-popup-modal--basicinfo">
					<BasicInfo />
				</div>
			) : (
				""
			)}*/}
		</>
	);
};

export default PropertyDetailBasicInfo;
