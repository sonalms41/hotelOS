import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import adminReservationWebServices from "../../adminServices/reservationWebContent";
import { toastNotification } from "../../adminUtility";
import CustomSpinner from "../../../CustomSpinner";

const ReservationWebPartners = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [partnersData, setPartnersData] = useState(null);
	const [pageId, setPageId] = useState(null);
	const [existingData, setExistingData] = useState(null);

	// GET-EXISTING-DATA
	const getExistingData = () => {
		setIsLoading(true);
		adminReservationWebServices.get
			.webStaticContent()
			.then((response) => {
				const data = response.data;
				if (data.status === 200) {
					setPartnersData(data.result);
					const aboutus = data.result.filter((data) => {
						return data.page_name === "ourPartners";
					});
					setExistingData(aboutus[0].page_content);
					setPageId(aboutus[0].id);
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
	// SUBMIT
	const handleSubmitData = (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (existingData === null) {
			const postVal = {
				page_name: "ourPartners",
				page_content: partnersData,
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
				page_name: "aboutus",
				page_content: partnersData,
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

	const editorConfiguration = {
		ckfinder: {
			uploadUrl: "http://localhost:3000/",
		},
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
							setPartnersData(data);
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

export default ReservationWebPartners;
