import React, { Component } from "react";
import firebase from "../firebase";

class GameList extends Component {
  constructor() {
    super();
    this.state = {
      games: []
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", data => {
      const response = data.val();

      console.log(response);

      const newState = [];

      for (let key in response) {
        newState.push({
          id: key,
          name: response[key].name,
          category: response[key].category,
          numQuestions: response[key].questions.length
        });
      }

      this.setState({
        games: newState
      });
    });
  }

  render() {
    return (
      <section className="existingGames">
        <h1>List of Trivia Games</h1>
        <ul>
          {this.state.games.map(game => {
            console.log(this.state.games);
            return (
              <li key={game.id}>
                <p>{game.name}</p>
                <p>{game.category}</p>
                <p>{game.numQuestions}</p>
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}

export default GameList;
