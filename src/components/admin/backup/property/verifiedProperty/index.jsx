import React, { useState } from "react";
import VerifiedPropertyCard from "../propUtility/VerifiedPropertyCard";

import Select from "react-select";

// ICON
import IconSearch from "./../../../../assets/images/icon/icon-search.svg";
import IconArrowDropdown from "./../../../../assets/images/icon/icon-arrow-dropdown.svg";

const PropertyVerified = () => {
	const [sortOption, setSortOption] = useState([
		"option 1",
		"option 2",
		"option 3",
	]);
	return (
		<section className="section section-property verified-property">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">
						Verified Property
					</h2>
					<ul className="section__navigate">
						<li>Dashboard</li>
						<li>Property</li>
						<li className="active">Verified Property</li>
					</ul>
				</div>
				<div className="section-header__col verified-property__header-right">
					<div className="verified-property__search">
						<div class="form-field">
							<span className="form-field__icon">
								<img src={IconSearch} alt="Search" />
							</span>
							<input type="text" placeholder="Search..." />
						</div>
					</div>
					<div className="verified-property__sort">
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
				<div className="col-wrapper ">
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
					<VerifiedPropertyCard
						title="Sangrila Hotel Pvt. Ltd"
						address="Lazimpat, Kathmandu, Nepal 44600"
						room="20"
						floor="6"
						type="Hotel"
					/>
				</div>
			</div>
		</section>
	);
};

export default PropertyVerified;
