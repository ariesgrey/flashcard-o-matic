import { Link } from "react-router-dom";

function Breadcrumb({ crumbs, links }) {
	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{/* 'Home' included in every instance */}
				<li className="breadcrumb-item">
					<Link to="/">
						<i class="bi bi-house-fill"></i>Home
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
	);
}

export default Breadcrumb;
