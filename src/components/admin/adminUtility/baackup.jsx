import React, { useEffect, useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AdminConfirmationDialog, AdminNotification } from "../adminUtility";
import adminPropServices from "../adminServices/property";
import { AdminGetDataContext } from "./../contextApi";
import CustomSpinner from "../../CustomSpinner";

const AdminSectionHeader = (props) => {
	const { propertyTitle, breadCrumb, propertyId, propertyDetailPage } = props;

	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext);
	//const { basicInfo } = propertyDetail;
	//const { getPropertyDetail, propertyDetail } = useContext(AdminGetDataContext);
	//const { basicInfo } = propertyDetail;
	useEffect(() => {
		getPropertyDetail.basicInfo(propertyId);
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
				setConfirmation({
					responseMessage: response.message,
					notification: {
						verify: true,
					},
					statusCode: {
						verify: response.status,
					},
				});
				window.location.reload(true);
			})
			.catch((errors) => {
				setConfirmation({
					responseMessage: errors,
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
				setConfirmation({
					responseMessage: response.message,
					notification: {
						reject: true,
					},
					statusCode: {
						reject: response.status,
					},
				});
				window.location.reload(true);
			})

			.catch((errors) => {
				setConfirmation({
					responseMessage: errors,
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
				setConfirmation({
					responseMessage: response.message,

					notification: {
						block: true,
					},
					statusCode: {
						block: response.status,
					},
				});
				window.location.reload(true);
			})

			.catch((errors) => {
				setConfirmation({
					responseMessage: errors,
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
				setConfirmation({
					responseMessage: response.message,
					notification: {
						report: true,
					},
					statusCode: {
						report: response.status,
					},
				});
				window.location.reload(true);
			})

			.catch((errors) => {
				setConfirmation({
					responseMessage: errors,
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
				setConfirmation({
					responseMessage: response.message,
					notification: {
						deactivate: true,
					},
					statusCode: {
						deactivate: response.status,
					},
				});
				window.location.reload(true);
			})

			.catch((errors) => {
				setConfirmation({
					responseMessage: errors,
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
					<h2 className="section__title heading-secondary">{propertyTitle} </h2>
					<ul className="section__navigate">
						{breadCrumb
							? breadCrumb.map((path, i) => {
									return (
										<li key={`boreadcrumb-${i}`}>
											<Link to={path.to ? path.to : "#"}> {path.title}</Link>
										</li>
									);
							  })
							: ""}
					</ul>
				</div>

				{/*DISPLAY ONLY ON PROPERTY-DETAIL PAGE*/}
				{propertyDetailPage && (
					<div className="section-header__col section-header__right change-property-status">
						{basicInfo && basicInfo.data ? (
							<ul className="section-header__set-status">
								{basicInfo.data.property_status !== "Verified" ? (
									<li className="verify">
										{confirmation.verify ? (
											<AdminConfirmationDialog
												className="prop-verify"
												message="Are you sure Verify the property ?"
												onClickYes={() => handleVerifyProperty(propertyId)}
												onClickNo={toggleVerifyConfirmaton}
												position="bottom"
											/>
										) : (
											""
										)}

										<span onClick={toggleVerifyConfirmaton}>Verifiy</span>
									</li>
								) : (
									""
								)}
								{basicInfo.data.property_status !== "Rejected" ? (
									<li className="reject">
										{confirmation.reject ? (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Reject the property ?"
												onClickYes={() => handleRejectProperty(propertyId)}
												onClickNo={toggleRejectConfirmaton}
												position="bottom"
											/>
										) : (
											""
										)}

										<span onClick={toggleRejectConfirmaton}>Reject</span>
									</li>
								) : (
									""
								)}
								{basicInfo.data.property_status !== "Reported" ? (
									<li className="report">
										{confirmation.report ? (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Report the property ?"
												onClickYes={() => handleReportProperty(propertyId)}
												onClickNo={toggleReportConfirmaton}
												position="bottom"
											/>
										) : (
											""
										)}

										<span onClick={toggleReportConfirmaton}>Report</span>
									</li>
								) : (
									""
								)}
								{basicInfo.data.property_status !== "Deactivated" ? (
									<li className="deactivate">
										{confirmation.deactivate ? (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Deactivate the property ?"
												onClickYes={() => handleDeactivateProperty(propertyId)}
												onClickNo={toggleDeactivateConfirmaton}
												position="bottom"
											/>
										) : (
											""
										)}

										<span onClick={toggleDeactivateConfirmaton}>
											Deactivate
										</span>
									</li>
								) : (
									""
								)}
								{basicInfo.data.property_status !== "Blocked" ? (
									<li className="block">
										{confirmation.block ? (
											<AdminConfirmationDialog
												className="prop-reject"
												message="Are you sure Block the property ?"
												onClickYes={() => handleBlockProperty(propertyId)}
												onClickNo={toggleBlockConfirmaton}
												position="bottom"
											/>
										) : (
											""
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

						{/*NOTIFICATION MESSAGE*/}
						{confirmation.message && confirmation.message.verify
							? AdminNotification.info(confirmation.message.verify)
							: confirmation.message && confirmation.message.reject
							? AdminNotification.info(confirmation.message.reject)
							: ""}
					</div>
				)}
			</div>
		</>
	);
};

export default AdminSectionHeader;
