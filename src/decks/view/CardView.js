import { Link } from "react-router-dom";

function CardView({ card, handleDeleteCard }) {
	const { cardId, front, back, deckId } = card;

	return (
		<li className="list-group-item list-group-item-light border border-secondary-subtle p-0">
			<div className="card border border-0 bg-transparent position-relative">
				<div className="card-body">
					<div className="card-text">
						<div className="row row-cols-2">
							<div className="col">
								<p className="text-body-secondary">{front}</p>
							</div>
							<div className="col">
								<p className="text-body-secondary">{back}</p>
							</div>
						</div>
					</div>
					<div className="float-end">
						<Link
							className="card-link"
							to={`/decks/${deckId}/cards/${cardId}/edit`}>
							<button type="button" className="btn btn-secondary">
								<i className="bi bi-pencil-square"></i>&nbsp;Edit
							</button>
						</Link>
						<button
							type="button"
							className="card-link btn btn-danger"
							id={cardId}
							onClick={handleDeleteCard}>
							<i className="bi bi-trash3" id={cardId}></i>
						</button>
					</div>
				</div>
			</div>
		</li>
	);
}

export default CardView;
