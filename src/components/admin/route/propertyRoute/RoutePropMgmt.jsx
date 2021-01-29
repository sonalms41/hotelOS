import React from "react";
import { Route } from "react-router-dom";
import PropertyEditLayout from "../../pages/property/editProperty/PropertyEditLayout";

const RoutePropMgmt = ({
	component: Component,
	breadCrumb,
	sectionTitle,
	className,
	...rest
}) => {
	return (
		<Route
			{...rest}
			component={(props) => (
				<>
					<PropertyEditLayout
						breadCrumb={breadCrumb}
						sectionTitle={sectionTitle}
						className={className}
					>
						<div className="admin-prop-detail">
							<Component {...props} />
						</div>
					</PropertyEditLayout>
				</>
			)}
		/>
	);
};

export default RoutePropMgmt;
