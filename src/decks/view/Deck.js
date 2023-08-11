import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../../Layout/Breadcrumb";
import CardList from "./CardList";
import { readDeck } from "../../utils/api";

function Deck({ deck, setDeck, handleDeleteDeck, cards, setCards, handleDeleteCard }) {
	const { deckId } = useParams();

	// Load deck and use state
	useEffect(() => {
		async function loadDeck() {
			const loadedDeck = await readDeck(deckId);
			setDeck(loadedDeck);
		}
		loadDeck();
	}, [deckId]);

	// Breadcrumb params
	const crumbs = [deck.name];
	const links = [];

	// Load cards in deck, only run if deck isn't empty
	// Does using 'deck.cards' avoid needing useEffect? Can just use for-loop?
	if (deck.cards.length !== 0) {
		useEffect(() => {
			setCards([]);
			const abortController = new AbortController();

			async function loadCards() {
				try {
					
				} catch (error) {
					if (error.name !== "AbortError") {
						throw error;
					}
				}
			}
		loadCards();
		return () => abortController.abort();
		})
	}

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
						<Link className="card-link" to={`/decks/${deckId}/cards/new`}>
							<button type="button" className="btn btn-success">
								<i className="bi bi-plus-circle"></i>&nbsp;Add Cards
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
			<div className="my-3">
				<h2>Cards</h2>
			</div>
			{deck.cards.length === 0 ? (
				<p>This deck is currently empty. Click "Add Cards" above to create cards for this deck</p> 
			) : (
				<CardList cards={cards} handleDeleteCards={handleDeleteCard} />
			)}
		</>
	);
}

export default Deck;
