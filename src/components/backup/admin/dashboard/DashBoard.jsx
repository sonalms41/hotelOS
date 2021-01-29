import React, { useState, useEffect } from "react";
import { CardPrimary, ButtonPrimary, ButtonSecondary } from "../../utility";
import IconEdit from "./../../../assets/images/icon/icon-edit.svg";
import IconDelete from "./../../../assets/images/icon/icon-delete.svg";
import { Link, Redirect } from "react-router-dom";

const Dashboard = (pops) => {
	return (
		<section className="section section-dashboard">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">Dashboard</h2>
				</div>
			</div>
			<div className="section-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<div className="dashboard-add-prop">
							<CardPrimary>
								<h3 className="heading-tertiary">Add Occupancy</h3>
								<form className="dashboardform form">
									<div className="form__group">
										<label>Occupancy Name</label>
										<input type="text" placeholder="Occupancy Name" />
									</div>
									<div className="form__group">
										<label>Max Capacity</label>
										<input type="text" placeholder="Capacity..." />
									</div>
									<div className="form__group">
										<label>Min Capacity</label>
										<input type="text" placeholder="Capacity..." />
									</div>
									<div className="form__group form__group-btn">
										<ButtonPrimary title="Save" />
										<ButtonSecondary title="Clear" />
									</div>
								</form>
							</CardPrimary>
						</div>
					</div>
					<div className="col-item col-item--lg-9">
						<div className="dashboard-content">
							<CardPrimary>
								<h3 className="heading-tertiary">List Occupancy</h3>
								<table className="dashboard-content__table">
									<thead>
										<tr>
											<th className="prop-sn">S.N</th>
											<th className="prop-name">Occupancy Name</th>
											<th className="prop-max-capacity">Max Capacity</th>
											<th className="prop-min-capacity">Min Capacity</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="prop-sn">1</td>
											<td className="prop-name">Single Room</td>
											<td className="prop-max-capacity">2</td>
											<td className="prop-min-capacity">1</td>
											<td className="prop-control">
												<Link>
													<span className="pop-edit">
														<img src={IconEdit} alt="Edit" />
													</span>
												</Link>
												<Link>
													<span className="pop-delete">
														<img src={IconDelete} alt="Delete" />
													</span>
												</Link>
											</td>
										</tr>
										<tr>
											<td className="prop-sn">1</td>
											<td className="prop-name">Single Room</td>
											<td className="prop-max-capacity">2</td>
											<td className="prop-min-capacity">1</td>
											<td className="prop-control">
												<Link>
													<span className="pop-edit">
														<img src={IconEdit} alt="Edit" />
													</span>
												</Link>
												<Link>
													<span className="pop-delete">
														<img src={IconDelete} alt="Delete" />
													</span>
												</Link>
											</td>
										</tr>
										<tr>
											<td className="prop-sn">1</td>
											<td className="prop-name">Single Room</td>
											<td className="prop-max-capacity">2</td>
											<td className="prop-min-capacity">1</td>
											<td className="prop-control">
												<Link>
													<span className="pop-edit">
														<img src={IconEdit} alt="Edit" />
													</span>
												</Link>
												<Link>
													<span className="pop-delete">
														<img src={IconDelete} alt="Delete" />
													</span>
												</Link>
											</td>
										</tr>
									</tbody>
								</table>
							</CardPrimary>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
