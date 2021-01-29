import React, { useState, useEffect } from "react";
import FontAwesome from "react-fontawesome";
import Logo from "./../../../assets/images/Logo-sm.png";
import IconToggle from "./../../../assets/images/Toggle.png";
import IconExpandScreen from "./../../../assets/images/Icon-material-fullscreen.png";
import IconNotification from "./../../../assets/images/Icon-Notification.png";
import IconSearch from "./../../../assets/images/icon/icon-search.svg";
import { ButtonPrimary } from "../../utility";
import { Link, Redirect } from "react-router-dom";
const Header = (props) => {
	const [logOut, setLogOUt] = useState(false);
	const handleLogout = () => {
		localStorage.removeItem("tokenLogin");
		console.log(props);
		setLogOUt(true);
	};
	const [visibleSidebar, setVisibleSidebar] = useState(true);

	const toggleSidebar = () => {
		setVisibleSidebar(visibleSidebar ? false : true);
	};

	visibleSidebar
		? localStorage.setItem("isVisibleSidebar", true)
		: localStorage.setItem("isVisibleSidebar", false);

	if (logOut == true) {
		return <Redirect to="./" />;
	}
	return (
		<header id="page-header">
			<div className="header-wrapper">
				<div className="header__col-1">
					<div className="header__toggle-menu">
						<a onClick={toggleSidebar}>
							<img src={IconToggle} alt="Toggle" />
						</a>
					</div>
					<div className="header__logo">
						<Link to="/">
							<img src={Logo} alt="Logo" />
						</Link>
					</div>
					<div className="header__search">
						<div className="form_field">
							<span className="search-icon">
								<img src={IconSearch} alt="Search" />
							</span>
							<input
								className="input-search"
								type="text"
								placeholder="Search..."
							/>
						</div>
					</div>
				</div>
				<div className="header__col-2">
					<div className="col-item header__btn-add">
						<ButtonPrimary onClick={handleLogout} title="Logout" />
					</div>
					<div className="col-item header__btn-add">
						<ButtonPrimary title="+ Add Property" />
					</div>
					<div className="col-item header__expand-scr">
						<img src={IconExpandScreen} alt="Expand screen" />
					</div>
					<div className="col-item header__notification">
						<img src={IconNotification} alt="Notification" />
					</div>
					<div className="col-item header__user">
						<p className="user">Puspa Gurung</p>
						<ul className="user-info">
							<li className="user-info__llist">
								<a href="">
									Admin <FontAwesome name="chevron-down" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
