import React, { useEffect, useState } from "react";
import PropertyStatusCard from "./propUtility/PropertyStatusCard";
import { Link } from "react-router-dom";
import CustomSpinner from "../../../CustomSpinner";
import propertyServices from "./../../adminServices/property";
import iconPropertyPath from "./../../../../assets/images/icon/icon-prop-path.svg";
const PropertyIndex = () => {
	const [propertyStatus, setPropertyStatus] = useState({
		data: [],
		errors: "",
	});
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		// GET property based on status
		// Create a array of object
		// The object contains property-status and total number of property on that particular status
		propertyServices.get
			.allProperty()
			.then((response) => {
				const hotels = response.data.result;
				const propPending = {
					propStatus: "Pending",
					propNumber: 0,
				};
				const propVerified = {
					propStatus: "Verified",
					propNumber: 0,
				};
				const propRejected = {
					propStatus: "Rejected",
					propNumber: 0,
				};
				const propDeactivated = {
					propStatus: "Deactivated",
					propNumber: 0,
				};
				const propBlocked = {
					propStatus: "Blocked",
					propNumber: 0,
				};
				const propReported = {
					propStatus: "Reported",
					propNumber: 0,
				};
				for (let i = 0; i < hotels.length; i++) {
					if (hotels[i].prop_status === "Pending") {
						propPending.propNumber += 1;
					}
					if (hotels[i].prop_status === "Verified") {
						propVerified.propNumber += 1;
					}
					if (hotels[i].prop_status === "Rejected") {
						propRejected.propNumber += 1;
					}
					if (hotels[i].prop_status === "Deactivated") {
						propDeactivated.propNumber += 1;
					}
					if (hotels[i].prop_status === "Blocked") {
						propBlocked.propNumber += 1;
					}
					if (hotels[i].prop_status === "Reported") {
						propReported.propNumber += 1;
					}
				}
				setPropertyStatus({
					data: [
						propVerified,
						propPending,
						propRejected,
						propDeactivated,
						propBlocked,
						propReported,
					],
				});
				setIsLoading(false);
			})
			.catch((errors) => {
				setPropertyStatus({ error: `${errors}` });
			});
	}, []);

	return (
		<>
			{/*Show spinner while fetching data*/}
			<CustomSpinner isLoading={isLoading} />
			{isLoading ? (
				<CustomSpinner isLoading={isLoading} />
			) : (
				<section className="section section-property">
					<div className="section-header">
						<div className="section-header__col">
							<h2 className="section__title heading-secondary">Property</h2>
							<ul className="section__navigate">
								<li>
									<Link to="/admin-dashboard">Dashboard</Link>
								</li>
								<li className="active">Property</li>
							</ul>
						</div>
					</div>
					<div className="section-body">
						<div className="section-body__row row-1 flex">
							<div className="col-wrapper row-1__col-1">
								{/*If encounter errors then show here*/}
								{propertyStatus.errors && (
									<div className="admin-getdata-error">
										{propertyStatus.errors}
									</div>
								)}

								{/*Display data*/}
								{propertyStatus.data &&
									propertyStatus.data.map((property, i) => {
										return (
											<PropertyStatusCard
												propertyNumber={property.propNumber}
												propertyStatus={property.propStatus}
												index={i}
												key={`sdfdsfsd-5657687-${i}`}
											/>
										);
									})}
							</div>
							<div className="property-col-sm row-1__col-2">
								<Link to="/admin-property/register"> + Add Property</Link>
							</div>
						</div>
						<div className="section-body__row row-2">
							<div className="row-2__col-1">
								<div className="col-wrapper ">
									<div className="col-item col-item--lg-4">
										<Link to="/admin-property/commission">
											<div className="commission-card card-primary  flex-aC-jFS">
												<div className="card__col-1 margin-r-20">
													<img
														src={iconPropertyPath}
														alt="property commission"
													/>
												</div>
												<div className="card__col-2">Commission</div>
											</div>
										</Link>
									</div>
								</div>
							</div>
							<div className="row-2__col-2"></div>
						</div>
					</div>
				</section>
			)}
		</>
	);
};

export default PropertyIndex;
