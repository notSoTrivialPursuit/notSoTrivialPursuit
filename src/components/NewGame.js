import React, { Component } from 'react';
import axios from 'axios';
import saveGame, { handleChoiceSelection, alertSubmit, alertPlayAgain, alertAPIError, alertScore, showIcon } from '../helpers';
import Swal from 'sweetalert2';

class NewGame extends Component {
	constructor(props) {
		super(props);

		/*  States:
            responseData -  the api response results objects
            choices -  the answer choices including the correct_answer
            questionSet - the questions, correct_answer, choices, userAnswer
            category - the category criteria
            numQuestions - number of questions criteria
			gameName - game name
			isSubmitted - will update if user clicks submit
        */
		this.state = {
			responseData: [],
			choices: [],
			questionSet: [],
			category: '',
			numQuestions: 10,
			gameName: '',
			isSubmitted: false
		};
	}

	createQuestionSet = (responseData, choicesArray) => {
		// Create an array of objects
		const questionSet = [];

		responseData.forEach((data, index) => {
			questionSet.push({
				id: `Q-${index}`,
				question: this.htmlDecode(data.question),
				choices: choicesArray[index],
				correctAnswer: this.htmlDecode(data.correct_answer),
				userAnswer: '',
				isCorrect: ''
			});
		});

		return questionSet;
	};

	getChoices = arrayOfQuestionObjects => {
		const choicesArray = [];

		arrayOfQuestionObjects.forEach((question, index) => {
			// responseData incorrect_answers property data type is an Array.  Push the incorrect_answers array to the choices array
			// choices.push(question.incorrect_answers);

			choicesArray.push(question.incorrect_answers);

			// Randomize the index position to insert the correct_answer
			// Multiply by the length of the incorrect_answers array + 1 (the correct_answer)
			const randomIndex = Math.floor(
				Math.random() * (question.incorrect_answers.length + 1)
			);

			// Insert the correct answer using the index position generated
			choicesArray[index].splice(randomIndex, 0, question.correct_answer);
		});

		// use htmlDecode to convert choices texts
		choicesArray.forEach(setChoices => {
			setChoices.forEach((choice, i) => {
				setChoices[i] = this.htmlDecode(choice);
			});
		});

		return choicesArray;
	};

	// Function to convert ascii characters to their human-readable character i.e. &039 = ' (apostrophe)
	htmlDecode = val => {
		const txt = document.createElement('textarea');
		txt.innerHTML = val;
		return txt.value;
	};

	handleCriteria = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePlay = event => {
		event.preventDefault();

		this.resetStates();

		// Connect to API
		axios({
			url: 'https://opentdb.com/api.php',
			params: {
				category: this.state.category,
				amount: this.state.numQuestions,
				type: 'multiple',
				difficulty: 'easy'
			}
		})
			.then(response => {
				// Grab only the info that we need.  data.results is an Array of Objects
				const responseData = response.data.results;

				// Create choices state (incorrect + randomized position of correct answer)
				const choices = this.getChoices(responseData);

				// Create questsionSet state which is an array of objects that contain qustion, choices, correct_answer key/value pairs
				const questionSet = this.createQuestionSet(responseData, choices);

				// Set the trivia state to the api data.results array of object
				this.setState({
					responseData,
					choices,
					questionSet
				});
			})
			.catch(error => {
				// When api call fails, display human readable message to user.
				Swal.fire(alertAPIError);
			});
	};

	// Function to handle the change
	handleChange = event => {
		handleChoiceSelection(this, event);
	};

	// score quiz once answers are submitted
	submitAnswers = event => {
		event.preventDefault();

		// We need to validate if the user answered all the questions so filter the questionSet objects that have userAnswer values
		const answeredQuestions = this.state.questionSet.filter((obj) => {
			return obj.userAnswer !== '';
		})

		// Show error if the user did not answer all the questions. Otherwise, show the score
		if (answeredQuestions.length != this.state.numQuestions) {
			Swal.fire(alertSubmit);

		} else {
			const correctAnswers = this.state.questionSet.filter(userAnswer => {
				return userAnswer.isCorrect;
			});
			const score = correctAnswers.length;

			this.setState({
				isSubmitted: true
			})

			Swal.fire(alertScore(score, this.state.questionSet.length))
				.then(() => {
					Swal.fire(alertPlayAgain).then(result => {
						if (result.value) {
							this.resetStates();
						}
					})
				})

		}
	};

	resetStates = () => {
		this.setState({
			responseData: [],
			choices: [],
			questionSet: [],
			isSubmitted: false
		});
	}

	render() {
		const { questionSet, gameName, category } = this.state;

		return (
			<div className='newGameTrivia'>
				<button className='returnHome button' onClick={() => this.props.toggleGame('')}>X</button>
				<form onSubmit={this.handlePlay} className='criteria'>
					<div className='wrapper'>
						<div className='criteriaType'>
							<label htmlFor='gameName'>Game Name</label>
							<input
								type='text'
								id='gameName'
								name='gameName'
								placeholder='Enter name here'
								onChange={this.handleCriteria}
								value={this.state.gameName}
								required
							/>
						</div>

						<div className='criteriaType'>
							<label htmlFor='category'>Categories</label>
							<select
								name='category'
								id='category'
								onChange={this.handleCriteria}
								required
								value={this.state.category}>
								<option value=''>Choose one</option>
								<option value='27'>Animals</option>
								<option value='9'>General Knowledge</option>
								<option value='22'>Geography</option>
								<option value='23'>History</option>
								<option value='11'>Movies</option>
								<option value='17'>Science and Nature</option>
								<option value='21'>Sports</option>
							</select>
						</div>

						<div className='criteriaType'>
							<label htmlFor='numQuestions'>Number of Questions</label>
							<select
								name='numQuestions'
								id='numQuestions'
								className='numQuestions'
								onChange={this.handleCriteria}
								required
								value={this.state.numQuestions}>
								<option value='10'>10</option>
								<option value='15'>15</option>
								<option value='20'>20</option>
							</select>
						</div>
					</div>
					<button type='submit' className='playGame button'>Let's play</button>
				</form>

				<form action='' onSubmit={this.submitAnswers}>
					{questionSet.map((data, index) => {
						return (
							<div
								key={index}
								className='question'
								onChange={this.handleChange}>
								<div className='wrapper'>
									<h2>
										{index + 1}. {data.question}
									</h2>
									<div className='choices'>
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
							<button className='button'>Submit</button>
						</div>
					) : null}
				</form>
				{this.state.questionSet.length ? (
					<button
						className='button'
						onClick={() => {
							saveGame(gameName, category, questionSet);
						}}>
						Save Game
					</button>
				) : null}
			</div>
		);
	}
}

export default NewGame;
