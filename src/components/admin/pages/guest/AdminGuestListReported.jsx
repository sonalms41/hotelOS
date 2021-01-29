import React from "react";
import { AdminSectionHeader } from "../../adminUtility";
import { Link } from "react-router-dom";

const AdminGuestListReported = () => {
	return (
		<div className="admin-guest-list">
			<AdminSectionHeader
				sectionTitle="Reported User"
				breadCrumb={[
					{
						to: "/admin-dashboard",
						title: "Dashboard",
					},
					{
						to: "/admin-guest",
						title: "Guest",
					},
					{
						to: "/admin-guest/reported",
						title: "Reported Guests",
					},
				]}
				adminGuestListPage={true}
			/>
			<div className="section-body">
				<div className="admin-guest">
					<table className="admin-table ">
						<thead>
							<tr>
								<th className="table__col-1">S.N</th>
								<th className="table__col-2">Guest Gull Name</th>
								<th className="table__col-3">Email Address</th>
								<th className="table__col-4">Phone Number</th>
								<th className="table__col-5">Status</th>
								<th className="table__col-6"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
							<tr>
								<th className="table__col-1">1</th>
								<th className="table__col-2">
									<Link to="/admin-guest/dashboard" className="guest-list-name">
										Guest name 1
									</Link>
								</th>
								<th className="table__col-3">guestemail@gmail.com</th>
								<th className="table__col-4">+977 123456787</th>
								<th className="table__col-5">Active</th>
								<th className="table__col-6">
									<Link
										to="/admin-guest/dashboard"
										className="anchor-guest-dashboard"
									>
										View Detail
									</Link>
								</th>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default AdminGuestListReported;
