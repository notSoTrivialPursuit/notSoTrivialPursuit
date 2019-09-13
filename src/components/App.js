import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import GameList from './GameList';
import SavedGame from './SavedGame';
import '.././styles/App.scss';
import '../components/NewGame';
import NewGame from '../components/NewGame';

// placeholder functional components
// const NewGame = () => {
// 	return <h2>New Game here</h2>;
// };

// const GameList = () => {
// 	return <h2>Saved Game List here</h2>;
// };

class App extends Component {
	constructor() {
		super();
		this.state = {
			componentToShow: ''
		};
	}

	// which game to render based on user choice and toggleGame function
	renderComponent = () => {
		if (this.state.componentToShow === 'newGame') {
			return (
				<NewGame
					toggleGame={() => {
						this.toggleGame('');
					}}
				/>

			);
		} else if (this.state.componentToShow === 'gameList') {
			return (
				<GameList
					toggleGame={() => {
						this.toggleGame('');
					}}
				/>
			);
		} else if (this.state.componentToShow === 'savedGame') {
			return (
				<SavedGame
					toggleGame={() => {
						this.toggleGame('');
					}}
				/>
			);
		}
	};

	// updates state with which game chosen and removes buttons
	toggleGame = chosenGame => {
		this.setState({
			componentToShow: chosenGame
		});
	};

	render() {
		return (
			<div className='wrapper'>
				<Header />

				{/* New Game and Saved Game Buttons */}
				{!this.state.componentToShow ? (
					<section className='gameButtons'>
						<button type='submit' onClick={() => this.toggleGame('newGame')}>
							New Game
						</button>
						<button type='submit' onClick={() => this.toggleGame('gameList')}>
							Saved Game List
						</button>
					</section>
				) : null}

				{this.renderComponent()}

				<Footer />
			</div>
		);
	}
}

export default App;
