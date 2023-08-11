import CardView from "./CardView";

function CardList({ cards, handleDeleteCard }) {
	return (
		<>
			{cards.map((card) => (
				<CardView card={card} handleDeleteCard={handleDeleteCard} />
			))}
		</>
	);
}

export default CardList;
