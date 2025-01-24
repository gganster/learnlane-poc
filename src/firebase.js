import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { firebase } from "../env";

const app = initializeApp(firebase);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();
const realtimeDb = getDatabase(app);

export { app, db, auth, storage, realtimeDb };