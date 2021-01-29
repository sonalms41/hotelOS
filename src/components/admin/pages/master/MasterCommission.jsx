import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminConfirmationDialog,
	AdminSectionHeader,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import CustomSpinner from "../../../CustomSpinner";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";
import iconDelete from "./../../../../assets/images/icon/icon-delete.svg";
import iconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import AdminPopupModal from "../../adminUtility/AdminPopupModal";
import adminServices from "../../adminServices/master";

const MasterCommission = () => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	const [editId, setEditId] = useState("");
	const [editVal, setEditVal] = useState("");

	const [newCommission, setNewCommission] = useState("");

	const [isDelete, setIsDelete] = useState({ id: "" });
	const [editFormValue, setEditFormValue] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const [languages, setLanguages] = useState([]);
	const [baseCommission, setBaseCommission] = useState(null);
	const [arrCommission, setArrCommission] = useState([]);

	// GET DATA
	const handleGetCommission = () => {
		setIsLoading(true);
		masterServices.get
			.masterBaseCommission()
			.then((response) => {
				console.log("response-commision-get", response);
				const data = response.data;
				if (data.status === 200) {
					setBaseCommission(data.result);
					const arrCommission = [];
					for (let i = 0; i < data.result.length; i++) {
						arrCommission.push(data.result[i].base_commission);
					}
					setArrCommission(arrCommission);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.errors(errors);
				setIsLoading(false);
			});
	};
	useEffect(() => {
		handleGetCommission();
	}, []);

	const handleSubmitCommission = (e) => {
		setIsLoading(true);
		e.preventDefault();

		const postVal = {
			base_commission: newCommission,
		};
		const existingMatch = baseCommission.filter((data, i) => {
			return data.base_commission === newCommission;
		});

		if (arrCommission.includes(newCommission)) {
			toastNotification.warn(`Commission ${newCommission} is Already added !`);
			setIsLoading(false);
		} else {
			masterServices.post
				.masterBaseCommission(postVal)
				.then((response) => {
					if (response.data.status === 200) {
						toastNotification.success(response.data.message);
						setNewCommission("");
						handleGetCommission();
					}
					if (response.data.status === 400) {
						toastNotification.warn(response.data.message);
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		}
	};

	// EDIT
	const handleEditCommission = (e) => {
		setIsLoading(true);
		e.preventDefault();
		const postVal = {
			id: editId,
			base_commission: editVal,
		};
		if (arrCommission.includes(editVal)) {
			toastNotification.warn(`Commission ${editVal} is Already added !`);
			setIsLoading(false);
		} else {
			masterServices.patch
				.masterBaseCommission(postVal)
				.then((response) => {
					const data = response.data;
					if (data.status === 200) {
						toastNotification.success(data.message);
						handleGetCommission();
						setShowEditModal(false);
					}
					if (data.status === 400) {
						toastNotification.warn(data.message);
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		}
	};
	const handleDeletCommission = () => {
		masterServices.delete
			.masterBaseCommission(deleteId)
			.then((response) => {
				const data = response.data;
				if (data.status === 200) {
					toastNotification.success(data.message);
					handleGetCommission();
				}
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
		setDeleteId(null);
	};

	return (
		<>
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
						to: "/admin-master/commission",
						title: "Commission",
					},
				]}
				sectionTitle="Commission"
			/>
			<AdminMasterNav />
			<div className="admin-commission">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Commission</h3>
							<form className="admin-form" onSubmit={handleSubmitCommission}>
								<AdminFormInput
									label="Commission in %"
									placeholder="commission"
									type="number"
									name="base_commission"
									onChange={(e) => {
										setNewCommission(e.target.value);
									}}
									value={newCommission}
								/>

								<div className="admin-form__group-multiple">
									<AdminButtonSecondary
										title="Clear"
										type="reset"
										onClick={() => setNewCommission("")}
									/>
									<AdminButtonPrimary title="Add" type="submit" />
								</div>
							</form>
						</AdminCardPrimary>
					</div>
					<div className="col-item col-item--lg-9">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Commission</h3>
							<table className="admin-table admin-table--masterlanguage">
								<thead>
									<tr>
										<th className="width-60p">Commission</th>
										<th className="width-40p text-right">Action</th>
									</tr>
								</thead>
								<tbody>
									{baseCommission &&
										baseCommission.length >= 1 &&
										baseCommission.map((data, i) => {
											return (
												<tr key={`master-commision-key${i}`}>
													<td className="width-60p">{data.base_commission}%</td>
													<td className="width-40p text-right action">
														<span
															className="edit margin-r-20"
															onClick={() => {
																setEditId(data.id);
																setEditVal(data.base_commission);
																setShowEditModal(true);
															}}
														>
															<img src={iconEdit} alt="edit" />
														</span>
														<span className="delet">
															<img
																src={iconDelete}
																alt="delet"
																onClick={() => setDeleteId(data.id)}
															/>
															{deleteId === data.id && (
																<AdminConfirmationDialog
																	message="Are you sure Delet the Commission ?"
																	onClickYes={handleDeletCommission}
																	onClickNo={() => setDeleteId(null)}
																	position="top"
																/>
															)}
														</span>
													</td>
												</tr>
											);
										})}
								</tbody>
							</table>
						</AdminCardPrimary>
					</div>
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
								type="text"
								autoComplete="off"
								value={editVal}
								onChange={(e) => setEditVal(e.target.value)}
							/>
						</div>
						<div className="admin-form__group text-right">
							<button type="submit" className="admin-btn admin-btn--primary">
								Save
							</button>
						</div>
					</form>
				</div>
			</AdminPopupModal>
		</>
	);
};

export default MasterCommission;
