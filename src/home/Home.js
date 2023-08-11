import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home({ decks }) {
	return (
		<>
			<Link to="/decks/new">
				<button type="button" className="btn btn-secondary">
					<i class="bi bi-plus-circle"></i>
					&nbsp;Create Deck
				</button>
			</Link>
			<DeckList decks={decks} />
		</>
	);
}

export default Home;
