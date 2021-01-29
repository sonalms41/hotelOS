import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Select from "react-select";

import Logo from "./../../../assets/images/logo-hamroHotel.png";
import IconToggle from "./../../../assets/images/Toggle.png";
import IconExpandScreen from "./../../../assets/images/Icon-material-fullscreen.png";
import IconNotification from "./../../../assets/images/Icon-Notification.png";

import { ToggleAdminNavbarContext, AdminGetDataContext } from "../contextApi";
import { customStyleHeaderSearch, AdminButtonPrimary } from "../adminUtility";
import propertyServices from "./../adminServices/property";

const Header = (props) => {
	const [logOut, setLogOut] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const { toggleShowNavbar } = useContext(ToggleAdminNavbarContext);
	const [allProperty, setAllProperty] = useState({
		data: [],
		errors: "",
	});

	const [visibleUserDeopdown, setUserDropdown] = useState(false);
	const [notificationDropdown, setNotificationDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// GET ALL PROPERTY
		propertyServices.get
			.allProperty()
			.then((response) => {
				const allProperty = [];
				response.data.result.map((property) => {
					allProperty.push({
						property_name: property.prop_name,
						property_id: property.prop_id,
					});
				});
				setAllProperty({ data: allProperty });
			})
			.catch((errors) => {
				setAllProperty({ errors: `${errors}` });
			});
		setIsLoading(false);
	}, []);

	const toggleUserDropdown = () => {
		setUserDropdown(!visibleUserDeopdown);
	};
	const toggleNotificaton = () => {
		setNotificationDropdown(!notificationDropdown);
	};

	const handleLogout = () => {
		localStorage.removeItem("admin-status");
		localStorage.removeItem("con-jwt");
		setLogOut(true);
	};

	const handleHeaderSearch = (data) => {
		const property_id = data.value.id;
		setIsSearch(property_id);
	};

	// REACT-SELECT SEARCH
	const valProperties = [];
	{
		allProperty && allProperty.error
			? valProperties.push(allProperty.error)
			: allProperty.data
			? allProperty.data.map((property) => {
					valProperties.push({
						label: property.property_name,
						value: { name: property.property_name, id: property.property_id },
					});
			  })
			: valProperties.push("Loading data");
	}

	const headerSearchOptions = [
		{
			label: "Property",
			options: valProperties,
		},
		{
			label: "Users",
			options: [
				{
					value: "User 1",
					label: "User 1",
				},
				{
					value: "User 2",
					label: "User 2",
				},
			],
		},
	];

	const formatGroupLabel = (data) => (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				color: "#5664d2",
				fontSize: "1.6rem",
			}}
		>
			<span>{data.label}</span>
			<span>{data.options.length}</span>
		</div>
	);

	// Redirect to the selected property dashboard if header search option is selected
	const renderRedirect = () => {
		return <Redirect to={`/admin-property/dashboard/${isSearch}`} />;
	};

	// REDIRECT TO ROOT (if Logout)
	if (logOut) {
		return <Redirect to="./" />;
	}
	return (
		<>
			{isSearch && renderRedirect()}
			<header id="admin-page-header">
				<div className="header-wrapper">
					<div className="header__col-1">
						<div className="header__toggle-menu">
							<a onClick={toggleShowNavbar}>
								<img src={IconToggle} alt="Toggle" />
							</a>
						</div>
						<div className="header__logo">
							<Link to="/">
								<img src={Logo} alt="Logo" />
							</Link>
						</div>
						<div className="header__search">
							<Select
								className="search-select"
								classNamePrefix="search-select"
								defaultValue="Name"
								options={headerSearchOptions}
								onChange={handleHeaderSearch}
								styles={customStyleHeaderSearch}
								formatGroupLabel={formatGroupLabel}
							/>
						</div>
					</div>
					<div className="header__col-2">
						<div className="col-item header__btn-add">
							<Link to="/admin-property/register">
								<AdminButtonPrimary title="+ Add Property" />
							</Link>
						</div>
						<div className="col-item header__expand-scr">
							<img src={IconExpandScreen} alt="Expand screen" />
						</div>
						<div className="col-item header__notification">
							<div className="notification-icon">
								<img
									src={IconNotification}
									alt="Notification"
									onClick={toggleNotificaton}
								/>
							</div>
							<ul
								className={`notificaton-lists ${
									notificationDropdown ? "visible" : "hidden"
								}`}
							>
								<li>
									Notifications <span className="count">2</span>
								</li>
								<li>You Recently Added New Property 2 min ago</li>
								<li>You Recently Added new Property</li>
							</ul>
						</div>
						<div className="col-item header__user">
							{/*<p className="user">Puspa Gurung</p>*/}
							<span
								className={`toggle-user-dropdown ${
									visibleUserDeopdown ? "visible" : "hidden"
								}`}
								onClick={toggleUserDropdown}
							>
								Admin
							</span>

							<ul
								className={`user-info-dropdown ${
									visibleUserDeopdown ? "visible" : "hidden"
								}`}
							>
								<li>
									<a onClick={handleLogout}> Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;
