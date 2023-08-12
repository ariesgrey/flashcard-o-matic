import { useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCards({ cards }) {
	const history = useHistory();
	// Keep track of card index
	const [index, setIndex] = useState(0);
	const length = cards.length;

	// Front/back state toggle
	const [frontSide, setFrontSide] = useState(true);

	// Flip button handler
	const handleFlip = () => {
		setFrontSide(!frontSide);
	};

	// Done button handler - restart prompt
	const handleDone = () => {
		const prompt = 'Restart cards?\nClick "Cancel" to return to the home page.';
		if (window.confirm(prompt)) {
			setIndex(0);
			setFrontSide(true);
		} else {
			history.push("/");
		}
	};

	// Next button handler
	const handleNext = () => {
		setIndex(index + 1);
		setFrontSide(true);
	};

	return (
		<div className="card my-4">
			<h5 className="card-header">
				Card {index + 1} of {length}
			</h5>
			<div className="card-body">
				{frontSide ? (
					<p className="fs-5">{cards[index].front}</p>
				) : (
					<p className="fs-5">{cards[index].back}</p>
				)}
				<button
					type="button"
					className="btn btn-secondary card-link"
					onClick={handleFlip}>
					<i className="bi bi-arrow-repeat"></i>&nbsp;Flip
				</button>
				{!frontSide && index < length - 1 && (
					<button
						type="button"
						className="btn btn-primary card-link float-end"
						onClick={handleNext}>
						Next&nbsp;<i className="bi bi-caret-right-fill"></i>
					</button>
				)}
				{!frontSide && index === length - 1 && (
					<button
						type="button"
						className="btn btn-success card-link float-end"
						onClick={handleDone}>
						Done&nbsp;<i className="bi bi-check-lg"></i>
					</button>
				)}
			</div>
		</div>
	);
}

export default StudyCards;
