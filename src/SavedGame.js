import React, { Component } from 'react';
import firebase from './firebase.js';

class SavedGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
      answers: [],
      score: 0
    };
  };

  // On mount, get the Firebase data for 1 game
  componentDidMount() {
    const gameRef = firebase.database().ref('game1');

    gameRef.once('value', response => {
      const questions = response.val().questions;

      // Creates the array of empty strings matching the number of questions
      const answers = [];
      questions.forEach(question => answers.push(false));

      this.setState({
        questions,
        answers
      });
    });
  };

  // On submit of questions, calculate score using the LENGTH of answers array
  handleSubmit = (event) => {
    event.preventDefault();

    const correctAnswers = this.state.answers.filter(answer => answer === 'true');

    this.setState({
      score: correctAnswers.length
    });
  };

  // Whenever user chooses a radio option, it updates the value in the answers array in state
  handleChange = (event) => {
    const copiedAnswers = [...this.state.answers];
    copiedAnswers.splice(event.target.name, 1, event.target.value)

    this.setState({
      answers: copiedAnswers
    });
  };

  // Renders a form element with multiple divs (for each question) and 1 submit input
  render() {
    return (
      <form action='' className='questionsForm' onSubmit={this.handleSubmit}>
        {this.state.questions.map((question, i) => {
          return (
            <div className='question' key={question.id} onChange={this.handleChange}>
              <legend>{question.question}</legend>
              
              {question.choices.map((answer, j) => {
                return (
                  <label htmlFor={`question${i+1}Answer${j+1}`} key={j}>
                    <input
                      type='radio'
                      name={i}
                      id={`question${i+1}Answer${j+1}`}
                      value={answer.status}
                    />
                    {answer.name}
                  </label>
                );
              })}

            </div>
          );
        })}
        <input type='submit' value='Submit Answers' />
      </form>
    );
  };
};

export default SavedGame;