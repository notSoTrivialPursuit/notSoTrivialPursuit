import React, { Component } from "react";

class CriteriaInputs extends Component {
	render() {
		return (
			<form>
				<label for="gameName">Game Name</label>
				<input type="text" for="gameName" />

				<label for="categories">Categories</label>
				<select name="categories" id="categories">
					<option value="none" selected="selected">
						Choose one
					</option>
					<option value="general">General Knowledge</option>
					<option value="history">History</option>
					<option value="sports">Sports</option>
					<option value="movies">Entertainment - Movies</option>
					<option value="science">Science and Nature</option>
					<option value="art">Art</option>
					<option value="geography">Geography</option>
					<option value="animals">Animals</option>
				</select>

				<div className="sliderWrapper">
					<label htmlFor="numQuestions">Number of Questions</label>
					<input
						type="range"
						min="10"
						max="20"
						step="5"
						class="numQuestions"
					></input>
					<ul>
						<li>10</li>
						<li>15</li>
						<li>20</li>
					</ul>
				</div>

				<button type="submit" class="playGame">
					Play game
				</button>
			</form>
		);
	}
}

export default CriteriaInputs;
