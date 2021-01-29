import React from "react";

const CardUserAnalytics = (props) => {
	const { infoTitle, infoValue } = props;
	return (
		<div col-item col-item--lg-4>
			<ul className="u-analytics-card-info">
				<li>
					<span></span>
					<span></span>
				</li>
			</ul>
		</div>
	);
};

export default CardUserAnalytics;
