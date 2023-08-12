import React from "react";

function Header() {
	return (
		<header className="bg-dark py-1 mb-4">
			<div className="container text-white p-4 mb-2">
				<h1 style={{ fontFamily: "Verdana", fontSize: "54px" }}>
					Flashcard-o-matic
				</h1>
				<p className="fs-5 fw-light">Discover The Flashcard Difference.</p>
			</div>
		</header>
	);
}

export default Header;
