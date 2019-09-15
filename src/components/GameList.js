import React, { Component } from 'react';
import firebase from '../firebase';

class GameList extends Component {
	constructor() {
		super();
		this.state = {
			games: []
		};
	}

	// On mount, get the firebase data

	componentDidMount() {
		const dbRef = firebase.database().ref();

		dbRef.on('value', data => {
			const response = data.val();

			console.log(response);

			const newState = [];

			for (let key in response) {
				newState.push({
					id: key,
					gameName: response[key].gameName,
					category: response[key].category,
					numQuestions: response[key].questionSet.length
				});
			}

			this.setState({
				games: newState
			});
		});
	}

	render() {
		return (
			<section className='existingGames'>
				<h1>List of Trivia Games</h1>
				<ul>
					{this.state.games.map(game => {
						console.log(this.state.games);
						return (
							<li
								onClick={() => this.props.selectSavedGame(game.id)}
								key={game.id}
							>
								<p>{game.gameName}</p>
								<p>{game.category}</p>
								<p>{game.numQuestions}</p>
							</li>
						);
					})}
				</ul>

				<button className='exit'>Exit</button>
			</section>
		);
	}
}

export default GameList;
