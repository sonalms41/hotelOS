import React, { useState } from "react";
import CustomSpinner from "../../../CustomSpinner";
import { AdminSectionHeader } from "../../adminUtility";
import AdminMasterNav from "../../nav/AdminMasterNav";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import ReservationWebAboutUs from "./ReservationWebAboutUs";
import ReservationWebContactUs from "./ReservationWebContactUs";
import ReservationWebPartners from "./ReservationWebPartners";

const AdminContent = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [aboutUsData, setAboutUsData] = useState("");
	return (
		<div className="web-content">
			<CustomSpinner isLoading={isLoading} />
			<AdminSectionHeader
				breadCrumb={[
					{
						to: "/admin-dashboard",
						title: "Dashboard",
					},
					{
						to: "/admin-content",
						title: "Content",
					},
				]}
				sectionTitle="Reservation Web Static Content"
			/>

			<div className="web-content__nav">
				<Tabs>
					<TabList>
						<Tab>About Us</Tab>
						<Tab>Contact Us</Tab>
						<Tab>Partners</Tab>
					</TabList>

					{/*PENDING*/}
					<TabPanel>
						<ReservationWebAboutUs />
					</TabPanel>
					<TabPanel>
						<ReservationWebContactUs />
					</TabPanel>
					<TabPanel>
						<ReservationWebPartners />
					</TabPanel>
				</Tabs>
			</div>
		</div>
	);
};

export default AdminContent;
