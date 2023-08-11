import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckView({ deck }) {
	const { id, name, description } = deck;

	const handleDelete = async ({ target }) => {
		const deleteMessage =
			"Delete this deck?\nYou will not be able to recover it.";
		if (window.confirm(deleteMessage)) {
			await deleteDeck(id);
			window.location.reload();
		}
	};

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
						onClick={handleDelete}>
						<i className="bi bi-trash3"></i>
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeckView;
