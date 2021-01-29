import React, { useEffect, useState, useCallback } from "react";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminSectionHeader,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import CustomSpinner from "../../../CustomSpinner";
import masterService from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const MasterOccupancy = () => {
	const [editFormValue, setEditFormValue] = useState(null);
	const [occupancy, setOccupancy] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getData();
	}, []);

	const initialValues = {
		name: "",
		maxNumberOfPerson: "",
	};

	const getData = () => {
		masterService.get
			.occupancy()
			.then((response) => {
				setOccupancy(response.data);
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
		setIsLoading(false);
	};

	const formik = useFormik({
		initialValues: editFormValue || initialValues,
		enableReinitialize: true,
		validate: (values) => {
			let errors = {};
			if (!values.name) {
				errors.name = "Required";
			}
			if (!values.maxNumberOfPerson) {
				errors.maxNumberOfPerson = "Required";
			}
			return errors;
		},
		onSubmit: (values, onSubmitProps) => {
			onSubmitProps.resetForm();

			if (editFormValue) {
				masterService.put
					.occupancy(values)
					.then((response) => {
						toastNotification.success(response.data.message);
						if (response.data.status == "Success") {
							setEditFormValue(null);
							getData();
						}
					})
					.catch((errors) => {
						toastNotification.error(errors);
					});
			} else {
				masterService.post
					.occupancy(values)
					.then((response) => {
						toastNotification.success(response.data.message);
						getData();
					})
					.catch((errors) => {
						toastNotification.error(errors);
					});
			}
		},
	});

	// DELETE OCCUPANCY
	//const handleDelete = (id) => {
	//	masterService.delete
	//		.occupancy(id)
	//		.then((response) => {
	//			const responseMessage = response.data.message;
	//			setOccupancy({ responseMessage: `${responseMessage}` });
	//			getData();
	//		})
	//		.catch((errors) => {
	//			setOccupancy({ errors });
	//		});
	//};

	// EDIT OCCUPANCY
	const handleEdit = (id) => {
		const occupancyToEdit = occupancy.filter((data) => {
			return data.id == id;
		});
		setEditFormValue(occupancyToEdit[0]);
	};

	return (
		<>
			<CustomSpinner isLoading={isLoading} />

			<div className="admin-occupancy-body">
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
							to: "/admin-master/occupancy",
							title: "Occupancy",
						},
					]}
					sectionTitle="Occupancy"
				/>
				<AdminMasterNav />

				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Occupancy</h3>
							<form className="admin-form" onSubmit={formik.handleSubmit}>
								<AdminFormInput
									label="Occupancy Name"
									placeholder="Occupancy Name"
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
									label="Max Capacity"
									placeholder="Max Capacity"
									name="maxNumberOfPerson"
									type="number"
									onChange={formik.handleChange}
									value={formik.values.maxNumberOfPerson}
									onBlur={formik.handleBlur}
									errors={
										formik.touched.maxNumberOfPerson &&
										formik.errors.maxNumberOfPerson
											? formik.errors.maxNumberOfPerson
											: ""
									}
								/>
								<div className="admin-form__group-multiple">
									<AdminButtonSecondary
										title="Cancel"
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
							<h3 className="heading-tertiary">List Occupancy</h3>
							<table className="admin-table admin-table--masteroccupancy">
								<thead>
									<tr>
										<th className="table__col-1">SN</th>
										<th className="table__col-2">Occupancy Name</th>
										<th className="table__col-3">Max Capacity</th>
										<th className="table__col-4">Action</th>
									</tr>
								</thead>

								<tbody>
									{occupancy &&
										occupancy.map((room, i) => {
											return (
												<tr key={`admin-master-addroom${room.id}`}>
													<th className="table__col-1">{i + 1}</th>
													<td className="table__col-2">{room.name}</td>
													<td className="table__col-3">
														{room.maxNumberOfPerson}
													</td>

													<td className="table__col-4 table__col-groupaction">
														<a
															className="table__col-edit"
															onClick={() => handleEdit(room.id)}
														>
															<img src={IconEdit} alt="Edit" />
														</a>
														{/*<a
															className="table__col-delete"
															onClick={() =>
																setIsDelete({
																	id: isDelete.id == room.id ? null : room.id,
																})
															}
														>
															{isDelete.id == room.id && (
																<AdminConfirmationDialog
																	onClickYes={() => handleDelete(room.id)}
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
		</>
	);
};

export default MasterOccupancy;
