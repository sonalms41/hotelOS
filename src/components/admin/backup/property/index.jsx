import React, { useState } from "react";
import Layout from "../../../hoc/Layout";
import AdminLayout from "../../../hoc/AdminLayout";
import PropertyCard from "./propUtility/PropertyCard";
import { Link } from "react-router-dom";

const VerifiedProperty = () => {
	const [isRegistered, setIsregistered] = useState(false);
	const checkRegister = () => {
		const tokenAddProperty = localStorage.getItem("tokenAddProperty");
		if (tokenAddProperty) {
			setIsregistered(true);
			window.open("http://148.72.210.66:9090/");
		}
	};

	return (
		<section className="section section-property">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">Property</h2>
					<ul className="section__navigate">
						<li>Dashboard</li>
						<li className="active">Property</li>
					</ul>
				</div>
			</div>
			<div className="section-body">
				<div className="col-wrapper property-cards-wrapper">
					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>

					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>
					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>
					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>
					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>
					<PropertyCard
						propertyNumber="20"
						propertyType="Verified Property"
						bgColor="yellow"
					/>
				</div>
				<div className="property-col-sm property-add">
					<Link to="/property/add_property"> + Add Property</Link>
					{/*<button onClick={checkRegister}>add property</button>*/}
				</div>
			</div>
		</section>
	);
};

export default VerifiedProperty;
