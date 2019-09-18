import firebase from './firebase';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const categories = {
	27: 'Animals',
	9: 'General Knowledge',
	22: 'Geography',
	23: 'History',
	11: 'Movies',
	17: 'Science and Nature',
	21: 'Sports'
};

const saveGame = (gameName, category, questionSet) => {
	const newGameObject = {
		gameName: gameName ? gameName : 'Untitled Trivia Game',
		category: categories[category],
		questionSet: questionSet
	};

	const dbRef = firebase.database().ref();

	const newGameRef = dbRef.push();
	newGameRef.set({
		id: newGameRef.key,
		created: Date.now(),
		...newGameObject
	});

	Swal.fire({
		title: 'Saved!',
		text: 'Your game is now in the Saved Games list!',
		type: 'success'
	});
};

export const handleChoiceSelection = (props, event) => {
	const questionSetCopy = [...props.state.questionSet];

	// Update the userAnswer property value with what the user selected answer
	const obj = questionSetCopy[event.target.name];
	obj.userAnswer = event.target.value;

	if (obj.userAnswer === obj.correctAnswer) {
		obj.isCorrect = true;
	} else {
		obj.isCorrect = false;
	}

	props.setState({
    questionSet: questionSetCopy,
    currentQuestion: props.state.currentQuestion + 1
	});
};

export const showIcon = (props, userAnswer, rightAnswer, choice) => {
	if (props.state.isSubmitted) {
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

export const alertScore = (score, totalQuestions) => {
	return {
		title: `Your final score is ${score}/${totalQuestions}`,
		type: 'info',
		allowOutsideClick: false
	}
}

export const alertSubmit = {
	title: 'Please answer all the questions before submitting.',
	type: 'error',
	allowOutsideClick: false
}

export const alertPlayAgain = {
	title: 'Play again?',
	type: 'question',
	showCancelButton: true,
	allowOutsideClick: false
}

export const alertAPIError = {
	title: 'Something is wrong.  Please try again later',
	type: 'error'
}

export default saveGame;
