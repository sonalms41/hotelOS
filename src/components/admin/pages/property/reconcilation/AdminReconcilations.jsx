import React, { useState, useEffect, Fragment } from "react";
import CustomSpinner from "../../../../CustomSpinner";
import adminPropServices from "../../../adminServices/property";
import { toastNotification } from "../../../adminUtility";
import AdminPopupModal from "../../../adminUtility/AdminPopupModal";
import { handlePayReconcileAmountWithKhalti } from "../../../adminUtility/paymentGateway";

const AdminReconcilations = (props) => {
	const { propertyId } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [reconcData, setReconcData] = useState(null);
	const [showRecModal, setShowRecModal] = useState(false);
	const [reconcileAmount, setReconcileAmount] = useState("");
	const [amountStatus, setAmountStatus] = useState(null);

	const getData = () => {
		adminPropServices.get
			.reconcilations(propertyId)
			.then((response) => {
				const data = response.data;
				if (data.status_code === 200) {
					const rData = data.result;
					if (rData.start_blc < 0) {
						setAmountStatus("Payable");
					}
					if (rData.start_blc > 0) {
						setAmountStatus("Receivable");
					}

					setReconcData(data.result);
				}
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	useEffect(() => {
		setIsLoading(true);
		getData();
		setIsLoading(false);
	}, []);

	const hanleChageInput = (e) => {
		const amount = e.target.value;
		setReconcileAmount(amount);
	};

	return (
		<>
			<div className="admin-reconcilations">
				<CustomSpinner isLoading={isLoading} />
				<div className="card-primary">
					<table className="admin-table admin-table--masteroccupancy">
						<thead>
							<tr>
								<th className="width-15p">Guest Name</th>
								<th className="width-20p">Email</th>
								<th className="width-15p">Mobile Number</th>
								<th className="width-15p">Payment Date</th>
								<th className="width-10p">Payment Method</th>
								<th className="width-10p text-right">Hotel Commission</th>
								<th className="width-10p text-right">Master Commission</th>
							</tr>
						</thead>
						<tbody>
							{reconcData && reconcData.details && (
								<Fragment>
									{reconcData.details.length >= 1 &&
										reconcData.details.map((data, i) => {
											return (
												<tr key={`reconc-Key-${i}`}>
													<td className="width-15p">
														{data.guest_fname} {data.guest_lname}{" "}
													</td>
													<td className="width-20p">{data.guest_email}</td>
													<td className="width-15p">{data.mobile_num}</td>
													<td className="width-15p">{data.payment_date}</td>
													<td className="width-10p">{data.payment_method}</td>
													<td className="width-10p text-right">
														<span>NPR</span> {data.hotel_commission}
													</td>
													<td className="width-10p text-right">
														<span>NPR</span> {data.master_commission}
													</td>
												</tr>
											);
										})}
								</Fragment>
							)}
						</tbody>
					</table>
					{reconcData && (
						<div className="reconc-overview flex-aC-jFE">
							<div className="reconc-overview__wrapper">
								<ul className="reconc-overview__ul flex flex-ffC">
									<li className="flex-aC-jFE">
										<span className="li-left">
											Opening Balance{" "}
											<span
												style={{
													color:
														amountStatus && amountStatus === "Payable"
															? "#dc3545"
															: "#55c779",
												}}
											>
												{" "}
												{amountStatus ? `(${amountStatus})` : ""}
											</span>
											:
										</span>
										<span className="li-right">
											<span className="currency"> NPR</span>
											{reconcData.start_blc < 0
												? parseInt(reconcData.start_blc.toString().substring(1))
												: reconcData.start_blc}
										</span>
									</li>
									<li className="flex-aC-jFE">
										<span className="li-left">Total Revenue :</span>
										<span className="li-right">
											<span className="currency">NPR</span>{" "}
											{reconcData.total_rev}
										</span>
									</li>
								</ul>
								<div className="flex-aC-jFE">
									<button
										className="admin-btn admin-btn--primary"
										//onClick={() => handleRecocile(reconcData.total_rev)}
										onClick={() => {
											reconcData && reconcData.total_rev > 0
												? setShowRecModal(true)
												: toastNotification.warn("No revenu Left");
										}}
									>
										Reconcile
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>

			<AdminPopupModal
				showModal={showRecModal}
				closeModal={() => setShowRecModal(false)}
				className="modal-reconcilation"
			>
				<div className="entry-rec-amount card-primary">
					<ul className="entry-ul">
						<li>
							<span className="title">
								Opening Balance {amountStatus ? `(${amountStatus})` : ""}
							</span>
							: <span className="currency">NPR</span>{" "}
							{reconcData && reconcData.start_blc}{" "}
						</li>
						<li>
							<span className="title">Total Revenue</span>:
							<span className="currency">NPR</span>{" "}
							{reconcData && reconcData.total_rev}
						</li>
					</ul>
					<div className="admin-form">
						<div className="admin-form__group">
							<label className="admin-form__label">
								{" "}
								Enter Reconcile amount
							</label>
							<input
								type="Number"
								className="admin-form__input"
								placeholder="Amount"
								value={reconcileAmount}
								onChange={hanleChageInput}
							/>
						</div>
						<button
							type="submit"
							className="admin-btn admin-btn--primary"
							onClick={() => {
								handlePayReconcileAmountWithKhalti(propertyId, reconcileAmount);
								setShowRecModal(false);
							}}
						>
							Submit
						</button>
					</div>
				</div>
			</AdminPopupModal>
		</>
	);
};

export default AdminReconcilations;
