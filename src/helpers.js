import firebase from './firebase';
import Swal from 'sweetalert2';

// 1. Method that pushes new game object into Firebase,
// 2. Adds the Firebase ID of the object INSIDE as an "id" key,
// 3. And displays a "success" sweet alert
const saveGame = (newGame) => {
  // 1.
  const dbRef = firebase.database().ref();
  const newGameRef = dbRef.push();

  // 2.
  newGame.id = newGameRef;
  dbRef.set(newGame);

  // 3.
  Swal.fire({
    title: 'Saved!',
    text: 'Go back to the main screen and click "Saved Games List" to view your game!',
    type: 'success'
  });
};

export default saveGame;