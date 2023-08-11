import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { listDecks } from "../utils/api";
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
	const [decks, setDecks] = useState([]);

	// Load decks
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

	return (
		<>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path={"/"}>
						<Home decks={decks} />
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
					<Route path={"/decks/:deckId/study"}>
						<Study />
					</Route>
					<Route path={"/decks/:deckId/edit"}>
						<EditDeck />
					</Route>
					<Route path={"/decks/:deckId"}>
						<Deck />
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
