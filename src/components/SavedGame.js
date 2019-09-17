import React, { Component } from 'react';
import firebase from '../firebase.js';
import Preloader from './Preloader';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

	// On submit of questions, calculate score using the LENGTH of answers array
	handleSubmit = event => {
		event.preventDefault();
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

		this.setState({
			isSubmitted: true
		})

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

	showIcon = (userAnswer, rightAnswer, choice) => {
		if (this.state.isSubmitted) {
			if (rightAnswer === choice) {
				return (
					<FontAwesomeIcon
						icon='check'
						className='answerIcon'
						aria-hidden />
				)
			} else if (userAnswer === choice) {
				return (
					<FontAwesomeIcon
						icon='times'
						className='answerIcon'
						aria-hidden />
				)
			}
		} else {
			return ''
		}
	}

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
						// return (
						// 	<div
						// 		key={index}
						// 		className='question'
						// 		onChange={this.handleChange}
						// 	>
						// 		<div className="wrapper">
						// 			<h2>
						// 				{index + 1}. {data.question}
						// 			</h2>
						// 			<div className="choices">
						// 				{data.choices.map((choice, i) => {
						// 					const uniqueKey = `${index}`;
						// 					return (
						// 						<div key={`${index}-${i}`}>
						// 							<input
						// 								type='radio'
						// 								name={uniqueKey}
						// 								id={`${uniqueKey}-${i}`}
						// 								value={choice}
						// 								className='radioButton'
						// 							/>
						// 							<span className='checkMark'></span>
						// 							<label
						// 								htmlFor={`${uniqueKey}-${i}`}
						// 								className='questionLabel'>
						// 								{choice}
						// 							</label>
						// 						</div>
						// 					);
						// 				})}
						// 			</div>
						// 		</div>
						// 	</div>
						// );

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
															this.showIcon(data.userAnswer, data.correctAnswer, choice)
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
				<button className='formSubmit button'>Submit</button>
			</form >
		);
	}
}

export default SavedGame;
