import React, { useEffect, useContext, useState } from "react";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import { CardPrimary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailLegalInfo = (props) => {
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext),
		[isLoading, setIsLoading] = useState(true),
		[legalInfo, setLegalInfo] = useState({
			data: [],
			errors: "",
		});

	const propertyId = props.match.params.id;
	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Amenities
		propertyServices.get
			.legalInfo(propertyId)
			.then((response) => {
				console.log("legal info response", response);
				const data = response.data.result;
				setLegalInfo({ data });
			})
			.catch((errors) => {
				setLegalInfo({ errors: `${errors}` });
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

						{/*If encounter errors the show here*/}
						{legalInfo.errors && (
							<div className="admin-getdata-error">{legalInfo.errors}</div>
						)}

						{/*Display data*/}
						{legalInfo.data && (
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
											<div className="prop-legalinfo">
												<ul className="prop-legalinfo__list">
													<li className="list-primary">
														<span className="list-primary__left">
															Company Name
														</span>
														<span className="list-primary__right">
															{legalInfo.data.company_name}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Phone No</span>
														<span className="list-primary__right">
															{legalInfo.data.phone_number}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Fax</span>
														<span className="list-primary__right">
															{legalInfo.data.fax}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															Address 1
														</span>
														<span className="list-primary__right">
															{legalInfo.data.address_line_one}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															Address 2
														</span>
														<span className="list-primary__right">
															{legalInfo.data.address_line_two}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Country </span>
														<span className="list-primary__right">
															{legalInfo.data.country}{" "}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															Zip code/ Postal Code/ Pin Code
														</span>
														<span className="list-primary__right">
															{legalInfo.data.zip_code}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">Website</span>
														<span className="list-primary__right">
															{legalInfo.data.web_address}
														</span>
													</li>
													<li className="list-primary">
														<span className="list-primary__left">
															Description
														</span>
														<span className="list-primary__right">
															{legalInfo.data.description}
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

export default AdminPropDetailLegalInfo;
