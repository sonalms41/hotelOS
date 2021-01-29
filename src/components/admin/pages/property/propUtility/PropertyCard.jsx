import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { CardPrimary } from "../../../../utility";

// ICON
import IconId from "./../../../../../assets/images/icon/icon-id.svg";
import { AdminGetDataContext } from "../../../contextApi";
const PropertyCard = (props) => {
	const { getPropertyBasicInfo } = useContext(AdminGetDataContext);
	const { name, floor, room, address, type, id } = props;
	const [isSelectHotel, setIsSelectHotel] = useState(false);
	const handleOnClick = (id) => {
		//getPropertyBasicInfo(id);
		setIsSelectHotel(true);
		localStorage.setItem("property-id", id);
	};

	return (
		<div className="col-item col-item--lg-3" key={id}>
			<div className="propery-card">
				<CardPrimary>
					<div className="card-row">
						<h3 className="property__title heading-tertiary ">
							{/*<a onClick={() => handleOnClick(id)}>{name}</a>*/}
							<Link to={`/admin-property/dashboard/${id}`}> {name}</Link>

							{/*<a onClick={() => getPropertyBasicInfo(id)}>{name}</a>*/}
						</h3>
						<p className="property__address">{address}</p>
						<p className="property__id">
							#{id} <img src={IconId} alt="Id" />
						</p>
					</div>
					<div className="card-row">
						<div className="col-wrapper">
							<div className="col-item">
								<span className="info-item">{room}</span>
								<p>Room</p>
							</div>
							<div className="col-item">
								<span className="info-item">{floor}</span>
								<p>Floor</p>
							</div>
							<div className="col-item">
								<span className="info-item">{type}</span>
								<p>Type</p>
							</div>
						</div>
					</div>
				</CardPrimary>
			</div>
		</div>
	);
};

export default PropertyCard;
