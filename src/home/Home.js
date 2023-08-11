import { Link } from "react-router-dom";
import DeckList from "./DeckList";

function Home({ decks }) {
	return (
		<>
			<div className="mb-3">
				<Link to="/decks/new">
					<button type="button" className="btn btn-success">
						<i class="bi bi-plus-circle"></i>
						&nbsp;Create Deck
					</button>
				</Link>
			</div>
			<DeckList decks={decks} />
		</>
	);
}

export default Home;
