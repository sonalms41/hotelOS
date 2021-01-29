import React, { useEffect, useContext, useState } from "react";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import { Link } from "react-router-dom";
import { CardPrimary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import IconDownload from "./../../../../../assets/images/icon/icon-download.svg";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailDocuments = (props) => {
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext),
		[isLoading, setIsLoading] = useState(true),
		[documents, setDocuments] = useState({
			data: [],
			errors: "",
		});

	const propertyId = props.match.params.id;
	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Amenities
		propertyServices.get
			.documents(propertyId)
			.then((response) => {
				const data = response.data.result.list_documents;
				setDocuments({ data });
			})
			.catch((errors) => {
				setDocuments({ errors: `${errors}` });
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
					sectionTitle={basicInfo ? basicInfo.data.property_name : ""}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<AdminPropDetailNav />
						</div>
						{documents.errors && (
							<div className="admin-getdata-error">{documents.errors}</div>
						)}

						{documents.data && (
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
											<div className="prop-doc">
												<div className="prop-doc__item">
													<h3 className="prop-doc__title">Documents</h3>
													<table className="prop-doc__table">
														<thead>
															<tr>
																<th className="doc-name">Document Name</th>
																<th className="doc-mby">Last Modified By</th>
																<th className="doc-status">
																	Verification Status
																</th>
															</tr>
														</thead>
														<tbody>
															{documents.data.Document &&
																documents.data.Document.map(
																	(document, index) => {
																		return (
																			<tr
																				key={`v-prop-docunet-${document.property_obj_id}`}
																			>
																				<td className="doc-name">
																					{document.name}
																				</td>
																				<td className="doc-mby">
																					{document.lastModifiedDate}
																				</td>
																				<td className="doc-status">
																					{document.verification_status}
																				</td>
																				<td className="doc-download">
																					<img
																						src={IconDownload}
																						alt="Download"
																					/>
																					<Link
																						to={document.document}
																						target="_blank"
																						download
																					>
																						Download
																					</Link>
																				</td>
																			</tr>
																		);
																	},
																)}
														</tbody>
													</table>
												</div>

												<div className="prop-doc__item">
													<h3 className="prop-doc__title">Bank Document</h3>
													<table className="prop-doc__table">
														<thead>
															<tr>
																<th className="doc-name">Document Name</th>
																<th className="doc-mby">Last Modified By</th>
																<th className="doc-status">
																	Verification Status
																</th>
															</tr>
														</thead>
														<tbody>
															{documents.data.Bank &&
																documents.data.Bank.map(
																	(bankDocument, index) => {
																		return (
																			<tr
																				key={`v-prop-bank-doc-${bankDocument.property_obj_id}`}
																			>
																				<td className="doc-name">
																					{bankDocument.name}
																				</td>
																				<td className="doc-mby">
																					{bankDocument.lastModifiedDate}
																				</td>
																				<td className="doc-status">
																					{bankDocument.verification_status}
																				</td>
																				<td className="doc-download">
																					<img
																						src={IconDownload}
																						alt="Download"
																					/>

																					<Link
																						to={bankDocument.document}
																						target="_blank"
																						download
																					>
																						Download
																					</Link>
																				</td>
																			</tr>
																		);
																	},
																)}
														</tbody>
													</table>
												</div>

												<div className="prop-doc__item">
													<h3 className="prop-doc__title">Legal Document</h3>
													<table className="prop-doc__table">
														<thead>
															<tr>
																<th className="doc-name">Document Name</th>
																<th className="doc-mby">Last Modified By</th>
																<th className="doc-status">
																	Verification Status
																</th>
															</tr>
														</thead>
														<tbody>
															{documents.data.Legal &&
																documents.data.Legal.map(
																	(legalDocument, index) => {
																		return (
																			<tr
																				key={`v-prop-legal-doc-${legalDocument.property_obj_id}`}
																			>
																				<td className="doc-name">
																					{legalDocument.name}
																				</td>
																				<td className="doc-mby">
																					{legalDocument.lastModifiedDate}
																				</td>
																				<td className="doc-status">
																					{legalDocument.verification_status}
																				</td>
																				<td className="doc-download">
																					<img
																						src={IconDownload}
																						alt="Download"
																					/>
																					<Link
																						to={legalDocument.document}
																						target="_blank"
																						download
																					>
																						Download
																					</Link>
																				</td>
																			</tr>
																		);
																	},
																)}
														</tbody>
													</table>
												</div>
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

export default AdminPropDetailDocuments;
