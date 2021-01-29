import React, { useState } from "react";
import AdminGuestProfileLayout from "../../../adminHOC/AdminGuestProfileLayout";

const AdminGuestPropertyView = () => {
	return (
		<AdminGuestProfileLayout>
			<div className="admin-guest-profile admin-guest-propview">
				<table className="admin-table">
					<thead>
						<tr>
							<th className="table__col-1">S.N</th>
							<th className="table__col-3">Property Name</th>
							<th className="table__col-3">Address</th>
							<th className="table__col-4">View Date</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-3">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
						</tr>
					</tbody>

					<tbody>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-3">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-3">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
						</tr>
					</tbody>
				</table>
			</div>
		</AdminGuestProfileLayout>
	);
};
export default AdminGuestPropertyView;
