import React, { useEffect, useContext, useState } from "react";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";
import { CardPrimary, CardSecondary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import IconFeatherInfo from "./../../../../../assets/images/icon/icon-feather-info.svg";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailRoomType = (props) => {
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext),
		[isLoading, setIsLoading] = useState(true),
		[roomType, setRoomType] = useState({
			data: [],
			errors: "",
		});

	const propertyId = props.match.params.id;
	useEffect(() => {
		getBasicInfo(propertyId);

		// Get Amenities
		propertyServices.get
			.roomType(propertyId)
			.then((response) => {
				const data = response.data.result;
				setRoomType({ data });
			})
			.catch((errors) => {
				setRoomType({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

	// Breadcrumb (for path)
	const breadCrumb = [
		{ to: "/admin-dashboard", title: "Dashboard" },
		{ to: "/admin-property", title: "Property" },
		{
			to: `/admin-property/dashboard/${propertyId}`,
			title: "Property Dashboard",
		},
		{
			to: `/admin-property/${
				basicInfo.data.property_status === "Verified"
					? "verified"
					: basicInfo.data.property_status === "Rejected"
					? "rejected"
					: basicInfo.data.property_status === "Blocked"
					? "blocked"
					: basicInfo.data.property_status === "Deactivated"
					? "deactivated"
					: basicInfo.data.property_status === "Reported"
					? "reported"
					: ""
			}`,

			title: basicInfo.data.property_status,
		},
		{
			to: "",
			title: basicInfo.data.property_name,
		},
	];
	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-detail">
				<AdminSectionHeader
					propertyDetailPage={true}
					propertyId={propertyId}
					breadCrumb={basicInfo.data && breadCrumb}
					sectionTitle={basicInfo.data && basicInfo.data.property_name}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<AdminPropDetailNav />
						</div>

						{roomType.error && (
							<div className="admin-getdata-error">{roomType.error}</div>
						)}
						{roomType.data && (
							<div className="col-item col-item--lg-9">
								<CardPrimary>
									<div className="property-detail__item">
										<AdminPropDetailHeading
											title="Room Types"
											propertyName={
												basicInfo.data && basicInfo.data.property_name
											}
											propertyId={propertyId}
											endPoint="propmgmt"
										/>
										<div className="detail-item__body">
											<div className="room-type">
												<div className="col-wrapper">
													{roomType.data.map((room, index) => {
														return (
															<div
																key={`v-prop-rrom-${index}`}
																className="col-item col-item--lg-3"
															>
																<CardSecondary>
																	<div className="room-type__title">
																		<p>{room.name}</p>
																		<img
																			src={IconFeatherInfo}
																			alt="Room type"
																		/>
																	</div>
																	<div className="room-type__info">
																		<p>No of staty people</p>
																		<span>{`min: ${room.min}`}</span>,
																		<span>{`max: ${room.max}`}</span>
																	</div>
																</CardSecondary>
															</div>
														);
													})}
												</div>
											</div>
										</div>
									</div>
								</CardPrimary>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminPropDetailRoomType;
