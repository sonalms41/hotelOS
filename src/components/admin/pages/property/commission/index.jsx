import React, { useState, useEffect } from "react";
import {
	AdminConfirmationDialog,
	AdminSectionHeader,
	toastNotification,
} from "../../../adminUtility";
import iconEdit from "./../../../../../assets/images/icon/icon-edit.svg";
import iconDelete from "./../../../../../assets/images/icon/icon-delete.svg";
import AdminPopupModal from "../../../adminUtility/AdminPopupModal";
import adminMasterServices from "../../../adminServices/master";
import CustomSpinner from "../../../../CustomSpinner";
import { Link } from "react-router-dom";
const AdminCommission = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const [deletId, setDeleteId] = useState(null);
	const [properties, setProperties] = useState(null);

	const [editVal, setEditVal] = useState(null);
	const [editId, setEditId] = useState(null);

	// GET PROPERTY-WITH COMMISSION
	const getProperty = () => {
		setIsLoading(true);
		adminMasterServices.get
			.masterCommission()
			.then((response) => {
				const data = response.data;
				console.log("response-data", data);
				if (data.status === 200) {
					setProperties(data.result);
					console.log(data.result);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setIsLoading(false);
			});
	};
	useEffect(() => {
		getProperty();
	}, []);
	// EDIT
	const handleEditCommission = (e) => {
		e.preventDefault();
		const postValue = {
			propertyinformation: editId,
			master_commission: editVal,
		};
		adminMasterServices.patch
			.masterCommission(postValue)
			.then((response) => {
				toastNotification.success(response.data.message);
				if (response.data.status === 200) {
					getProperty();
					setShowEditModal(false);
				}
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	// DELETE
	const handleDeletCommission = () => {
		const delValue = {
			propertyinformation: deletId,
		};
		console.log("delet-request-value", delValue);

		adminMasterServices.delete
			.masterCommission(delValue)
			.then((response) => {
				console.log("delet-response", response);
			})
			.catch((errors) => {
				console.log("delet-errors", errors);
			});
		setDeleteId(null);
	};

	const handleCloseConfirmationDialog = () => {
		setDeleteId(null);
	};
	const handleInputChange = (e) => {
		const value = e.target.value;
		setEditVal(value);
	};

	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<div className="admin-commission">
				<AdminSectionHeader
					breadCrumb={[
						{
							to: "/admin-dashboard",
							title: "Dashboard",
						},

						{
							to: "/admin-property",
							title: "Property",
						},
						{
							to: "/admin-property/commission",
							title: "Commission",
						},
					]}
					sectionTitle="Commission"
				/>
				<div className="card-primary">
					<table className="admin-table admin-table--masteroccupancy">
						<thead>
							<tr>
								<th className="width-5p">S.N</th>
								<th className="width-25p">Property Name</th>
								<th className="width-15p">Property ID</th>
								<th className="width-20p">Address</th>
								<th className="width-15p text-right">Commission</th>
								<th className="width-20p text-right">Action</th>
							</tr>
						</thead>
						<tbody>
							{properties &&
								properties.length >= 1 &&
								properties.map((data, i) => {
									return (
										<tr key={`commission_key-${i}`}>
											<td className="width-5p">{i + 1}</td>
											<td className="width-25p">
												<Link
													to={`/admin-property/dashboard/${data.propertyInfo.id}`}
												>
													{data.propertyInfo.name}
												</Link>
											</td>
											<td className="width-15p">{data.propertyInfo.id}</td>
											<td className="width-20p">{data.propertyInfo.city}</td>
											<td className="width-15p text-right">
												{data.master_commission}%
											</td>
											<td className="width-20p text-right action">
												<span
													className="edit margin-r-20"
													onClick={() => {
														setEditVal(data.master_commission);
														setEditId(data.propertyInfo.id);
														setShowEditModal(true);
													}}
												>
													<img src={iconEdit} alt="edit" />
												</span>
												{/*<span className="delet">
													<img
														src={iconDelete}
														alt="delet"
														onClick={() => setDeleteId(data.propertyInfo.id)}
													/>
													{deletId === data.propertyInfo.id && (
														<AdminConfirmationDialog
															message="Are you sure Delet the Commission ?"
															onClickYes={handleDeletCommission}
															onClickNo={handleCloseConfirmationDialog}
															position="top"
														/>
													)}
												</span>*/}
											</td>
										</tr>
									);
								})}
						</tbody>
					</table>
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
									onChange={handleInputChange}
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
			</div>
		</>
	);
};

export default AdminCommission;
