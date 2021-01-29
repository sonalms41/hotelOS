import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminToggleSwitch,
	AdminConfirmationDialog,
	AdminSectionHeader,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";
import CustomSpinner from "../../../CustomSpinner";

const AdminMasterBedType = () => {
	
	const [isDelete, setIsDelete] = useState({ id: "" });
	const [editFormValue, setEditFormValue] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const [bedType, setBedType] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	// GET DATA
	const getData = () => {
		masterServices.get
			.bedType()
			.then((response) => {
				setBedType(response.data.result);
			})
			.catch((errors) => {
			toastNotification.error(errors)
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
				.bedType(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					setEditFormValue(null);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors)
				});
		} else
			masterServices.post
				.bedType(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors)
				});
	};

	// INTEGRATE FORMIK
	const formik = useFormik({
		initialValues: editFormValue || initialValues,
		enableReinitialize: true,
		validate,
		onSubmit,
	});

	// DELETE CATEGORY
	const handleDelete = (id) => {
		masterServices.delete
			.bedType(id)
			.then((response) => {
				const responseMessage = response.data.message;
				setBedType({
					responseMessage: `${responseMessage}`,
				});
				getData();
			})
			.catch((errors) => {
				setBedType({
					errors: `${errors}`,
				});
			});
	};

	// HANDLE EDIT
	const handleEdit = (id) => {
		const editd = bedType.filter((data) => {
			return data.id == id;
		});
		setEditFormValue(editd[0]);
	};

	const handleCheckboxChange = (id) => {
		const toggleCheckbox = bedType.filter((method) => {
			return method.id == id;
		});
		const values = {
			id: id,
			status: toggleCheckbox[0] == null ? false : !toggleCheckbox[0].status,
		};

		masterServices.patch
			.bedType(values)
			.then((response) => {
				toastNotification.success(response.data.message)
				getData();
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	return (
		<>
			{/*Show spinner when loading the data*/}
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
						to: "/admin-master/bed-type",
						title: "Bed type",
					},
				]}
				sectionTitle="Bed type"
			/>
			<AdminMasterNav />
			<div className="admin-boardtype-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Bed Type</h3>
							<form
								className="admin-form"
								onSubmit={formik.handleSubmit}
								autoComplete="off"
							>
								<AdminFormInput
									label="Bed Type"
									placeholder="Bed Type"
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
								/>
								<AdminFormInput
									label="No of Bed"
									placeholder="No of Bed"
									name="bedNumber"
									type="text"
									//onChange={formik.handleChange}
									//value={formik.values.name}
									//onBlur={formik.handleBlur}
									//errors={
									//	formik.touched.name && formik.errors.name
									//		? formik.errors.name
									//		: ""
									//}
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
							<h3 className="heading-tertiary">Lists Bed Type</h3>
							{bedType.errors && (
								<div className="admin-datafetch-error">{bedType.errors}</div>
							)}
							<table className="admin-table admin-table--masterpayment">
								<thead>
									<tr>
										<th className="table__col-1">SN</th>
										<th className="table__col-2">Bed Type</th>
										<th className="table__col-3">Activate/Deactivate</th>
										<th className="table__col-4">Action</th>
									</tr>
								</thead>

								<tbody>
									{bedType &&
										bedType.map((bedtype, i) => {
											return (
												<tr key={bedtype.id}>
													<th className="table__col-1">{i + 1}</th>
													<td className="table__col-2">{bedtype.name}</td>
													<td className="table__col-3">
														<AdminToggleSwitch
															inputClassName=""
															labelClassName=""
															id={bedtype.id}
															checked={
																bedtype.status === null ? false : bedtype.status
															}
															checked={bedtype.status}
															onChange={() => handleCheckboxChange(bedtype.id)}
														/>
													</td>

													<td className="table__col-4 table__col-groupaction">
														<a
															className="table__col-edit"
															onClick={() => handleEdit(bedtype.id)}
														>
															<img src={IconEdit} alt="Edit" />
														</a>
														{/*<a
															className="table__col-delete"
															onClick={() =>
																setIsDelete({
																	id:
																		isDelete.id === bedtype.id
																			? null
																			: bedtype.id,
																})
															}
														>
															{isDelete.id == bedtype.id && (
																<AdminConfirmationDialog
																	onClickYes={() => handleDelete(bedtype.id)}
																	message="Are you sure to Delete ?"
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
		</>
	);
};

export default AdminMasterBedType;
