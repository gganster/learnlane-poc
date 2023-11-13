import {doc, getDoc, addDoc, setDoc} from "./firebase";
import {auth} from "@/firebase";
import { signInAnonymously } from "firebase/auth";

export const getUserById = async (id) => {
    const userDoc = await getDoc(doc("users", id));
    if (!userDoc.exists()) return null;
    return {uid: userDoc.id, ...userDoc.data()};
}

export const createAnonymousUser = async ({data}) => {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    await setDoc(doc("users", user.uid), {
        userName: data.userName,
        userSurname: data.userSurname,
        rooms: [data.roomId],
        role: "anonymous",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    console.log("here");
    return user;
}