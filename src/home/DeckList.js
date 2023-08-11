import DeckView from "./DeckView";

function DeckList({ decks, handleDeleteDeck }) {
	return (
		<>
			{decks.map((deck) => (
				<DeckView deck={deck} handleDeleteDeck={handleDeleteDeck} />
			))}
		</>
	);
}

export default DeckList;
