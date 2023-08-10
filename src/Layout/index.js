import React from "react";
import { Route, Switch } from "react-router-dom";
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
	return (
		<>
			<Header />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/decks/:deckId/cards/:cardId/edit">
					<EditCard />
				</Route>
				<Route path="/decks/:deckId/cards/new">
					<AddCard />
				</Route>
				<Route path="/decks/:deckId/study">
					<Study />
				</Route>
				<Route path="/decks/:deckId/edit">
					<EditDeck />
				</Route>
				<Route path="/decks/:deckId">
					<Deck />
				</Route>
				<Route path="/decks/new">
					<CreateDeck />
				</Route>
				<Route>
					<NotFound />
				</Route>
			</Switch>
		</>
	);
}

export default Layout;
