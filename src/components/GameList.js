import React, { Component } from 'react';
import firebase from '../firebase';
import Preloader from './Preloader';

class GameList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			games: []
		};
	}

	// On mount, get the firebase data

	componentDidMount() {
		const dbRef = firebase.database().ref();

		dbRef.on('value', data => {
			const response = data.val();

			const newState = [];

			for (let objKey in response) {
				newState.push({
					id: objKey,
					created: response[objKey].created,
					gameName: response[objKey].gameName,
					category: response[objKey].category,
					numQuestions: response[objKey].questionSet.length
				});
			}

			// Sorts games from newest to oldest
			newState.sort((a, b) => a.created < b.created ? 1 : -1);

			this.setState({
				games: newState
			});
		});
	}

	render() {
		return (
			<section className='gameListSection'>
				<button className='returnHome button' onClick={() => this.props.toggleGame('')}>X</button>

				<div className='gameListHeading'>
					<div className='wrapper'>
						<h2>Saved Games</h2>
					</div>
				</div>

				<ul className='existingGames'>
					{this.state.games.map(game => {
						return (
							<li
								className='existingGame'
								onClick={() => this.props.selectSavedGame(game.id)}
								key={game.id}
							>
								<div className='wrapper'>
									<h3>{game.gameName}</h3>
									<p>Category: {game.category}</p>
									<p>Number of questions: {game.numQuestions}</p>
								</div>
							</li>
						);
					})}
				</ul>

				{!this.state.games.length ? <Preloader /> : null}
			</section>
		);
	}
}

export default GameList;
