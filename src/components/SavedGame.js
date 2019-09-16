import React, { Component } from 'react';
import firebase from '../firebase.js';
import Swal from 'sweetalert2';

class SavedGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questionSet: [],
			gameName: '',
			category: '',
			score: 0
		};
	}

	// On mount, get the Firebase data for 1 game
	componentDidMount() {
		const gameRef = firebase.database().ref(this.props.savedGameId);

		gameRef.once('value', response => {
			const gameObject = response.val();

			this.setState({
				questionSet: gameObject.questionSet,
				gameName: gameObject.gameName,
				category: gameObject.category
			});
		});
	}

	// On submit of questions, calculate score using the LENGTH of answers array
	handleSubmit = event => {
		event.preventDefault();

		// Display sweet alert showing score
		console.log('Your final score:', this.state.score);
	};

	// Whenever user chooses a radio option, it updates the value in the answers array in state
	handleChange = event => {
		// ToDo: Refactor this code and make this as a function so that both newGame and SavedGame can just call that function
		const questionSetCopy = [...this.state.questionSet];

		// Update the userAnswer property value with what the user selected answer
		const obj = questionSetCopy[event.target.name];
		obj.userAnswer = event.target.value;

		if (obj.userAnswer === obj.correctAnswer) {
			obj.isCorrect = true;
		} else {
			obj.isCorrect = false;
		}

		this.setState({
			questionSet: questionSetCopy
		});
	};

	// Score game
	submitAnswers = event => {
		const form = event.target;
		event.preventDefault();
		const correctAnswers = this.state.questionSet.filter(userAnswer => {
			return userAnswer.isCorrect;
		});
		const score = correctAnswers.length;

		Swal.fire({
			title: `Your final score is ${score}/${this.state.questionSet.length}`,
			text: 'Would you like to play again?',
			type: 'success',
			showCancelButton: true,
			confirmButtonText: 'Yes, play again',
			cancelButtonText: 'No, play another game',
			allowOutsideClick: false
		}).then(result => {
			if (result.value) {
				form.reset();
			} else {
				this.props.toggleGame('');
			}
		});
	};

	// Renders a form element with multiple divs (for each question) and 1 submit input
	render() {
		return (
			<form className='savedGame' action='' id='radioInputs' onSubmit={this.submitAnswers}>
				<h1>{this.state.gameName}</h1>
				<h2>Category: {this.state.category}</h2>
				{this.state.questionSet.map((data, index) => {
					return (
						<div key={index} className='question' onChange={this.handleChange}>
							<p>
								{index + 1}. {data.question}
							</p>
							{data.choices.map((choice, i) => {
								const uniqueKey = `${index}`;
								console.log(uniqueKey);
								return (
									<div key={`${index}-${i}`}>
										<input
											type='radio'
											name={uniqueKey}
											id={`${uniqueKey}-${i}`}
											value={choice}
											required
										/>
										<label htmlFor={`${uniqueKey}-${i}`}>{choice}</label>
									</div>
								);
							})}
						</div>
					);
				})}
				<button className='formSubmit'>Submit</button>
			</form>
		);
	}
}

export default SavedGame;
