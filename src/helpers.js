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
		...newGameObject
	});

	Swal.fire({
		title: 'Saved!',
		text: 'Your game is now in the Saved Games list!',
		type: 'success'
	});
};

// // 1. Method that pushes new game object into Firebase,
// // 2. Adds the Firebase ID of the object INSIDE as an "id" key,
// // 3. And displays a "success" sweet alert
// const saveGame = (newGame) => {
//   // 1.
//   const dbRef = firebase.database().ref();
//   const newGameRef = dbRef.push();

//   // 2.
//   newGame.id = newGameRef;
//   dbRef.set(newGame);

//   // 3.
//   Swal.fire({
//     title: 'Saved!',
//     text: 'Go back to the main screen and click "Saved Games List" to view your game!',
//     type: 'success'
//   });
// };

// export default categories;
export default saveGame;
