import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import DeckForm from "./DeckForm";

function EditDeck() {
	const { deckId } = useParams();
	const history = useHistory();

	// DeckForm/deck state set-up
	const initialFormData = {
		name: "",
		description: "",
	};
	const [deck, setDeck] = useState({ ...initialFormData });

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
	const crumbs = [deck.name, "Edit Deck"];
	const links = [`/decks/${deckId}`];

	// DeckForm change handler
	const handleChange = ({ target }) => {
		setDeck({
			...deck,
			[target.name]: target.value,
		});
	};

	// DeckForm submit handler for editing existing deck
	const handleSubmit = (event) => {
		event.preventDefault();
		async function editDeck() {
			await updateDeck(deck);
			history.push(`/decks/${deckId}`);
			// Force reload so edit will appear if you click 'Home' breadcrumb
			window.location.reload();
		}
		editDeck();
	};

	// Link for cancel button (different for edit vs create usage)
	const cancelLink = `/decks/${deckId}`;

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="my-3">
				<h1>Edit Deck</h1>
			</div>
			<DeckForm
				formData={deck}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				cancelLink={cancelLink}
			/>
		</>
	);
}

export default EditDeck;
