import React, { useState, useEffect } from "react";
import PropertyCard from "../../propUtility/PropertyCard";
import Select from "react-select";
import { Link } from "react-router-dom";

// ICON
import IconSearch from "./../../../../../assets/images/icon/icon-search.svg";
import Axios from "axios";
import CustomSpinner from "../../../../CustomSpinner";
import { customStyleProductSort, AdminToggleSwitch } from "../../../adminUtility";

const AdminPropPending = (props) => {
	const [sortOption, setSortOption] = useState([
		"option 1",
		"option 2",
		"option 3",
	]);
	const [propVerified, setPropVerified] = useState([]),
		[backupProperty, setBackupProperty] = useState([]),
		[isLoading, setIsLoading] = useState(true),
		[filterText, setFilterText] = useState(null),
		[isSort, setIsSort] = useState(false);

	// FETCH-DATA
	useEffect(() => {
		const getProps = Axios.get(
			"http://148.72.210.66:9006/client/all-properties/",
		)
			.then((response) => {
				const properties = response.data.result;
				const propVerified = [];
				for (let i = 0; i < properties.length; i++) {
					if (properties[i].prop_status == "Verified") {
						propVerified.push(properties[i]);
					}
				}
				setPropVerified(propVerified);
				setBackupProperty(propVerified);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// SET FILTER TEXT
	const changeFilterText = (e) => {
		setFilterText(e.target.value);
		const targetValue = e.target.value;
		const result = backupProperty.filter((prop) => {
			return prop.prop_name.toLowerCase().includes(targetValue) == true;
		});
		setPropVerified(result);
	};

	// SORT PROPERTY
	const onChangeSelecSort = (selectedValue) => {
		setIsSort(true);
		if (selectedValue.label == "Name") {
			function compare(a, b) {
				const propA = a.prop_name.toUpperCase();
				const propB = b.prop_name.toUpperCase();
				let comparison = 0;
				if (propA > propB) {
					comparison = 1;
				} else if (propA < propB) {
					comparison = -1;
				}
				return comparison;
			}
			setPropVerified(propVerified.sort(compare));
		}
	};

	//REACT-SELECT
	const formatSortOption = (data) => {
		return (
			<div style={{ display: "none" }}>
				<span>{data.label}</span>
				<span>{data.options.length}</span>
			</div>
		);
	};

	// HANDLE SEITCH MAP
	const handleSwitchMap = () => {};

	return isLoading ? (
		<CustomSpinner isLoading={isLoading} />
	) : (
		<>
			{console.log("props", props)}
			<section className="section section-property verified-property">
				<div className="section-header">
					<div className="section-header__col">
						<h2 className="section__title heading-secondary">
							Verified Property
						</h2>
						<ul className="section__navigate">
							<li>
								<Link to="/admin-dashboard">Dashboard</Link>
							</li>
							<li>
								<Link to="./../">Property</Link>
							</li>

							<li className="active">Verified Property</li>
						</ul>
					</div>
					<div className="section-header__col section-header__right">
						<div className="section-header__togglemap">
							<samp className="toggle-txt">map</samp>
							<AdminToggleSwitch
								id="map"
								inputClassName="map"
								labelClassName="map"
								onClick={handleSwitchMap}
							/>
						</div>
						<div className="section-header__search">
							<div className="form-field">
								<span className="form-field__icon">
									<img src={IconSearch} alt="Search" />
								</span>
								<input
									type="text"
									name="filterText"
									value={filterText}
									onChange={changeFilterText}
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
									formatGroupLabel={formatSortOption}
									onChange={onChangeSelecSort}
									className="property-sort-select"
									classNamePrefix="property-sort-select"
									styles={customStyleProductSort}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="section-body">
					<div className="col-wrapper ">
						{propVerified.length > 0 ? (
							propVerified.map((property) => {
								return (
									<PropertyCard
										id={property.prop_id}
										name={property.prop_name}
										address={`${property.city}, ${property.country}`}
										room={property.room}
										floor={property.no_of_floor}
										type={property.type}
									/>
								);
							})
						) : (
							<div className="filter-result-notificaton">
								Result Not Found !
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default AdminPropPending;
