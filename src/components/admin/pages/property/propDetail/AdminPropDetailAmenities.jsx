import React, { useState, useContext, useEffect } from "react";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import IconNoSmoking from "./../../../../../assets/images/icon/icon-nosmoking.svg";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import { CardPrimary } from "../../../../utility";
import { AdminButtonPrimary, toastNotification } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailAmenities = (props) => {
	const { basicInfo } = useContext(AdminGetDataContext),
		[amenities, setAmenities] = useState([]),
		[isLoading, setIsLoading] = useState(true);

	const propertyId = props.match.params.id;
	useEffect(() => {
		setIsLoading(true);
		propertyServices.get
			.amenities(propertyId)
			.then((response) => {
				const data = response.data.result.aminities_dictionary.aminity;
				setAmenities(data);
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setIsLoading(false);
			});
	}, [propertyId]);

	// Breadcrumb (for path)
	const breadCrumb = [
		{ to: "/admin-dashboard", title: "Dashboard" },
		{ to: "/admin-property", title: "Property" },
		{
			to: `/admin-property/dashboard/${propertyId}`,
			title: "Property Dashboard",
		},
		{
			to: `/admin-property/${
				basicInfo.data.property_status === "Verified"
					? "verified"
					: basicInfo.data.property_status === "Rejected"
					? "rejected"
					: basicInfo.data.property_status === "Blocked"
					? "blocked"
					: basicInfo.data.property_status === "Deactivated"
					? "deactivated"
					: basicInfo.data.property_status === "Reported"
					? "reported"
					: ""
			}`,

			title: basicInfo.data.property_status,
		},
		{
			to: "",
			title: basicInfo.data.property_name,
		},
	];

	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-detail">
				<AdminSectionHeader
					propertyDetailPage={true}
					propertyId={propertyId}
					breadCrumb={breadCrumb}
					sectionTitle={basicInfo.data && basicInfo.data.property_name}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<AdminPropDetailNav />
						</div>
						{amenities && (
							<div className="col-item col-item--lg-9">
								<CardPrimary>
									<div className="property-detail__item">
										<AdminPropDetailHeading
											title="Amenities"
											propertyName={
												basicInfo.data && basicInfo.data.property_name
											}
											propertyId={propertyId}
											endPoint="facilities"
										/>
										<div className="detail-item__body">
											<div className="property-amenities">
												{/*<div className="col-wrapper">
                          {amenities &&
                            amenities.map((amenity, index) => {
                              return (
                                <>
                                  <div
                                    className="col-item col-item--lg-2"
                                    key={`v-prop-amenity-${index}`}
                                  >
                                    <CardSecondary>
                                      <div className="amenitie">
                                        <div className="amenitie__img">
                                          <img
                                            src={IconNoSmoking}
                                            alt="Amenities"
                                          />
                                        </div>
                                        <p className="amenitie__title">
                                          {amenity.aminity}
                                        </p>
                                      </div>
                                    </CardSecondary>
                                  </div>
                                </>
                              );
                            })}
                        </div>*/}

												<table>
													<thead>
														{amenities &&
															amenities.map((aminity, i) => {
																return (
																	<th key={`aminity-key-${i}`}>
																		{aminity.aminity}
																	</th>
																);
															})}
													</thead>
													<tbody>
														<tr>
															{amenities &&
																amenities.map((aminity, i) => {
																	return (
																		<td
																			className={`table-col table-col-${i + 1}`}
																			key={`subamenitiesid-${i}`}
																		>
																			{aminity.sub_aminity &&
																				aminity.sub_aminity.map(
																					(subAminity, i) => {
																						return <p>{subAminity.name}</p>;
																					},
																				)}
																		</td>
																	);
																})}
															{/*End  table-col table-col-1*/}
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
								</CardPrimary>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminPropDetailAmenities;
