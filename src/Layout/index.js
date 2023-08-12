import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { listDecks, deleteDeck, deleteCard } from "../utils/api";
import Header from "./Header";
import Home from "../Home/Home";
import EditCard from "../ModifyCard/EditCard";
import AddCard from "../ModifyCard/AddCard";
import Study from "../Study/Study";
import EditDeck from "../decks/ModifyDeck/EditDeck";
import Deck from "../Deck/Deck";
import CreateDeck from "../decks/ModifyDeck/CreateDeck";
import NotFound from "./NotFound";

function Layout() {
	const history = useHistory();

	// Individual deck state - 'Deck'
	const [deck, setDeck] = useState({});

	// Cards within a deck state - 'Deck',
	const [cards, setCards] = useState([]);

	// Load all decks - 'Home'
	const [decks, setDecks] = useState([]);
	useEffect(() => {
		setDecks([]);
		const abortController = new AbortController();

		async function loadDecks() {
			try {
				const loadedDecks = await listDecks();
				setDecks(loadedDecks);
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		}
		loadDecks();
		return () => abortController.abort();
	}, []);

	// Delete deck handler - 'Home', 'Deck'
	const handleDeleteDeck = async ({ target }) => {
		const deckId = target.getAttribute("id");
		const deleteDeckMessage =
			"Delete this deck?\nYou will not be able to recover it.";
		if (window.confirm(deleteDeckMessage)) {
			await deleteDeck(deckId);
			history.push("/");
			window.location.reload();
		}
	};

	// Delete card handler - 'Deck'
	const handleDeleteCard = async ({ target }) => {
		const cardId = target.getAttribute("id");
		const deleteCardMessage =
			"Delete this card?\nYou will not be able to recover it.";
		if (window.confirm(deleteCardMessage)) {
			await deleteCard(cardId);
			window.location.reload();
		}
	};

	return (
		<>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path={"/"}>
						<Home decks={decks} handleDeleteDeck={handleDeleteDeck} />
					</Route>
					<Route path={"/decks/new"}>
						<CreateDeck />
					</Route>
					<Route path={"/decks/:deckId/cards/:cardId/edit"}>
						<EditCard />
					</Route>
					<Route path={"/decks/:deckId/cards/new"}>
						<AddCard />
					</Route>
					<Route path={"/decks/:deckId/edit"}>
						<EditDeck />
					</Route>
					<Route path={"/decks/:deckId/study"}>
						<Study
							deck={deck}
							setDeck={setDeck}
							cards={cards}
							setCards={setCards}
						/>
					</Route>
					<Route path={"/decks/:deckId"}>
						<Deck
							deck={deck}
							setDeck={setDeck}
							handleDeleteDeck={handleDeleteDeck}
							cards={cards}
							setCards={setCards}
							handleDeleteCard={handleDeleteCard}
						/>
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</>
	);
}

export default Layout;
