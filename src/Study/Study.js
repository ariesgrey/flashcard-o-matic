import { useEffect } from "react";
import { useParams } from "react-router-dom";
import NotEnoughCards from "./NotEnoughCards";
import StudyCards from "./StudyCards";
import { readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";

function Study({ deck, setDeck, cards, setCards }) {
	const { deckId } = useParams();

	// Breadcrumb props
	const crumbs = [deck.name, "Study"];
	const links = [`/decks/${deckId}`];

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
			<h1 className="my-3">Study: {deck.name}</h1>
			{cards && cards.length > 3 ? (
				<StudyCards cards={cards} />
			) : (
				<NotEnoughCards />
			)}
		</>
	);
}

export default Study;
