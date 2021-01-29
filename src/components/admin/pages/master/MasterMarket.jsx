import React, { useState } from "react";
import CustomSpinner from "../../../CustomSpinner";
import { AdminSectionHeader } from "../../adminUtility";
import AdminMasterNav from "../../nav/AdminMasterNav";

const MasterMarket = () => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<>
			<div className="master-market">
				<div className="master-market__row">
					<CustomSpinner isLoading={isLoading} />
					<AdminSectionHeader
						breadCrumb={[
							{
								to: "/admin-dashboard",
								title: "Dashboard",
							},
							{
								to: "/admin-master",
								title: "Master",
							},
							{
								to: "/admin-master/market",
								title: "Market",
							},
						]}
						sectionTitle="Market"
					/>
					<AdminMasterNav />
				</div>
				<div className="master-market__row">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<div className="market-sidebar card-primary">
								<h3 className="heading-tertiary">Country</h3>
								<div className="admin-form">
									<div className="admin-form__group">
										<label className="admin-form__label">Search Country</label>
										<input
											className="admin-form__input"
											placeholder="country"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="col-item col-item--lg-9">
							<div className="col-wrapper">
								<div className="col-item col-item--lg-4  ">
									<div className="card-primary">
										<h3 className="heading-tertiary">India</h3>
										<h4 className="flex-aC-jSB">
											<span>Total Selected Country</span> <span> 5</span>
										</h4>
										<span className="view-more">View Country Lists</span>
									</div>
								</div>
								<div className="col-item col-item--lg-4 ">
									<div className="card-primary">
										<h3 className="heading-tertiary">South Asdia</h3>
										<h4 className="flex-aC-jSB">
											<span>Total Selected Country</span> <span> 5</span>
										</h4>
										<span className="view-more">View Country Lists</span>
									</div>
								</div>
								<div className="col-item col-item--lg-4 ">
									<div className="card-primary">
										<h3 className="heading-tertiary">Others</h3>
										<h4 className="flex-aC-jSB">
											<span>Total Selected Country</span> <span> 5</span>
										</h4>
										<span className="view-more">View Country Lists</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default MasterMarket;
