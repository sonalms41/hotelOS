import React, { useState } from "react";
import VerifiedPropertyCard from "../propUtility/VerifiedPropertyCard";
import { useFormik, Formik } from "formik";

import Select from "react-select";
import { CardPrimary, FormFieldInput, ButtonPrimary } from "../../../utility";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { require } from "cross-storage";

// ICON

const AddProperty = () => {
	const [redirectToAddDetail, setRedirectToAddDetail] = useState(false);

	const formik = useFormik({
		initialValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			phone_number: "",
			role: "",
			country: "",
			city: "",
			property_name: "",
			hotel_type: "",
			hotel_phone_number: "",
			stand_alone_property: "",
			name_of_chain: "",
			email_subscription: "",
			created_from: "",
		},
		onSubmit: (values) => {
			console.log(values);
			const registrationDetail = {
				first_name: values.first_name,
				last_name: values.last_name,
				email: values.email,
				password: values.password,
				phone_number: values.phone_number,
				role: values.role,
				country: values.country,
				city: values.city,
				property_name: values.property_name,
				hotel_type: values.hotel_type,
				hotel_phone_number: values.hotel_phone_number,
				stand_alone_property: "No",
				name_of_chain: "Chain hotel 1",
				email_subscription: values.email_subscription,
				created_from: "Admin",
			};
			console.log(registrationDetail);
			const headers = {
				"Content-Type": "application/json",
			};

			const api1 = "http://148.72.210.66:9006/admin-property-registration/";
			const postData = {
				method: "POST",
				headers: headers,
				body: JSON.stringify(registrationDetail),
			};

			const response = fetch(api1, postData)
				.then((res) => res.json())
				.then((res) => {
					console.log(res);
					setRedirectToAddDetail(true);
					localStorage.setItem("tokenAddProperty", res.token);
				})
				.catch((error) => {
					console.log(error);
				});
			console.log("localStorage", localStorage);
		},

		//validate: (values) => {
		//	let errors = {};
		//	if (!values.email) {
		//		errors.email = "Email Required";
		//	}
		//	if (!values.password) {
		//		errors.password = "Password Required";
		//	}
		//	return errors;
		//},
	});
	if (redirectToAddDetail == true) {
		window.open("http://148.72.210.66:9090/");
		//return <Redirect to="http://148.72.210.66:9090/basic-info" />;
	}

	return (
		<section className="section section-property add-property">
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">Hotel Create</h2>
				</div>
			</div>
			<div className="section-body">
				<div className="add-property-form">
					<form onSubmit={formik.handleSubmit}>
						<div className="col-wrapper">
							<div className="col-item col-item--lg-6">
								<CardPrimary>
									<h4>Basic Info</h4>
									<div className="form__wrapper">
										<div className="form__group-wrap">
											<div className="form__group">
												<label>First Name</label>
												<input
													placeholder="First name"
													type="text"
													name="first_name"
													value={formik.values.first_name}
													onChange={formik.handleChange}
												/>
											</div>
											<div className="form__group">
												<label>Last Name</label>
												<input
													placeholder="Last name"
													type="text"
													name="last_name"
													value={formik.values.last_name}
													onChange={formik.handleChange}
												/>
											</div>
										</div>

										<div className="form__group">
											<label>Email address</label>
											<input
												placeholder="Email-address"
												type="email"
												name="email"
												value={formik.values.email}
												onChange={formik.handleChange}
											/>
										</div>

										<div className="form__group">
											<label>Password</label>
											<input
												placeholder="Password"
												type="text"
												name="password"
												value={formik.values.password}
												onChange={formik.handleChange}
											/>
										</div>

										<div className="form__group">
											<label>Phpone Number</label>
											<input
												placeholder="Phone number"
												type="Number"
												name="phone_number"
												value={formik.values.phone_number}
												onChange={formik.handleChange}
											/>
										</div>

										<div className="form__group">
											<label>Role in Property </label>
											<select
												name="role"
												value={formik.values.role}
												onChange={formik.handleChange}
											>
												<option>Role one</option>
												<option>Role two</option>
												<option>Role three</option>
											</select>
										</div>
										<div className="form__group-wrap">
											<div className="form__group">
												<label>Select Country </label>
												<select
													name="country"
													value={formik.values.country}
													onChange={formik.handleChange}
												>
													<option>Country one</option>
													<option>Country two</option>
													<option>Country three</option>
												</select>
											</div>
											<div className="form__group">
												<label>Select City </label>
												<select
													name="city"
													value={formik.values.city}
													onChange={formik.handleChange}
												>
													<option>City one</option>
													<option>City two</option>
													<option>City three</option>
												</select>
											</div>
										</div>
									</div>
								</CardPrimary>
							</div>
							<div className="col-item col-item--lg-6">
								<CardPrimary>
									<h4>Property Information</h4>
									<div className="form__wrapper">
										<div className="form__group">
											<label>Property Name</label>
											<input
												placeholder="Property Name"
												type="text"
												name="property_name"
												value={formik.values.property_name}
												onChange={formik.handleChange}
											/>
										</div>
										<div className="form__group">
											<label>Hotel type </label>
											<select
												name="hotel_type"
												value={formik.values.hotel_type}
												onChange={formik.handleChange}
											>
												<option>Hotel type one</option>
												<option>Hotel type two</option>
												<option>Hotel type three</option>
											</select>
										</div>
										<div className="form__group">
											<label>Hotel Contact number</label>
											<input
												placeholder="Hotel contact number"
												type="text"
												name="hotel_phone_number"
												value={formik.values.hotel_phone_number}
												onChange={formik.handleChange}
											/>
										</div>
										{/*<div className="form__group">
											<div className="form__group-wrap form__group-wrap--1 ">
												<p> Stand Property Alone</p>
												<div className="radio-group">
													<div className="radio-group__1">
														<input
															type="radio"
															id="standAlonePropYes"
															name="standAlonePropYes"
															value="Bike"
														/>
														<label for="standAlonePropYes"> Yes</label>
													</div>
													<div className="radio-group__2">
														<input
															type="radio"
															id="standAlonePropNo"
															name="standAlonePropNo"
															value="Bike"
														/>
														<label for="standAlonePropNo"> No</label>
													</div>
												</div>
											</div>
										</div>*/}
										{/*<div className="form__group">
											<label>Name of Chain</label>
											<input
												placeholder="Choose Name of Chain"
												type="text"
												name="name_of_chain"
												value={formik.values.name_of_chain}
												onChange={formik.handleChange}
											/>
										</div>*/}
									</div>
								</CardPrimary>
							</div>
						</div>
						<div className="btn-submit">
							<ButtonPrimary type="submit" title="Submit" />
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default AddProperty;
