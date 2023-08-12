import React from "react";
import { Link } from "react-router-dom";

function DeckForm({ formData, handleChange, handleSubmit, cancelLink }) {
	return (
		<div className="container bg-light border border-secondary-subtle rounded p-3 mb-5">
			<form name="deckForm" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label">
						Name
					</label>
					<input
						className="form-control"
						type="text"
						id="name"
						name="name"
						placeholder="Deck Name"
						required={true}
						value={formData.name}
						onChange={handleChange}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="description" className="form-label">
						Description
					</label>
					<textarea
						className="form-control"
						id="description"
						name="description"
						placeholder="Brief description of the deck"
						rows={4}
						required={true}
						value={formData.description}
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

export default DeckForm;
