import React, { useState, useEffect } from "react";
import PropertyCard from "./../propUtility/PropertyCard";
import Select from "react-select";
import { Link } from "react-router-dom";

// ICON
import IconSearch from "./../../../../../assets/images/icon/icon-search.svg";
import CustomSpinner from "../../../../CustomSpinner";
import { customStyleProductSort, AdminToggleSwitch } from "./../../../adminUtility";
import propertyServices from "./../../../adminServices/property";

const AdminPropDeactivated = () => {
	const [backupProperty, setBackupProperty] = useState([]),
		[isLoading, setIsLoading] = useState(true),
		[filterText, setFilterText] = useState(""),
		[deactivatedProperty, setDeactivatedProperty] = useState({
			data: [],
			errors: "",
		});

	// FETCH-DATA
	useEffect(() => {
		propertyServices.get
			.propertyDeactivated()
			.then((response) => {
				const data = response.data.result;
				setDeactivatedProperty({ data });
				setBackupProperty(data);
			})
			.catch((errors) => {
				setDeactivatedProperty({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

	// SET FILTER TEXT
	const changeFilterText = (e) => {
		setFilterText(e.target.value);
		const targetValue = e.target.value;
		const result = backupProperty.filter((prop) => {
			return prop.prop_name.toLowerCase().includes(targetValue) === true;
		});
		setDeactivatedProperty({ data: result });
	};

	// SORT PROPERTY
	const onChangeSelecSort = (selectedValue) => {
		if (selectedValue.label == "Name") {
			function compare(a, b) {
				console.log(a);
				console.log(b);
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
			setDeactivatedProperty({ data: deactivatedProperty.data.sort(compare) });
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

	return (
		<>
			{/*Show spinner while fetching data*/}
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-lists">
				<div className="section-header">
					<div className="section-header__col">
						<h2 className="section__title heading-secondary">
							Deactivated Property
						</h2>
						<ul className="section__navigate">
							<li>
								<Link to="/admin-dashboard">Dashboard</Link>
							</li>
							<li>
								<Link to="./">Property</Link>
							</li>

							<li className="active">Deactivated Property</li>
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
						{deactivatedProperty.data &&
							deactivatedProperty.data.map((property) => {
								return (
									<PropertyCard
										id={property.prop_id}
										name={property.prop_name}
										address={`${property.city}, ${property.country}`}
										room={property.no_of_rooms}
										floor={property.no_of_floor}
										type={property.type}
										key={property.prop_id}
									/>
								);
							})}
						{deactivatedProperty.errors && (
							<div className="admin-getdata-error">
								{deactivatedProperty.errors}
							</div>
						)}

						{deactivatedProperty.data.length === 0 && (
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

export default AdminPropDeactivated;
