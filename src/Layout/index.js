import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import Header from "./Header";
import Home from "../home/Home";
import EditCard from "../cards/EditCard";
import AddCard from "../cards/AddCard";
import Study from "../decks/study/Study";
import EditDeck from "../decks/modify/EditDeck";
import Deck from "../decks/view/Deck";
import CreateDeck from "../decks/modify/CreateDeck";
import NotFound from "./NotFound";

function Layout() {
	const history = useHistory();

	// Individual deck state - 'Deck', 'EditDeck'
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

	// Change handler for deckForm - 'CreateDeck', 'EditDeck'
	// May be able to also use for cardForm? Otherwise need to rename
	const [formData, setFormData] = useState([]);
	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	};

	// Delete deck handler - 'Home', 'Deck'
	const handleDeleteDeck = async ({ target }) => {
		const deckId = target.getAttribute("id");
		const deleteMessage =
			"Delete this deck?\nYou will not be able to recover it.";
		if (window.confirm(deleteMessage)) {
			await deleteDeck(deckId);
			history.push("/");
			window.location.reload();
		}
	};

	// Delete card handler - 'Deck'
	const handleDeleteCard = async ({ target }) => {};

	return (
		<>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path={"/"}>
						<Home decks={decks} handleDeleteDeck={handleDeleteDeck} />
					</Route>
					<Route path={"/decks/new"}>
						<CreateDeck
							formData={formData}
							setFormData={setFormData}
							handleChange={handleChange}
						/>
					</Route>
					<Route path={"/decks/:deckId/cards/:cardId/edit"}>
						<EditCard />
					</Route>
					<Route path={"/decks/:deckId/cards/new"}>
						<AddCard />
					</Route>
					<Route path={"/decks/:deckId/edit"}>
						<EditDeck
							deck={deck}
							setDeck={setDeck}
							formData={formData}
							setFormData={setFormData}
							handleChange={handleChange}
						/>
					</Route>
					<Route path={"/decks/:deckId/study"}>
						<Study />
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
