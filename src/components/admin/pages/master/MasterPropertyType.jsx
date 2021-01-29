import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
//import IconDelete from "./../../../../assets/images/icon/icon-delete.svg";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminToggleSwitch,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminSectionHeader,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import CustomSpinner from "../../../CustomSpinner";
import masterServices from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const MasterPropertyType = () => {
	const handleToggleSwitch = () => {};
	const [editFormValue, setEditFormValue] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [propertyType, setPropertyType] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = () => {
		masterServices.get
			.propertyType()
			.then((response) => {
				setPropertyType(response.data.result);
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
				.propertyType(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					setEditFormValue(null);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		} else {
			masterServices.post
				.propertyType(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		}
	};

	// INTEGRATE FORMIK
	const formik = useFormik({
		initialValues: editFormValue || initialValues,
		enableReinitialize: true,
		validate,
		onSubmit,
	});

	// DELETE OCCUPANCY
	//const handleDelete = (id) => {
	//	masterServices.delete
	//		.propertyType(id)
	//		.then((response) => {
	//			getData();
	//			setTimeout(() => {
	//				const responseMessage = response.data.message;
	//				setPropertyType({ responseMessage: `${responseMessage}` });
	//			}, 500);
	//		})
	//		.catch((errors) => {
	//			setPropertyType({
	//				errors: `${errors}`,
	//			});
	//		});
	//};

	// EDIT Property
	const handleEdit = (id) => {
		const editValue = propertyType.filter((data) => {
			return data.id == id;
		});
		setEditFormValue(editValue[0]);
	};

	// TOGGLE ROOM VIEW STATUS
	const togglePropertyStatus = (id) => {
		const toggleCheckbox = propertyType.filter((view) => {
			return view.id == id;
		});

		const values = {
			id: id,
			status: toggleCheckbox[0] == null ? false : !toggleCheckbox[0].status,
		};

		masterServices.patch
			.propertyType(values)
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
			{/*Show spinner while fetching data*/}
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
						to: "/admin-master/hotel-property",
						title: "Property Types",
					},
				]}
				sectionTitle="Property Types"
			/>
			<AdminMasterNav />

			<div className="admin-hotelproperty-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Property Type</h3>
							<form className="admin-form" onSubmit={formik.handleSubmit}>
								<AdminFormInput
									label="Property Type"
									placeholder="Property Type"
									name="name"
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
										title="Reset"
										type="reset"
										onClick={formik.resetForm}
									/>
									<AdminButtonPrimary title="Submit" type="submit" />
								</div>
							</form>
						</AdminCardPrimary>
					</div>
					<div className="col-item col-item--lg-9">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Property List</h3>
							<table className="admin-table admin-table--masterhotelproperty">
								<thead>
									<tr>
										<th className="table__col-1">SN</th>
										<th className="table__col-2">Property Type</th>
										<th className="table__col-3">Deactivate / Activated</th>
										<th className="table__col-4">Action</th>
									</tr>
								</thead>

								<tbody>
									{propertyType &&
										propertyType.map((propType, index) => {
											return (
												<tr key={propType.id}>
													<th className="table__col-1">{index + 1}</th>
													<td className="table__col-2">{propType.name}</td>
													<td className="table__col-3">
														<AdminToggleSwitch
															onClick={handleToggleSwitch}
															id={propType.id}
															checked={
																propType.status == null
																	? false
																	: propType.status
															}
															checked={propType.status}
															inputClassName="input-adminhotel-toggleactive"
															labelClassName="label-adminhotel-toggleactive"
															onChange={() => togglePropertyStatus(propType.id)}
														/>
													</td>

													<td className="table__col-4 table__col-groupaction">
														<a
															className="table__col-edit"
															onClick={() => handleEdit(propType.id)}
														>
															<img src={IconEdit} alt="Edit" />
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

export default MasterPropertyType;
