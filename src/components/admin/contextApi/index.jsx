import React, { useState } from "react";
import propertyServices from "./../adminServices/property";

export const ToggleAdminNavbarContext = React.createContext();
export const AdminGetDataContext = React.createContext();
export const ShowNListsContext = React.createContext();

const AdminContextApi = (props) => {
	const [showNavBar, setShowNavBar] = useState(true);
	const [basicInfo, setBasicInfo] = useState({
		data: "",
		errors: "",
	});

	const [allProperty, setAllProperty] = useState({
		data: [{ property_name: "", property_id: "" }],
		error: "",
	});
const [nListsToShow, setNListsToShow]=useState(5);
	// TOGGLE ADMIN-NAV-BAR
	const toggleShowNavbar = (e) => {
		setShowNavBar(!showNavBar);
	};
	// GET ALL PROPERTY
	const getAllProperty = () => {
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
				setAllProperty({ errors });
			});
	};

	// GET PROPERTY-BASIC-INFORMATION

	const getBasicInfo = (propertyId) => {
		return propertyServices.get
			.basicInfo(propertyId)
			.then((response) => {
				const data = response.data.result;
				const propertyBasicInfo = {
					status_code: response.data.status_code,
					build_year: data.build_year,
					checkin_time: data.checkin_time,
					checkin_time_hour: data.checkin_time_hour,
					checkout_time: data.checkin_time,
					checkout_time_hour: data.checkout_time_hour,
					city: data.city,
					country: data.country,
					currency: data.currency,
					locality: data.location,
					map_url: data.map_url,
					no_of_floors: data.no_of_floors,
					no_of_restaurants: data.no_of_restaurants,
					no_of_rooms: data.no_of_rooms,
					postal_code: data.postal_code,
					property_description: data.property_description,
					property_former_name: data.property_former_name,
					property_id: data.property_id,
					property_name: data.property_name,
					property_type: data.property_type,
					star_rating: data.star_rating,
					street_address: data.street_address,
					property_status: data.property_status,
					twofour_hour_checkin: data.twofour_hour_checkin,
					response_message: response.data.message,
				};
				setBasicInfo({ data: propertyBasicInfo });
			})
			.catch((errors) => {
				setBasicInfo({ errors: `${errors}` });
			});
	};

	const handleShowNLists=(listNumber)=>{
setNListsToShow(listNumber)
	}
	return (
		<>
			<ToggleAdminNavbarContext.Provider
				value={{ showNavBar, toggleShowNavbar }}
			>
				<AdminGetDataContext.Provider
					value={{
						allProperty,
						getAllProperty,
						getBasicInfo,
						basicInfo,
					}}
				>
					<ShowNListsContext.Provider value={{
						handleShowNLists, nListsToShow
					}}>

					{props.children}
					</ShowNListsContext.Provider>
				</AdminGetDataContext.Provider>
			</ToggleAdminNavbarContext.Provider>
		</>
	);
};
export default AdminContextApi;
