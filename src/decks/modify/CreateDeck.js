import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import Breadcrumb from "../../Layout/Breadcrumb";
import DeckForm from "./DeckForm";

function CreateDeck({ formData, setFormData, changeHandler }) {
	const crumbs = ["Create Deck"];
	const links = [];

	const history = useHistory();
	
	const initialFormState = {
		name: "",
		description: "",
	};
	setFormData(initialFormState);

	const handleSubmit = (event) => {
		event.preventDefault();
		async function addDeck() {
			try {
				const newDeck = await createDeck(formData);
				history.push(`/decks/${newDeck.id}`);
				// Force reload so new deck will appear if you click 'Home' breadcrumb
				window.location.reload();
			} catch (error) {
				if (error.name !== "AbortError") {
					throw error;
				}
			}
		}
		addDeck();
	};

	return (
		<>
			<Breadcrumb crumbs={crumbs} links={links} />
			<div className="my-3">
				<h1>Create Deck</h1>
			</div>
			<DeckForm
				formData={formData}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
}

export default CreateDeck;
