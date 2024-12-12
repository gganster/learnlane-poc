import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { firebase } from "../env";

const app = initializeApp(firebase);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { app, db, auth, storage };