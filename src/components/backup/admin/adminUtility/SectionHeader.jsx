import React from "react";

function SectionHeader(props) {
	const { title, breadCrumb } = props;
	console.log("amenities", breadCrumb);
	return (
		<div className="section-header">
			<div className="section-header__col">
				<h2 className="section__title heading-secondary">{title}</h2>
				<ul className="section__navigate">
					{breadCrumb.map((path, index) => {
						return <li key={index}>{path}</li>;
					})}
				</ul>
			</div>
		</div>
	);
}

export default SectionHeader;
