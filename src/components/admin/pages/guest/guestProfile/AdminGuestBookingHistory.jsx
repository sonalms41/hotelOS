import React, { useState } from "react";
import AdminGuestProfileLayout from "../../../adminHOC/AdminGuestProfileLayout";

const AdminGuestBookingHistory = () => {
	const [currentCollapseId, setCurrentCollapseId] = useState(10);
	const handleCollapse = (id) => {
		setCurrentCollapseId(
			currentCollapseId == null || currentCollapseId !== id
				? id
				: currentCollapseId == id
				? null
				: "",
		);
	};
	return (
		<AdminGuestProfileLayout>
			<div className="admin-guest-profile admin-guest-boking">
				<table className="admin-table">
					<thead>
						<tr>
							<th className="table__col-1">S.N</th>
							<th className="table__col-2">Property Name</th>
							<th className="table__col-3">Address</th>
							<th className="table__col-4">Checked In</th>
							<th className="table__col-4">Stay</th>
							<th className="table__col-5">Billing</th>
							<th></th>
						</tr>
					</thead>
					<tbody
						onClick={() => handleCollapse(10)}
						className={currentCollapseId == 10 ? "active-collapse" : "hidden"}
					>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-2">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
							<td className="table__col-4">3 Night</td>
							<td className="table__col-5">Rs 5000</td>
							<td></td>
						</tr>
						<tr>
							<td>
								<span>Room Type</span>
								<span>Delux Double</span>
							</td>
							<td>
								<span>Room No</span>
								<span>352</span>
							</td>
							<td>
								<span>Floor</span>
								<span>10</span>
							</td>
							<td>
								<span>Checked In</span>
								<span>6:00 PM</span>
							</td>
							<td>
								<span>Checked Out</span>
								<span>10:00 AM</span>
							</td>
							<td>
								<span>Adult</span>
								<span>6</span>
							</td>
							<td>
								<span>Child</span>
								<span>5</span>
							</td>
						</tr>
					</tbody>
					<tbody
						onClick={() => handleCollapse(11)}
						className={currentCollapseId == 11 ? "active-collapse" : "hidden"}
					>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-2">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
							<td className="table__col-4">3 Night</td>
							<td className="table__col-5">Rs 5000</td>
						</tr>
						<tr>
							<td className="table__col-1">
								<span>Room Type</span>
								<span>Delux Double</span>
							</td>
							<td className="table__col-1">
								<span>Room No</span>
								<span>352</span>
							</td>
							<td className="table__col-1">
								<span>Floor</span>
								<span>10</span>
							</td>
							<td className="table__col-1">
								<span>Checked In</span>
								<span>6:00 PM</span>
							</td>
							<td className="table__col-1">
								<span>Checked Out</span>
								<span>10:00 AM</span>
							</td>
							<td className="table__col-1">
								<span>Adult</span>
								<span>6</span>
							</td>
							<td className="table__col-1">
								<span>Child</span>
								<span>5</span>
							</td>
						</tr>
					</tbody>
					<tbody
						onClick={() => handleCollapse(12)}
						className={currentCollapseId == 12 ? "active-collapse" : "hidden"}
					>
						<tr>
							<td className="table__col-1">1</td>
							<td className="table__col-2">Hotel Pokhara</td>
							<td className="table__col-3">Lake side, pokhara 10</td>
							<td className="table__col-4">20 July, 2020</td>
							<td className="table__col-4">3 Night</td>
							<td className="table__col-5">Rs 5000</td>
							<td></td>
						</tr>
						<tr>
							<td className="table__col-1">
								<span>Room Type</span>
								<span>Delux Double</span>
							</td>
							<td className="table__col-1">
								<span>Room No</span>
								<span>352</span>
							</td>
							<td className="table__col-1">
								<span>Floor</span>
								<span>10</span>
							</td>
							<td className="table__col-1">
								<span>Checked In</span>
								<span>6:00 PM</span>
							</td>
							<td className="table__col-1">
								<span>Checked Out</span>
								<span>10:00 AM</span>
							</td>
							<td className="table__col-1">
								<span>Adult</span>
								<span>6</span>
							</td>
							<td className="table__col-1">
								<span>Child</span>
								<span>5</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</AdminGuestProfileLayout>
	);
};
export default AdminGuestBookingHistory;
