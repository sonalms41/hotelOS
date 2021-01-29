import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AdminConfirmationDialog, toastNotification } from "../adminUtility";
import adminPropServices from "../adminServices/property";
import { AdminGetDataContext } from "./../contextApi";
import CustomSpinner from "../../CustomSpinner";
import Select from "react-select";
import IconSearch from "./../../../assets/images/icon/icon-search.svg";
import { customStyleProductSort } from "../adminUtility";
import propertyServices from "./../adminServices/property";

const AdminSectionHeader = (props) => {
	const PROPERTY_ID = useParams().id;
	const [propDetail, setPropDetail] = useState([]);
	const {
		sectionTitle,
		breadCrumb,
		propertyId,
		propertyDetailPage,
		adminGuestListPage,
	} = props;
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext);

	useEffect(() => {
		getBasicInfo(propertyId);
	}, []);

	const [confirmation, setConfirmation] = useState({
		verify: false,
		reject: false,
		report: false,
		deactivate: false,
		block: false,

		responseMessage: "",
		notification: {
			verify: "",
			reject: "",
			report: "",
			deactivate: "",
			block: "",
		},
		statusCode: {
			verify: "",
			reject: "",
			report: "",
			deactivate: "",
			block: "",
		},
	});

	const getPropertyDetail = () => {
		propertyServices.get
			.basicInfo(PROPERTY_ID)
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					const propDetail = data.result;
					console.log("property-detail:", propDetail);
					setPropDetail(propDetail);
				}
			})
			.catch((errors) => {
				console.error("errors:", errors);
			});
	};
	useEffect(() => {
		getPropertyDetail();
	}, []);

	// REJECT OR VERIFY PROPERTY
	const toggleVerifyConfirmaton = () => {
		setConfirmation({ verify: !confirmation.verify });
	};
	const toggleRejectConfirmaton = () => {
		setConfirmation({ reject: !confirmation.reject });
	};
	const toggleBlockConfirmaton = () => {
		setConfirmation({ block: !confirmation.block });
	};
	const toggleReportConfirmaton = () => {
		setConfirmation({ report: !confirmation.report });
	};
	const toggleDeactivateConfirmaton = () => {
		setConfirmation({ deactivate: !confirmation.deactivate });
	};

	// HANDLE-VERIFY
	const handleVerifyProperty = (propId) => {
		adminPropServices.put
			.propertyStatusChange({
				prop_id: propId,
				prop_status: "Verified",
			})
			.then((response) => {
				toastNotification.success(response.data.message);
				setConfirmation({
					notification: {
						verify: true,
					},
					statusCode: {
						verify: response.status,
					},
				});
				getPropertyDetail();
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setConfirmation({
					notification: {
						verify: true,
					},
				});
			});
	};

	// HANDLE-REJECT
	const handleRejectProperty = (propId) => {
		adminPropServices.put
			.propertyStatusChange({
				prop_id: propId,
				prop_status: "Rejected",
			})
			.then((response) => {
				toastNotification.success(response.data.message);
				setConfirmation({
					notification: {
						reject: true,
					},
					statusCode: {
						reject: response.status,
					},
				});
				getPropertyDetail();
			})

			.catch((errors) => {
				toastNotification.error(errors);
				setConfirmation({
					notification: {
						reject: true,
					},
				});
			});
	};

	// HANDLE-BLOCK
	const handleBlockProperty = (propId) => {
		adminPropServices.put
			.propertyStatusChange({
				prop_id: propId,
				prop_status: "Blocked",
			})
			.then((response) => {
				toastNotification.success(response.data.message);
				setConfirmation({
					notification: {
						block: true,
					},
					statusCode: {
						block: response.status,
					},
				});
				getPropertyDetail();
			})

			.catch((errors) => {
				toastNotification.error(errors);
				setConfirmation({
					notification: {
						block: true,
					},
				});
			});
	};

	// HANDLE-REPORT
	const handleReportProperty = (propId) => {
		adminPropServices.put
			.propertyStatusChange({
				prop_id: propId,
				prop_status: "Reported",
			})
			.then((response) => {
				toastNotification.success(response.data.message);
				setConfirmation({
					notification: {
						report: true,
					},
					statusCode: {
						report: response.status,
					},
				});
				getPropertyDetail();
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setConfirmation({
					notification: {
						report: true,
					},
				});
			});
	};

	// HANDLE-DEACTIVATE
	const handleDeactivateProperty = (propId) => {
		adminPropServices.put
			.propertyStatusChange({
				prop_id: propId,
				prop_status: "Deactivated",
			})
			.then((response) => {
				toastNotification.success(response.data.message);
				setConfirmation({
					notification: {
						deactivate: true,
					},
					statusCode: {
						deactivate: response.status,
					},
				});
				getPropertyDetail();
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setConfirmation({
					notification: {
						deactivate: true,
					},
				});
			});
	};

	return (
		<>
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">{sectionTitle} </h2>
					{breadCrumb && (
						<ul className="section__navigate">
							{breadCrumb.map((path, i) => {
								return (
									<li key={`boreadcrumb-${i}`}>
										<Link to={path.to ? path.to : "#"}> {path.title}</Link>
									</li>
								);
							})}
						</ul>
					)}
				</div>

				{/*THIS SECTION WORKS ONLY ON PROPERTY-DETAIL PAGE*/}
				{propertyDetailPage && (
					<div className="section-header__col section-header__right change-property-status">
						{propDetail ? (
							<ul className="section-header__set-status">
								{propDetail.property_status !== "Verified" ? (
									<li className="verify">
										{confirmation.verify && (
											<AdminConfirmationDialog
												className="prop-verify"
												message="Are you sure Verify the property ?"
												onClickYes={() => handleVerifyProperty(propertyId)}
												onClickNo={toggleVerifyConfirmaton}
												position="bottom"
											/>
										)}
										<span onClick={toggleVerifyConfirmaton}>Verifiy</span>
									</li>
								) : (
									""
								)}
								{propDetail.property_status !== "Rejected" ? (
									<li className="reject">
										{confirmation.reject && (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Reject the property ?"
												onClickYes={() => handleRejectProperty(propertyId)}
												onClickNo={toggleRejectConfirmaton}
												position="bottom"
											/>
										)}
										<span onClick={toggleRejectConfirmaton}>Reject</span>
									</li>
								) : (
									""
								)}
								{propDetail.property_status !== "Reported" ? (
									<li className="report">
										{confirmation.report && (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Report the property ?"
												onClickYes={() => handleReportProperty(propertyId)}
												onClickNo={toggleReportConfirmaton}
												position="bottom"
											/>
										)}

										<span onClick={toggleReportConfirmaton}>Report</span>
									</li>
								) : (
									""
								)}
								{propDetail.property_status !== "Deactivated" ? (
									<li className="deactivate">
										{confirmation.deactivate && (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Deactivate the property ?"
												onClickYes={() => handleDeactivateProperty(propertyId)}
												onClickNo={toggleDeactivateConfirmaton}
												position="bottom"
											/>
										)}

										<span onClick={toggleDeactivateConfirmaton}>
											Deactivate
										</span>
									</li>
								) : (
									""
								)}
								{propDetail.property_status !== "Blocked" ? (
									<li className="block">
										{confirmation.block && (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Block the property ?"
												onClickYes={() => handleBlockProperty(propertyId)}
												onClickNo={toggleBlockConfirmaton}
												position="bottom"
											/>
										)}

										<span onClick={toggleBlockConfirmaton}>Blocke</span>
									</li>
								) : (
									""
								)}
							</ul>
						) : (
							<CustomSpinner isLoading={true} />
						)}
					</div>
				)}

				{/* THIS SECTION WORKS ONLY IN ADMIN-GUEST-LIST PAGE*/}
				{adminGuestListPage && (
					<div className="section-header__col section-header__right">
						<div className="section-header__search">
							<div className="form-field">
								<span className="form-field__icon">
									<img src={IconSearch} alt="Search" />
								</span>
								<input
									type="text"
									name="filterText"
									//value={filterText}
									//onChange={changeFilterText}
									placeholder="Search..."
								/>
							</div>
						</div>
						<div className="section-header__sort">
							<div className="title">Sort By</div>
							<div className="sort-list">
								<Select
									defaultValue="Name"
									options={[{ value: "Name", label: "Name" }]}
									//formatGroupLabel={formatSortOption}
									//onChange={onChangeSelecSort}
									className="property-sort-select"
									classNamePrefix="property-sort-select"
									styles={customStyleProductSort}
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default AdminSectionHeader;
