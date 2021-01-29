import React, { useEffect, useContext, useState } from "react";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";

import { CardPrimary, CardSecondary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailPolicy = (props) => {
	const { basicInfo, getBasicInfo } = useContext(AdminGetDataContext),
		[policies, setPolicies] = useState({
			data: [],
			errors: "",
		}),
		[isLoading, setIsLoading] = useState(true);

	const propertyId = props.match.params.id;
	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Amenities
		propertyServices.get
			.policies(propertyId)
			.then((response) => {
				console.log(response);
				const data = response.data.result;
				//setPolicies({ data });
			})
			.catch((errors) => {
				setPolicies({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

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
			{/*Show spinner while fetching data*/}
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-detail">
				<AdminSectionHeader
					propertyDetailPage={true}
					propertyId={propertyId}
					breadCrumb={breadCrumb}
					sectionTitle={basicInfo ? basicInfo.data.property_name : ""}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<AdminPropDetailNav />
						</div>
						<div className="col-item col-item--lg-9">
							{/*If encounter errors then show here*/}
							{policies.errors && (
								<div className="admin-getdata-error">{policies.errors}</div>
							)}
							<CardPrimary>
								<div className="property-detail__item">
									<AdminPropDetailHeading
										title="Policy"
										propertyName={
											basicInfo.data && basicInfo.data.property_name
										}
										propertyId={propertyId}
										endPoint="propmgmt"
									/>
									<div className="detail-item__body">
										<div className="property-policy">
											<div className="col-wrapper">
												{/*Show data*/}
												{policies.data &&
													policies.data.map((cancPolicy, index) => {
														return (
															<div
																ley={`v-prop-policies-${index}`}
																className="col-item col-item--lg-4"
															>
																<CardSecondary>
																	<div className="property-policy__title">
																		<p>
																			{cancPolicy.cancelName} cancellation
																			policy
																		</p>
																	</div>
																	<div className="property-policy__detail">
																		<h4>Policy Details</h4>
																		<p>
																			From {cancPolicy.cancelFrom} hr to
																			{cancPolicy.cancelTo} hr, Penalty:
																			{cancPolicy.penalty} (Percentage), penalty
																			type {cancPolicy.penaltyType}
																		</p>
																	</div>
																</CardSecondary>
															</div>
														);
													})}
											</div>
										</div>
									</div>
								</div>
							</CardPrimary>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminPropDetailPolicy;
