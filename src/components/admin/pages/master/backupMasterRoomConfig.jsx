import React, { useEffect, useState, useCallback } from "react";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import { useFormik } from "formik";
import {
	AdminCardPrimary,
	AdminButtonPrimary,
	AdminButtonSecondary,
	toastNotification,
	AdminSectionHeader,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import CustomSpinner from "../../../CustomSpinner";
import masterService from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";
import AdminPopupModal from "../../adminUtility/AdminPopupModal";
const MasterRoomConfig = () => {
	const [editFormValue, setEditFormValue] = useState(null);
	const [occupancy, setOccupancy] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [roomTypes, setRoomTypes] = useState(null);
	const [visibleModal, setVisibleModal] = useState(false);
	const [roomCategory, setRoomCategory] = useState({
		category_name: "",
		max_num: "",
	});
	const [subRooms, setSubRooms] = useState([
		{
			subroom_type: "Classic Quadruple Room",
			max_num: 4,
		},
	]);

	useEffect(() => {
		masterService.get
			.occupancy()
			.then((response) => {
				const { data } = response;
				if (response.status === 200) {
					const rooms = [];
					for (let i = 0; i < data.length; i++) {
						rooms.push(data[i].name);
					}
					setRoomTypes(rooms);
				}
			})
			.catch((errors) => {});
	}, []);

	const initialValues = {
		name: "",
		maxNumberOfPerson: "",
	};

	// DELETE OCCUPANCY
	//const handleDelete = (id) => {
	//	masterService.delete
	//		.occupancy(id)
	//		.then((response) => {
	//			const responseMessage = response.data.message;
	//			setOccupancy({ responseMessage: `${responseMessage}` });
	//			getData();
	//		})
	//		.catch((errors) => {
	//			setOccupancy({ errors });
	//		});
	//};

	// Add sum-room entry-field
	const handleAddRoomEntryField = () => {
		setSubRooms([
			...subRooms,
			{
				subroom_type: "Comfort Quadruple Room",
				max_num: 4,
			},
		]);
	};

	// Remove sub-room entry-field
	const handleRemoveRoomEntryField = (indx) => {
		const filteredSubRooms = subRooms.filter((room, i) => {
			return subRooms.indexOf(room) !== indx;
		});
		setSubRooms(filteredSubRooms);
	};

	// Room category
	const handleChangeCategory = (e) => {
		const { value } = e.target;
		const { name } = e.target;
		setRoomCategory({ ...roomCategory, [name]: value });
	};
	// Change sub-room-title
	const handleChangeSubRoomTitle = (e, indx) => {
		const { value } = e.target;
		const existingRooms = [...subRooms];
		existingRooms[indx].subroom_type = value;
		setSubRooms(existingRooms);
	};

	// Change max-capacity
	//const handleChangeMaxCapacity = (e, indx) => {
	//	const { value } = e.target;
	//	const existingRooms = [...subRooms];
	//	existingRooms[indx].max_num = parseInt(value);
	//	setSubRooms(existingRooms);
	//};

	// Submit
	const handleSubmit = (e) => {
		//const postValues = {
		//	room_type: roomCategory,
		//	sub_rooms: subRooms,
		//};
		console.log("postValues", roomCategory);
		//masterService.post
		//	.masterRoomConfig(postValues)
		//	.then((respose) => {
		//		console.log("response:", respose);
		//	})
		//	.catch((errors) => {});
	};

	// Edit Rooms
	const handleEdit = () => {};
	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<div className="admin-room-config">
				<AdminSectionHeader
					breadCrumb={[
						{
							to: "/admin-dashboard",
							title: "Dashboard",
						},
						{
							to: "/admin-master",
							title: "Master",
						},
						{
							to: "/admin-master/occupancy",
							title: "Occupancy",
						},
					]}
					sectionTitle="Sub Rooms"
				/>
				<AdminMasterNav />

				<AdminCardPrimary>
					<div className="content-header flex-aC-jSB">
						<h3 className="heading-tertiary">Room Lists</h3>
						<span className="anchor" onClick={() => setVisibleModal(true)}>
							+ Add Rooms
						</span>
					</div>
					<div className="content-body">
						<table className="admin-table admin-table--masteroccupancy">
							<thead>
								<tr>
									<th className="table__col-1">SN</th>
									<th className="table__col-2">Room category</th>
									<th className="table__col-2">Sub Rooms</th>
									<th className="table__col-3">Max Capacity</th>
									<th className="table__col-4">Action</th>
								</tr>
							</thead>

							<tbody>
								<tr key={`admin-master-addroom`}>
									<th className="table__col-1">1</th>
									<td className="table__col-2">Room category</td>
									<td className="table__col-2">
										<table className="subroom-list">
											<tbody>
												<tr>
													<td>lsdflsd ldsflsd</td>
													<td>lsdflsd ldsflsd</td>
													<td>lsdflsd ldsflsd</td>
												</tr>
											</tbody>
										</table>
									</td>
									<td className="table__col-3">30</td>

									<td className="table__col-4 table__col-groupaction">
										<a className="table__col-edit" onClick={handleEdit}>
											<img src={IconEdit} alt="Edit" />
										</a>
									</td>
								</tr>
								<tr key={`admin-master-addroom`}>
									<th className="table__col-1">1</th>
									<td className="table__col-2">Room category</td>
									<td className="table__col-2">
										<table className="subroom-list">
											<tbody>
												<tr>
													<td>lsdflsd ldsflsd</td>
													<td>lsdflsd ldsflsd</td>
													<td>lsdflsd ldsflsd</td>
												</tr>
											</tbody>
										</table>
									</td>
									<td className="table__col-3">30</td>

									<td className="table__col-4 table__col-groupaction">
										<a className="table__col-edit" onClick={handleEdit}>
											<img src={IconEdit} alt="Edit" />
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</AdminCardPrimary>
			</div>

			{/*POPUP-MODAL*/}
			<AdminPopupModal
				showModal={visibleModal}
				closeModal={() => setVisibleModal(false)}
				className="modal-room-config"
			>
				<div className="room-config">
					<AdminCardPrimary>
						<form className="admin-form">
							<div className="room-config__cateogory">
								<h3 className="heading-tertiary">Room Category</h3>
								<div className="flex-aC-jSB">
									<AdminFormInput
										label="Category title"
										placeholder="Enter Title"
										name="category_name"
										type="text"
										value={roomCategory.category_name}
										onChange={(e) => handleChangeCategory(e)}
									/>
									<AdminFormInput
										label="Max Capacity"
										placeholder="Enter max capacity"
										name="max_num"
										type="number"
										value={roomCategory.max_num}
										onChange={(e) => handleChangeCategory(e)}
									/>
								</div>
							</div>
							<div className="room-config__sub-type">
								<h3 className="heading-tertiary">Sub Rooms</h3>
								{subRooms.map((room, indx) => {
									return (
										<div className="room" key={`subRoomKey-${indx}`}>
											<div className="flex-aC-jSB">
												<AdminFormInput
													label="Room Title"
													placeholder="name"
													placeholder="Enter sub room title"
													name="name"
													type="text"
													value={subRooms[indx].room_type}
													onChange={(e) => handleChangeSubRoomTitle(e, indx)}
												/>
												{/*<AdminFormInput
													label="Max Capacity"
													placeholder="Enter max capacity"
													name="maxNumberOfPerson"
													type="number"
													value={subRooms[indx].max_num}
													onChange={(e) => handleChangeMaxCapacity(e, indx)}
												/>*/}
											</div>
											{subRooms.length > 1 && (
												<div className={`control text-right remove-${indx}`}>
													<span
														className="anchor anchor--remove"
														onClick={() => handleRemoveRoomEntryField(indx)}
													>
														- remove room
													</span>
												</div>
											)}
										</div>
									);
								})}

								<div className="control margin-b-20 text-right">
									<span
										className="anchor anchor--add"
										onClick={handleAddRoomEntryField}
									>
										+ Add room
									</span>
								</div>
							</div>
							<div className="text-right">
								<AdminButtonPrimary
									title="Submit"
									type="button"
									onClick={handleSubmit}
								/>
							</div>
						</form>
					</AdminCardPrimary>
				</div>
			</AdminPopupModal>
		</>
	);
};

export default MasterRoomConfig;
