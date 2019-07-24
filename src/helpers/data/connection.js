import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import firebaseConfig from '../apiKeys.json';

const firebaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};

export default firebaseApp;
