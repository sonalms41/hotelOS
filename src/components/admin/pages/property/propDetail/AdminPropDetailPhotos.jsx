import React, { useEffect, useContext, useState } from "react";
import {useParams} from "react-router-dom";
import { AdminGetDataContext } from "../../../contextApi";
import CustomSpinner from "../../../../CustomSpinner";

import { CardPrimary } from "../../../../utility";
import AdminPropDetailNav from "./../../../nav/AdminPropDetailNav";
import AdminSectionHeader from "../../../adminUtility/AdminSectionHeader";
import { AdminButtonPrimary, toastNotification } from "../../../adminUtility";
import propertyServices from "./../../../adminServices/property";
import ConnectingImageGallery from "../../../../utility/ConnectingImageGallery";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AdminPropDetailHeading from "./AdminPropDetailHeading";

const AdminPropDetailPhotos = () => {
	const propertyId=useParams().id;
	const { getBasicInfo, basicInfo } = useContext(AdminGetDataContext);
	const [photos, setPhotos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showPhotoGallery, setShowPhotoGallery] = useState(false);
	const [selectedTabIndex, setSelectedTabIndex] = useState(0);
	const [startThumbnailIndex, setStartThumbnailIndex] = useState();

	useEffect(() => {
		setIsLoading(true);
		getBasicInfo(propertyId);
		propertyServices.get
			.photos(propertyId)
			.then((response) => {
				const images = response.data.result.property_images;
				const arrTags = [];
				const arrRoomTypes = [];

				for (let i = 0; i < images.length; i++) {
					if (!arrTags.includes(images[i].tags)) {
						const tempRoomTypeObj = {
							tags: images[i].tags,
							images: [],
						};
						arrTags.push(images[i].tags);
						for (let j = 0; j < images.length; j++) {
							if (images[i].tags == images[j].tags) {
								tempRoomTypeObj.images.push(images[j].image);
							}
						}
						arrRoomTypes.push(tempRoomTypeObj);
					}
				}
				setPhotos(arrRoomTypes);
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setIsLoading(false)
			});
	}, []);

	// Breadcrumb (for path)
	const breadCrumb = [
		{ to: "/admin-dashboard", title: "Dashboard" },
		{ to: "/admin-property", title: "Property" },
		{
			to: `/admin-property/dashboard/${propertyId}`,
			title: "Property Dashboard",
		},
		{
			to: `/admin-property/${
				basicInfo.data.property_status === "Verified"
					? "verified"
					: basicInfo.data.property_status === "Rejected"
					? "rejected"
					: basicInfo.data.property_status === "Blocked"
					? "blocked"
					: basicInfo.data.property_status === "Deactivated"
					? "deactivated"
					: basicInfo.data.property_status === "Reported"
					? "reported"
					: ""
			}`,

			title: basicInfo.data.property_status,
		},
		{
			to: "",
			title: basicInfo.data.property_name,
		},
	];

	// HANDLE TAB-INDEX
	const handleImageGallery = (propertyId, index) => {
		console.log("porperty id", propertyId);
		setShowPhotoGallery(true);
		setStartThumbnailIndex(index);
	};

	// Handle Close Gallery
	const handleCloseGallery = () => {
		setShowPhotoGallery(false);
	};
	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<section className="section section-property property-detail">
				<AdminSectionHeader
					propertyDetailPage={true}
					propertyId={propertyId}
					breadCrumb={basicInfo.data && breadCrumb}
					sectionTitle={basicInfo.data && basicInfo.data.property_name}
				/>

				<div className="section-body">
					<div className="col-wrapper">
						<div className="col-item col-item--lg-3">
							<AdminPropDetailNav />
						</div>
						{photos.error && (
							<div className="admin-getdata-error">{photos.error}</div>
						)}

						<div className="col-item col-item--lg-9">
							<CardPrimary>
								<div className="property-detail__item">
									<AdminPropDetailHeading
										title="Photos"
										propertyName={
											basicInfo.data && basicInfo.data.property_name
										}
										propertyId={propertyId}
										endPoint="photos"
									/>

									<div className="detail-item__body">
										<div className="property-photos">
											<Tabs
												className="property-photos__filter"
												defaultFocus={true}
												selectedIndex={selectedTabIndex}
												//onSelect={handleSelect}
												onSelect={(tabIndex) => setSelectedTabIndex(tabIndex)}
											>
												{/*Display image tag-name with total number of images under the particular image tag*/}
												<TabList className="filter-nav">
													{photos &&
														photos.map((photo, i) => {
															return (
																<Tab
																	key={`lfdasflsdj-${i}`}
																	className="filter-nav__item"
																>
																	{photo.tags}({[photo.images.length]})
																</Tab>
															);
														})}
												</TabList>

												{/*Display images  under the particular image tag*/}
												{photos &&
													photos.map((arrayOfImages, i) => {
														return (
															<TabPanel
																key={`werwrer-${i}`}
																className="filter-result"
															>
																<div className="filter-prop-photos col-wrapper">
																	{arrayOfImages.images.map((image, index) => {
																		return (
																			<div
																				key={`gdsfsdfdsfsfs-${index}`}
																				className="filter-prop-photos__item col-inline-bg col-item col-item--lg-3"
																				onClick={() =>
																					handleImageGallery(propertyId, index)
																				}
																				style={{
																					backgroundImage: image
																						? `url(${process.env.REACT_APP_API_BASE_URL}${image})`
																						: "",
																				}}
																			></div>
																		);
																	})}
																</div>
															</TabPanel>
														);
													})}
											</Tabs>
										</div>
									</div>
								</div>
							</CardPrimary>
						</div>
					</div>
				</div>
				{showPhotoGallery && (
					<div className="admin-image-gallery">
						<ConnectingImageGallery
							propertyId={propertyId}
							showIndex={true}
							slideOnThumbnailOver={false}
							infinite={true}
							images={photos}
							galleryTitle="Property Photo Gallery"
							galleryClassName=""
							autoPlay={false}
							startIndex={0}
							showPlayButton={false}
							closeGallery={handleCloseGallery}
							initialTabIndex={selectedTabIndex}
							startThumbnailIndex={startThumbnailIndex}
						/>
					</div>
				)}
			</section>
		</>
	);
};

export default AdminPropDetailPhotos;
