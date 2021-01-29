import React, { useState, useEffect } from "react";
import PropertyCard from "../propUtility/PropertyCard";
import Select from "react-select";
import { Link } from "react-router-dom";
import propertyServices from "./../../../adminServices/property";
import IconSearch from "./../../../../../assets/images/icon/icon-search.svg";
import { customStyleProductSort, AdminToggleSwitch } from "../../../adminUtility";
import CustomSpinner from "../../../../CustomSpinner";

const AdminPropPending = (props) => {
	const [propPending, setPropPending] = useState({ data: [], errors: "" }),
		[backupProperty, setBackupProperty] = useState([]),
		[filterText, setFilterText] = useState(null),
		[isLoading, setIsLoading] = useState(true);

	// FETCH-DATA
	useEffect(() => {
		
		propertyServices.get
			.allProperty()
			.then((response) => {
				const properties = response.data.result;
				const propPending = [];
				for (let i = 0; i < properties.length; i++) {
					if (properties[i].prop_status == "Pending") {
						propPending.push(properties[i]);
					}
				}
				setPropPending({
					data: propPending,
				});
				setBackupProperty(propPending);
			})
			.catch((errors) => {
				setPropPending({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

	// SET FILTER TEXT
	const changeFilterText = (e) => {
		setFilterText(e.target.value);
		const targetValue = e.target.value;
		const fresult = backupProperty.filter((prop) => {
			return prop.prop_name.toLowerCase().includes(targetValue) == true;
		});
		setPropPending({ data: fresult });
	};

	// SORT PROPERTY
	const onChangeSelecSort = (selectedValue) => {
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
			setPropPending({ data: propPending.data.sort(compare) });
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
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-lists">
				<div className="section-header">
					<div className="section-header__col">
						<h2 className="section__title heading-secondary">
							Pending Property
						</h2>
						<ul className="section__navigate">
							<li>
								<Link to="/admin-dashboard">Dashboard</Link>
							</li>
							<li>
								<Link to="./">Property</Link>
							</li>

							<li className="active">Pending Property</li>
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
									//value={filterText}
									value={filterText ? filterText : ""}
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
						{propPending.data &&
							propPending.data.map((property) => {
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
						{propPending.errors && (
							<div className="admin-getdata-error">{propPending.errors}</div>
						)}
						{propPending.data.length === 0 && (
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
