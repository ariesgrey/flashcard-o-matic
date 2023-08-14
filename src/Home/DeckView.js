import React from "react";
import { Link } from "react-router-dom";

function DeckView({ deck, handleDeleteDeck }) {
	const { id, name, description } = deck;

	return (
		<div className="card position-relative mb-3">
			<div className="card-body">
				<h5 className="card-title">{name}</h5>
				<p
					className="position-absolute top-0 end-0"
					style={{ paddingRight: 16, paddingTop: 10 }}>
					{deck.cards.length} cards
				</p>
				<p className="card-text">{description}</p>
				<div>
					<Link className="card-link" to={`/decks/${id}`}>
						<button type="button" className="btn btn-secondary">
							<i className="bi bi-eye"></i>&nbsp;View
						</button>
					</Link>
					<Link className="card-link" to={`/decks/${id}/study`}>
						<button type="button" className="btn btn-primary">
							<i className="bi bi-book"></i>&nbsp;Study
						</button>
					</Link>
					<button
						type="button"
						className="btn btn-danger float-end"
						id={id}
						onClick={handleDeleteDeck}>
						<i className="bi bi-trash3" id={id}></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeckView;
