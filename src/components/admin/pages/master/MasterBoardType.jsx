import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import IconDelete from "./../../../../assets/images/icon/icon-delete.svg";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminCheckboxTab,
	AdminFormTextarea,
	AdminFormSelectNormal,
	AdminConfirmationDialog,
	AdminSectionHeader,
	AdminFormInput,
} from "../../adminUtility";

import CustomSpinner from "../../../CustomSpinner";
import "react-toastify/dist/ReactToastify.css";
import masterService from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";

const MasterBoardType = () => {
	const [editFormValue, setEditFormValue] = useState(null);
	const [isDelete, setIsDelete] = useState({ id: "" });
	const [mealBoard, setMealBoard] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [mealType, setMealType] = useState([]);

	useEffect(() => {
		getData();
		getMealType();
	}, []);

	// GET-DATA
	const getData = () => {
		masterService.get
			.boardType()
			.then((response) => {
				setMealBoard(response.data);
			})
			.catch((error) => {
				toastNotification.error(error);
			});
		setIsLoading(false);
	};
	const getMealType = () => {
		masterService.get
			.mealType()
			.then((response) => {
				setMealType(response.data);
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	// INITIAL VALUE
	const initialValues = {
		boardType: "",
		mealType: "",
		description: "",
		breakfast: true,
		lunch: true,
		dinner: true,
	};

	// VALIDATE FORM-DATA
	const validate = (values) => {
		let errors = {};
		if (!values.description) {
			errors.description = "Required";
		}
		if (!values.boardType) {
			errors.boardType = "Required";
		}
		if (!values.mealType) {
			errors.mealType = "Required";
		}
		return errors;
	};

	// SUBMIT-DATA
	const onSubmit = (values, onSubmitProps) => {
		onSubmitProps.resetForm();
		if (editFormValue) {
			masterService.put
				.boardType(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					setEditFormValue(null);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		} else
			masterService.post
				.boardType(values)
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

	// DELETE OCCUPANCY
	const handleDelete = (id) => {
		masterService.delete
			.boardType(id)
			.then((response) => {
				toastNotification.success(response.data.message);
				getData();
			})
			.catch((errors) => {
				toastNotification.error(errors);
			});
	};

	// EDIT OCCUPANCY
	const handleEdit = (id) => {
		const editFormValue = mealBoard.filter((data) => {
			return data.id === id;
		});
		setEditFormValue(editFormValue[0]);
	};
	return (
		<>
			{/*Show spinner while loading data*/}
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
						to: "/admin-master/board-type",
						title: "Board Type",
					},
				]}
				sectionTitle="Board Type"
			/>
			<AdminMasterNav />
			<div className="admin-boardtype-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add New Board</h3>
							<form className="admin-form" onSubmit={formik.handleSubmit}>
								<AdminFormSelectNormal
									label="Board Type"
									name="boardType"
									placeholder="Select"
									value={formik.values.boardType}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									type="text"
									onBlur={formik.handleBlur}
									errors={
										formik.touched.boardType && formik.errors.boardType
											? formik.errors.boardType
											: ""
									}
									options={["Board Type1", "Board Type2", "Board Type3"]}
								/>

								<AdminFormInput
									label="Meal Type"
									name="mealType"
									placeholder="Meal Type"
									value={formik.values.mealType}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									type="text"
									//id={
									//	mealType && mealType.data
									//		? mealType.data.map((type) => {
									//				return type.id;
									//		  })
									//		: mealType && mealType.errors
									//		? "Network errors"
									//		: "No Data"
									//}
									//options={[
									//	mealType && mealType.data
									//		? mealType.data.map((type) => {
									//				return type.mealType;
									//		  })
									//		: mealType && mealType.errors
									//		? "Network errors"
									//		: "Please insert data ",
									//]}
									onBlur={formik.handleBlur}
									errors={
										formik.touched.mealType_id && formik.errors.mealType_id
											? formik.errors.mealType_id
											: ""
									}
								/>

								<div className="admin-form__group-multiple">
									<AdminCheckboxTab
										id="checkbox-mealbreakfast"
										title="Breakfast"
										checked={true}
									/>
									<AdminCheckboxTab
										id="checkbox-meallunch"
										title="Lunch"
										checked={true}
									/>

									<AdminCheckboxTab
										id="checkbox-mealdinner"
										title="Dinner"
										checked={true}
									/>
								</div>

								<AdminFormTextarea
									type="text"
									label="Description"
									placeholder="Description..."
									id="textarea-mealdescripton"
									name="description"
									value={formik.values.description}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									errors={
										formik.touched.description && formik.errors.description
											? formik.errors.description
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
							<h3 className="heading-tertiary">Lists Board Type</h3>
							{/*If errors encounter while fetching data the nshow here*/}

							<table className="admin-table admin-table--masterboardtype">
								<thead>
									<tr>
										<th className="table__col-1">SN</th>
										<th className="table__col-2">Board Type</th>
										<th className="table__col-3">Meal Type</th>
										<th className="table__col-4">Description</th>
										<th className="table__col-5">Action</th>
									</tr>
								</thead>

								<tbody>
									{/*Display data*/}
									{mealBoard &&
										mealBoard.map((data, i) => {
											return (
												<tr key={data.id}>
													<td className="table__col-1">{i + 1}</td>
													<td className="table__col-2">{data.boardType}</td>
													<td className="table__col-3">{data.mealType}</td>
													<td className="table__col-4">{data.description}</td>
													<td className="table__col-5 table__col-groupaction">
														<a className="table__col-edit">
															<img
																src={IconEdit}
																alt="Edit"
																onClick={() => handleEdit(data.id)}
															/>
														</a>
														<a
															className="table__col-delete"
															onClick={() =>
																setIsDelete({
																	id: isDelete.id == data.id ? null : data.id,
																})
															}
														>
															{isDelete.id === data.id && (
																<AdminConfirmationDialog
																	onClickYes={() => handleDelete(data.id)}
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

export default MasterBoardType;
