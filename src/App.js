import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./App.scss";

// placeholder functional components
const NewGame = () => {
	return <h2>New Game here</h2>;
};

const SavedGame = () => {
	return <h2>Saved Game here</h2>;
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			gameToShow: "",
			showButtons: true
		};
	}

	// which game to render based on user choice and toggleGame function
	renderGame = () => {
		if (this.state.gameToShow === "newGame") {
			return <NewGame />;
		} else if (this.state.gameToShow === "savedGame") {
			return <SavedGame />;
		}
	};

	// updates state with which game chosen and removes buttons
	toggleGame = chosenGame => {
		this.setState({
			gameToShow: chosenGame,
			showButtons: false
		});
	};

	render() {
		return (
			<div className="wrapper">
				<Header />

				{/* New Game and Saved Game Buttons */}
				{this.state.showButtons ? (
					<section className="gameButtons">
						<button type="submit" onClick={() => this.toggleGame("newGame")}>
							New Game
						</button>
						<button type="submit" onClick={() => this.toggleGame("savedGame")}>
							Saved Game
						</button>
					</section>
        ) : null}
        
				{this.renderGame()}

				<Footer />
			</div>
		);
	}
}

export default App;
