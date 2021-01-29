import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminGetDataContext } from "../contextApi";
import CustomSpinner from "../../CustomSpinner";

const SectionHeaderPropDetail = (props) => {
	const { getPropertyDetail, propertyDetail } = useContext(AdminGetDataContext);
	const { basicInfo } = propertyDetail;
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const { propertyId } = props;
		getPropertyDetail.basicInfo(propertyId);
		setIsLoading(false);
	}, []);
	return (
		<>
			{/*{basicInfo && basicInfo.data ? (*/}
			<div className="section-header">
				<div className="section-header__col">
					<h2 className="section__title heading-secondary">
						{/*{basicInfo.data.property_name}*/}
					</h2>
					<ul className="section__navigate">
						<li>
							<Link to={`/admin-property`}>Property</Link>
						</li>
						<li>
							<Link to={`/admin-property/pending`}>Verified Property</Link>
						</li>
						<li>
							<Link to={`/admin-property/dashboard/`}>Property Dashboard</Link>
						</li>
						<li className="active">
							{console.log("propertyDetail", propertyDetail)}
						</li>
					</ul>
				</div>
			</div>
			{/*) : (
				<CustomSpinner isLoading={isLoading} />
			)}*/}
		</>
	);
};

export default SectionHeaderPropDetail;
