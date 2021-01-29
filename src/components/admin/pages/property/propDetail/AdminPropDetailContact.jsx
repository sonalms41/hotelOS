import React, { useContext, useEffect, useState, Fragment } from "react";
import { CardPrimary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailContact = (props) => {
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext),
		propertyId = props.match.params.id,
		[isLoading, setIsLoading] = useState(true),
		[contact, setContact] = useState({
			data: [],
			errors: "",
		});

	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Contacts
		propertyServices.get
			.contact(propertyId)
			.then((response) => {
				console.log(response);
				const data = response.data.result.dictionary;
				setContact({ data });
			})
			.catch((errors) => {
				setContact({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

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
						{contact.errors && (
							<div className="admin-getdata-error">{contact.errors}</div>
						)}
						{contact.data && (
							<div className="col-item col-item--lg-9">
								<CardPrimary>
									<div className="property-detail__item">
										<AdminPropDetailHeading
											title="Contacts"
											propertyName={
												basicInfo.data && basicInfo.data.property_name
											}
											propertyId={propertyId}
											endPoint="propmgmt"
										/>
										<div className="detail-item__body">
											<div className="property-contacts">
												<ul className="property-contact__list">
													<li className="contact-item">
														<span className="contact__name">Full name</span>
														<span className="contact__value">
															{contact.data.first_name} {contact.data.last_name}
														</span>
													</li>
													<li className="contact-item">
														<span className="contact__name">Job Role</span>
														<span className="contact__value">
															{contact.data.job_role}
														</span>
													</li>
													<li className="contact-item">
														<span className="contact__name">E-mail</span>
														<span className="contact__value">
															{contact.data.email &&
																contact.data.email.map((email, i) => {
																	return (
																		<span key={`emailrender_${i}`}>
																			{email},
																		</span>
																	);
																})}
														</span>
													</li>
													<li className="contact-item">
														<span className="contact__name">Phone Number</span>
														<span className="contact__value">
															{contact.data.phone_number &&
																contact.data.phone_number.map(
																	(phonenumber, i) => {
																		return (
																			<span key={`phonenumberljdsaf_${i}`}>
																				{phonenumber},
																			</span>
																		);
																	},
																)}
														</span>
													</li>
													<li className="contact-item">
														<span className="contact__name">
															Responsibility
														</span>
														<span className="contact__value">
															<ul className="responsibilities">
																{contact.data.responsiblities &&
																	contact.data.responsiblities.map(
																		(responsibility, index) => {
																			return (
																				<li key={`responsibility_key_${index}`}>
																					{responsibility}
																				</li>
																			);
																		},
																	)}
															</ul>
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

export default AdminPropDetailContact;
