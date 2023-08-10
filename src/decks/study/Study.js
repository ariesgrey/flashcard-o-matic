import NotEnoughCards from "./NotEnoughCards";
import StudyCard from "./StudyCard";

function Study() {
	return (
		<>
			<h1>Study</h1>
			{/* 3 or more cards in deck */}
			<StudyCard />
			{/* less than 3 cards in deck */}
			<NotEnoughCards />
		</>
	);
}

export default Study;
