import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import CardList from "./CardList";
import { readDeck } from "../utils/api";

function Deck({
	deck,
	setDeck,
	handleDeleteDeck,
	cards,
	setCards,
	handleDeleteCard,
}) {
	const { deckId } = useParams();

	// Breadcrumb props
	const crumbs = [deck.name];
	const links = [];

	// Load deck
	useEffect(() => {
		setDeck({});
		const abortController = new AbortController();

		async function loadDeck() {
			try {
				const loadedDeck = await readDeck(deckId);
				setDeck(loadedDeck);
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		}
		loadDeck();
		return () => abortController.abort();
	}, [deckId, setDeck]);

	// Add cards from deck to 'cards' once deck is loaded
	useEffect(() => {
		setCards([]);

		if (deck) {
			setCards(deck.cards);
		}
	}, [deck, setCards]);

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="card position-relative my-2 border border-0">
				<div className="card-body">
					<h3 className="card-title">{deck.name}</h3>
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
			<hr
				style={{
					height: "6px",
					borderTop: "2px solid black",
					borderBottom: "2px solid black",
				}}
			/>
			<div className="my-3">
				<h1>Cards</h1>
			</div>
			{/* Need to wait for async functions to finish loading deck and cards */}
			{deck && cards ? (
				<CardList cards={cards} handleDeleteCard={handleDeleteCard} />
			) : (
				<p>Loading deck...</p>
			)}
		</>
	);
}

export default Deck;
