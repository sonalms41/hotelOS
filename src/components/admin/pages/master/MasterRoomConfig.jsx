import React, { useEffect, useState } from "react";
import IconEdit from "./../../../../assets/images/icon/icon-edit.svg";
import {
	AdminCardPrimary,
	AdminButtonPrimary,
	AdminSectionHeader,
	toastNotification,
	AdminConfirmationDialog,
} from "../../adminUtility";
import { AdminFormInput } from "../../adminUtility/AdminFormFields";
import CustomSpinner from "../../../CustomSpinner";
import masterService from "../../adminServices/master";
import AdminMasterNav from "./../../nav/AdminMasterNav";
import AdminPopupModal from "../../adminUtility/AdminPopupModal";

import ICON_EIDT from "./../../../../assets/images/icon/icon-edit.svg";
import ICON_DELETE from "./../../../../assets/images/icon/icon-delete.svg";

const MasterRoomConfig = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [roomTypes, setRoomTypes] = useState([]);
	const [visibleModal, setVisibleModal] = useState(false);
	const [existingSubRooms, setExistingSubRooms] = useState([]);
	const [selectedRoomType, setSelectedRoomType] = useState("");
	const [subRooms, setSubRooms] = useState([""]);

	const [enableEdit, setEnableEdit] = useState(false);
	const [editValue, setEditValue] = useState("");
	const [isDelete, setIsDelete] = useState({ id: "" });

	// Get-sub-rooms
	const getSubRooms = () => {
		setIsLoading(true);
		masterService.get
			.subRoomsConfig()
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					setExistingSubRooms(data.result);
				}
				setIsLoading(true);
			})
			.catch((errors) => {
				setIsLoading(false);
			});
	};

	// Get-rooms types
	const getRoomTypes = () => {
		setIsLoading(true);
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
				setIsLoading(false);
			})
			.catch((errors) => {
				setIsLoading(false);
			});
	};
	useEffect(() => {
		getSubRooms();
		getRoomTypes();
	}, []);

	// Edit sub-rooms
	const triggerEditSubroom = (objSubRoom) => {
		setIsLoading(true);
		setEditValue(objSubRoom);
		setEnableEdit(true);
	};
	// Add sum-room entry-field
	const handleAddRoomEntryField = () => {
		setSubRooms([...subRooms, ""]);
	};

	// Remove sub-room entry-field
	const handleRemoveRoomEntryField = (indx) => {
		const filteredSubRooms = subRooms.filter((room, i) => {
			return subRooms[i] !== subRooms[indx] && subRooms.indexOf(room) !== indx;
		});
		setSubRooms(filteredSubRooms);
	};

	// Change Room-category
	const handleChangeCategory = (e) => {
		const { value } = e.target;
		setSelectedRoomType(value);
	};
	// Change sub-room-title
	const handleChangeSubRoomTitle = (e, indx) => {
		const { value } = e.target;
		const existingRooms = [...subRooms];
		existingRooms[indx] = value;
		setSubRooms(existingRooms);
	};

	// Submit add-new sub-room
	const handleSubmitAddNew = () => {
		setIsLoading(true);
		if (!selectedRoomType) {
			toastNotification.warn("Please select room type");
		} else if (subRooms === "") {
			toastNotification.warn("Please enter sub room");
		} else {
			const postValues = {
				room_type: selectedRoomType,
				sub_rooms: subRooms,
			};
			masterService.post
				.subRoomsConfig(postValues)
				.then((respose) => {
					const { data } = respose;
					if (data.status_code === 200) {
						toastNotification.success(data.message);
						setSubRooms([""]);
						getSubRooms();
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		}
	};

	// On-change Edit
	const handleEditOnChange = (e) => {
		const { value } = e.target;
		setEditValue({ ...editValue, sub_type_name: value });
	};

	// Submit edit-sub-room
	const handleSubmitEdit = () => {
		masterService.put
			.subRoomsConfig(editValue)
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					toastNotification.success(data.message);
					setEnableEdit(false);
					getSubRooms();
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				setIsLoading(false);
			});
	};

	// Delete sub-room
	const handleDelete = (objDelValues) => {
		masterService.delete
			.subRoomsConfig(objDelValues)
			.then((response) => {
				const { data } = response;
				if (data.status_code === 200) {
					toastNotification.success(data.message);
					getSubRooms();
				}
			})
			.catch((errors) => {});
	};

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
							+ Add Sub Rooms
						</span>
					</div>
					<div className="content-body">
						<table className="admin-table admin-table--roomconfig">
							<thead>
								<tr>
									<th className="table__col-1">SN</th>
									<th className="table__col-2">Room category</th>
									<th className="table__col-3">Max Capacity</th>
									<th className="table__col-4">Sub Rooms</th>
								</tr>
							</thead>

							<tbody>
								{existingSubRooms.map((roomType, i) => {
									return (
										<tr key={`masterSubRooms-${i}`}>
											<th className="table__col-1">{i + 1}</th>
											<td className="table__col-2">{roomType.room_type}</td>
											<td className="table__col-3">{roomType.max_capacity}</td>
											<td className="table__col-4">
												<table className="subroom-list">
													<tbody>
														{roomType.sub_types.map((room, i) => {
															return (
																<tr
																	className="sub-room-tr flex-aC-jSB"
																	key={`subRoomKey${i}`}
																>
																	<td className="sub-room-td">
																		: {room.sub_type}
																	</td>

																	<td className="table__col-5 table__col-groupaction">
																		<a className="table__col-edit">
																			<img
																				src={IconEdit}
																				alt="Edit"
																				onClick={() =>
																					triggerEditSubroom({
																						room_type_id: roomType.room_type_id,
																						sub_type_id: room.sub_type_id,
																						sub_type_name: room.sub_type,
																					})
																				}
																			/>
																		</a>
																		<a
																			className="table__col-delete"
																			onClick={() =>
																				setIsDelete({
																					id:
																						isDelete.id === room.sub_type_id
																							? null
																							: room.sub_type_id,
																				})
																			}
																		>
																			{isDelete.id === room.sub_type_id && (
																				<AdminConfirmationDialog
																					onClickYes={() =>
																						handleDelete({
																							room_type_id:
																								roomType.room_type_id,
																							sub_type_id: room.sub_type_id,
																						})
																					}
																					message="Are you sure to Delete ?"
																					position="top"
																				/>
																			)}

																			<img src={ICON_DELETE} alt="Delete" />
																		</a>
																	</td>
																</tr>
															);
														})}
													</tbody>
												</table>
											</td>
										</tr>
									);
								})}
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
								<h3 className="heading-tertiary">Room Type</h3>
								<div className="flex-aC-jSB">
									<div className="admin-form__group">
										<label htmlFor="selectRoom">Select Room Type</label>
										<select
											className="select-room"
											id="selectRoom"
											onChange={handleChangeCategory}
											value={selectedRoomType}
										>
											<option value="" selected>
												Select room
											</option>
											{roomTypes.map((room) => {
												return <option value={room}> {room}</option>;
											})}
										</select>
									</div>
								</div>
							</div>
							<div className="room-config__sub-type">
								<h3 className="heading-tertiary">Sub Rooms</h3>
								{subRooms &&
									subRooms.map((room, indx) => {
										return (
											<div className="room" key={`subRoomKey-${indx}`}>
												<div className="flex-aC-jSB">
													<AdminFormInput
														label="Room Title"
														placeholder="name"
														placeholder="Enter sub room title"
														name="name"
														type="text"
														value={room}
														onChange={(e) => handleChangeSubRoomTitle(e, indx)}
													/>
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
									onClick={handleSubmitAddNew}
								/>
							</div>
						</form>
					</AdminCardPrimary>
				</div>
			</AdminPopupModal>

			{/*EIDT MODAL*/}
			<AdminPopupModal
				showModal={enableEdit}
				closeModal={() => setEnableEdit(false)}
				className="modal-room-config"
			>
				<div className="room-config">
					<AdminCardPrimary>
						<form className="admin-form">
							<div className="room-config__sub-type">
								<h3 className="heading-tertiary">Edit Sub-Room</h3>
								<AdminFormInput
									label="Room Title"
									placeholder="name"
									placeholder="Enter sub room title"
									name="name"
									type="text"
									value={editValue.sub_type_name}
									onChange={handleEditOnChange}
								/>
							</div>
							<div className="text-right">
								<AdminButtonPrimary
									title="Submit"
									type="button"
									onClick={handleSubmitEdit}
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
