import CardView from "./CardView";

function CardList({ cards, handleDeleteCard }) {
	return (
		<ul className="list-group mb-5">
			{cards.map((card, index) => (
				<CardView key={index} card={card} handleDeleteCard={handleDeleteCard} />
			))}
		</ul>
	);
}

export default CardList;
