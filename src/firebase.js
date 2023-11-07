import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import {firebase} from "../env";

const app = initializeApp(firebase);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};