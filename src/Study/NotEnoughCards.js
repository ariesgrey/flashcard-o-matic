import React from "react";
import { Link } from "react-router-dom";

function NotEnoughCards({ cards, deckId }) {
	return (
		<div className="container my-4 text-center">
			<h2>Not Enough Cards</h2>
			<p className="fs-5 mb-0">You need at least 3 cards in a deck to study.</p>
			<p className="fs-5">There are {cards.length} cards in this deck.</p>
			<Link className="card-link" to={`/decks/${deckId}/cards/new`}>
				<button type="button" className="btn btn-success">
					<i className="bi bi-plus-circle"></i>&nbsp;Add Cards
				</button>
			</Link>
		</div>
	);
}

export default NotEnoughCards;
