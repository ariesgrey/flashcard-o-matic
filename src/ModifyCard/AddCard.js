import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from "../Layout/Breadcrumb";

function AddCard({ deck, setDeck }) {
	const { deckId } = useParams();

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

	// Breadcrumb props
	const crumbs = [deck.name, "Add Card"];
	const links = [`/decks/${deckId}`];

	// CardForm state set-up
	const initialFormData = {
		front: "",
		back: "",
	};
	const [formData, setFormData] = useState({ ...initialFormData });

	// CardForm change handler
	const handleChange = ({ target }) => {
		setFormData({
			...formData,
			[target.name]: target.value,
		});
	};

	// CardForm submit handler for new card
	const handleSubmit = (event) => {
		event.preventDefault();
		async function addCard() {
			try {
				await createCard(deckId, formData);
				setFormData({ ...initialFormData });
				window.location.reload();
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		}
		addCard();
	};

	// CardForm cancel button link
	const cancelLink = `/decks/${deckId}`;

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="my-3">
				<h1>{deck.name}: Add Card</h1>
			</div>
			<CardForm
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				cancelLink={cancelLink}
				newCard={true}
			/>
		</>
	);
}

export default AddCard;
