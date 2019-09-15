import React, { Component } from 'react';
import axios from 'axios';
import saveGame from '../helpers';
import Swal from 'sweetalert2';

class NewGame extends Component {
	constructor() {
		super();

		/*  States:
            responseData -  the api response results objects
            choices -  the answer choices including the correct_answer
            questionSet - the questions, correct_answer, choices, userAnswer
            category - the category criteria
            numQuestions - number of questions criteria
            gameName - game name
        */
		this.state = {
			responseData: [],
			choices: [],
			questionSet: [],
			category: '',
			numQuestions: 10,
			gameName: ''
		};
	}

	createQuestionSet = (responseData, choicesArray) => {
		// Create an array of objects
		const questionSet = [];

		console.log('createQuestionSet responseData', responseData);

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
		console.log(event.target.id);
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePlay = event => {
		event.preventDefault();

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
				console.log('Raw API response', response);

				// Grab only the info that we need.  data.results is an Array of Objects
				const responseData = response.data.results;

				console.log('API Response filtered', responseData);

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
				// ToDo: Code to handle when api call fails.  Display human readable message to user.
			});
	};

	// Function to handle the change
	handleChange = event => {
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

	// score quiz once answers are submitted
	submitAnswers = event => {
		event.preventDefault();
		const correctAnswers = this.state.questionSet.filter(userAnswer => {
			return userAnswer.isCorrect;
		});
		const score = correctAnswers.length;

		Swal.fire({
			title: `Your final score is ${score}/${this.state.questionSet.length}`,
			text: 'Would you like to save this game?',
			type: 'success',
			showCancelButton: true,
			confirmButtonText: 'Save',
			cancelButtonText: 'Start a new game',
			allowOutsideClick: false
		}).then(result => {
			if (result.value) {
				saveGame(
					this.state.gameName,
					this.state.category,
					this.state.questionSet
				);
				this.props.toggleGame('gameList');
			} else {
				this.setState({
					responseData: [],
					choices: [],
					questionSet: [],
					category: '',
					numQuestions: 10,
					gameName: ''
				});
			}
		});
	};

	render() {
		const { questionSet, gameName, category } = this.state;

		console.log('QUESTIONSET ', questionSet);

		return (
			<div className='newGameTrivia'>
				<div className='criteria'>
					<form onSubmit={this.handlePlay}>
						<label htmlFor='gameName'>Game Name</label>
						<input
							type='text'
							id='gameName'
							name='gameName'
							onChange={this.handleCriteria}
							value={this.state.gameName}
							required
						/>

						<label htmlFor='category'>Categories</label>
						<select
							name='category'
							id='category'
							onChange={this.handleCriteria}
							required
							value={this.state.category}
						>
							<option value=''>Choose one</option>
							<option value='27'>Animals</option>
							<option value='25'>Art</option>
							<option value='9'>General Knowledge</option>
							<option value='22'>Geography</option>
							<option value='23'>History</option>
							<option value='11'>Movies</option>
							<option value='17'>Science and Nature</option>
							<option value='21'>Sports</option>
						</select>

						<label htmlFor='numQuestions'>Number of Questions</label>
						<select
							name='numQuestions'
							id='numQuestions'
							className='numQuestions'
							onChange={this.handleCriteria}
							required
							value={this.state.numQuestions}
						>
							<option value='10'>10</option>
							<option value='15'>15</option>
							<option value='20'>20</option>
						</select>

						<button type='submit' className='playGame'>
							Let's play
						</button>
					</form>
				</div>

				<form action='' onSubmit={this.submitAnswers}>
					{questionSet.map((data, index) => {
						return (
							<div
								key={index}
								className='question'
								onChange={this.handleChange}
							>
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
											/>
											<label htmlFor={`${uniqueKey}-${i}`}>{choice}</label>
										</div>
									);
								})}
							</div>
						);
					})}
					{this.state.questionSet.length ? (
						<div className='buttons'>
							<button className='formSubmit'>Submit</button>
						</div>
					) : null}
				</form>
				{this.state.questionSet.length ? (
					<button
						onClick={() => {
							saveGame(gameName, category, questionSet);
						}}
					>
						Save Game
					</button>
				) : null}
			</div>
		);
	}
}

export default NewGame;
