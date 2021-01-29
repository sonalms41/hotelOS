import React, { useState } from "react";

import Select from "react-select";

// ICON
import IconSearch from "./../../../../assets/images/icon/icon-search.svg";
import { Link } from "react-router-dom";

const PropertyVerified = () => {
	const [sortOption, setSortOption] = useState([
		"option 1",
		"option 2",
		"option 3",
	]);
	return (
		<section className="section section-users verified-users">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">Verified User</h2>
					<ul className="section__navigate">
						<li>Dashboard</li>
						<li>Users</li>
						<li className="active">Verified Users</li>
					</ul>
				</div>
				<div className="section-header__col section-header__right">
					<div className="section-header__search">
						<div class="form-field">
							<span className="form-field__icon">
								<img src={IconSearch} alt="Search" />
							</span>
							<input type="text" placeholder="Search..." />
						</div>
					</div>
					<div className="section-header__sort">
						<div className="title">Sort By</div>
						<div className="sort-list">
							<Select
								className="basic-single"
								classNamePrefix="select"
								options={sortOption}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="section-body">
				<table className="v-user-list">
					<thead>
						<tr>
							<th className="v-user-list__sn">S.N</th>
							<th className="v-user-list__name">Full Name</th>
							<th className="v-user-list__email">Email Address</th>
							<th className="v-user-list__ph-number">Phone Number</th>
							<th className="v-user-list__status">Status</th>
							<th className="v-user-list__view-more"></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="v-user-list__sn">1</td>
							<td className="v-user-list__name">
								<Link to="/user/verified_user/user_analytics">User Name</Link>
							</td>
							<td className="v-user-list__email">User email</td>
							<td className="v-user-list__ph-number">654665</td>
							<td className="v-user-list__status">Active</td>
							<td className="v-user-list__view-more">
								<Link>View more</Link>
							</td>
						</tr>
						<tr>
							<td className="v-user-list__sn">1</td>
							<td className="v-user-list__name">
								<Link to="/user/verified_user/user_analytics">User Name</Link>
							</td>
							<td className="v-user-list__email">User email</td>
							<td className="v-user-list__ph-number">654665</td>
							<td className="v-user-list__status">Active</td>
							<td className="v-user-list__view-more">
								<Link>View more</Link>
							</td>
						</tr>
						<tr>
							<td className="v-user-list__sn">1</td>
							<td className="v-user-list__name">
								<Link to="/user/verified_user/user_analytics">User Name</Link>
							</td>
							<td className="v-user-list__email">User email</td>
							<td className="v-user-list__ph-number">654665</td>
							<td className="v-user-list__status">Active</td>
							<td className="v-user-list__view-more">
								<Link>View more</Link>
							</td>
						</tr>
						<tr>
							<td className="v-user-list__sn">1</td>
							<td className="v-user-list__name">
								<Link to="/user/verified_user/user_analytics">User Name</Link>
							</td>
							<td className="v-user-list__email">User email</td>
							<td className="v-user-list__ph-number">654665</td>
							<td className="v-user-list__status">Active</td>
							<td className="v-user-list__view-more">
								<Link>View more</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default PropertyVerified;
