import DeckView from "./DeckView";

function DeckList({ decks }) {
	return (
		<>
			{decks.map((deck) => (
				<DeckView deck={deck} />
			))}
		</>
	);
}

export default DeckList;
