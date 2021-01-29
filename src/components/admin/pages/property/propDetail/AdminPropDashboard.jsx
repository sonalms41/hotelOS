import React, { useEffect, useContext, useState } from "react";
import IconPropPath from "./../../../../../assets/images/icon/icon-prop-path.svg";
import { Link } from "react-router-dom";
import CustomSpinner from "../../../../CustomSpinner";
import { toastNotification } from "../../../adminUtility";
import AdminPopupModal from "../../../adminUtility/AdminPopupModal";
import adminMasterServices from "./../../../adminServices/master";
import adminPropServices from "./../../../adminServices/property";
const AdminPropDashboard = (props) => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [basicInfoPrimary, setBasicInfoPrimary] = useState({});
	const [basicInfoSecondary, setBasicInfoSecondary] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const propertyId = props.match.params.id;

	const [commission, setCommission] = useState(null);
	const [editCommissionVal, setEditCommissionVal] = useState(null);

	// GET PROPERTY BOOKING-NO AND
	const getPropBasicInfoSecondary = () => {
		setIsLoading(true);
		adminPropServices.get
			.propDashboardBookingRating(propertyId)
			.then((response) => {
				const data = response.data;
				if (data.status_code === 200) {
					setBasicInfoSecondary(data.result);
					setIsLoading(false);
				}
			})
			.catch((errors) => {
				setIsLoading(false);
			});
	};

	const getPropBasicInfoPrimary = () => {
		setIsLoading(true);
		adminPropServices.get
			.basicInfo(propertyId)
			.then((response) => {
				const data = response.data;
				if (data.status_code === 200) {
					setBasicInfoPrimary(data.result);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setIsLoading(false);
			});
	};
	// GET PROPERTY COMMISSION
	const getPropertyCommission = () => {
		if (propertyId) {
			adminMasterServices.get
				.masterCommission({
					propertyinformation: propertyId,
				})
				.then((response) => {
					const data = response.data;
					if (data.status === 200) {
						const result = data.result;
						const commission = result.filter((data) => {
							return data.propertyInfo.id === parseInt(propertyId);
						});
						setCommission(commission[0].master_commission);
						setEditCommissionVal(commission[0].master_commission);
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		}
	};

	// EDIT COMMISSION
	const handleEditCommission = (e) => {
		e.preventDefault();
		const postValue = {
			propertyinformation: propertyId,
			master_commission: editCommissionVal,
		};
		adminMasterServices.patch
			.masterCommission(postValue)
			.then((response) => {
				toastNotification.success(response.data.message);
				if (response.data.status === 200) {
					setShowEditModal(false);
					getPropertyCommission();
				}
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	useEffect(() => {
		getPropertyCommission();
		getPropBasicInfoSecondary();
		getPropBasicInfoPrimary();
	}, []);

	return (
		<>
			<CustomSpinner isLoading={isLoading} />

			<section className="section section-property verified-prop-dashboard">
				<div className="section-header">
					<div className="section-header__col">
						<h2 className="section__title heading-secondary">
							{basicInfoPrimary && basicInfoPrimary.property_name}
						</h2>
						<ul className="section__navigate">
							<li>
								<Link to="/admin-dashboard">Dashboard</Link>
							</li>
							<li>
								<Link to="./../">Property</Link>
							</li>
							<li>
								<Link
									to={`${
										basicInfoPrimary &&
										basicInfoPrimary.property_status === "Verified"
											? "/admin-property/verified"
											: basicInfoPrimary &&
											  basicInfoPrimary.property_status === "Pending"
											? "/admin-property/pending"
											: basicInfoPrimary &&
											  basicInfoPrimary.property_status === "Rejected"
											? "/admin-property/rejected"
											: basicInfoPrimary &&
											  basicInfoPrimary.property_status === "Blocked"
											? "/admin-property/blocked"
											: basicInfoPrimary &&
											  basicInfoPrimary.property_status === "Reported"
											? "/admin-property/reported"
											: basicInfoPrimary &&
											  basicInfoPrimary.property_status === "Deactivated"
											? "/admin-property/reported"
											: ""
									}`}
								>
									{basicInfoPrimary && basicInfoPrimary.property_status}{" "}
									Property
								</Link>
							</li>
							<li className="active">
								{basicInfoPrimary && basicInfoPrimary.property_name}
							</li>
						</ul>
					</div>
				</div>
				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card flex-jfs-ac border-dash">
								<div className="card-left">
									<img
										src={IconPropPath}
										placeholder="Verified propery dashboard"
									/>
								</div>
								<div className="card-right">
									<h3 className="heading-tertiary">
										{basicInfoPrimary && basicInfoPrimary.property_name}
									</h3>
									<p>
										{basicInfoPrimary && basicInfoPrimary.street_address},
										{basicInfoPrimary && basicInfoPrimary.city},
										{basicInfoPrimary && basicInfoPrimary.country}
									</p>

									<div className="link-view-detail">
										<Link
											to={`/admin-property/detail/basic-info/${propertyId}`}
										>
											View Detail
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card  border-dash">
								<ul className="v-prop-sinfo-list">
									<li>
										<span>Total booking</span>
										<span>
											{basicInfoSecondary && basicInfoSecondary.total_booking}
										</span>
									</li>
									<li>
										<span>Views</span>
										<span>
											{basicInfoSecondary && basicInfoSecondary.total_views}
										</span>
									</li>
									<li>
										<a>Go To Analytics</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card  border-dash">
								<ul className="v-prop-sinfo-list">
									<li>
										<span>Rating</span>
										<span>
											{basicInfoPrimary && basicInfoPrimary.star_rating}
										</span>
									</li>
									<li>
										<span>Comments</span>
										<span>
											{basicInfoSecondary && basicInfoSecondary.comments}
										</span>
									</li>
									<li>
										<a>See Comments</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card flex-jc--fd-column v-prop-dashboard-card--revenue  border-dash">
								<h2> STATIC NOW </h2>
								<p>Revenue</p>
								<a>See Revenue</a>
							</div>
						</div>

						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card v-prop-dashboard-card--promotion  border-dash">
								<h3>Promotions</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
								<a>Get Started</a>
							</div>
						</div>

						<div className="col-item col-item--lg-3">
							<div className="v-prop-dashboard-card flex-jc--fd-row v-prop-dashboard-card--edit  border-dash">
								<Link
									to={`/admin-property/reconcilation/${
										basicInfoPrimary && basicInfoPrimary.property_name
									}/${propertyId}`}
								>
									Reconcilation
								</Link>
							</div>
						</div>
						<div className="col-item col-item--lg-3 admin-commission">
							<div className="v-prop-dashboard-card flex-jc--fd-row v-prop-dashboard-card--edit  border-dash">
								<div className="flex-aC-jC flex-ffC">
									<span
										className="anchor"
										onClick={() => {
											commission
												? setShowEditModal(true)
												: toastNotification.warn("Commission Not Available");
										}}
									>
										Commission
									</span>
									<span className="comt">
										{commission ? `${commission} %` : `__`}
									</span>
								</div>
							</div>
							<AdminPopupModal
								showModal={showEditModal}
								closeModal={() => setShowEditModal(false)}
								className="modal-edit-commission"
							>
								<div className="card-primary">
									<h3 className="heading-tertiary">Edit Commission</h3>
									<form className="admin-form" onSubmit={handleEditCommission}>
										<div className="admin-form__group">
											<label className="admin-form__label">Commission</label>
											<input
												className="admin-form__input"
												placeholder="10%"
												type="number"
												autoComplete="off"
												value={editCommissionVal}
												onChange={(e) => setEditCommissionVal(e.target.value)}
											/>
										</div>
										<div className="admin-form__group text-right">
											<button
												type="submit"
												className="admin-btn admin-btn--primary"
											>
												Save
											</button>
										</div>
									</form>
								</div>
							</AdminPopupModal>
						</div>
					</div>
				</div>
			</section>
			{/*)}*/}
		</>
	);
};

export default AdminPropDashboard;
