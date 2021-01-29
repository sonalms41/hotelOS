import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminToggleSwitch,
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

const MasterPhotoTags = () => {
	const [showEditModal, setShowEditModal] = useState(false);
	const [deletTagId, setDeletTagId] = useState(null);
	const [editCommissionId, setEditCommissionId] = useState(null);

	const [isDelete, setIsDelete] = useState({ id: "" });
	const [editFormValue, setEditFormValue] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const [languages, setLanguages] = useState([]);

	useEffect(() => {
		getData();
	}, []);
	// GET DATA
	const getData = () => {
		masterServices.get
			.languages()
			.then((response) => {
				setLanguages(response.data);
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
				.languages(values)
				.then((response) => {
					toastNotification.success(response.data.message);
					setEditFormValue(null);
					getData();
				})
				.catch((errors) => {
					toastNotification.error(errors);
				});
		} else
			masterServices.post
				.languages(values)
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
	const handleDeletTag = () => {
		setDeletTagId(null);
	};
	const handleCloseConfirmationDialog = () => {
		setDeletTagId(null);
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
						to: "/admin-master/phototags",
						title: "Photo Tags",
					},
				]}
				sectionTitle="Photo Tags"
			/>
			<AdminMasterNav />
			<div className="admin-boardtype-body">
				<div className="col-wrapper">
					<div className="col-item col-item--lg-3">
						<AdminCardPrimary>
							<h3 className="heading-tertiary">Add Ptoto Tags</h3>
							<form className="admin-form" onSubmit={formik.handleSubmit}>
								<AdminFormInput
									label="Tag Name"
									placeholder="Type a tag"
									//id="input-master-language"
									type="text"
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
							<h3 className="heading-tertiary">List Photo Tags</h3>
							<table className="admin-table admin-table--masterlanguage">
								<thead>
									<tr>
										<th className="width-20p">S.N</th>
										<th className="width-40p">Tag Name</th>
										<th className="width-40p text-right">Action</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="width-20p">1</td>
										<td className="width-40p">Front Desk</td>
										<td className="width-40p text-right action">
											<span
												className="edit margin-r-20"
												onClick={() => setShowEditModal(true)}
											>
												<img src={iconEdit} alt="edit" />
											</span>
											<span className="delet">
												<img
													src={iconDelete}
													alt="delet"
													onClick={() => setDeletTagId(1)}
												/>
												{deletTagId === 1 && (
													<AdminConfirmationDialog
														message="Are you sure Delet the Photo Tag ?"
														onClickYes={handleDeletTag}
														onClickNo={handleCloseConfirmationDialog}
														position="top"
													/>
												)}
											</span>
										</td>
									</tr>
								</tbody>
							</table>
						</AdminCardPrimary>
					</div>
				</div>
			</div>
		</>
	);
};

export default MasterPhotoTags;
