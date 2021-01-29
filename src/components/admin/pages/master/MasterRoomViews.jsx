import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminToggleSwitch,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminSectionHeader,
	reloadWindow,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import CustomSpinner from "../../../CustomSpinner";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const AdminMasterRoomView = () => {
	const [editFormValue, setEditFormValue] = useState(null);
	const [roomView, setRoomView] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		getData();
	}, []);

	// GET REQUEST
	const getData = () => {
		masterServices.get
			.roomView()
			.then((response) => {
				setRoomView(response.data);
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
		setIsLoading(false);
	};

	// INITIAL VALUE
	const initialValues = {
		name: "",
		status: null,
	};

	// VALIDATE FORM-DATA
	const validate = (values) => {
		let errors = {};
		if (!values.name) {
			errors.name = "Required";
		}
		return errors;
	};

	// SUBMIT-DATA
	const onSubmit = (values, onSubmitProps) => {
		onSubmitProps.resetForm();
		if (editFormValue) {
			masterServices.patch
				.roomView(values)
				.then((response) => {
					setEditFormValue(null);
					toastNotification.success(response.data.message);

					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		} else
			masterServices.post
				.roomView(values)

				.then((response) => {
					toastNotification.success(response.data.message);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
	};

	// INTEGRATE FORMIK
	const formik = useFormik({
		initialValues: editFormValue || initialValues,
		enableReinitialize: true,
		validate,
		onSubmit,
	});

	// EDIT ROOM-VIEW
	const handleEdit = (id) => {
		const roomViewToEdit = roomView.filter((data) => {
			return data.id === id;
		});
		setEditFormValue(roomViewToEdit[0]);
	};

	// TOGGLE ROOM VIEW STATUS
	const toggleRoomViewStatus = (id) => {
		const toggleCheckbox = roomView.filter((view) => {
			return view.id === id;
		});

		const values = {
			id: id,
			status: toggleCheckbox[0] === null ? false : !toggleCheckbox[0].status,
		};
		masterServices.patch
			.roomView(values)
			.then((response) => {
				toastNotification.success(response.data.message);
				getData();
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	return (
		<div className="admin-roomView-body">
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
						to: "/admin-master/room-views",
						title: "Room Views",
					},
				]}
				sectionTitle="Room Views"
			/>
			<AdminMasterNav />
			<div className="col-wrapper">
				<div className="col-item col-item--lg-3">
					<AdminCardPrimary>
						<h3 className="heading-tertiary">Add Room View</h3>
						<form className="admin-form" onSubmit={formik.handleSubmit}>
							<AdminFormInput
								label="Room View"
								placeholder="Add Room View"
								name="name"
								type="text"
								onChange={formik.handleChange}
								value={formik.values.name}
								onBlur={formik.handleBlur}
								errors={
									formik.touched.name && formik.errors.name
										? formik.errors.name
										: ""
								}
								id="id"
							/>

							<div className="admin-form__group-multiple">
								<AdminButtonSecondary
									title="Clear"
									type="reset"
									onClick={formik.resetForm}
								/>
								<AdminButtonPrimary title="Add" type="submit" />
							</div>
						</form>
					</AdminCardPrimary>
				</div>
				<div className="col-item col-item--lg-9">
					<AdminCardPrimary>
						<h3 className="heading-tertiary">Lists Room View</h3>

						<table className="admin-table admin-table--masterroomview">
							<thead>
								<tr>
									<th className="table__col-1">SN</th>
									<th className="table__col-2">Room View</th>
									<th className="table__col-3">Deactivate / Activate</th>
									<th className="table__col-4">Action</th>
								</tr>
							</thead>

							<tbody>
								{roomView &&
									roomView.map((view, index) => {
										return (
											<tr key={`roomviewkey-${view.id}`}>
												<th className="table__col-1">{index + 1}</th>
												<td className="table__col-2">{view.name}</td>
												<td className="table__col-3">
													<AdminToggleSwitch
														inputClassName=""
														labelClassName=""
														name="status"
														id={view.id}
														checked={view.status == null ? false : view.status}
														onChange={() => toggleRoomViewStatus(view.id)}
													/>
												</td>

												<td className="table__col-4 table__col-groupaction">
													<a
														className="table__col-edit"
														onClick={() => handleEdit(view.id)}
													>
														<img src={IconEdit} alt="Edit" />
													</a>
													{/*<a
														className="table__col-delete"
														onClick={() =>
															setIsDelete({
																id: isDelete.id == view.id ? null : view.id,
															})
														}
													>
														{isDelete.id == view.id && (
															<AdminConfirmationDialog
																onClickYes={() => handleDelete(view.id)}
																message="Are you sure Delete ?"
																position="top"
															/>
														)}

														<img src={IconDelete} alt="Delete" />
													</a>*/}
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
	);
};

export default AdminMasterRoomView;
