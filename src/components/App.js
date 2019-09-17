import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import GameList from './GameList';
import SavedGame from './SavedGame';
import NewGame from '../components/NewGame';
import '.././styles/App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			componentToShow: '',
			savedGameId: ''

		};
	}

	// which game to render based on user choice and toggleGame function
	renderComponent = () => {
		if (this.state.componentToShow === 'newGame') {
			return (
				<NewGame
					toggleGame={this.toggleGame}
				/>
			);
		} else if (this.state.componentToShow === 'gameList') {
			return (
				<GameList
					selectSavedGame={this.selectSavedGame}
				/>
			);
		} else if (this.state.componentToShow === 'savedGame') {
			return (
				<SavedGame
					savedGameId={this.state.savedGameId}
					toggleGame={this.toggleGame}
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

	selectSavedGame = savedGameId => {
		this.setState({
			savedGameId: savedGameId,
			componentToShow: 'savedGame'
		})
	}

	render() {
		return (
			<div className='App'>

				<div className='wrapper'>
					<Header className={this.state.componentToShow ? 'smallHeader' : 'largeHeader'} />


					{/* New Game and Saved Game Buttons */}
					{!this.state.componentToShow ? (
						<section className='gameButtons'>
							<button type='submit' onClick={() => this.toggleGame('newGame')}>
								New Game
							</button>
							<button type='submit' onClick={() => this.toggleGame('gameList')}>
								Saved Games
							</button>
						</section>
					) : (
							<button className='exitGame' onClick={() => this.toggleGame('')}>X</button>
						)}

					{this.renderComponent()}

					<Footer />
				</div>
			</div>
		);
	}
}

export default App;
