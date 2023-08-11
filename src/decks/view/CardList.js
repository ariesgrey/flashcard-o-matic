import CardView from "./CardView";

function CardList({ cards, handleDeleteCard }) {
	return (
		<>
			{cards.map((card, index) => (
				<CardView key={index} card={card} handleDeleteCard={handleDeleteCard} />
			))}
		</>
	);
}

export default CardList;
