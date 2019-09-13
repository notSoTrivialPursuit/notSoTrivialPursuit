import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SavedGame from "./SavedGame";
import "./App.scss";

// placeholder functional components
const NewGame = () => {
	return <h2>New Game here</h2>;
};

// const SavedGame = () => {
// 	return <h2>Saved Game here</h2>;
// };

class App extends Component {
	render() {
		return (
			<Router>
				<div className='wrapper'>
					<Header />

					{/* New Game and Saved Game Buttons */}
					<div className='newGameButton'>
						<Link to='/newGame'>New Game</Link>
					</div>

					<div className='savedGameButton'>
						<Link to='/savedGame'>Saved Games</Link>
					</div>


					<Route path='/newGame' component={NewGame} />
					<Route path='/savedGame' component={SavedGame} />

					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
