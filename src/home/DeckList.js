import DeckView from "./DeckView";

function DeckList({ decks, handleDeleteDeck }) {
	return (
		<>
			{decks.map((deck, index) => (
				<DeckView key={index} deck={deck} handleDeleteDeck={handleDeleteDeck} />
			))}
		</>
	);
}

export default DeckList;
