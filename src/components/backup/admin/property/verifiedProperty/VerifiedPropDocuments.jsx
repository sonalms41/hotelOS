import React from "react";

import { CardPrimary, ButtonPrimary, CardSecondary } from "../../../utility";
import VerifiedPropNav from "./VerifiedPropNav";
import IconDownload from "./../../../../assets/images/icon/icon-download.svg";

const PropertyDetailDocuments = (props) => {
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
									<h2 className="info-title heading-secondary">Documents</h2>
									<ButtonPrimary title="Edit" />
								</div>
								<div className="detail-item__body">
									<div className="prop-doc">
										<div className="prop-doc__item">
											<h3 className="prop-doc__title">Document One</h3>
											<table className="prop-doc__table">
												<thead>
													<tr>
														<th className="doc-name">Document Name</th>
														<th className="doc-mby">Last Modified By</th>
														<th className="doc-status">Verification Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="doc-name">company.pdf</td>
														<td className="doc-mby">2020.11.15</td>
														<td className="doc-status">Approved</td>
														<td className="doc-download">
															<img src={IconDownload} alt="Download" />
															<span>Download</span>
														</td>
													</tr>
													<tr>
														<td className="doc-name">company.pdf</td>
														<td className="doc-mby">2020.11.15</td>
														<td className="doc-status">Approved</td>
														<td className="doc-download">
															<img src={IconDownload} alt="Download" />
															<span>Download</span>
														</td>
													</tr>
													<tr>
														<td className="doc-name">company.pdf</td>
														<td className="doc-mby">2020.11.15</td>
														<td className="doc-status">Approved</td>
														<td className="doc-download">
															<img src={IconDownload} alt="Download" />
															<span>Download</span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="prop-doc__item">
											<h3 className="prop-doc__title">Document Two</h3>
											<table className="prop-doc__table">
												<thead>
													<tr>
														<th className="doc-name">Document Name</th>
														<th className="doc-mby">Last Modified By</th>
														<th className="doc-status">Verification Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="doc-name">company.pdf</td>
														<td className="doc-mby">2020.11.15</td>
														<td className="doc-status">Approved</td>
														<td className="doc-download">
															<img src={IconDownload} alt="Download" />
															<span>Download</span>
														</td>
													</tr>
												</tbody>
											</table>
										</div>

										<div className="prop-doc__item">
											<h3 className="prop-doc__title">Document Three</h3>
											<table className="prop-doc__table">
												<thead>
													<tr>
														<th className="doc-name">Document Name</th>
														<th className="doc-mby">Last Modified By</th>
														<th className="doc-status">Verification Status</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td className="doc-name">company.pdf</td>
														<td className="doc-mby">2020.11.15</td>
														<td className="doc-status">Approved</td>
														<td className="doc-download">
															<img src={IconDownload} alt="Download" />
															<span>Download</span>
														</td>
													</tr>
												</tbody>
											</table>
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

export default PropertyDetailDocuments;
