import { Link } from "react-router-dom";

function CardForm({ formData, handleChange, handleSubmit, cancelLink }) {
	return (
		<div className="container bg-light border border-secondary-subtle rounded p-3 mb-5">
			<form name="deckForm" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="front" className="form-label">
						Front
					</label>
					<textarea
						className="form-control"
						id="front"
						name="front"
						placeholder="Front side of card"
						rows={4}
						required={true}
						value={formData.front}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="back" className="form-label">
						Back
					</label>
					<textarea
						className="form-control"
						id="back"
						name="back"
						placeholder="Back side of card"
						rows={4}
						required={true}
						value={formData.back}
						onChange={handleChange}
					/>
				</div>
				<div>
					<Link to={cancelLink}>
						<button className="btn btn-secondary me-2" type="button">
							Cancel
						</button>
					</Link>
					<button className="btn btn-primary" type="submit">
						Submit&nbsp;<i className="bi bi-box-arrow-in-right"></i>
					</button>
				</div>
			</form>
		</div>
	);
}

export default CardForm;
