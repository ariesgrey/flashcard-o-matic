import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import Breadcrumb from "../../Layout/Breadcrumb";
import DeckForm from "./DeckForm";

function EditDeck({ deck, setDeck, formData, setFormData, handleChange }) {
	const { deckId } = useParams();

	useEffect(() => {
		async function loadDeck() {
			const loadedDeck = await readDeck(deckId);
			setDeck(loadedDeck);
		}
		loadDeck();
	}, [deckId]);
	
	const crumbs = [deck.name, "Edit Deck"];
	const links = [`/decks/${deckId}`];

	const initialFormState = {
		name: deck.name,
		description: deck.description,
	};
	setFormData(initialFormState);

	const handleSubmit = (event) => {
		event.preventDefault();
		// Check if this works or if formData needs to be split up
		setDeck({
			...deck,
			formData,
		});
		async function editDeck() {
			try {
				await updateDeck(deck);
				history.push(`/decks/${deckId}`);
				//Check if force reload needed
				//window.location.reload();
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		editDeck();
		}
	
	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="my-3">
				<h1>Edit Deck</h1>
			</div>
			<DeckForm
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}

export default EditDeck;
