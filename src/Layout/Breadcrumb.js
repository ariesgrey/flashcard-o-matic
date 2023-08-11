import { Link } from "react-router-dom";

function Breadcrumb({ crumbs, links }) {
	return (
		<div className="card text-bg-light">
			<div className="card-header">
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						{/* 'Home' included in every instance */}
						<li className="breadcrumb-item">
							<Link to="/">
								<i className="bi bi-house-door"></i>&nbsp;Home
							</Link>
						</li>
						{crumbs.map((crumb, index) => {
							if (index === crumbs.length - 1) {
								return (
									<li className="breadcrumb-item active" aria-current="page">
										{crumb}
									</li>
								);
							} else {
								return (
									<li className="breadcrumb-item">
										<Link to={links[index]}>{crumb}</Link>
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
