import React from 'react'
import { AdminSectionHeader } from '../../../adminUtility'

const AdminAddPropertyLayout = (props) => {
	const {breadCrumb,sectionTitle}=props;
    return (
        <div className="admin-addproperty">
			<AdminSectionHeader
			 breadCrumb={breadCrumb}
			 sectionTitle={sectionTitle}
			/>

			<div className="admin-addproperty__amenities">         {props.children}
			</div>
	</div>
    )
}

export default AdminAddPropertyLayout
