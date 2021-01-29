import React, { useEffect, useContext, useState } from "react";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import { CardPrimary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import Axios from "axios";
import AdminPropDetailPhotos from "./AdminPropDetailPhotos";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailBank = (props) => {
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext),
		[bankDetails, setBankDetail] = useState({
			data: [],
			errors: "",
		}),
		[isLoading, setIsLoading] = useState(true);

	const propertyId = props.match.params.id;
	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Amenities
		propertyServices.get
			.bankDetail(propertyId)
			.then((response) => {
				const data = response.data.result;
				setBankDetail({ data });
			})
			.catch((errors) => {
				setBankDetail({ errors: `${errors}` });
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
			{/*Show loading spinner while fetching data*/}
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
						{bankDetails.errors && (
							<div className="admin-getdata-error">{bankDetails.errors}</div>
						)}
						{bankDetails.data && (
							<div className="col-item col-item--lg-9">
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
											<div className="bank-detail">
												<div className="bank-detail__head">
													<h3>{bankDetails.data.bank_name}</h3>
													<p>{bankDetails.data.branch_name}</p>
												</div>
												<ul className="bank-detail__list">
													<li className="list-primary">
														<span className="list-primary__left">
															Bank Location
														</span>
														<span className="list-primary__right">
															{bankDetails.data.bank_location}{" "}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Currency</span>
														<span className="list-primary__right">
															{bankDetails.data.currency}{" "}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															A/C Holder Name
														</span>
														<span className="list-primary__right">
															{bankDetails.data.account_holder_name}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															A/CNumber
														</span>
														<span className="list-primary__right">
															{bankDetails.data.account_number}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Type</span>
														<span className="list-primary__right">
															{bankDetails.data.bank_account_type}{" "}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															SWIFT Code
														</span>
														<span className="list-primary__right">
															{bankDetails.data.bic_code}
														</span>
													</li>
												</ul>
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

export default AdminPropDetailBank;
