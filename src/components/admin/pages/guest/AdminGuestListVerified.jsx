import React, { useState, useEffect } from "react";
import { AdminSectionHeader } from "../../adminUtility";
import { Link } from "react-router-dom";
import { adminGuestServices } from "../../adminServices/guests";
import CustomSpinner from "../../../CustomSpinner";
import Select from "react-select";
import ICON_SEARCH from "./../../../../assets/images/icon/icon-search.svg";

const AdminGuestListVerified = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [verifiedGuests, setVerifiedGuests] = useState([]);

	useEffect(() => {
		setIsLoading(true);
		adminGuestServices.GET.guestsByStatus("Verified")
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					setVerifiedGuests(data.result);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				console.error(errors);
				setIsLoading(false);
			});
	}, []);

	const breadCrumb = [
		{
			to: "/admin-dashboard",
			title: "Dashboard",
		},
		{
			to: "/admin-guest",
			title: "Guest",
		},
		{
			to: "/admin-guest/verified",
			title: "Verified Users",
		},
	];
	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<div className="admin-guest admin-guest--list ">
				<div className="section-header">
					<div className="section-header__col">
						<h2 className="section__title heading-secondary">Verified Users</h2>

						<ul className="section__navigate">
							{breadCrumb.map((path, i) => {
								return (
									<li key={`boreadcrumb-${i}`}>
										<Link to={path.to ? path.to : "#"}> {path.title}</Link>
									</li>
								);
							})}
						</ul>
					</div>

					<div className="section-header__col section-header__right">
						<div className="section-header__search">
							<div className="form-field">
								<span className="form-field__icon">
									<img src={ICON_SEARCH} alt="Search" />
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
									//styles={customStyleProductSort}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="section-body">
					<div className="admin-guest">
						<table className="admin-table ">
							<thead>
								<tr>
									<th className="table__col-1">S.N</th>
									<th className="table__col-2">Guest Gull Name</th>
									<th className="table__col-3">Email Address</th>
									<th className="table__col-4">Phone Number</th>
									<th className="table__col-5">Status</th>
									<th className="table__col-6"></th>
								</tr>
							</thead>

							<tbody>
								{verifiedGuests
									? verifiedGuests.map((guest, i) => {
											return (
												<tr key={`vGuestKey__${i}`}>
													<th className="table__col-1">{guest.id}</th>
													<th className="table__col-2">
														<Link
															to={`/admin-guest/dashboard/${guest.id}`}
															className="guest-list-name"
														>
															{guest.first_name} {guest.last_name}
														</Link>
													</th>
													<th className="table__col-3">static...</th>
													<th className="table__col-4">{guest.phone_number}</th>
													<th className="table__col-5">{guest.status}</th>
													<th className="table__col-6">
														<Link
															to="/admin-guest/dashboard"
															className="anchor-guest-dashboard"
														>
															View Detail
														</Link>
													</th>
												</tr>
											);
									  })
									: "loading..."}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminGuestListVerified;
