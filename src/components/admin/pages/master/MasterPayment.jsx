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
import IconDelete from "./../../../../assets/images/icon/icon-delete.svg";

import CustomSpinner from "../../../CustomSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

toast.configure();
const AdminMasterPayment = () => {
	const [isDelete, setIsDelete] = useState({ id: "" });
	const [isLoading, setIsLoading] = useState(true);
	const [editFormValue, setEditFormValue] = useState(null);
	const [paymentMethod, setPaymentMethod] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	// INITIAL VALUE
	const initialValues = {
		name: "",
		status: null,
	};

	// GET DATA
	const getData = () => {
		masterServices.get
			.paymentMethod()
			.then((response) => {
				setPaymentMethod(response.data);
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
		setIsLoading(false);
	};

	// VALIDATE FORM-DATA
	const validate = (values) => {
		let errors = {};
		if (!values.name) {
			errors.name = "Required";
		}

		if (!values.status) {
			errors.status = "Required";
		}
		return errors;
	};

	// SUBMIT-DATA
	const onSubmit = (values, onSubmitProps) => {
		onSubmitProps.resetForm();
		if (editFormValue) {
			masterServices.patch
				.paymentMethod(values)
				.then((response) => {
					setTimeout(() => {
						setEditFormValue(null);
						toastNotification.success(response.data.message);
					}, 500);
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		} else
			masterServices.post
				.paymentMethod(values)
				.then((response) => {
					getData();
					setTimeout(() => {
						toastNotification.success(response.data.message);
					}, 500);
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
	};

	// INTEGRATE FORMIK
	const formik = useFormik({
		initialValues: editFormValue || initialValues,
		enableReinitialize: true,

		validate: (values) => {
			let errors = {};
			if (!values.name) {
				errors.name = "Required";
			}
			return errors;
		},
		onSubmit,
	});

	// DELETE CATEGORY
	const handleDelete = (id) => {
		masterServices.delete
			.paymentMethod(id)
			.then((response) => {
				toastNotification.success(response.data.message);
				getData();
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	// HANDLE EDIT
	const handleEdit = (id) => {
		const editd = paymentMethod.filter((data) => {
			return data.id === id;
		});
		setEditFormValue(editd[0]);
	};

	const handleCheckboxChange = (id) => {
		const toggleCheckbox = paymentMethod.filter((method) => {
			return method.id === id;
		});

		const values = {
			id: id,
			status: toggleCheckbox[0] === null ? false : !toggleCheckbox[0].status,
		};

		masterServices.patch
			.paymentMethod(values)
			.then((response) => {
				toastNotification.success(response.data.message);
				getData();
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
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
						to: "/admin-master/payment",
						title: "Payment",
					},
				]}
				sectionTitle="Payment"
			/>
			<AdminMasterNav />
			<div className="admin-boardtype-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Payment Method</h3>
							<form
								className="admin-form"
								onSubmit={formik.handleSubmit}
								autoComplete="off"
							>
								<AdminFormInput
									label="Payment Method"
									placeholder="Type Payment Method"
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
							<h3 className="heading-tertiary">Lists Payment Method</h3>{" "}
							<table className="admin-table admin-table--masterpayment">
								<thead>
									<tr>
										<th className="table__col-1">SN</th>
										<th className="table__col-2">Payment Method</th>
										<th className="table__col-3">Deactivate / Activate</th>
										<th className="table__col-4">Action</th>
									</tr>
								</thead>
								<tbody>
									{/*Display Data*/}
									{paymentMethod &&
										paymentMethod.map((payment, i) => {
											return (
												<tr key={payment.id}>
													<th className="table__col-1">{i + 1}</th>
													<td className="table__col-2">{payment.name}</td>
													<td className="table__col-3">
														<AdminToggleSwitch
															inputClassName=""
															labelClassName=""
															id={payment.id}
															checked={
																payment.status === null ? false : payment.status
															}
															checked={payment.status}
															onChange={() => handleCheckboxChange(payment.id)}
														/>
													</td>

													<td className="table__col-4 table__col-groupaction">
														<a
															className="table__col-edit"
															onClick={() => handleEdit(payment.id)}
														>
															<img src={IconEdit} alt="Edit" />
														</a>
														<a
															className="table__col-delete"
															onClick={() =>
																setIsDelete({
																	id:
																		isDelete.id === payment.id
																			? null
																			: payment.id,
																})
															}
														>
															{isDelete.id === payment.id && (
																<AdminConfirmationDialog
																	onClickYes={() => handleDelete(payment.id)}
																	message="Are you sure Delete ?"
																	position="top"
																/>
															)}
															<img src={IconDelete} alt="Delete" />
														</a>
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

export default AdminMasterPayment;
