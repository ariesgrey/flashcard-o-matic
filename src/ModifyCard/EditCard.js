import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import CardForm from "./CardForm";

function EditCard({ deck, setDeck }) {
	const history = useHistory();
	const { deckId, cardId } = useParams();

	// Load deck
	useEffect(() => {
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

	// CardForm/card state set-up
	const initialFormData = {
		front: "",
		back: "",
	};
	const [card, setCard] = useState({ ...initialFormData });

	// Load card
	useEffect(() => {
		const abortController = new AbortController();

		async function loadCard() {
			try {
				const loadedCard = await readCard(cardId);
				setCard(loadedCard);
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		}
		loadCard();
		return () => abortController.abort();
	}, [cardId, setCard]);

	// Breadcrumb props
	const crumbs = [deck.name, `Edit Card ${cardId}`];
	const links = [`/decks/${deckId}`];

	// CardForm change handler
	const handleChange = ({ target }) => {
		setCard({
			...card,
			[target.name]: target.value,
		});
	};

	// CardForm submit handler for editing existing card
	const handleSubmit = (event) => {
		event.preventDefault();
		async function editCard() {
			await updateCard(card);
			history.push(`/decks/${deckId}`);
		}
		editCard();
	};

	// CardForm cancel button link
	const cancelLink = `/decks/${deckId}`;

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="my-3">
				<h1>Edit Card</h1>
			</div>
			<CardForm
				formData={card}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				cancelLink={cancelLink}
				newCard={false}
			/>
		</>
	);
}

export default EditCard;
