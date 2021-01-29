import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toastNotification } from "../../adminUtility";
import adminReservationWebServices from "../../adminServices/reservationWebContent";
import CustomSpinner from "../../../CustomSpinner";

const ReservationWebContactUs = () => {
	const [existingData, setExistingData] = useState(null);
	const [pageId, setPageId] = useState(null);
	const [contactData, setContactData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const editorConfiguration = {
		ckfinder: {
			uploadUrl: "http://localhost:3000/",
		},
	};
	// GET-EXISTING-DATA
	const getExistingData = () => {
		setIsLoading(true);
		adminReservationWebServices.get
			.webStaticContent()
			.then((response) => {
				const data = response.data;
				if (data.status === 200) {
					setContactData(data.result);
					const contactUsData = data.result.filter((data) => {
						return data.page_name === "contactUs";
					});
					setExistingData(contactUsData[0].page_content);
					setPageId(contactUsData[0].id);
				}
				setIsLoading(false);
			})
			.catch((errors) => {
				toastNotification.error(errors);
				setIsLoading(false);
			});
	};
	useEffect(() => {
		getExistingData();
	}, []);

	const handleSubmitData = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (existingData === null) {
			const postVal = {
				page_name: "contactUs",
				page_content: contactData,
			};

			adminReservationWebServices.post
				.webStaticContent(postVal)
				.then((response) => {
					const data = response.data;
					if (data.status === 200) {
						toastNotification.success(data.message);
						getExistingData();
					}
					if (data.status === 400) {
						toastNotification.warn(data.message);
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		} else {
			const editValue = {
				id: pageId,
				page_name: "contactUs",
				page_content: contactData,
			};
			adminReservationWebServices.patch
				.webStaticContent(editValue)
				.then((response) => {
					const data = response.data;
					if (data.status === 200) {
						toastNotification.success(data.message);
						getExistingData();
					}
					if (data.status === 400) {
						toastNotification.warn(data.message);
					}
					setIsLoading(false);
				})
				.catch((errors) => {
					toastNotification.error(errors);
					setIsLoading(false);
				});
		}
	};

	return (
		<>
			<CustomSpinner isLoading={isLoading} />
			<div className="web-content">
				<div className="web-content__editor">
					<CKEditor
						editor={ClassicEditor}
						data={existingData}
						onChange={(event, editor) => {
							const data = editor.getData();
							setContactData(data);
						}}
						config={editorConfiguration}
					/>
				</div>
				<div className="web-content__btn">
					<button
						className="admin-btn admin-btn--primary"
						onClick={handleSubmitData}
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default ReservationWebContactUs;
