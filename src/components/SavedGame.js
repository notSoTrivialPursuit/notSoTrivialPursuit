import React, { Component } from 'react';
import firebase from '../firebase.js';
import Swal from 'sweetalert2';
import { handleChoiceSelection, showIcon } from '../helpers.js';

class SavedGame extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questionSet: [],
			gameName: '',
			category: '',
			score: 0,
			isSubmitted: false
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

	// Whenever user chooses a radio option, it updates the value in the answers array in state
	handleChange = event => {
		handleChoiceSelection(this, event);
	};

	// score quiz once answers are submitted
	submitAnswers = event => {
		event.preventDefault();

		const form = event.target;
		const correctAnswers = this.state.questionSet.filter(userAnswer => {
			return userAnswer.isCorrect;
		});
		const score = correctAnswers.length;

		this.setState({
			isSubmitted: true
		})

		Swal.fire({
			title: `Your final score is ${score}/${this.state.questionSet.length}`,
			text: 'Would you like to play again?',
			type: 'success',
			showCancelButton: true,
			confirmButtonText: 'Yes, play again',
			cancelButtonText: 'No, exit the game',
			allowOutsideClick: false,
			customClass: {
				popup: 'ourSwal',
				title: 'swalTitle',
				content: 'swalText',
				confirmButton: 'mySwalConfirmButton',
				cancelButton: 'mySwalCancelButton' 
			}
		}).then(result => {
			if (result.value) {
				form.reset();

				this.setState({
					isSubmitted: false
				});

				window.scrollTo(0, 0);

			} else {
				this.props.toggleGame('');
			}
		});
	};

	// Renders a form element with multiple divs (for each question) and 1 submit input
	render() {
		return (
			<form className='savedGame' action='' id='radioInputs' onSubmit={this.submitAnswers}>
				<button className='returnHome button' onClick={() => this.props.toggleGame('')}>X</button>

				<div className="gameHeading">
					<div className="wrapper">
						<h2>{this.state.gameName}</h2>
						<h3>{this.state.category}</h3>
						<h4>Number of questions: {this.state.questionSet.length}</h4>

					</div>
				</div>

				{
					this.state.questionSet.map((data, index) => {
						return (
							<div
								key={index}
								className='question'
								onChange={this.handleChange}>
								<div className="wrapper">
									<h2>
										{index + 1}. {data.question}
									</h2>
									<div className="choices">
										{data.choices.map((choice, i) => {
											const uniqueKey = `${index}`;

											return (
												<div key={`${index}-${i}`}>
													<input
														type='radio'
														name={uniqueKey}
														id={`${uniqueKey}-${i}`}
														value={choice}
														className='radioButton'
													/>
													<label
														htmlFor={`${uniqueKey}-${i}`}
														className='questionLabel'>
														{choice}

														{

															showIcon(this, data.userAnswer, data.correctAnswer, choice)
														}

													</label>
												</div>
											);
										})}
									</div>
								</div>
							</div>
						);
					})}
				{this.state.questionSet.length ? (
					<div className='buttons'>
						<button className='formSubmit button'>Submit</button>
					</div>
				) : null}
				})
			}
			</form >
		);
	}
}

export default SavedGame;
