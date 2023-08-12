import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ crumbs, links }) {
	return (
		<div
			className="card bg-secondary-subtle border border-0 mt-3"
			style={{ height: 42 }}>
			<div className="card-body p-2">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						{/* 'Home' included in every instance */}
						<li key="0" className="breadcrumb-item fw-semibold">
							<Link style={{ textDecoration: "none" }} to="/">
								<i className="bi bi-house-door-fill"></i>
								&nbsp;Home
							</Link>
						</li>
						{crumbs.map((crumb, index) => {
							if (index === crumbs.length - 1) {
								return (
									<li
										key={index}
										className="breadcrumb-item fw-semibold active"
										aria-current="page">
										{crumb}
									</li>
								);
							} else {
								return (
									<li key={index} className="breadcrumb-item fw-semibold">
										<Link style={{ textDecoration: "none" }} to={links[index]}>
											{crumb}
										</Link>
									</li>
								);
							}
						})}
					</ol>
				</nav>
			</div>
		</div>
	);
}

export default Breadcrumb;
