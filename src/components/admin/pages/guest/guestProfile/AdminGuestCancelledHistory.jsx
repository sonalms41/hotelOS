import React, { useState } from "react";
import AdminGuestProfileLayout from "../../../adminHOC/AdminGuestProfileLayout";

const AdminGuestCancelledHistory = () => {
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
			<div className="admin-guest-profile admin-guest-cancellation">
				<table className="admin-table">
					<thead>
						<tr>
							<th className="table__col-1">S.N</th>
							<th className="table__col-2">Property Name</th>
							<th className="table__col-3">Address</th>
							<th className="table__col-4">Booking Date In</th>
							<th className="table__col-4">Cancel Date</th>
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
							<td className="table__col-4">25 July, 2020</td>
						</tr>
						<tr>
							<h3>Reason</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								finibus, neque a dapibus consectetur, massa augue imperdiet
								turpis, vitae sodales nisl erat et augue. Etiam placerat aliquam
								velit in fringilla. Nullam blandit velit sit amet lacus dapibus
								dictum. Phasellus eu lectus quis magna accumsan sollicitudin.
								Curabitur vulputate posuere turpis, a condimentum neque
								porttitor at. Fusce faucibus ex a neque sollicitudin hendrerit.
								Sed interdum quam at purus blandit, at vestibulum libero
								ultricies.
							</p>
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
							<td className="table__col-4">25 July, 2020</td>
						</tr>
						<tr>
							<h3>Reason</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								finibus, neque a dapibus consectetur, massa augue imperdiet
								turpis, vitae sodales nisl erat et augue. Etiam placerat aliquam
								velit in fringilla. Nullam blandit velit sit amet lacus dapibus
								dictum. Phasellus eu lectus quis magna accumsan sollicitudin.
								Curabitur vulputate posuere turpis, a condimentum neque
								porttitor at. Fusce faucibus ex a neque sollicitudin hendrerit.
								Sed interdum quam at purus blandit, at vestibulum libero
								ultricies.
							</p>
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
							<td className="table__col-4">25 July, 2020</td>
						</tr>
						<tr>
							<h3>Reason</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
								finibus, neque a dapibus consectetur, massa augue imperdiet
								turpis, vitae sodales nisl erat et augue. Etiam placerat aliquam
								velit in fringilla. Nullam blandit velit sit amet lacus dapibus
								dictum. Phasellus eu lectus quis magna accumsan sollicitudin.
								Curabitur vulputate posuere turpis, a condimentum neque
								porttitor at. Fusce faucibus ex a neque sollicitudin hendrerit.
								Sed interdum quam at purus blandit, at vestibulum libero
								ultricies.
							</p>
						</tr>
					</tbody>
				</table>
			</div>
		</AdminGuestProfileLayout>
	);
};
export default AdminGuestCancelledHistory;
