import firebase from './firebase';
import Swal from 'sweetalert2';

const categories = {
	27: 'Animals',
	25: 'Art',
	9: 'General Knowledge',
	22: 'Geography',
	23: 'History',
	11: 'Movies',
	17: 'Science and Nature',
	21: 'Sports'
};

const saveGame = (gameName, category, questionSet) => {
	const newGameObject = {
		gameName: gameName,
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

export default saveGame;
