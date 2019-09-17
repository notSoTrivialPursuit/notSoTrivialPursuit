import React, { Component } from 'react';
import firebase from '../firebase';

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

			console.log(response);

			const newState = [];

			for (let key in response) {
				newState.push({
					id: key,
					created: response[key].created,
					gameName: response[key].gameName,
					category: response[key].category,
					numQuestions: response[key].questionSet.length
				});
			}

			// Sorts games from newest to oldest
			newState.sort((a, b) => a.created < b.created);

			this.setState({
				games: newState
			});
		});
	}

	render() {
		return (
			<section className='gameListSection'>
        <button className='returnHome' onClick={() => this.props.toggleGame('')}>X</button>

        <div className="gameListHeading">
          <div className="wrapper">
            <h2>Saved Games</h2>
          </div>
        </div>

        <ul className='existingGames'>
          {this.state.games.map(game => {
            console.log(this.state.games);
            return (
              <li
                className='existingGame'
                onClick={() => this.props.selectSavedGame(game.id)}
                key={game.id}
              >
                <div className="wrapper">
                  <h3>{game.gameName}</h3>
                  <p>Category: {game.category}</p>
                  <p>Number of questions: {game.numQuestions}</p>
                </div>
              </li>
            );
          })}
        </ul>
			</section>
		);
	}
}

export default GameList;
