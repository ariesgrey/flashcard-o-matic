import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../../Layout/Breadcrumb";
import CardList from "./CardList";
import { readDeck } from "../../utils/api";

function Deck({ handleDeleteDeck }) {
	const [deck, setDeck] = useState({});
	const { deckId } = useParams();

	useEffect(() => {
		async function loadDeck() {
			const loadedDeck = await readDeck(deckId);
			setDeck(loadedDeck);
		}
		loadDeck();
	}, [deckId]);

	const crumbs = [deck.name];
	const links = [];

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="card position-relative my-3">
				<div className="card-body">
					<h3 className="card-title fw-normal">{deck.name}</h3>
					<p className="card-text fs-5">{deck.description}</p>
					<div>
						<Link className="card-link" to={`/decks/${deckId}/edit`}>
							<button type="button" className="btn btn-secondary">
								<i className="bi bi-pencil-square"></i>&nbsp;Edit
							</button>
						</Link>
						<Link className="card-link" to={`/decks/${deckId}/study`}>
							<button type="button" className="btn btn-primary">
								<i className="bi bi-book"></i>&nbsp;Study
							</button>
						</Link>
						<button
							type="button"
							className="btn btn-danger float-end"
							id={deckId}
							onClick={handleDeleteDeck}>
							<i className="bi bi-trash3" id={deckId}></i>
						</button>
					</div>
				</div>
			</div>
			<CardList />
		</>
	);
}

export default Deck;
